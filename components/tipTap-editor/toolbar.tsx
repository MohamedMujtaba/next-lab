"use client";

import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Columns,
  Heading1,
  Italic,
  List,
  PlusCircle,
  Quote,
  Rows,
  Sheet,
  StretchVertical,
  Subscript,
  Superscript,
  Table,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Toggle } from "../ui/toggle";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex items-center gap-2 border border-border p-1 rounded mb-4">
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        pressed={editor.isActive("heading", { level: 1 })}
      >
        <Heading1 className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive("bold")}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive("italic")}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        pressed={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        pressed={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        pressed={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editor.isActive("underline")}
      >
        <Underline className="w-4 h-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive("bulletList")}
      >
        <List className="w-4 h-4 text-red-500" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive("blockquote")}
      >
        <Quote className="w-4 h-4 text-red-500" />
      </Toggle>
      <Toggle>
        <Superscript className="w-4 h-4" />
      </Toggle>
      <Toggle>
        <Subscript className="w-4 h-4" />
      </Toggle>
      <TableMenu editor={editor} />
    </div>
  );
};

const TableMenu = ({ editor }: { editor: Editor }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <Sheet className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Insert Table
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Columns className="mr-2 h-4 w-4" />
            Columns
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnBefore().run()}
              >
                addColumnBefore
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnAfter().run()}
              >
                addColumnAfter
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteColumn().run()}
              >
                deleteColumn
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Rows className="mr-2 h-4 w-4" />
            row
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowBefore().run()}
              >
                addRowBefore
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowAfter().run()}
              >
                addRowAfter
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteRow().run()}
              >
                deleteRow
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          deleteTable
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().mergeCells().run()}
        >
          mergeCells
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().splitCell().run()}
        >
          splitCell
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().mergeOrSplit().run()}
        >
          mergeOrSplit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().setCellAttribute("colspan", 2).run()
          }
        >
          setCellAttribute
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editor.chain().focus().fixTables().run()}
        >
          fixTables
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

{
  /* <DropdownMenuSub>
  <DropdownMenuSubTrigger>
    <span>Invite users</span>
  </DropdownMenuSubTrigger>
  <DropdownMenuPortal>
    <DropdownMenuSubContent>
      <DropdownMenuItem>
        <span>Email</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Message</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <span>More...</span>
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</DropdownMenuSub>; */
}
