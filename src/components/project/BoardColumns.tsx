import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { RouterOutputs } from "../../utils/trpc";
import { trpc } from "../../utils/trpc";

import TaskItems from "./TaskItems";

type Props = {
  projectId: string;
};

const STATUSES = ["To-do", "Doing", "Done", "Backlog"] as const;
export type Statuses = typeof STATUSES[number];

const BoardColumns = ({ projectId }: Props) => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const utils = trpc.useContext();
  const { mutateAsync: createTask } = trpc.task.create.useMutation({
    onSuccess: (data) => {
      utils.task.getAllByProjectAndStatus.invalidate({
        projectId,
        status: data.status as Statuses,
      });
    },
  });
  const { mutateAsync: moveTask } = trpc.task.moveTask.useMutation({
    onMutate: async (moveTask) => {
      await utils.task.getAllByProjectAndStatus.cancel({
        projectId,
        status: moveTask.status,
      });
      await utils.task.getAllByProjectAndStatus.cancel({
        projectId,
        status: moveTask.prevStatus,
      });

      const prevTasks = utils.task.getAllByProjectAndStatus.getData({
        projectId,
        status: moveTask.status,
      });
      const moveFromTasks = utils.task.getAllByProjectAndStatus.getData({
        projectId,
        status: moveTask.prevStatus,
      });

      const task = await utils.task.getById.fetch({ taskId: moveTask.taskId });

      if (task) {
        queryClient.setQueryData(
          [
            ["task", "getAllByProjectAndStatus"],
            { projectId, status: moveTask.status },
          ],
          (oldData) => {
            const newData =
              oldData as RouterOutputs["task"]["getAllByProjectAndStatus"];

            newData.splice(moveTask.position, 0, task);
            return newData;
          }
        );
        queryClient.setQueryData(
          [
            ["task", "getAllByProjectAndStatus"],
            { projectId, status: moveTask.prevStatus },
          ],
          (oldData) => {
            const newData =
              oldData as RouterOutputs["task"]["getAllByProjectAndStatus"];

            return newData.filter((task) => task.id !== moveTask.taskId);
          }
        );
      }
      return [prevTasks, moveFromTasks];
    },
    onSettled: (data) => {
      if (data?.movedTo) {
        utils.task.getAllByProjectAndStatus.invalidate({
          projectId,
          status: data.movedTo as "To-do" | "Doing" | "Done" | "Backlog",
        });
        utils.task.getAllByProjectAndStatus.invalidate({
          projectId,
          status: data.prevStatus as "To-do" | "Doing" | "Done" | "Backlog",
        });
      }
    },
  });

  const onDragEnd = async (re: any) => {
    console.log(re);
    if (!re.destination) return;

    const id = re.draggableId as string;
    const status = STATUSES[
      Number(re.destination.droppableId)
    ] as typeof STATUSES[number];
    const position = re.destination.index as number;
    const oldPosition = re.source.index as number;
    const prevStatus = STATUSES[
      Number(re.source.droppableId)
    ] as typeof STATUSES[number];

    const newTasks = utils.task.getAllByProjectAndStatus.getData({
      projectId,
      status: status,
    }) as RouterOutputs["task"]["getAllByProjectAndStatus"];
    const updatedList = newTasks
      .filter((task) => task.id !== id)
      .map((task) => {
        if (task.position >= position && status !== prevStatus) {
          let index = newTasks.findIndex((obj) => obj.id === task.id);
          const newPos = (index += 1);
          return { ...task, position: newPos };
        }
        if (status === prevStatus) {
          let index = newTasks.findIndex((obj) => obj.id === task.id);
          if (oldPosition > position && index >= position) {
            const newPos = (index += 1);
            return { ...task, position: newPos };
          }
          if (oldPosition <= position && index <= position) {
            console.log({ task });
            const newPos = index > 0 ? (index -= 1) : 0;
            return { ...task, position: newPos };
          }
        }
        return task;
      });
    console.log({ updatedList });

    await moveTask({
      taskId: id,
      status,
      position,
      oldPosition,
      prevStatus,
      newTasks: updatedList,
    });
  };

  const onTextAreaKeyPress = async (e: any, board: Statuses) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      let taskLength = utils.task.getAllByProjectAndStatus.getData({
        projectId,
        status: board,
      })?.length;
      const count = taskLength ? (taskLength += 1) : 0;

      if (val.length === 0) {
        setShowForm(false);
      } else {
        await createTask({
          projectId,
          status: board,
          taskCount: count,
          task: { title: val, status: board },
        });
        e.target.value = "";
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="my-5 grid grid-cols-4 gap-5">
        {STATUSES.map((board, bIndex) => {
          return (
            <div key={board}>
              <Droppable droppableId={bIndex.toString()}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div
                      className={`relative flex flex-col
                            overflow-hidden rounded-md bg-gray-100 shadow-md
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                    >
                      <span
                        className="absolute inset-x-0 top-0 h-1 w-full
                          bg-gradient-to-r from-pink-700 to-red-200"
                      ></span>
                      <h4 className=" mb-2 flex items-center justify-between p-3">
                        <span className="text-2xl text-gray-600">{board}</span>
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                      </h4>

                      <div
                        className="h-auto overflow-y-auto overflow-x-hidden"
                        style={{ maxHeight: "calc(100vh - 290px)" }}
                      >
                        <TaskItems status={board} projectId={projectId} />

                        {provided.placeholder}
                      </div>

                      {showForm && selectedBoard === bIndex ? (
                        <div className="p-3">
                          <textarea
                            className="w-full rounded border-gray-300 focus:ring-purple-400"
                            rows={3}
                            placeholder="Task info"
                            data-id={bIndex}
                            onKeyDown={(e) => onTextAreaKeyPress(e, board)}
                          />
                        </div>
                      ) : (
                        <button
                          className="my-3 flex items-center justify-center space-x-2 text-lg"
                          onClick={() => {
                            setSelectedBoard(bIndex);
                            setShowForm(true);
                          }}
                        >
                          <span>Add task</span>
                          <PlusCircleIcon className="h-5 w-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default BoardColumns;
