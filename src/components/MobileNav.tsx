import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function MobileNav() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent className="space-y-5">
          <SheetTitle>Welcome to Food Craft</SheetTitle>
          <Separator className="my-4" />
          <SheetDescription className="flex">
            <Button className="flex-1 font-bold text-lg bg-orange-500">
              Login
            </Button>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
}
