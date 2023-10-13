import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {todolistsThunks} from "features/todolists-lists/todolists/model/todolists.reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "common/components";
import {Todolist} from "./todolists/ui/todolist/todolist";
import {Navigate} from "react-router-dom";
import {useActions} from "common/hooks";
import {selectIsLoggedIn} from "features/auth/model/auth.selectors";
import {selectTasks} from "features/todolists-lists/tasks/model/tasks.selectors";
import {selectTodolists} from "features/todolists-lists/todolists/model/todolists.selectors";
import s from './todolists-list.module.css'
import {AddTaskPlus} from "../../assets/add-task-plus";

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        addTodolist: addTodolistThunk,
        fetchTodolists,
    } = useActions(todolistsThunks);


    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists();
    }, []);


    const addTodolist = useCallback((title: string) => {
       return addTodolistThunk(title).unwrap();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.textFieldContainer}>
                    <AddItemForm addItem={addTodolist}
                                 name={'Add todolist'}
                                 children={<AddTaskPlus/>}
                                 label={'Add todolist'}
                                 className={s.textField}
                    />
                </div>
                <div className={s.todolists}>
                    {todolists.map((tl) => {
                        let allTodolistTasks = tasks[tl.id];

                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} className={s.list}>
                                    <Todolist
                                        todolist={tl}
                                        tasks={allTodolistTasks}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </div>
            </div>

        </>
    );
};
