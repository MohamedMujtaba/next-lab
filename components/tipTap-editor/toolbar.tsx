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
  Columns,
  PlusCircle,
  Rows,
  StretchVertical,
  Table,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div>
      <TableMenu editor={editor} />
    </div>
  );
};

const TableMenu = ({ editor }: { editor: Editor }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Table />
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
