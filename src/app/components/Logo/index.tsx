import { CreditCard } from "lucide-react";

interface LogoProps {
  size?: string;
  className?: string;
}

export function Logo({ size, className }: LogoProps) {
  return (
    <div className={`flex flex-row items-center leading-none gap-2 px-3 py-5`}>
      <span>
        <CreditCard className="h-10 w-10 rotate-15" />
      </span>
      <p
        className={
          size ? size : className ? className : "text-md"
        }
      >
        <span className="font-semibold">Card Management</span>
      </p>
    </div>
  );
}
