import {
  GetGptCompetenciesForHomeDocument,
  GetOffersForHomeDocument,
  Translated,
} from "@youmeet/gql/generated";
import Layout from "@youmeet/components/Layout";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import React from "react";

export default function LinksComponent() {
  const { data, loading: offersLoading } = useQuery(GetOffersForHomeDocument, {
    variables: { params: { take: 10 } },
  });
  const { data: data2, loading: competenciesLoading } = useQuery(
    GetGptCompetenciesForHomeDocument,
    { variables: { params: { take: 10 } } }
  );
  const offers = data?.offers;
  const competencies = data2?.gptCompetencies;
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return !offersLoading || !competenciesLoading ? (
    <div className="w-screen border-t-[1px] border-0 dark:mediumDarkBg border-solid border-black">
      <Layout
        newStyles={{
          maxWidth: xs || sm || md ? "100%" : "900px",
          padding: "24px",
        }}
      >
        <div className="flex justify-between gap-[24px]">
          {!offersLoading && (
            <div className="flex flex-col gap-[12px]">
              <h3 className="dark:dark dark:text-white my-0">
                {t("some-jobs")}
              </h3>
              <ul className="flex flex-col gap-[12px] p-0">
                {offers && offers?.length > 0
                  ? offers.map((offer) => (
                      <li
                        key={offer?.id}
                        className="darkLi list-none text-[12px]"
                      >
                        <Link
                          target="_blank"
                          href={`/offres/${offer?.slug}`}
                          className="no-underline dark:dark dark:text-white font-bold hover:text-deepPurple700"
                        >
                          {
                            (offer?.job?.title as Translated)[
                              language as "fr" | "en"
                            ]
                          }
                        </Link>
                      </li>
                    ))
                  : undefined}
              </ul>
            </div>
          )}
          {!competenciesLoading && (
            <div className="flex flex-col gap-[12px]">
              <h3 className="dark:dark dark:text-white my-0">
                {t("some-competencies")}
              </h3>
              <ul className="flex flex-col gap-[12px] p-0">
                {competencies && competencies?.length > 0
                  ? competencies
                      .filter((c, i) => i <= 10)
                      .map((competency) => (
                        <li
                          key={competency?.id}
                          className="darkLi list-none text-[12px]"
                        >
                          <Link
                            target="_blank"
                            href={`/competences/${competency?.slug}`}
                            className="no-underline dark:dark dark:text-white font-bold hover:text-deepPurple700"
                          >
                            {competency?.title
                              ? competency?.title[0].toUpperCase() +
                                competency?.title?.slice(1)
                              : undefined}
                          </Link>
                        </li>
                      ))
                  : undefined}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </div>
  ) : undefined;
}
