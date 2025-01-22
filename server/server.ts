import express from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

const t = initTRPC.create(); // トランスポートレイヤーを作成
const router = t.router; // ルーターを作成
const publicProcedure = t.procedure; // パブリックプロシージャーを作成

const appRouter = router({
  test: publicProcedure.query(() => {
    return "Hello TRPC";
  }),
});
// http://localhost:5000/trpc/test でアクセスできる
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(PORT);

// publicProcedure.query(() => "Hello World"); // query : 値の取得 GET
// publicProcedure.mutation(() => "Hello World"); // mutation : 値の操作 POST UPDATE DELETE
