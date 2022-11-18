import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const projectRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const projects = await ctx.prisma.project.findMany();
      return projects;
    } catch (error) {
      return [];
    }
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log({ input });
      try {
        return await ctx.prisma.project.findUnique({ where: { id: input.id } });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        return null;
      }
    }),
});
