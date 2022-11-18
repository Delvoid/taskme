import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const taskRouter = router({
  getAllByProjectAndStatus: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        status: z.enum(["To-do", "Doing", "Done", "Backlog"]),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.task.findMany({
          where: { project_id: input.projectId, status: input.status },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
