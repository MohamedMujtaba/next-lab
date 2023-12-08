// import { TestType } from "@/app/tests/_components/columns";
// import { create } from "zustand";

// interface UseBillStore {
//   tests: TestType[];
//   addTest: (test: TestType) => void;
//   removeTest: (testId: string) => void;
//   switchSubTest: (testId: string, subTestId: string) => void;
// }

// export const useBill = create<UseBillStore>()((set) => ({
//   tests: [],
//   addTest: (test) =>
//     set((state) => {
//       const isAlready = state.tests.find((t) => t.id === test.id);
//       if (!isAlready) {
//         return { tests: [...state.tests, test] };
//       }
//       return { tests: state.tests };
//     }),
//   removeTest: (testId) =>
//     set((state) => {
//       const arr = state.tests.filter((t) => t.id !== testId);
//       return { tests: arr };
//     }),
//   switchSubTest: (testId, subTestId) =>
//     set((state) => {
//       let tempTests = state.tests;
//       const tIndex = state.tests.findIndex((t) => t.id === testId);
//       let t = tempTests[tIndex];
//       const stIndex = t.subTests.findIndex((st) => st.id === subTestId);
//       // t.subTests.map((x)=>{
//       //   if(x.id === subTestId){
//       //     x.selected = !x.selected
//       //   }
//       //   return x
//       // })
//       const value = tempTests[tIndex].subTests[stIndex].selected;
//       tempTests[tIndex].subTests[stIndex].selected = !value;

//       return { tests: tempTests };
//     }),
// }));
