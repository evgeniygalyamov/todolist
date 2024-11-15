import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {FilteredTasksType, TasksType} from "./App";

type TodolistType = {
    todolistID: string
    title: string
    tasks: TasksType[]
    filteredTasks: (todolistID: string, filterValue: FilteredTasksType) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeStatusTask: (todolistID: string, taskId: string, isDone: boolean) => void
    addTask: (todolistID: string, title: string) => void
}


export const Todolist = ({todolistID, title, tasks, filteredTasks, removeTask, changeStatusTask, addTask}: TodolistType) => {

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
                        <Button onClick={() => removeTask(todolistID, t.id)} title={"x"}/>
                    </li>
                )
            }
        ) : <div>Todolist required</div>

    const filteredTaskAll = (filterValue: FilteredTasksType) => {
        filteredTasks(todolistID, filterValue)
        setFilterBtn(filterValue)
    }
    const changeStatusTaskHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatusTask(todolistID, taskId, e.currentTarget.checked)
    }
    const addTaskHandler = () => {
        if (newTask.trim()) {
            addTask(todolistID, newTask.trim())
            setNewTask("")
        } else {
            setError(true)
        }
    }
    const onKeyInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(todolistID, newTask)
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