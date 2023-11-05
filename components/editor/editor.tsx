"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

import "./styles.css";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-background w-full">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        defaultValue={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
