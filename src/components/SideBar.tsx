import {
  CalendarIcon,
  ChartBarSquareIcon,
  CogIcon,
  ServerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
const SideBar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-40 bg-white">
      <h1 className="flex h-16 items-center justify-center bg-purple-600 text-xl font-bold text-white">
        something
      </h1>
      <ul className="flex h-full flex-col text-lg">
        <li className="flex flex-col items-center justify-center py-7 text-gray-500">
          <UserGroupIcon className="h-7 w-7" />
          Manage
        </li>
        <li className="flex flex-col items-center justify-center border-l-4 border-purple-500 py-7 text-purple-500">
          <ServerIcon className="h-7 w-7 text-purple-500" />
          Boards
        </li>
        <li className="flex flex-col items-center justify-center py-7 text-gray-500">
          <CalendarIcon className="h-7 w-7" />
          Schedule
        </li>
        <li className="flex flex-col items-center justify-center py-7 text-gray-500">
          <ChartBarSquareIcon className="h-7 w-7" />
          Report
        </li>
        <li className="mt-auto mb-14 flex flex-col items-center justify-center py-7 text-gray-500">
          <CogIcon className="h-7 w-7" />
          Settings
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
