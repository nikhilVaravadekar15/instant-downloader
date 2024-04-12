import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  color?: string;
};

export default function Spinner({ color }: Props) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn("h-8 w-8 animate-spin text-[#0059ff]", color)} />
    </div>
  );
}
