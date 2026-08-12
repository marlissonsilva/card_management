"use client";
import { CardMember } from "@/src/app/components/CardMember";
import { useCreatePurchaseStore } from "@/src/app/store/useCreatePurchase";
import { findAllMembers } from "@/src/backend/Member/findAll";
import { useEffect, useState } from "react";

type Member = Awaited<ReturnType<typeof findAllMembers>>[number];

export default function Page() {
  const created = useCreatePurchaseStore((state) => state.created);
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const purchases = await findAllMembers();
      setMembers(purchases);
    };
    fetchData();
  }, [created]);

  return (
    <section className="flex flex-col gap-2">
      {members.map((member) => (
        <CardMember key={member.uuid} data={member} />
      ))}
    </section>
  );
}
