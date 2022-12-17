import { faker } from "@faker-js/faker";
import type { Project } from "@prisma/client";
import type { User } from "next-auth";
import { randomNumber } from "../../src/utils/helpers";

type GenTask = {
  title: string;
  description: string;
  status: string;
  project_id: string;
  user_id: string;
  position: number;
};

const statusList = ["To-do", "Doing", "Done", "Backlog"] as const;
type Status = typeof statusList[number];

const statusMap: Record<Status, number> = {
  "To-do": 0,
  Doing: 0,
  Done: 0,
  Backlog: 0,
};

export const generateTasksForProjects = (
  user: User,
  projects: Project[],
  amount?: number
): GenTask[] => {
  const tasks: GenTask[] = [];
  for (const project of projects) {
    const size = amount || randomNumber(10, 40);

    for (let i = 0; i < size; i++) {
      const taskStatus = statusList[
        randomNumber(0, statusList.length)
      ] as Status;
      tasks.push({
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        status: taskStatus as string,
        project_id: project.id,
        user_id: user.id,
        position: statusMap[taskStatus],
      });
      statusMap[taskStatus] += 1;
    }
  }
  return tasks;
};
