import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemInputType = {
    addItem: (title: string) => void

}


export const AddItemInput = ({addItem}: AddItemInputType)=> {

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
        <div>
            <input value={newItem}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyInputHandler}
                   className={error ? "error" : ""}
            />
            <Button title={"+"} onClick={addItemHandler}/>
            {error && <h4 className={"errorMessage"}>input is empty</h4>}
        </div>
    )
}