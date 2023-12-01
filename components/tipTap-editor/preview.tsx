"use client";

import "./styles.css";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Toolbar } from "./toolbar";

interface TiptapProps {
  content: string;
}

export const TipTapMainPreview: React.FC<TiptapProps> = ({ content }) => {
  const editor = useEditor({
    editable: false,
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
        class: "max-w-none  prose dark:prose-invert prose-sm  ",
      },
    },
    content: content,
  });

  return (
    <div className="w-full overflow-x-auto  ">
      <EditorContent editor={editor} />
    </div>
  );
};
