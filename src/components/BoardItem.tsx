import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import CardItem from "./CardItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

type Props = {
  board: {
    name: string;
    items: {
      id: number;
      priority: number;
      title: string;
      chat: number;
      attachment: number;
      assignees: { avatar: string }[];
    }[];
  };
};

const BoardItem = ({ board }: Props) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-md bg-gray-100 p-3 shadow-md">
      <span className="absolute inset-x-0 top-0 h-[5px] w-full rounded-t-md bg-gradient-to-r from-pink-700 to-red-200"></span>
      <h4 className="mb-2 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-500">{board.name}</span>
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
      </h4>

      {board.items.length > 0 &&
        board.items.map((item, index) => {
          return (
            <Draggable
              key={index}
              draggableId={String(board.name)}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <CardItem data={item} index={index} />
                </div>
              )}
            </Draggable>
          );
        })}

      <button className="mt-6 flex items-center justify-center space-x-2 text-lg">
        <span>Add Task</span>
        <PlusCircleIcon className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
};

export default BoardItem;
