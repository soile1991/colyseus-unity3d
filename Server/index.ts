import http from "http";
import express from "express";
import cors from "cors";

import {Server} from "colyseus";
import {ArrayTestRoom} from "./rooms/ArrayTestRoom";

const PORT = Number(process.env.PORT || 2567);

const app = express();

/**
 * CORS should be used during development only.
 * Please remove CORS on production, unless you're hosting the server and client on different domains.
 */
app.use(cors());

const gameServer = new Server({
  server: http.createServer(app),
  pingInterval: 0,
});

// Register DemoRoom as "demo"
gameServer.define("arrayTest", ArrayTestRoom);

// Listen on specified PORT number
gameServer.listen(PORT);

console.log("Running on ws://localhost:" + PORT);
