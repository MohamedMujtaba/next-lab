import { Patient } from "@prisma/client";
import { create } from "zustand";

interface UsePatientStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patient: Patient | null;
  setPatient: (patient: Patient) => void;
}

export const usePatient = create<UsePatientStore>()((set) => ({
  isOpen: false,
  patient: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, patient: null }),
  setPatient: (patient) => set({ patient }),
}));
