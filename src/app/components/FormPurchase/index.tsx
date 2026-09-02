"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./FormPurchase.module.css";
import {
  PurchaseFormData,
  purchaseSchema,
} from "@/src/backend/Purchase/validate/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createPurchase } from "@/src/backend/Purchase/create";
import { useForm, useWatch } from "react-hook-form";
import { useModalStore } from "../../store/useModal";
import { useState } from "react";
import { useCreatePurchaseStore } from "../../store/useCreatePurchase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarIcon, Loader, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "@/components/ui/toast";
import { toastNotify } from "../../utils/toastNotify";

export function FormPurchase() {
  const closeModal = useModalStore((state) => state.closeModal);
  const setCreated = useCreatePurchaseStore((state) => state.setCreated);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      amount: undefined,
      date_purchase: undefined,
      description: "",
      installments_count: 1,
      member: "",
      status: "OPEN",
    },
  });

  const date = useWatch({
    control,
    name: "date_purchase",
  });

  const installmentsCount = useWatch({
    control,
    name: "installments_count",
  });

  const onSubmit = async (formData: PurchaseFormData) => {
    setLoading(true);
    try {
      const response = await createPurchase({
        amount: formData.amount,
        description: formData.description,
        member: formData.member,
        date_purchase: formData.date_purchase,
        installments_count: formData.installments_count,
      });
      if (response.success) {
        toastNotify({
          title: "Compra registrada com sucesso!",
        });
        route.push("/dashboard/compras");
        route.refresh();
        setTimeout(() => {
          closeModal();
          setCreated();
          setLoading(false);
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value === "") {
      setAmount("");
      return;
    }

    const numberValue = (parseInt(value, 10) / 100).toFixed(2);
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numberValue));
    setAmount(formatted);
    setValue("amount", Number(value));
  };

  const handleDatePurchase = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue("date_purchase", selectedDate, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <section className={styles.section}>
      <Card className={styles.container_form}>
        <CardHeader className=" flex justify-between items-center mb-6">
          <CardTitle className="text-3xl">Registrar Compra</CardTitle>
          <Button className={styles.iconClose} onClick={closeModal}>
            <XIcon />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">Descrição</FieldLabel>
                <Input
                  id="description"
                  type="text"
                  placeholder="Ex: Presente de aniversário"
                  {...register("description")}
                />
                {errors.description?.message && (
                  <span className={styles.error_message}>
                    {errors.description.message}
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Valor</FieldLabel>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  placeholder="100,00"
                  onChange={handleAmountChange}
                />
                {errors.amount?.message && (
                  <span className={styles.error_message}>
                    {errors.amount.message}
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="installments_count">Parcelas</FieldLabel>
                <Select
                  value={installmentsCount}
                  onValueChange={(value) => {
                    setValue("installments_count", Number(value));
                  }}
                  name="installments"
                >
                  <SelectTrigger
                    id="installments_count"
                    className="w-full border rounded-sm  dark:text-gray-300 flex items-center justify-between"
                  >
                    <SelectValue placeholder="Selecione o número de parcelas">
                      {installmentsCount && `${installmentsCount}x`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="shadow-md border rounded-sm">
                    {[...Array(12)].map((_, i) => {
                      const number = i + 1;
                      return (
                        <SelectItem key={number} value={number.toString()}>
                          {number}x
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.installments_count?.message && (
                  <span className={styles.error_message}>
                    {errors.installments_count.message}
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="date_purchase">Data da compra</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    className={buttonVariants({
                      variant: "outline",
                      size: "icon",
                    })}
                  >
                    <span className="w-full flex justify-between gap-2 p-2 border  rounded-md dark:text-gray-300">
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="text-gray-500">
                          Selecione a data da compra
                        </span>
                      )}
                      <CalendarIcon className="text-gray-500" size={20} />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 shadow-md border rounded-md z-999"
                  >
                    <Calendar
                      mode="single"
                      className="z-999"
                      selected={date}
                      onSelect={handleDatePurchase}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="hidden"
                  name="date_purchase"
                  value={date ? format(date, "yyyy-MM-dd") + "T12:00:00" : ""}
                />
                {errors.date_purchase?.message && (
                  <span className={styles.error_message}>
                    {errors.date_purchase.message}
                  </span>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="member">
                  Responsavél pela compra
                </FieldLabel>
                <Input
                  id="member"
                  type="text"
                  placeholder="Fulano"
                  {...register("member")}
                />
                {errors.member?.message && (
                  <span className={styles.error_message}>
                    {errors.member.message}
                  </span>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center"
                >
                  {loading && <Loader className="animate-spin" />}
                  Salvar Registro
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
