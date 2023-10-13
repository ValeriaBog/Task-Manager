import React, {ChangeEvent, FC, KeyboardEvent, memo, ReactNode, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {RejectValueType} from "../../utils/create-app-async-thunk";
import {AddTask} from "../../../assets/add-task";
import {CloseAddItem} from "../../../assets/close-add-item";
import s from './add-item-form.module.css'

type Props = {
    addItem: (title: string) => Promise<any>;
    disabled?: boolean;
    label?: string
    name?: string
    children?: ReactNode
    className?: string
};

export const AddItemForm: FC<Props> = memo(({addItem,
                                                disabled = false,
                                                label = 'Title',
                                                name = 'Added',
                                                children,
                                                className
}: Props) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    let [editMode, setEditMode] = useState(false);


    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title)
                .then(() => {
                    setTitle("");
                })
                .catch((err: RejectValueType) => {
                    if (err.data) {
                        const messages = err.data.messages
                        setError(messages.length ? messages[0] : 'Some error occurred')
                    }
                });

        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    };
    const activateViewMode = () => {
        setEditMode(false);
        //props.onChange(title);
    };

    const activateEditMode = () => {
        setEditMode(true);
        //setTitle(props.value);
    };

    return (
        <div>
            {editMode ?
                <div className={s.field}>
                    <TextField
                        color="secondary"
                        variant="standard"
                        disabled={disabled}
                        error={!!error}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        label={label}
                        helperText={error}
                        autoFocus
                        className={className}
                    />
                    <div className={s.buttons}>
                        <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{padding: 0}}>
                            <AddTask/>
                        </IconButton>
                        <IconButton color="secondary" onClick={activateViewMode} disabled={disabled} style={{padding: 0}}>
                            <CloseAddItem/>
                        </IconButton>
                    </div>
                </div> :
                <span className={s.name} onDoubleClick={activateEditMode}>{children}{name}</span>}

        </div>
    );
});
