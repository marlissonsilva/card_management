"use client";
import useSWR from "swr";
import { useCreatePurchaseStore } from "../store/useCreatePurchase";
import { useMonthStore } from "../store/useMonth";
import { findMembersByMonth } from "@/src/backend/Member/findMembersByMonth";

export function useMembers() {
  const created = useCreatePurchaseStore((state) => state.created);
  const month = useMonthStore((state) => state.month);
  const { data, isLoading, error } = useSWR(["members", month, created], () =>
    findMembersByMonth(month),
  );

  return {
    data: data || [],
    loading: isLoading,
    error: error,
  };
}
