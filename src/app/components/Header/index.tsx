"use client";
import { Plus } from "lucide-react";
import { FormPurchase } from "../FormPurchase";
import { useModalStore } from "../../store/useModal";
import { useMonthStore } from "../../store/useMonth";
export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const openModal = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const setMonth = useMonthStore((state) => state.setMonth);
  const month = useMonthStore((state) => state.month);

  return (
    <>
      <div
        className={`w-full border border-gray-200 flex items-center justify-between px-6 py-5  ${className}`}
      >
        <select
          id="month"
          className="max-w-fit capitalize"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i.toString()} className="cursor-pointer">
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
        <button
          className="flex items-center px-4 py-2 border rounded-md"
          onClick={openModal}
        >
          <Plus />
          <span>Nova compra</span>
        </button>
      </div>
      {isOpen && <FormPurchase />}
    </>
  );
}
