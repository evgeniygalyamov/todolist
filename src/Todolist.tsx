import React, {ChangeEvent, useState} from "react";
import {FilteredTasksType, TasksType} from "./App";
import {AddItemInput} from "./AddItemInput";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Stack, Checkbox, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


type TodolistType = {
    todolistID: string
    title: string
    tasks: TasksType[]
    filteredTasks: (todolistID: string, filterValue: FilteredTasksType) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeStatusTask: (todolistID: string, taskId: string, isDone: boolean) => void
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
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
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistType) => {


    const [filterBtn, setFilterBtn] = useState("all")


    const tasksList = tasks.length
        ? tasks.map(t => {
                return (
                    <ListItem
                        disablePadding
                        key={t.id}
                        className={t.isDone ? "isDone" : ""}
                        secondaryAction={
                            <IconButton
                                size={"small"}
                                onClick={() => removeTask(todolistID, t.id)}
                                aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        }>
                        <Checkbox
                            color={"warning"}
                            checked={t.isDone}
                            onChange={(e) => changeStatusTaskHandler(t.id, e)}
                            icon={<BookmarkBorderIcon/>}
                            checkedIcon={<BookmarkIcon/>}
                        />
                        <EditableSpan title={t.title}
                                      addNewTitle={(newTitle) => changeTaskTitle(todolistID, t.id, newTitle)}/>
                    </ListItem>
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
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} addNewTitle={changeTodolistTitleHandler}/>
                <IconButton
                    onClick={() => removeTodolist(todolistID)}
                    aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemInput addItem={addTaskHandler}/>
            <List>
                {tasksList}
            </List>
            <Stack direction="row" spacing={0.6}>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={filterBtn === "all" ? "warning" : "primary"}
                    onClick={() => filteredTaskAll("all")}
                >All</Button>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={filterBtn === "active" ? "warning" : "primary"}
                    onClick={() => filteredTaskAll("active")}
                >Active</Button>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={filterBtn === "completed" ? "warning" : "primary"}
                    onClick={() => filteredTaskAll("completed")}
                >Completed</Button>
            </Stack>
        </div>
    )
}