import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardData from "../../data/board-data.json";
import { trpc } from "../../utils/trpc";
import CardItem from "../CardItem";

type Board = {
  name: string;
  items: {
    id: number | string;
    priority: number;
    title: string;
    chat: number;
    attachment: number;
    assignees: { avt: string }[];
  }[];
}[];

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type Props = {
  projectId: string;
};

const STATUSES = ["To-do", "Doing", "Done", "Backlog"];

const BoardColumns = ({ projectId }: Props) => {
  const [boardData, setBoardData] = useState<Board>(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const { data: toDoTasks } = trpc.task.getAllByProjectAndStatus.useQuery({
    projectId: projectId,
    status: "To-do",
  });
  const { data: doingTasks } = trpc.task.getAllByProjectAndStatus.useQuery({
    projectId: projectId,
    status: "Doing",
  });
  const { data: doneTasks } = trpc.task.getAllByProjectAndStatus.useQuery({
    projectId: projectId,
    status: "Done",
  });
  const { data: backlogTasks } = trpc.task.getAllByProjectAndStatus.useQuery({
    projectId: projectId,
    status: "Backlog",
  });

  console.log({ toDoTasks });
  console.log({ doingTasks });
  console.log({ doneTasks });
  console.log({ backlogTasks });

  const onDragEnd = (re: any) => {
    if (!re.destination) return;
    const newBoardData = boardData;
    const dragItem =
      newBoardData[parseInt(re.source.droppableId)]?.items[re.source.index];
    if (!dragItem) {
      console.log("end");
      return;
    }
    newBoardData[parseInt(re.source.droppableId)]?.items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)]?.items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        const newBoardData = boardData;
        newBoardData[boardId]?.items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="my-5 grid grid-cols-4 gap-5">
        {boardData.map((board, bIndex) => {
          return (
            <div key={board.name}>
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
                        <span className="text-2xl text-gray-600">
                          {board.name}
                        </span>
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                      </h4>

                      <div
                        className="h-auto overflow-y-auto overflow-x-hidden"
                        style={{ maxHeight: "calc(100vh - 290px)" }}
                      >
                        {board.items.length > 0 &&
                          board.items.map((item, iIndex) => {
                            return (
                              <CardItem
                                key={item.id}
                                data={item}
                                index={iIndex}
                              />
                            );
                          })}
                        {provided.placeholder}
                      </div>

                      {showForm && selectedBoard === bIndex ? (
                        <div className="p-3">
                          <textarea
                            className="w-full rounded border-gray-300 focus:ring-purple-400"
                            rows={3}
                            placeholder="Task info"
                            data-id={bIndex}
                            onKeyDown={(e) => onTextAreaKeyPress(e)}
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
