import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type Props = {
  name: string;
};
const BoardHeader = ({ name }: Props) => {
  return (
    <div className="flex flex-initial justify-between">
      <div className="flex items-center">
        <h4 className="text-4xl font-bold text-gray-600">{name}</h4>
        <ChevronDownIcon
          className="ml-5 h-9 w-9 rounded-full
            bg-white p-1 text-gray-500 shadow-xl"
        />
      </div>

      <ul className="flex space-x-3">
        <li>
          <Image
            src="https://randomuser.me/api/portraits/men/75.jpg"
            width="36"
            height="36"
            objectFit="cover"
            className=" rounded-full "
            alt="usr image"
          />
        </li>
        <li>
          <Image
            src="https://randomuser.me/api/portraits/men/76.jpg"
            width="36"
            height="36"
            objectFit="cover"
            className=" rounded-full "
            alt="usr image"
          />
        </li>
        <li>
          <Image
            src="https://randomuser.me/api/portraits/men/78.jpg"
            width="36"
            height="36"
            objectFit="cover"
            className=" rounded-full "
            alt="usr image"
          />
        </li>
        <li>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed
                border-gray-500"
          >
            <PlusIcon className="h-5 w-5 text-gray-500" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BoardHeader;
