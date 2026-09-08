"use client";
import useSWR from "swr";
import { useCreatePurchaseStore } from "../store/useCreatePurchase";
import { useMonthStore } from "../store/useMonth";
import { findMembersByMonth } from "@/src/backend/Member/findMembersByMonth";
import { useModalStore } from "../store/useModal";
import { findAllMembers } from "@/src/backend/Member/findAllMembers";

export function useMembers() {
  const created = useCreatePurchaseStore((state) => state.created);
  const month = useMonthStore((state) => state.month);
  const open = useModalStore((state) => state.isOpen);
  const { data, isLoading, error } = useSWR(
    ["members", month, created, open],
    () => findMembersByMonth(month),
  );

  return {
    data: data || [],
    loading: isLoading,
    error: error,
  };
}

export function useAllMembers() {
  const open = useModalStore((state) => state.isOpen);
  const { data, isLoading, error } = useSWR(["members", open], () =>
    findAllMembers(),
  );

  return {
    data: data || [],
    loading: isLoading,
    error: error,
  };
}
