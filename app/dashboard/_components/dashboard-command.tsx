import type { Dispatch, SetStateAction } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => (
  <CommandDialog onOpenChange={setOpen} open={open}>
    <CommandInput placeholder="find meeting or agent" />
    <CommandList>
      <CommandItem>Test</CommandItem>
    </CommandList>
  </CommandDialog>
);
