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
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";

export const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
        HTMLAttributes: {
          class: "not-prose",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "not-prose",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "not-prose",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "not-prose",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      ListItem,
      Bold,
      Heading.configure({}),
    ],
    editorProps: {
      attributes: {
        class:
          "max-w-none  prose dark:prose-invert prose-sm  min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="w-full overflow-x-auto p-1  ">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
