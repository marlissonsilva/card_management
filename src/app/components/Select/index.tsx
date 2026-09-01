import {
  Select as SelectUi,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMonthStore } from "../../store/useMonth";

const months = Array.from({ length: 12 }, (_, i) => ({
  label: new Date(0, i)
    .toLocaleString("pt-BR", { month: "long" })
    .toUpperCase(),
  value: i,
}));

export function Select() {
  const month = useMonthStore((state) => state.month);
  const setMonth = useMonthStore((state) => state.setMonth);
  return (
    <SelectUi
      items={months}
      value={months.find((item) => item.value === month)}
      onValueChange={(e) => setMonth(Number(e))}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Mês da fatura" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectUi>
  );
}
