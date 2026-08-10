"use client"
import { Plus } from "lucide-react";
import { FormPurchase } from "../FormPurchase";
import { useModalStore } from "../../store/useModalStore";

export interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const openModal = useModalStore((state) => state.openModal)
  const isOpen = useModalStore((state) => state.isOpen)
  return (
    <>
      <div className={`w-full border border-gray-200 flex items-center justify-between px-4 py-5  ${className}`}>
        <div>Mês da fatura</div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
          onClick={openModal}>
          <Plus />
          <span>Nova compra</span>
        </button>
      </div>
      {isOpen && (
        <FormPurchase />
      )}
    </>
  );
}
