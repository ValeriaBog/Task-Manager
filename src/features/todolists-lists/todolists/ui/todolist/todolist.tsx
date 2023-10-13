import React, {FC, memo, useEffect} from "react";
import {
    TodolistDomainType
} from "features/todolists-lists/todolists/model/todolists.reducer";
import {tasksThunks} from "features/todolists-lists/tasks/model/tasks.reducer";
import {useActions} from "common/hooks";
import {AddItemForm} from "common/components";
import {TaskType} from "../../../tasks/api/tasks.api.types";
import s from './todolist.module.css'
import {FilterTasksButtons} from "./filter-tasks-buttons/filter-tasks-buttons";
import {Tasks} from "./tasks/tasks";
import {TodolistTitle} from "./todolist-title/todolist-title";
import {AddTaskPlus} from "../../../../../assets/add-task-plus";


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
        return addTask({title, todolistId: todolist.id}).unwrap();
    }


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <div>
                <Tasks tasks={tasks} todolist={todolist}/>
            </div>
            <AddItemForm addItem={addTaskCallBack}
                         disabled={todolist.entityStatus === "loading"}
                         label={'Add task'}
                         name={'Add task '}
                         children={<AddTaskPlus/>}
                         className={s.textField}
            />
            <div className={s.button}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    )
        ;
});
