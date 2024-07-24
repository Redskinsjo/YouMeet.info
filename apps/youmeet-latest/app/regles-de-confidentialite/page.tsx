"use client";
import Footer from "@youmeet/components/Footer";
import SubLayout from "@youmeet/components/SubLayout";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const paragraphs = [
  {
    title: "Règles de Confidentialité",
    detail: {
      variable: "07/10/2023",
      content: (variable: string) => `Date d'entrée en vigueur : ${variable}`,
    },
    paragraph: {
      variable: "YouMeet",
      content: (variable: string) =>
        `Bienvenue sur notre application web dédiée au recrutement et à la prise de référence des candidats. Chez ${variable}, nous accordons une importance capitale à la protection de vos données personnelles et à la conformité aux normes RGPD européennes ainsi qu'à l'éthique sociale française. Nous sommes déterminés à garantir la confidentialité et la sécurité de vos informations. Les règles suivantes décrivent comment nous collectons, utilisons, stockons et partageons vos données.`,
    },
  },
  {
    title: "1. Collecte de données personnelles",
    paragraph:
      "Nous collectons uniquement les données personnelles nécessaires à des fins de recrutement et de prise de référence. Ces informations peuvent inclure :",
    points: [
      "Nom, prénom et coordonnées de contact.",
      "CV, lettre de motivation et tout autre document lié à la candidature.",
      "Informations professionnelles, telles que l'expérience de travail et l'éducation.",
      "Références professionnelles.",
    ],
  },
  {
    title: "2. Utilisation des données",
    paragraph:
      "Vos données personnelles sont utilisées uniquement dans le cadre du processus de recrutement et de prise de référence. Les utilisations incluent :",
    points: [
      "Évaluation de votre adéquation avec le poste vacant.",
      "Communication avec vous tout au long du processus de recrutement.",
      "Prise de référence auprès de vos références professionnelles.",
      "Respect des obligations légales en matière de recrutement.",
    ],
  },
  {
    title: "3. Conservation des données",
    paragraph:
      "Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées, conformément aux exigences légales. Une fois que ces objectifs sont atteints, nous supprimons ou anonymisons vos données.",
  },
  {
    title: "4. Sécurité des données",
    paragraph:
      "Nous prenons des mesures de sécurité techniques et organisationnelles pour protéger vos données contre toute utilisation non autorisée, perte ou accès non autorisé. Nous travaillons constamment à la mise à jour et à l'amélioration de nos mesures de sécurité.",
  },
  {
    title: "5. Partage de données",
    paragraph:
      "Nous ne partageons vos données personnelles qu'avec des tiers dans les cas suivants :",
    points: [
      "Lorsque vous nous autorisez explicitement à le faire.",
      "Pour respecter nos obligations légales et réglementaires.",
      "Avec des prestataires de services tiers qui nous aident dans le processus de recrutement, à condition qu'ils respectent également les normes de protection des données.",
    ],
  },
  {
    title: "6. Droits des personnes concernées",
    paragraph: {
      variable: "contact@youmeet.info",
      content: (variable: string) =>
        `Conformément au RGPD, vous avez le droit d'accéder à vos données, de les corriger, de les supprimer, de limiter leur traitement, de vous opposer à leur traitement et de demander la portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à ${variable}.`,
    },
  },
  {
    title: "7. Consentement",
    paragraph:
      "En utilisant notre application web et en nous fournissant vos données personnelles, vous consentez à la collecte, à l'utilisation et au traitement de vos données conformément à cette politique de confidentialité.",
  },
  {
    title: "8. Modifications de la politique",
    paragraph:
      "Nous nous réservons le droit de mettre à jour cette politique de confidentialité en fonction des évolutions légales ou de notre activité. Les modifications seront publiées sur cette page.",
  },
];

type DynamicData = { variable: string; content: (arg: string) => string };

const ParagraphWithTitle = ({
  title,
  paragraph,
  points,
  detail,
}: {
  title: string;
  paragraph: DynamicData | string | undefined;
  points: string[] | undefined;
  detail: DynamicData | undefined;
}) => {
  return (
    <div className="flex-center flex-col gap-[24px] bg-grey200 p-[24px] border-[0.5px] border-solid border-grey300 rounded-lg hover:bg-grey100">
      {title && <div className="item">{title}</div>}
      {detail && detail.variable && (
        <div className="legend">
          {(detail as DynamicData).content((detail as DynamicData).variable)}
        </div>
      )}
      {paragraph && !(paragraph as DynamicData).variable && (
        <div className="legend">{paragraph as string}</div>
      )}
      {paragraph && (paragraph as DynamicData).variable && (
        <div className="legend">
          {(paragraph as DynamicData).content(
            (paragraph as DynamicData).variable
          )}
        </div>
      )}
      {points && (
        <ul className="flex flex-col">
          {points.map((point) => (
            <li key={point.slice(0, 7)} className="darkLi legend">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Rules() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="min-h-screen">
        <SubLayout
          newClasses="flex-center py-[72px]"
          newStyles={{ maxWidth: "600px", backgroundColor: grey[50] }}
        >
          <div className="flex flex-col items-center gap-[72px]">
            <h1 className="text-center">{t("confidentiality-rules")}</h1>
            {paragraphs.map((p) => (
              <ParagraphWithTitle
                key={p.title.slice(0, 7)}
                title={p.title}
                paragraph={p.paragraph}
                points={p.points}
                detail={p.detail}
              />
            ))}
          </div>
        </SubLayout>

        <Footer />
      </div>
    )
  );
}
