import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {CircularProgress, Container} from "@mui/material";
import { Login } from "features/auth/ui/login/login";
import "./app.module.css";
import { TodolistsList } from "features/todolists-lists/todolists-list";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import {Header} from "./header/header";
import {Routing} from "./routing/routing";

export const App = () => {

  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);


  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <Header/>
        <Routing/>
      </div>
    </BrowserRouter>
  );
}


