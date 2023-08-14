import React, {FC, memo, useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "./tasks/task/task";
import {
    TodolistDomainType, todolistsActions,
    todolistsThunks
} from "features/todolists-lists/todolists/model/todolists.reducer";
import {tasksThunks} from "features/todolists-lists/tasks/model/tasks.reducer";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "../../../tasks/api/tasks.api.types";
import s from './todolist.module.css'
import {FilterTasksButtons} from "./filter-tasks-buttons/filter-tasks-buttons";
import {Tasks} from "./tasks/tasks";
import {TodolistsList} from "../../../todolists-list";
import {TodolistTitle} from "./todolist-title/todolist-title";


type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];

};

export const Todolist: FC<Props> = memo(({todolist, tasks}) => {
    const {fetchTasks, addTask} = useActions(tasksThunks);


    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallBack = (title: string) => {
       return  addTask({title, todolistId: todolist.id}).unwrap();
    }


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"}/>
            <div>
                <Tasks tasks={tasks} todolist={todolist}/>
            </div>
            <div className={s.button}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});
