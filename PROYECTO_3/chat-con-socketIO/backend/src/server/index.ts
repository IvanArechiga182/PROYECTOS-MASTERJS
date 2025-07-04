import express from "express";
import { Server } from "socket.io";
import http from "http";
import router from "../routes/indexRoutes";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const mensajes: string[] = [];
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const PORT = process.env.PORT || 4001;

io.on("connection", (socket) => {
  console.log(`El nodo con IP ${socket.id} se ha conectado...`);

  socket.emit("historial", mensajes);

  socket.on("mensaje", (data) => {
    mensajes.push(data.texto);
    console.log(mensajes);

    io.emit("mensaje", data);
  });
});

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
