import { io, Socket } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import "./App.css";
const SOCKET_SERVER_URL = "http://localhost:4001";

type Mensaje = {
  nombre: string;
  texto: string;
};

function Chat() {
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem("username") || "";
  });
  const [isUserSet, setIsUserSet] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("connect", () => {
      console.log("Conectado al servidor con ID:", socketRef.current?.id);
    });

    socketRef.current.on("historial", (msgs: Mensaje[]) => {
      setMessages(msgs);
    });

    socketRef.current.on("mensaje", (msg: Mensaje) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const enviarMensaje = () => {
    if (input.trim() !== "") {
      socketRef.current?.emit("mensaje", {
        nombre: username,
        texto: input,
      });
      setIsUserSet(true);
      setInput("");
    }
  };

  const handleSetUsername = (usrname: string) => {
    setUsername(usrname);
    sessionStorage.setItem("username", usrname);
  };

  return (
    <div className="chat-container">
      <h2>Chat con Socket.IO y React</h2>
      <ul className="messages-container">
        {messages.map((m, i) =>
          m.nombre && m.texto ? (
            <li key={i} className="message-box">
              <strong>{m.nombre}:</strong> {m.texto}
            </li>
          ) : null
        )}
        <div ref={messagesEndRef} />
      </ul>
      <div className="inputs">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de usuario"
          className={`input-username ${isUserSet ? "setted" : "unsetted"}`}
          onChange={(e) => handleSetUsername(e.target.value)}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
