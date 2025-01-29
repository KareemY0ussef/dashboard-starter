import MediaGrid from "@/components/media/media-grid";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Page() {
  const t = await getTranslations("dashboard.media");
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-6 text-3xl font-semibold">{t("title")}</h2>
        <Button asChild>
          <Link href={"/media/new"}>{t("newButton")}</Link>
        </Button>
      </div>
      <section className="flex flex-col gap-2">{/* <MediaGrid /> */}</section>
    </>
  );
}
