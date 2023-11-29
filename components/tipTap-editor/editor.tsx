"use client";

import "./styles.css";

import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import { Toolbar } from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
export const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Superscript.configure(),
      Subscript.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="w-full overflow-x-auto p-1">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
