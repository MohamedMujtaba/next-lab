"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  description,
  isOpen,
  onClose,
  title,
  footer,
  contentClassName,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onChange} modal={true}>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>{footer && footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
