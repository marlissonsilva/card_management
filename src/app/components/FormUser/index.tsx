"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  authenticateSchema,
  CombinedFormData,
  userSchema,
} from "@/src/backend/User/validate/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticate } from "@/src/backend/User/authenticate";
import { createUser } from "@/src/backend/User/create";
import styles from "./FormUser.module.css";

export function FormUser({ className, ...props }: React.ComponentProps<"div">) {
  const [action, setAction] = useState<"login" | "account">("login");
  const [loading, setLoading] = useState(false);
  const isLogin = action === "login";
  const schema = isLogin ? authenticateSchema : userSchema;
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CombinedFormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: CombinedFormData) => {
    setLoading(true);
    if (isLogin) {
      const response = await authenticate({
        email: formData.email,
        password: formData.password,
      });
      if (response.success) {
        route.push("/dashboard");
      }
    } else {
      const response = await createUser({
        username: formData.username || "",
        email: formData.email,
        password: formData.password,
        invoice_closing: formData.invoice_closing || 1,
      });
      if (response.success) {
        setAction("login");
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-[90%] md:max-w-100", className)}
      {...props}
    >
      <Card className="flex">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo</CardTitle>
          {!isLogin ? (
            <CardDescription>Crie sua conta.</CardDescription>
          ) : (
            <CardDescription>Faça login na sua conta.</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {!isLogin && (
                <Field>
                  <FieldLabel htmlFor="username">Nome</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Fulano da Silva"
                    {...register("username")}
                  />
                  {errors.username?.message && (
                    <span className={styles.error_message}>
                      {errors.username.message}
                    </span>
                  )}
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="fulano@example.com"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <span className={styles.error_message}>
                    {errors.email.message}
                  </span>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <span className={styles.error_message}>
                    {errors.password.message}
                  </span>
                )}
              </Field>
              {!isLogin && (
                <Field>
                  <FieldLabel htmlFor="invoice_closing">
                    Data de fechamento da fatura
                  </FieldLabel>
                  <Input
                    id="invoice_closing"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="20"
                    onChange={(event) =>
                      setValue("invoice_closing", Number(event.target.value))
                    }
                  />
                  {errors.invoice_closing?.message && (
                    <span className={styles.error_message}>
                      {errors.invoice_closing.message}
                    </span>
                  )}
                </Field>
              )}
              <Field>
                <Button type="submit" disabled={loading}>
                  Login
                </Button>
                <FieldDescription className="text-center">
                  {!isLogin ? (
                    <>
                      Já tem uma conta?{" "}
                      <span
                        className="cursor-pointer underline"
                        onClick={() => {
                          setAction("login");
                        }}
                      >
                        Faça seu login
                      </span>
                    </>
                  ) : (
                    <>
                      Não tem uma conta?{" "}
                      <span
                        className="cursor-pointer underline"
                        onClick={() => {
                          setAction("account");
                        }}
                      >
                        Inscrever-se
                      </span>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
