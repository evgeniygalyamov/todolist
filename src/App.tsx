import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemInput} from "./AddItemInput";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilteredTasksType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilteredTasksType
}

type TasksStateType = {
    [todolistID: string]: TasksType[]
}


function App() {


    const todolistID_1 = v1()
    const todolistID_2 = v1()


    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Popcorn", isDone: true},
            {id: v1(), title: "Bear", isDone: false},
        ],
    })


    // Tasks

    const filteredTasks = (todolistID: string, filterValue: FilteredTasksType) => {
        const NextState: TodolistType[] = todolists.map(tl => tl.id === todolistID ? {...tl, filter: filterValue} : tl)
        setTodolists(NextState)
    }
    const addTask = (todolistID: string, title: string) => {

        const newTask = {id: v1(), title: title, isDone: false}

        setTasks({
            ...tasks, [todolistID]: [newTask, ...tasks[todolistID]],
        })
    }
    const removeTask = (todolistID: string, taskId: string) => {
        const nextState: TasksStateType = {...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)}
        setTasks(nextState)
    }
    const changeStatusTask = (todolistID: string, taskId: string, isDone: boolean) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)
        }
        setTasks(nextState)
    }

    const changeTaskTitle = (todolistID: string, taskId: string, title: string) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title} : t)
        }
        setTasks(nextState)
    }

    // Todolist

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {id: todolistID, title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        const NextState: TodolistType[] = todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl)
        setTodolists(NextState)
    }


    const todolistComponents = todolists.map(t => {

        let currentTasks = tasks[t.id]
        if (t.filter === "active") {
            currentTasks = currentTasks.filter(t => !t.isDone)
        }
        if (t.filter === "completed") {
            currentTasks = currentTasks.filter(t => t.isDone)
        }

        return (
            <Todolist
                key={t.id}
                todolistID={t.id}
                title={t.title}
                tasks={currentTasks}
                filteredTasks={filteredTasks}
                removeTask={removeTask}
                changeStatusTask={changeStatusTask}
                addTask={addTask}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle }

            />
        )
    })

    return (
        <div className="App">
            <AddItemInput addItem={addTodolist}/>
            {todolistComponents}
        </div>
    );
}

export default App;
