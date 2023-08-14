import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
const app = express();
import morgan from "morgan";

let taskList = [
<<<<<<< HEAD
  { id: nanoid(), type: "name", placeholder: "Enter your name" },
  { id: nanoid(), type: "email", placeholder: "Enter your Email" },
  { id: nanoid(), type: "number", placeholder: "Mobile number" },
  { id: nanoid(), type: "text", placeholder: "Enter your address" },
  { id: nanoid(), type: "date", placeholder: "Enter your address" },
  { id: nanoid(), type: "time", placeholder: "Enter your address" },
=======
  { id: nanoid(), title: "name", placeholder: "Enter your name" },
  { id: nanoid(), title: "email", placeholder: "Enter your Email" },
  { id: nanoid(), title: "number", placeholder: "Mobile number" },
  { id: nanoid(), title: "text", placeholder: "Enter your address" },
  { id: nanoid(), title: "date", placeholder: "Enter your address" },
  { id: nanoid(), title: "time", placeholder: "Enter your address" },
>>>>>>> f1fafbd889670d8dab7439490d87608bc836913f
];

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From Server...</h1>");
});

app.get("/api/tasks", (req, res) => {
  res.json({ taskList });
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ msg: "please provide title" });
    return;
  }
  const newTask = { id: nanoid(), title, isDone: false };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
});

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone };
    }
    return task;
  });

  res.json({ msg: "task updated" });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  taskList = taskList.filter((task) => task.id !== id);

  res.json({ msg: "task removed" });
});

app.use((req, res) => res.status(404).send("Route does not exist"));

const port = process.env.PORT || 5000;

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();