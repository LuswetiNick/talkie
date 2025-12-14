import { ChevronsUpDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface CommandSelectProps {
  options: Array<{ id: string; value: string; children: ReactNode }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const handleOpenChange = (isOpen: boolean) => {
    onSearch?.("");
    setOpen(isOpen);
  };

  return (
    <>
      <Button
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          "justify-between px-2 font-normal",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
        size="sm"
        type="button"
        variant="outline"
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDown />
      </Button>{" "}
      <CommandResponsiveDialog
        onOpenChange={handleOpenChange}
        open={open}
        shouldFilter={!onSearch}
      >
        <CommandInput onValueChange={onSearch} placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No options found.</CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
