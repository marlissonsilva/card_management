import { Clock, Inbox, Landmark, Users } from "lucide-react";

const iconMap = {
  collected: Landmark,
  responsibles: Users,
  pending: Clock,
  purchases: Inbox,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "purchases" | "responsibles" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-sm p-2 shadow-2xs border ">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-00" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-sm border px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

export function CardWrapper() {
  return (
    <>
      <Card title="Total" value={"R$1000"} type="collected" />
      <Card title="Pendente" value={"R$1000"} type="pending" />
      <Card title="Total de compras" value={"20"} type="purchases" />
      <Card title="Responśaveis" value={"20"} type="responsibles" />
    </>
  );
}
