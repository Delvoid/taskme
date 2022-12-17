import {
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Draggable } from "react-beautiful-dnd";
import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import type { Statuses } from "./project/BoardColumns";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export type Item = {
  id: number | string;
  priority: number;
  title: string;
  chat: number;
  attachment: number;
};

type Props = {
  data: RouterOutputs["task"]["getAllByProjectAndStatus"][number];
  index: number;
};
const CardItem = ({ data, index }: Props) => {
  const { title, id } = data;
  const utils = trpc.useContext();
  const { mutateAsync: deleteTask } = trpc.task.deleteById.useMutation({
    onSuccess: (data) => {
      utils.task.getAllByProjectAndStatus.invalidate({
        projectId: data.project_id,
        status: data.status as Statuses,
      });
    },
  });
  const priority = randomIntFromInterval(0, 2);

  const handleDeleteTask = () => {
    deleteTask({ taskId: id });
  };
  return (
    <Draggable index={index} draggableId={String(data.id)}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mt-3 flex flex-col space-y-2 rounded-md bg-white p-3 last:mb-0"
        >
          <label
            className={` bg-gradient-to-r  px-2 py-1 text-sm text-white ${priority === 0
                ? "from-blue-500 to-blue-400"
                : priority === 1
                  ? "from-green-500 to-green-400"
                  : "from-red-500 to-red-400"
              }  `}
          >
            {priority === 0
              ? "Low Priority"
              : priority === 1
                ? "Medium Priority"
                : "High Priority"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{title}</h5>
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2">
                <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4 text-gray-500" />
              </span>
              <span className="flex items-center space-x-2">
                <PaperClipIcon className="mr-2 h-4 w-4 text-gray-500" />
              </span>
            </div>
            <span className="flex items-center space-x-2">
              <TrashIcon
                className="mr-2 h-4 w-4 text-gray-500"
                onClick={handleDeleteTask}
              />
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
