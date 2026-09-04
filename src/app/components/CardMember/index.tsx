import { Button } from "@/components/ui/button";
import { currencyFormat } from "../../utils/currencyFormat";
import { toastNotify } from "../../utils/toastNotify";
import { HandCoins, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface CardMemberProps {
  data: {
    totalAmountPurchases: number;
    invloceClosing: number;
    name: string;
    uuid: string;
  };
}

export function CardMember({ data }: CardMemberProps) {
  const { name, totalAmountPurchases, invloceClosing } = data;

  const handlePaymentReminder = () => {
    navigator.clipboard
      .writeText(
        `Olá ${name}, sua parte na fatura deste mês é de ${currencyFormat(totalAmountPurchases)}.
        O vencimento é dia ${invloceClosing + 7}. Valeu!"`,
      )
      .then(() => {
        console.log("Texto copiado com sucesso!");
        toastNotify({
          title: "Mensagem de cobrança gerada com sucesso",
        });
      })
      .catch((err) => console.error("Falha ao copiar texto: ", err));
  };

  const handleNumberPhone = () => {
    // TODO: Implementar adição de numero de telefone para automatizar a mensagem de cobrança
  };

  return (
    <Item variant={"outline"} className="w-full justify-between">
      <ItemContent>
        <div className="flex justify-between">
          <ItemTitle className="text-base">{name}</ItemTitle>
          <ItemDescription className="text-base font-medium xl:hidden">
            {currencyFormat(totalAmountPurchases)}
          </ItemDescription>
        </div>
        {/* MOBILE */}
        <ItemContent className="xl:hidden">
          <ItemDescription className="text-base font-medium hidden xl:flex">
            {currencyFormat(totalAmountPurchases)}
          </ItemDescription>
        </ItemContent>
      </ItemContent>
      <div className="flex w-full gap-10 items-center xl:w-auto">
        {/* DESKTOP */}
        <ItemContent className="hidden xl:flex">
          <ItemDescription className="text-base font-medium hidden xl:flex">
            {currencyFormat(totalAmountPurchases)}
          </ItemDescription>
        </ItemContent>
        <ItemActions className="flex justify-between w-full">
          <Button
            variant={"secondary"}
            className="xl:px-8"
            onClick={handleNumberPhone}
            disabled
            title="Em brece opção de cadastrar numero de telefone"
          >
            <Plus />
            WhatsApp
          </Button>
          <Button className="xl:px-8" onClick={handlePaymentReminder}>
            <HandCoins />
            Cobrar
          </Button>
        </ItemActions>
      </div>
    </Item>
  );
}

export function SkeletonMember() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className="w-full min-h-16 rounded-sm" />
      ))}
    </>
  );
}
