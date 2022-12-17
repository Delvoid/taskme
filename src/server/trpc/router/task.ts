import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";
const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.string(),
  tags: z.array(z.string()),
  project_id: z.string().optional(),
  position: z.number(),
  user_id: z.string(),
});
const TaskSchemaInput = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  tags: z.array(z.string()).optional(),
});
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

          orderBy: {
            position: "asc",
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  moveTask: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        status: z.enum(["To-do", "Doing", "Done", "Backlog"]),
        position: z.number(),
        oldPosition: z.number(),
        prevStatus: z.enum(["To-do", "Doing", "Done", "Backlog"]),
        newTasks: z.array(TaskSchema),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updateTaskPositions = input.newTasks.map((task) =>
          ctx.prisma.task.update({
            where: { id: task.id },
            data: { position: task.position },
          })
        );

        const moveTask = ctx.prisma.task.update({
          where: { id: input.taskId },
          data: { status: input.status, position: input.position },
        });
        const updateTasks = await ctx.prisma.$transaction([
          ...updateTaskPositions,
          moveTask,
        ]);

        return { movedTo: input.status, prevStatus: input.prevStatus };
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getById: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.task.findUnique({
          where: { id: input.taskId },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        status: z.enum(["To-do", "Doing", "Done", "Backlog"]),
        task: TaskSchemaInput,
        taskCount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newTask = ctx.prisma.task.create({
          data: {
            ...input.task,
            user: { connect: { id: "clb9j9zv10000rrjoex4csn95" } },
            project: { connect: { id: input.projectId } },
            position: input.taskCount,
          },
        });

        return newTask;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  deleteById: publicProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.task.delete({ where: { id: input.taskId } });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }

        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
