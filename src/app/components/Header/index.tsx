"use client";
import { Plus } from "lucide-react";
import { FormPurchase } from "../FormPurchase";
import { useModalStore } from "../../store/useModal";
import { currencyFormat } from "../../utils/currencyFormat";
import { useInstallments } from "../../hooks/useInstallments";
import { ModeToggle } from "../ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Select } from "../Select";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const openModal = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const { totalAmount, loading } = useInstallments();

  return (
    <>
      <div
        className={`w-full border-r border-b border-t flex flex-col items-center justify-between px-6 py-5 gap-4`}
      >
        <div className="w-full flex justify-between items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-6">
            <p>Fatura atual:</p>
            {loading ? (
              <Skeleton className="w-28 h-5 rounded-sm" />
            ) : (
              <span className="font-semibold text-xl p-1">
                {currencyFormat(totalAmount)}
              </span>
            )}
            <ModeToggle />
          </div>
        </div>

        <div className=" w-full flex justify-between items-center gap-4">
          <Select />
          <Button
            className="flex items-center px-4 py-2 border rounded-md"
            onClick={openModal}
          >
            <Plus />
            <span className="hidden md:flex">Nova compra</span>
          </Button>
        </div>
      </div>

      {isOpen && <FormPurchase />}
    </>
  );
}
