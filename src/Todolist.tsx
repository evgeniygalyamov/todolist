import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {FilteredTasksType} from "./App";

type TodolistType = {
    title: string
    tasks: TasksType[]
    filteredTasks: (filterValue: FilteredTasksType) => void
    removeTask: (taskId: string) => void
    changeStatusTask: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = ({title, tasks, filteredTasks, removeTask, changeStatusTask, addTask}: TodolistType) => {

    const [newTask, setNewTask] = useState("")
    const [error, setError] = useState(false)
    const [filterBtn, setFilterBtn] = useState("all")


    const tasksList = tasks.length
        ? tasks.map(t => {
                return (
                    <li key={t.id} className={t.isDone ? "isDone" : ""}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(e) => changeStatusTaskHandler(t.id, e)}/>
                        <span>{t.title}</span>
                        <Button onClick={() => removeTask(t.id)} title={"x"}/>
                    </li>
                )
            }
        ) : <div>Todolist required</div>

    const filteredTaskAll = (filterValue: FilteredTasksType) => {
        filteredTasks(filterValue)
        setFilterBtn(filterValue)
    }
    const changeStatusTaskHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatusTask(taskId, e.currentTarget.checked)
    }
    const addTaskHandler = () => {
        if (newTask.trim()) {
            addTask(newTask.trim())
            setNewTask("")
        } else {
            setError(true)
        }
    }
    const onKeyInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(newTask)
            setNewTask("")
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setNewTask(e.currentTarget.value)
            setError(false)
        }
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTask}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyInputHandler}
                       className={error ? "error" : ""}
                />
                <Button title={"+"} onClick={addTaskHandler}/>
                {error && <h4 className={"errorMessage"}>input is empty</h4>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button className={filterBtn === "all" ? "filteredBtn" : ""} onClick={() => filteredTaskAll("all")} title={"All"}/>
                <Button className={filterBtn === "active" ? "filteredBtn" : ""} onClick={() => filteredTaskAll("active")} title={"Active"}/>
                <Button className={filterBtn === "completed" ? "filteredBtn" : ""} onClick={() => filteredTaskAll("completed")} title={"Completed"}/>
            </div>
        </div>
    )
}