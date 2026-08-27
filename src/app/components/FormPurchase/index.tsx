"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./FormPurchase.module.css";
import {
  PurchaseFormData,
  purchaseSchema,
} from "@/src/backend/Purchase/validate/zod";
import { createPurchase } from "@/src/backend/Purchase/create";
import { useForm } from "react-hook-form";
import { XIcon } from "lucide-react";
import { useModalStore } from "../../store/useModal";
import { useState } from "react";
import { useCreatePurchaseStore } from "../../store/useCreatePurchase";
import { useRouter } from "next/navigation";

export function FormPurchase() {
  const closeModal = useModalStore((state) => state.closeModal);
  const setCreated = useCreatePurchaseStore((state) => state.setCreated);
  const [amount, setAmount] = useState("");
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
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

  const onSubmit = async (formData: PurchaseFormData) => {
    try {
      const response = await createPurchase({
        amount: formData.amount,
        description: formData.description,
        member: formData.member,
        date_purchase: new Date(formData.date_purchase),
        installments_count: formData.installments_count,
      });
      if (response.success) {
        closeModal();
        setCreated();
        route.push("/dashboard/compras");
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

  const handleDatePurchase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    setValue("date_purchase", new Date(dateString));
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h3 className={styles.title}>Registrar Compra</h3>
          <button
            className={styles.iconClose}
            type="button"
            onClick={closeModal}
          >
            <XIcon />
          </button>
        </div>

        <div className={styles.input_group}>
          <label>
            Descrição
            <input type="text" {...register("description")} />
          </label>
          {errors.description?.message && (
            <span className={styles.error_message}>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <div className={styles.input_group}>
            <label>
              Valor
              <input
                value={amount}
                onChange={handleAmountChange}
                placeholder="0,00"
              />
            </label>
            {errors.amount?.message && (
              <span className={styles.error_message}>
                {errors.amount.message}
              </span>
            )}
          </div>
          <div className={styles.input_group}>
            <label>
              Parcelas
              <select
                name="installments_count"
                id="installments_count"
                onChange={(event) =>
                  setValue("installments_count", Number(event.target.value))
                }
                defaultValue={1}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            {errors.installments_count?.message && (
              <span className={styles.error_message}>
                {errors.installments_count.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="date_purchase">
            Data da compra
            <input
              type="date"
              id="date_purchase"
              onChange={handleDatePurchase}
            />
          </label>
          {errors.date_purchase?.message && (
            <span className={styles.error_message}>
              {errors.date_purchase.message}
            </span>
          )}
        </div>

        <div className={styles.input_group}>
          <label>
            Responsavél pela compra
            <input type="text" {...register("member")} />
          </label>
          {errors.member?.message && (
            <span className={styles.error_message}>
              {errors.member.message}
            </span>
          )}
        </div>

        <button type="submit" className={styles.submit_button}>
          Salvar Registro
        </button>
      </form>
    </section>
  );
}
