import { z } from "zod";

export const purchaseSchema = z.object({
  amount: z.number({ message: "Digite o valor da compra" }),
  description: z
    .string()
    .min(1, { message: "Digite uma descrição para a compra" }),
  member: z
    .string()
    .min(1, { message: "Digite ou selecione o responsável pela compra" }),
  date_purchase: z.date({
    error: "Informe a data que a compra foi efetuada",
  }),
  installments_count: z.number({ message: "Informe o número de parcelas" }),
  status: z.enum(["OPEN", "CLOSE"]).optional(),
  user_uuid: z.string().optional(),
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;
