import React, { FC } from 'react';
import {TaskStatuses} from "../../../../../../common/enums";
import {TaskType} from "../../../../tasks/api/tasks.api.types";
import {TodolistDomainType} from "../../../model/todolists.reducer";
import {Task} from "./task/task";
import s from './tasks.module.css'

type Props = {
    tasks: TaskType[];
    todolist: TodolistDomainType;
}

export const Tasks: FC<Props> = ({tasks, todolist}) => {

    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div className={tasksForTodolist.length !==0 ? s.container : ''}>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}
                />
            ))}
        </div>
    );
};

