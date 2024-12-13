import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    addNewTitle: (newTitle: string)=> void
}


export const EditableSpan = ({title, addNewTitle}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onEditMode = () => {
        setEditMode(true);
    }
    const offEditMode = () => {
        setEditMode(false)
        addNewTitle(newTitle)
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={newTitle}
                     onBlur={offEditMode}
                     autoFocus
                     onChange={onChangeInput}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}