import React from 'react';
import {
    AppBar,createTheme,
    CssBaseline,
    IconButton,
    LinearProgress,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../features/auth/model/auth.selectors";
import {selectAppStatus} from "../app.selectors";
import {useActions} from "../../common/hooks";
import {authThunks} from "../../features/auth/model/auth.slice";
import {Logo} from "../../assets/logo";
import s from './header.module.css'
import {Exit} from "../../assets/exit";

export const Header = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectAppStatus);
    const { logout } = useActions(authThunks);
    const logoutHandler = () => logout();

    const theme = createTheme({
        typography: {
            fontFamily: "Roboto",
            fontSize: 20,
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <AppBar position="static" color={'default'}>
                <Toolbar className={s.container}>
                    <div className={s.logo}>
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <Logo/>
                        </IconButton>
                        <Typography variant="h6" style={{ fontFamily: "Roboto, sans-serif", color: '#09244B'}}>TRELLO</Typography>
                    </div>

                    {isLoggedIn && (
                        <IconButton edge="end" color="inherit" aria-label="menu" onClick={logoutHandler}>
                            <Exit/>
                        </IconButton>
                        // <Button color="inherit" onClick={logoutHandler} className={s.buttonLogOut}>
                        //     Log out
                        // </Button>
                    )}
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            </ThemeProvider>
        </>
    );
};

