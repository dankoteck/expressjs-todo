import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import authRoute from "./routes/auth";
import todoRoute from "./routes/todo";
import userRoute from "./routes/users";

const app = express();
const currentVersion = "v1";

dotenv.config();

// Middlewares
app.use(morgan("dev"));
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes
app.use(`/api/${currentVersion}/users`, userRoute);
app.use(`/api/${currentVersion}/auth`, authRoute);
app.use(`/api/${currentVersion}/todo`, todoRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening server on port: ${PORT}`);
});

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "PORT " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

app.on("error", onError);
