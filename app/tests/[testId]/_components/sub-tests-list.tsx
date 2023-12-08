"use client";

import {
  Grip,
  MoreVertical,
  Pencil,
  PencilIcon,
  PlusCircle,
  Trash,
} from "lucide-react";
import { SubTest, SubTestNormal, SubTestOption, Test } from "@prisma/client";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubTest } from "@/hooks/use-sub-test";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";

interface SubTestsListProps {
  subTests: (SubTest & {
    options: SubTestOption[];
    normals: SubTestNormal[];
  })[];
}

const SubTestsList: React.FC<SubTestsListProps> = ({ subTests }) => {
  const { testId, setIsLoading, onOpen, setSubTest } = useSubTest(
    (state) => state
  );
  const [isDragging, setIsDragging] = useState(false);
  const [st, setSt] =
    useState<
      (SubTest & { options: SubTestOption[]; normals: SubTestNormal[] })[]
    >(subTests);
  useEffect(() => {
    setSt(subTests);
  }, [subTests]);
  const sensors = useSensors(
    useSensor(PointerSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );
  function handleDragStart() {
    setIsDragging(true);
  }

  const updateOrder = async (d: SubTest[]) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/tests/${testId}/subTests/order`, d);
      toast.success("New order applied");
    } catch (error) {
      toast.error("SomeThing went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (active.id !== over?.id) {
      setSt((sts) => {
        const oldIndex = sts.findIndex((t) => t.id === active.id);
        const newIndex = sts.findIndex((t) => t.id === over?.id);
        updateOrder(arrayMove(sts, oldIndex, newIndex));
        return arrayMove(sts, oldIndex, newIndex);
      });
    }
  }
  return (
    <div className="w-full p-4 space-y-2 max-h-[50vh] overflow-y-auto">
      {/* <DragOverlay modifiers={[restrictToParentElement]}>
        {isDragging ? <>hi</> : null}
      </DragOverlay> */}
      <DndContext
        onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* <DragOverlay modifiers={[restrictToParentElement]}> */}
        <SortableContext items={st} strategy={verticalListSortingStrategy}>
          {st.map((subTest) => (
            <SubTest
              key={subTest.id}
              subTest={subTest}
              isDragging={isDragging}
            />
          ))}
        </SortableContext>
        {/* </DragOverlay> */}
      </DndContext>
    </div>
  );
};

export default SubTestsList;

interface SupTestProps {
  subTest: SubTest & { options: SubTestOption[]; normals: SubTestNormal[] };
  isDragging: boolean;
}

const SubTest: React.FC<SupTestProps> = ({ subTest, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: subTest.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="bg-sky-500/20 w-full rounded-md  border-sky-500/40 border flex items-center  "
      ref={setNodeRef}
      style={style}
    >
      <div
        className={cn(
          "p-3 border-r border-sky-500/40  w-fit cursor-grab",
          attributes["aria-pressed"] && "cursor-grabbing"
        )}
        {...listeners}
        {...attributes}
      >
        <Grip />
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div>
          <p className="text-lg font-semibold">{subTest.name}</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Badge>{subTest.price}</Badge>
          <SubTestActionButton subTest={subTest} />
        </div>
      </div>
    </div>
  );
};

interface SubTestActionButtonProps {
  subTest: SubTest & { options: SubTestOption[]; normals: SubTestNormal[] };
}

const SubTestActionButton: React.FC<SubTestActionButtonProps> = ({
  subTest,
}) => {
  const { testId, setIsLoading, onOpen, setSubTest } = useSubTest(
    (state) => state
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant="ghost">
          <MoreVertical className="w-4 h-4 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={() => {
            setSubTest(subTest);
            onOpen();
          }}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:text-red-600 hover:bg-red-500/30 focus:text-red-600 focus:bg-red-500/30">
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
