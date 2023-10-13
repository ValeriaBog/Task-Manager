import React, {FC} from 'react';
import {EditableSpan} from "../../../../../../common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../../../../common/hooks";
import {TodolistDomainType, todolistsThunks} from "../../../model/todolists.reducer";
import s from './todolist-title.module.css'
import {DeleteTodolist} from "../../../../../../assets/delete-todolist";

type Props = {
    todolist: TodolistDomainType;

};
export const TodolistTitle: FC<Props> = ({todolist}) => {

    const {changeTodolistTitle, removeTodolist,} = useActions(todolistsThunks)

    const removeTodolistCallBack = () => {
        removeTodolist(todolist.id);
    };

    const changeTodolistTitleCallBack = (title: string) => {
        changeTodolistTitle({id: todolist.id, title});
    }

    return (
        <>
            <h3 className={s.container}>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallBack} className={s.title}/>
                <IconButton onClick={removeTodolistCallBack} disabled={todolist.entityStatus === "loading"}>
                    <DeleteTodolist/>
                </IconButton>
            </h3>
        </>
    );
};

