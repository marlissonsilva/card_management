import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authenticateSchema,
  CombinedFormData,
  userSchema,
} from "@/src/backend/User/validate/zod";
import { useState } from "react";
import { authenticate } from "@/src/backend/User/authenticate";
import { createUser } from "@/src/backend/User/create";
import { useRouter } from "next/navigation";
import styles from "./FormUser.module.css";
import { Loader } from "lucide-react";

export function FormUser() {
  const [action, setAction] = useState<"login" | "account">("login");
  const [loading, setLoading] = useState(false);

  const isLogin = action === "login";
  const schema = isLogin ? authenticateSchema : userSchema;
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
    <section className={styles.section}>
      <div className={styles.tabs_container}>
        <button
          className={`${styles.tab_button} ${styles.tab_left} ${!isLogin ? styles.tab_active : ""}`}
          onClick={() => {
            setAction("account");
            reset();
          }}
        >
          <span className={styles.tab_text}>Criar conta</span>
        </button>

        {/* Botão Fazer Login */}
        <button
          className={`${styles.tab_button} ${styles.tab_right} ${isLogin ? styles.tab_active : ""}`}
          onClick={() => {
            setAction("login");
            reset();
          }}
        >
          <span className={styles.tab_text}>Fazer login</span>
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div className={styles.input_group}>
            <label>
              Digite seu nome <input type="text" {...register("username")} />
            </label>
            {errors.username?.message && (
              <span className={styles.error_message}>
                {errors.username.message}
              </span>
            )}
          </div>
        )}

        <div className={styles.input_group}>
          <label>
            Digite seu email <input type="email" {...register("email")} />
          </label>
          {errors.email?.message && (
            <span className={styles.error_message}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.input_group}>
          <label>
            Digite sua senha <input type="password" {...register("password")} />
          </label>
          {errors.password?.message && (
            <span className={styles.error_message}>
              {errors.password.message}
            </span>
          )}
        </div>

        {!isLogin && (
          <div className={styles.input_group}>
            <label>
              Data de fechamento da fatura
              <input
                type="number"
                min="1"
                max="31"
                onChange={(event) =>
                  setValue("invoice_closing", Number(event.target.value))
                }
              />
            </label>
            {errors.invoice_closing?.message && (
              <span className={styles.error_message}>
                {errors.invoice_closing.message}
              </span>
            )}
          </div>
        )}

        <button type="submit" className={styles.submit_button}>
          {action === "account" ? "Criar conta" : "Fazer login"}
        </button>
      </form>
      {loading && (
        <div className="flex justify-center">
          <Loader className="mr-3 size-5 animate-spin" />
        </div>
      )}
    </section>
  );
}
