"use client";
import { CardMember } from "@/src/app/components/CardMember";
import { useCreatePurchaseStore } from "@/src/app/store/useCreatePurchase";
import { useMonthStore } from "@/src/app/store/useMonth";
import { findMembersByMonth } from "@/src/backend/Member/findMembersByMonth";
import { useEffect, useState } from "react";

type Member = Awaited<ReturnType<typeof findMembersByMonth>>[number];

export default function Page() {
  const created = useCreatePurchaseStore((state) => state.created);
  const [members, setMembers] = useState<Member[]>([]);
  const month = useMonthStore((state) => state.month);
  useEffect(() => {
    const fetchData = async () => {
      const members = await findMembersByMonth(month);
      setMembers(members);
    };
    fetchData();
  }, [created, month]);

  return (
    <section className="flex flex-col gap-2">
      {members.map((member) => (
        <CardMember key={member.uuid} data={member} />
      ))}
    </section>
  );
}
