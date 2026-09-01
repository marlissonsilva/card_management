import { toast } from "@/components/ui/toast";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

type ToastType = "error" | "warning" | "info" | "default";

interface NotifyProps {
  title: string;
  description?: string;
  type?: ToastType;
}

export function toastNotify({
  title,
  description,
  type = "default",
  ...rest
}: NotifyProps) {
  const styles = {
    error: {
      icon: <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />,
      titleColor: "text-red-600 dark:text-red-400",
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />,
      titleColor: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
      icon: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
      titleColor: "text-blue-600 dark:text-blue-400",
    },
    default: {
      icon: <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />,
      titleColor: "text-green-600 dark:text-green-400",
    },
  };

  const { icon, titleColor } = styles[type];

  return toast.add({
    title: (
      <div className="flex items-center gap-2">
        {icon}
        <span className={titleColor}>{title}</span>
      </div>
    ),
    description,
    timeout: 2000,
    ...rest,
  });
}
