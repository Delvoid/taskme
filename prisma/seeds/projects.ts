import { faker } from "@faker-js/faker";
import type { User } from "next-auth";

export const generateProjects = (
  user: User,
  amount: number
): { owner_id: string; name: string; description: string }[] => {
  return Array.from({ length: amount }).map(() => ({
    owner_id: user.id,
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(5),
  }));
};
