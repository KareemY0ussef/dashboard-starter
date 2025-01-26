"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="w-full flex gap-2">
        <Button className="ms-auto" asChild>
          <Link href={"/media/new"}>Add media</Link>
        </Button>
      </div>
    </>
  );
}
