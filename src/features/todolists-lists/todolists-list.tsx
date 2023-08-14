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
            <Grid container className={s.container}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper className={s.list}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};