import Button from '@mui/material/Button';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {TextField} from "@mui/material";


type AddItemInputType = {
    addItem: (title: string) => void

}


export const AddItemInput = ({addItem}: AddItemInputType) => {

    const [newItem, setNewItem] = useState("")
    const [error, setError] = useState(false)

    const addItemHandler = () => {
        if (newItem.trim()) {
            addItem(newItem.trim())
            setNewItem("")
        } else {
            setError(true)
        }
    }
    const onKeyInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem(newItem.trim())
            setNewItem("")
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setNewItem(e.currentTarget.value)
            setError(false)
        }
    }

    return (
        <div className={"add-form"}>
            <TextField
                variant="outlined"
                size="small"
                value={newItem}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyInputHandler}
                className={error ? "error" : ""}
                error={!!error}
            />
            <Button
                variant="contained"
                size="large"
                disableElevation
                onClick={addItemHandler}
                endIcon={<AddBoxIcon/>}
            >ADD
            </Button>
            {error && <h4 className={"errorMessage"}>input is empty</h4>}
        </div>
    )
}