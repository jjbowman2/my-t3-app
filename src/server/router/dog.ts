import { createRouter } from "./context";
import { z } from "zod";

export const dogRouter = createRouter()
	.query("getAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.dog.findMany();
		},
	})
	.query("byId", {
		input: z.string(),
		async resolve({ input, ctx }) {
			return await ctx.prisma.dog.findFirst({ where: { id: input } });
		},
	})
	.mutation("createDog", {
		input: z.object({
			name: z.string(),
			breed: z.string(),
			age: z.number().gte(0),
		}),
		async resolve(req) {
			return await req.ctx.prisma.dog.create({ data: req.input });
		},
	})
	.mutation("editDog", {
		input: z.object({
			id: z.string(),
			name: z.string(),
			breed: z.string(),
			age: z.number().gte(0),
		}),
		async resolve(req) {
			return await req.ctx.prisma.dog.update({
				where: { id: req.input.id },
				data: req.input,
			});
		},
	})
	.mutation("removeDog", {
		input: z.string(),
		async resolve(req) {
			return await req.ctx.prisma.dog.delete({
				where: { id: req.input },
			});
		},
	});
