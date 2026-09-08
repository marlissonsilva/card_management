import { useTheme } from "next-themes";
import Image from "next/image";
interface NoDataProps {
  message: string;
}
export function NoData({ message }: NoDataProps) {
  const { themes, theme, systemTheme } = useTheme();
  console.log({ themes, theme, systemTheme });
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {theme === "dark" || systemTheme === "dark" ? (
        <Image
          src="/no-data_dark.svg"
          width={200}
          height={200}
          alt="Sem dados"
          loading="eager"
          className="h-auto w-auto max-w-1/4"
        />
      ) : (
        <Image
          src="/no-data.svg"
          width={200}
          height={200}
          alt="Sem dados"
          loading="eager"
          className="h-auto w-auto max-w-1/4"
        />
      )}
      <p className="text-center pt-20 text-xl">{message}</p>
    </div>
  );
}
