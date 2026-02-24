import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/auth/login">
      <Button className="m-4 cursor-pointer">Button</Button>
      </Link>
    </div>
  );
}
