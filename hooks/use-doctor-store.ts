import { Doctor } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DoctorState {
  doctor: Doctor;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setDoctor: (doctor: { id: string; name: string }) => void;
}

export const useDoctorStore = create<DoctorState>()(
  persist(
    (set) => ({
      doctor: { id: "", name: "" },
      setDoctor: (doctor) => {
        // let id = doctor.split("~")[0];
        // let name = doctor.split("~")[1];
        // const d: Doctor = { id, name };
        set(() => ({ doctor }));
      },
      isOpen: false,
      onClose: () => set({ isOpen: false }),
      onOpen: () => set({ isOpen: true }),
    }),
    { name: "doctorSate" }
  )
);
// export const useDoctorStore = create<DoctorState>()(
//   persist(
//     (set) => ({
//       doctor: { id: "", name: "" },
//       setDoctor: (doctor) => set((state) => ({ doctor })),
//     }),
//     { name: "doctorStore" }
//   )
// );
