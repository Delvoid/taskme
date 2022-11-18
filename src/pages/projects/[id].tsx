import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BoardColumns from "../../components/project/BoardColumns";
import BoardHeader from "../../components/project/BoardHeader";
import { trpc } from "../../utils/trpc";

const ProjectPage = () => {
  const [ready, setReady] = useState(false);
  const id = useRouter().query.id as string;

  const {
    data: project,
    isLoading,
    status,
  } = trpc.project.getById.useQuery({ id }, { enabled: !!id });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  if (status === "error") {
    return <div> Something went wrong</div>;
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex h-screen flex-col p-10">
          <p>Whoops! Unable to find project</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="flex h-screen flex-col p-10">
        {/* Board header */}
        <BoardHeader name={project.name} />

        {/* Board columns */}
        {ready && <BoardColumns projectId={id} />}
      </div>
    </Layout>
  );
};

export default ProjectPage;
