import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Loader } from "lucide-react";
import { useMemo, useState } from "react";

interface ComboboxProps {
  data: string[];
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

export function MemberCombobox({
  data,
  value,
  onChange,
  loading,
}: ComboboxProps) {
  const [addedMembers, setAddedMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const combinedMembers = useMemo(() => {
    return Array.from(new Set([...data, ...addedMembers]));
  }, [data, addedMembers]);

  const handleAddNewItem = () => {
    if (inputValue.trim() === "") return;

    if (!combinedMembers.includes(inputValue)) {
      setAddedMembers((prev) => [...prev, inputValue]);
    }
    onChange(inputValue);
  };

  return (
    <Combobox
      id="member"
      items={combinedMembers}
      value={value}
      onValueChange={(member) => {
        onChange(member || "");
      }}
      onInputValueChange={(member) => {
        setInputValue(member);
      }}
    >
      <ComboboxInput
        placeholder="Ex: Fulano da Silva"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ComboboxContent>
        {loading ? (
          <div className="flex justify-center items-center gap-3 p-2">
            <Loader className="animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : (
          <ComboboxEmpty>
            {inputValue.length > 0 ? (
              <div
                onClick={handleAddNewItem}
                style={{ cursor: "pointer", padding: "8px" }}
              >
                Adicionar {inputValue}
              </div>
            ) : (
              "Nenhum membro encontrado."
            )}
          </ComboboxEmpty>
        )}

        {!loading && (
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
