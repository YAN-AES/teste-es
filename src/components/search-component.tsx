"use client";

// Imports
import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SearchComponentProps {
  onSearch: (term: string) => void;
}

export function SearchComponent({ onSearch }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const [isDesktop, setIsDesktop] = React.useState(true);

  React.useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const SearchForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Buscar artistas ou gêneros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full">
          Buscar
        </Button>
      </div>
    </form>
  );

  // Desktop
  const DesktopSearch = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 h-10 w-10"
        >
          <Search className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Buscar</SheetTitle>
        </SheetHeader>
        <SearchForm />
      </SheetContent>
    </Sheet>
  );

  // Mobile
  const MobileSearch = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 h-10 w-10"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Buscar</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <SearchForm />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return isDesktop ? <DesktopSearch /> : <MobileSearch />;
}
