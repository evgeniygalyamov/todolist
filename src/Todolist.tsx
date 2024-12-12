import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {FilteredTasksType, TasksType} from "./App";
import {AddItemInput} from "./AddItemInput";

type TodolistType = {
    todolistID: string
    title: string
    tasks: TasksType[]
    filteredTasks: (todolistID: string, filterValue: FilteredTasksType) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeStatusTask: (todolistID: string, taskId: string, isDone: boolean) => void
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
}


export const Todolist = ({
                             todolistID,
                             title,
                             tasks,
                             filteredTasks,
                             removeTask,
                             changeStatusTask,
                             addTask,
                             removeTodolist,
                         }: TodolistType) => {


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
    const addTaskHandler = (newItem: string) => {
        if (newItem.trim()) {
            addTask(todolistID, newItem)
        }
}

        return (
            <div>
                <h3>{title}
                    <Button title={"x"} onClick={() => removeTodolist(todolistID)}/>
                </h3>
                <AddItemInput addItem={addTaskHandler}/>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button className={filterBtn === "all" ? "filteredBtn" : ""} onClick={() => filteredTaskAll("all")}
                            title={"All"}/>
                    <Button className={filterBtn === "active" ? "filteredBtn" : ""}
                            onClick={() => filteredTaskAll("active")} title={"Active"}/>
                    <Button className={filterBtn === "completed" ? "filteredBtn" : ""}
                            onClick={() => filteredTaskAll("completed")} title={"Completed"}/>
                </div>
            </div>
        )
    }