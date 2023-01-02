import { PrismaClient } from "@prisma/client";
import { generateProjects } from "./seeds/projects";
import { generateTasksForProjects } from "./seeds/tasks";
const prisma = new PrismaClient();

import { users } from "./seeds/users";

async function main() {
  try {
    await prisma.user.create({
      data: {
        name: "Delvoid",
        email: "delvoid.dev@gmail.com",
        accounts: {
          connectOrCreate: [
            {
              where: {
                provider_providerAccountId: {
                  provider: "discord",
                  providerAccountId: "143743130666139648",
                },
              },
              create: {
                type: "oauth",
                provider: "discord",
                providerAccountId: "143743130666139648",
              },
            },
          ],
        },
      },
    });
    // add user
    // await prisma.user.createMany({
    //   data: users,
    // });
    const user = await prisma.user.findFirst({ where: { name: "Delvoid" } });
    if (!user) return;

    // add projcets
    const projects = generateProjects(user, 5);
    await prisma.project.createMany({
      data: projects,
    });
    // add tasks to porjcets
    const newProjects = await prisma.project.findMany({});
    if (!newProjects) return;
    const tasks = generateTasksForProjects(user, newProjects);

    await prisma.task.createMany({
      data: tasks,
    });
  } catch (error) {
    console.log("Seed fail", error);
    throw new Error("Seed failed");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
