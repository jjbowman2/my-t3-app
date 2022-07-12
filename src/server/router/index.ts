// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { dogRouter } from "./dog";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge("example.", exampleRouter)
	.merge("dog.", dogRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
