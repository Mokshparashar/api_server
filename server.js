import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
const app = express();
import morgan from "morgan";

let taskList = [
  {
    id: nanoid(),

    type: "text",
    name: "first_name",
    placeholder: "First name",
  },
  {
    id: nanoid(),

    type: "text",
    name: "second_name",
    placeholder: "Second name",
  },
  {
    id: nanoid(),

    type: "email",
    name: "email",
    placeholder: "Your Email",
  },
  {
    id: nanoid(),

    type: "number",
    name: "number",
    placeholder: "Your Mobile number",
  },
  {
    id: nanoid(),

    type: "text",
    name: "address",
    placeholder: "Your address",
  },
];

let taskList_2 = [
  {
    id: nanoid(),
    tag: "select",
    name: "country",
    options: [
      { id: nanoid(), country: "--SELECT YOUR COUNTRY--" },
      { id: nanoid(), country: "USA" },
      { id: nanoid(), country: "India" },
      { id: nanoid(), country: "Russia" },
      { id: nanoid(), country: "China" },
      { id: nanoid(), country: "Japan" },
      { id: nanoid(), country: "UK" },
      { id: nanoid(), country: "France" },
      { id: nanoid(), country: "Saudi arabia" },
      { id: nanoid(), country: "UAE" },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello From API Server...</h1>");
});

app.get("/api/tasks", (req, res) => {
  res.json({ taskList });
});
app.get("/api/tasks2", (req, res) => {
  res.json({ taskList_2 });
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
