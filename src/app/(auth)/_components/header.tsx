import Link from "next/link";
import Container from "@/components/container";
import { BriefcaseIcon } from "lucide-react";

export const AuthHeader = () => {
  return (
    <header className="w-full h-16 2xl:20">
      <Container className="h-full flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <BriefcaseIcon className="size-7 text-blue-primary/90" />
            <span className="text-xl font-bold text-gray-800">
              JobBoard
            </span>
          </div>
        </Link>
      </Container>
    </header>
  );
};
