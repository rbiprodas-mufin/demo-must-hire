import Link from "next/link";
import { Container } from "~/components/container";
import { Button } from "~/components/ui/button";
import { BriefcaseIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full h-16 2xl:20 border-b z-30 transition-all duration-300 bg-white">
      <Container className="h-full flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <BriefcaseIcon className="size-7 text-blue-primary/90" />
            <span className="text-xl font-bold text-blue-950">
              MustHire
            </span>
          </div>
        </Link>
        {/* nav menu here */}
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
};
