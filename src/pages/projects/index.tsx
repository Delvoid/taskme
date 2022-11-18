import Layout from "../../components/Layout";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

const ProjectsPage = () => {
  const { data, isLoading, status } = trpc.project.getAll.useQuery();
  if (isLoading) {
    return null;
  }
  if (status === "error") {
    return <div> Something went wrong</div>;
  }
  console.log({ data });
  return (
    <Layout>
      <div className="flex h-screen flex-col p-10">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-4xl font-bold text-gray-600">Projects</h4>
            <ChevronDownIcon
              className="ml-5 h-9 w-9 rounded-full
            bg-white p-1 text-gray-500 shadow-xl"
            />
          </div>
        </div>

        {/* Board columns */}
        <div className="my-5 grid grid-cols-4 gap-5">
          {data.map((project) => {
            return (
              <div key={project.id}>
                <Link href={`/projects/${project.id}`}>
                  <span>{project.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
