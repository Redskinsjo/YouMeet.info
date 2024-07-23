"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SimpleText({ text }: { text: string }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return !loading && t(text);
}
