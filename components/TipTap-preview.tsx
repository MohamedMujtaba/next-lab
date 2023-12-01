"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

interface TiptapProps {
  content: string;
}

export const TiptapPreview: React.FC<TiptapProps> = ({ content }) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure(),
      Superscript.configure(),
      Subscript.configure(),
    ],
    editorProps: {
      attributes: {
        class:
          "flex h-10 w-full rounded-md pointer-events-none bg-background px-3 py-2 text-sm",
      },
    },
    content: content,
  });

  return <EditorContent editor={editor} disabled={true} />;
};
