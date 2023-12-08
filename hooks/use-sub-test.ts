import { create } from "zustand";
import { Prisma, SubTest, SubTestNormal, SubTestOption } from "@prisma/client";

interface SubTestState {
  testId: string;
  setTestId: (testId: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  subTests: (SubTest & { options: SubTestOption[] })[];
  setSubTests: (subTests: (SubTest & { options: SubTestOption[] })[]) => void;
  subTest:
    | (SubTest & { options: SubTestOption[]; normals: SubTestNormal[] })
    | undefined;
  setSubTest: (
    subTest: SubTest & { options: SubTestOption[]; normals: SubTestNormal[] }
  ) => void;
  resetSubTest: () => void;
}

export const useSubTest = create<SubTestState>()((set) => ({
  testId: "",
  isOpen: false,

  isLoading: false,
  subTests: [],
  subTest: undefined,
  setSubTests: (subTests) => set({ subTests }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTestId: (testId) => set({ testId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, subTest: undefined }),
  setSubTest: (subTest) => set({ subTest }),
  resetSubTest: () => set({ subTest: undefined }),
}));
