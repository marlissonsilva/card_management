"use client";
import { CardMember } from "@/src/app/components/CardMember";
import { useMembers } from "@/src/app/hooks/useMembers";

export default function Page() {
  const members = useMembers();

  return (
    <section className="flex flex-col gap-2">
      {members.data.map((member) => (
        <CardMember key={member.uuid} data={member} />
      ))}
      {members.data.length === 0 && (
        <div className="text-center pt-20">Sem membros cadastrados!</div>
      )}
    </section>
  );
}
