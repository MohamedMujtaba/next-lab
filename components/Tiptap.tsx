"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { ContextMenuComponent } from "./context-menu-component";
import { Toggle } from "./ui/toggle";

interface TiptapProps {
  content: string;
  onChange: (richText: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const Tiptap: React.FC<TiptapProps> = ({
  content,
  onChange,
  disabled = false,
  placeholder = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Superscript.configure(),
      Subscript.configure(),
    ],
    editorProps: {
      attributes: {
        class:
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <ContextMenuComponent editor={editor} disabled={disabled}>
      <EditorContent
        editor={editor}
        disabled={disabled}
        placeholder={placeholder}
      />
    </ContextMenuComponent>
  );
};

export default Tiptap;
