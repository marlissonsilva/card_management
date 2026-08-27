"use client";
import useSWR from "swr";
import { findInstallmentsByMonth } from "@/src/backend/Installment/findInstallmentsByMonth";
import { useCreatePurchaseStore } from "../store/useCreatePurchase";
import { useMonthStore } from "../store/useMonth";

export function useInstallments() {
  const created = useCreatePurchaseStore((state) => state.created);
  const month = useMonthStore((state) => state.month);
  const { data, isLoading, error } = useSWR(
    ["installments", month, created],
    () => findInstallmentsByMonth(month),
  );

  return {
    data: data?.data || [],
    totalAmount: data?.totalAmount || 0,
    loading: isLoading,
    error: error,
  };
}
