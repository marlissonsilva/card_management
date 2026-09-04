import { Skeleton } from "@/components/ui/skeleton";
import { currencyFormat } from "../../utils/currencyFormat";
import { dateFormat } from "../../utils/dateFormat";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

type DataType = {
  purchase_uuid: string;
  installment_number: number;
  value: number;
  due_date: Date;
  is_paid: boolean;
  created_at: Date;
  updated_at: Date;
  uuid: string;
  purchase: {
    description: string;
    installments_count: number;
    date_purchase: Date;
    member: { name: string };
  };
};

interface CardProps {
  data: DataType;
}

export function CardPurchase({ data }: CardProps) {
  const { purchase, installment_number, value } = data;

  return (
    <Item variant={"outline"}>
      <ItemContent>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <ItemTitle className="text-base uppercase">
              {purchase.description}
            </ItemTitle>
            <ItemDescription className="text-base">
              {purchase.member.name}
            </ItemDescription>
            <ItemDescription className="text-base">
              Comprado em: {dateFormat(purchase.date_purchase)}
            </ItemDescription>
          </div>

          <div className="flex flex-col items-end">
            <ItemTitle className="text-xl font-semibold">
              {currencyFormat(value)}
            </ItemTitle>
            <ItemDescription className="text-base">
              {installment_number}/{purchase.installments_count}
            </ItemDescription>
          </div>
        </div>
      </ItemContent>
    </Item>
  );
}

export function SkeletonPurchase() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="w-full min-h-28 rounded-sm " />
      ))}
    </>
  );
}
