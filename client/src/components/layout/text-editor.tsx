import React, { JSXElementConstructor, ReactElement, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";

type Props = {
  updateTask : (task: { body: string }) => void;
  editorState: EditorState;
  setEditorState?: (editorState: EditorState) => void;
  placeholder?: string;
  toolbarOptions?: object;
  wrapperStyle?: object;
  editorStyle?: object;
  toolbarStyle?: object;
  toolbarCustomButtons?: ReactElement<HTMLElement, string | JSXElementConstructor<any>>[];
  children?: React.ReactNode;
}

export default function TextEditor({
  updateTask,
  editorState,
  setEditorState,
  toolbarOptions,
  toolbarStyle,
  editorStyle,
  wrapperStyle,
  toolbarCustomButtons,
  placeholder }: Props) {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbarCustomButtons={toolbarCustomButtons ? toolbarCustomButtons : []}
      placeholder={placeholder}
      onBlur={() =>
        updateTask({
          body: editorState.getCurrentContent().getPlainText(),
        })
      }
      toolbar={toolbarOptions}
      wrapperStyle={wrapperStyle}
      editorStyle={editorStyle}
      toolbarStyle={toolbarStyle}
    />
  )
}