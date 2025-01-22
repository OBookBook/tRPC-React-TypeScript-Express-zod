import cors from "cors";
import { z } from "zod";
import express from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

interface Todo {
  id: number;
  content: string;
}

const todoList: Todo[] = [
  {
    id: 1,
    content: "test",
  },
  {
    id: 2,
    content: "test2",
  },
];

const app = express();
app.use(cors());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

const t = initTRPC.create(); // トランスポートレイヤーを作成
const router = t.router; // ルーターを作成
const publicProcedure = t.procedure; // パブリックプロシージャーを作成

const appRouter = router({
  // http://localhost:5000/trpc/test でアクセス可能
  test: publicProcedure.query(() => {
    return "Hello TRPC";
  }),
  // http://localhost:5000/trpc/getTodoList でアクセス可能
  getTodoList: publicProcedure.query(() => {
    return todoList;
  }),
  addTodo: publicProcedure.input(z.string()).mutation((req) => {
    const id = `${Math.random()}`;
    const todo: Todo = {
      id: Number(id),
      content: req.input,
    };
    todoList.push(todo);

    return todoList;
  }),
});
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(PORT);

export type AppRouter = typeof appRouter; // 型をエクスポート

// publicProcedure.query(() => "Hello World"); // query : 値の取得 GET
// publicProcedure.mutation(() => "Hello World"); // mutation : 値の操作 POST UPDATE DELETE
