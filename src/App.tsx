import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredTasksType = "all" | "active" | "completed"

function App() {

    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
    ])

    const [filter, setFilter] = useState<FilteredTasksType>("all")

    let currentTasks = tasks
    if (filter === "active") {
        currentTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        currentTasks = tasks.filter(t => t.isDone)
    }

    const filteredTasks = (filterValue: FilteredTasksType) => {
        setFilter(filterValue)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeStatusTask = (taskId: string, isDone: boolean) => {
        setTasks([...tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)])
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={currentTasks}
                filteredTasks={filteredTasks}
                removeTask={removeTask}
                changeStatusTask={changeStatusTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
