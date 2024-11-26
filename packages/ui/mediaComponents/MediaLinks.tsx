"use client";
import { Article, Translated } from "@youmeet/gql/generated";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function MediaLinks({ media }: { media: Article }) {
  const router = useRouter();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div className="flex flex-col gap-[24px] p-[12px] box-border">
      {media.links?.map((link, i) => {
        if (link) {
          router.prefetch(link.href as string);
          return (
            <Link
              key={`${link?.href}${link?.label}`}
              href={link?.href as string}
              className="no-underline text-deepPurple900 dark:text-white"
            >
              {(link?.label as Translated)[language as "fr" | "en"] as string}
            </Link>
          );
        }
        return undefined;
      })}
    </div>
  );
}
