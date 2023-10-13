import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import s from './editable-span.module.css'

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  className?: string
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField value={title}
               color="secondary"
               variant="standard"
               onChange={changeTitle}
               autoFocus
               onBlur={activateViewMode}
               style={{width: '100%'}}
    />
  ) : (
    <span className={props.className} onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
