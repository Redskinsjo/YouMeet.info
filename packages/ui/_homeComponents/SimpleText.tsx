"use client";
import { useTranslation } from "react-i18next";

export default function SimpleText({ text }: { text: string }) {
  const { t } = useTranslation();

  return t(text);
}
