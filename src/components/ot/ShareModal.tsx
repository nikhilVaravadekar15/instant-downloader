"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import copy from "copy-to-clipboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Copy, Share2 } from "lucide-react";

export default function ShareModal() {
  const [origin, setOrigin] = React.useState<string>("");
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    const url = new URL(window.location.href).origin;
    setOrigin(url);
    return () => {};
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 5000);

    return () => clearTimeout(timer);
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className="flex gap-2 items-center justify-center"
        >
          Share
          <Share2 className="w-4 h-4 ml-2 text-xl" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Sharing is caring.</h4>
            <p className="text-sm text-muted-foreground">
              {
                "It's the biggest motivation to help us to make the site better."
              }
            </p>
          </div>
          <div className="mb-2 flex justify-center items-center">
            <div className="w-full flex gap-2 items-center justify-center p-3 border rounded-lg">
              <Input
                type="url"
                value={`${origin}`}
                className="bg-transparent focus-visible:ring-0 cursor-pointer select-all"
              />
              {isCopied ? (
                <CircleCheck className="w-6 h-6 text-xl text-green-600 rounded-full cursor-pointer" />
              ) : (
                <Copy
                  className="p-0.5 w-6 h-6 text-xl rounded-full cursor-pointer"
                  onClick={() => {
                    copy(`${origin}`);
                    setIsCopied(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
