import {
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

export type Item = {
  id: number | string;
  priority: number;
  title: string;
  chat: number;
  attachment: number;
  assignees: { avt: string }[];
};

type Props = {
  data: Item;
  index: number;
};
const CardItem = ({ data, index }: Props) => {
  const { priority, title, chat, attachment, assignees } = data;
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
            className={` bg-gradient-to-r  px-2 py-1 text-sm text-white ${
              priority === 0
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
                {chat}
              </span>
              <span className="flex items-center space-x-2">
                <PaperClipIcon className="mr-2 h-4 w-4 text-gray-500" />
                {attachment}
              </span>
            </div>

            <ul className="flex space-x-3">
              {assignees.length > 0 &&
                assignees.map((user, index) => {
                  return (
                    <li key={index}>
                      <Image
                        src={user.avt}
                        alt="random user"
                        width="36"
                        height="36"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </li>
                  );
                })}

              <li>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-gray-500">
                  <PlusIcon className="h-6 w-6 text-gray-500" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
