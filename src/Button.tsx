import {ButtonHTMLAttributes, HTMLAttributes} from "react";



type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick, className}: ButtonType) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}