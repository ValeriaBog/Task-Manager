import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useActions} from "../../../../../../common/hooks";
import {FilterValuesType, TodolistDomainType, todolistsActions} from "../../../model/todolists.reducer";
import s from './filter-tasks-buttons.module.css'

type Props = {
    todolist: TodolistDomainType
}
export const FilterTasksButtons: FC<Props> = ({todolist}) => {

    const { changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: todolist.id})
    }


    return (
        <div className={s.buttons}>
            <Button
                variant={todolist.filter === "all" ? "contained" : "text"}
                onClick={()=>{changeFilterHandler("all")}}
                color={"secondary"}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "contained" : "text"}
                onClick={()=>{changeFilterHandler("active")}}
                color={"secondary"}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "contained" : "text"}
                onClick={()=>{changeFilterHandler("completed")}}
                color={"secondary"}
            >
                Completed
            </Button>
        </div>
    );
};

