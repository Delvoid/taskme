import { trpc } from "../../utils/trpc";
import CardItem from "../CardItem";

type Props = {
  status: "To-do" | "Doing" | "Done" | "Backlog";
  projectId: string;
};

const TaskItems = ({ status, projectId }: Props) => {
  const { data: tasks, isLoading } =
    trpc.task.getAllByProjectAndStatus.useQuery({
      projectId: projectId,
      status: status,
    });

  if (isLoading) {
    return null;
  }

  return (
    <>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((item, iIndex) => {
          return (
            <CardItem key={`${item.id}-${iIndex}`} data={item} index={iIndex} />
          );
        })}
    </>
  );
};

export default TaskItems;
