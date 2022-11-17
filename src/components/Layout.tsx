import SideBar from "./SideBar";
import TopBar from "./TopBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen min-w-full bg-blue-200">
      <TopBar />
      <SideBar />
      <main className="pl-40 pt-16">{children}</main>
    </div>
  );
};

export default Layout;
