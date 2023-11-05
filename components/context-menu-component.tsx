"use client";

import { Quill } from "react-quill";
import { type Editor } from "@tiptap/react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Toggle } from "./ui/toggle";
import { Subscript, Superscript } from "lucide-react";

interface ContextMenuComponentProps {
  children: React.ReactNode;
  editor: Editor | null;
  disabled?: boolean;
}

export const ContextMenuComponent: React.FC<ContextMenuComponentProps> = ({
  children,
  editor,
  disabled = false,
}) => {
  if (!editor) null;
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger className="w-full" disabled={disabled}>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuCheckboxItem
            checked={editor?.isActive("superscript")}
            onCheckedChange={() => {
              editor?.chain().focus().toggleSuperscript().run();
            }}
          >
            <Superscript className="w-4 h-4 mr-2" />
            SuperScript
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={editor?.isActive("subscript")}
            onCheckedChange={() => {
              editor?.chain().focus().toggleSubscript().run();
            }}
          >
            <Subscript className="w-4 h-4 mr-2" />
            Subscript
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};
