import {
  AtSymbolIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
const TopBar = () => {
  return (
    <div className="fixed flex h-16 w-full items-center justify-between bg-gradient-to-r from-purple-400 to-blue-500 pl-40 pr-5">
      <div className="flex items-center px-5">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        <input
          type="text"
          placeholder="search for tasks"
          className=" border-0 bg-transparent text-lg text-white placeholder-gray-200 outline-none focus:ring-0"
        />
      </div>
      <div className="flex space-x-5">
        <AtSymbolIcon className="h-7 w-7 text-white" />
        <BellIcon className="h-7 w-7 text-white" />
        <div className="flex items-center space-x-4 text-white">
          <h3 className="mr-3 font-bold">Mr. John Doe</h3>
          <Image
            src="http://randomuser.me/api/portraits/men/75.jpg"
            alt="random user"
            width="36"
            height="36"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
