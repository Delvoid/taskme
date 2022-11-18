import { faker } from "@faker-js/faker";
import type { Project } from "@prisma/client";
import type { User } from "next-auth";

type GenTask = {
  title: string;
  description: string;
  status: string;
  project_id: string;
  user_id: string;
};

export const generateTasksForProjects = (
  user: User,
  projects: Project[],
  amount: number
): GenTask[] => {
  const tasks: GenTask[] = [];
  for (const project of projects) {
    tasks.push(
      ...Array.from({ length: amount }).map(() => ({
        title: faker.lorem.words(),
        description: faker.lorem.sentences(),
        status: "to do",
        project_id: project.id,
        user_id: user.id,
      }))
    );
  }
  return tasks;
};
