import type { Dispatch, SetStateAction } from "react";
import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => (
  <CommandResponsiveDialog onOpenChange={setOpen} open={open}>
    <CommandInput placeholder="find meeting or agent" />
    <CommandList>
      <CommandItem>Test</CommandItem>
    </CommandList>
  </CommandResponsiveDialog>
);
