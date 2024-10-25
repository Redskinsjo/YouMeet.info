import Footer from "@youmeet/ui/Footer";
import SubLayout from "@youmeet/ui/SubLayout";
import { ParagraphWithTitleTypes } from "@youmeet/types/cgu";
import dynamic from "next/dynamic";

const CGUTitle = dynamic(
  () =>
    import(
      "@youmeet/ui/conditions-generales-utilisation/cguComponents/CGUTitle"
    ),
  { ssr: false }
);

const ParagraphWithTitle = dynamic(
  () =>
    import(
      "@youmeet/ui/conditions-generales-utilisation/cguComponents/ParagraphWithTitle"
    )
);

const paragraphs: ParagraphWithTitleTypes[] = [
  {
    rgpd: false,
    title: "1. Objet",
    detail: {
      variable: "07/10/2023",
      content: (variable: string) => `Date d'entrée en vigueur : ${variable}`,
    },
    paragraph: {
      variable: "YouMeet.info",
      content: (variable: string) =>
        `Le présent document constitue les conditions générales d'utilisation (CGU) du site ${variable} (ci-après "le Site"), 
        qui permet aux chercheurs d'emploi et aux candidats (ci-après "Utilisateur") de connecter leur compte professionnel lié 
        au ministère du travail, afin de rendre leurs expériences professionnelles passées accessibles aux recruteurs. L'accès à 
        ces informations n'est accordé aux recruteurs qu'après l'accord préalable de l'Utilisateur..`,
    },
  },
  {
    title: "2. Description des Services",
    paragraphs: [
      {
        paragraph: "Le Site propose aux Utilisateurs :",
        points: [
          `La possibilité de créer un profil accessible via une connexion sécurisée.`,
          `L'intégration de leurs expériences professionnelles, référencées via leur compte professionnel.`,
          `La mise en relation avec des recruteurs souhaitant vérifier les informations de leur CV.`,
        ],
      },
      {
        paragraph: `Les recruteurs peuvent consulter le profil des Utilisateurs ayant donné leur consentement, 
        afin de vérifier leur parcours professionnel et leurs compétences.`,
      },
    ],
  },
  {
    title: "3. Inscription et Connexion",
    paragraph: `L'Utilisateur doit créer un compte et se connecter via une authentification sécurisée, 
    rattachée à son compte professionnel lié au ministère du travail. En se connectant, l'Utilisateur accepte 
    que ses données professionnelles soient mises à disposition des recruteurs selon les termes définis dans ces CGU.`,
  },
  {
    rgpd: true,
    title: "4. Protection des Données Personnelles",
    paragraph: `Le Site s'engage à respecter la réglementation en vigueur en matière de protection des données 
    personnelles (notamment le RGPD). Les données sont uniquement accessibles après le consentement de l'Utilisateur 
    et ne seront en aucun cas divulguées sans autorisation préalable.
    Les Utilisateurs peuvent demander à tout moment l'accès, la modification ou la suppression de leurs données 
    conformément aux droits prévus par la loi.`,
  },
  {
    title: "5. Consentement de l'Utilisateur",
    paragraph: `L'Utilisateur doit donner son accord explicite pour permettre aux recruteurs de consulter les informations 
    de son profil. Le consentement est demandé pour chaque demande de vérification, garantissant ainsi le respect de la 
    confidentialité des informations partagées..`,
  },
  {
    title: "6. Responsabilité de l'Utilisateur",
    paragraph: `L'Utilisateur s'engage à fournir des informations véridiques et précises lors de son inscription et 
    lors de l'intégration de ses expériences professionnelles. Toute information frauduleuse ou trompeuse pourrait 
    entraîner la suspension de son compte.`,
  },
  {
    title: "7. Responsabilité de YouMeet.info",
    paragraph: `Le Site met en œuvre des mesures de sécurité visant à protéger les données personnelles et 
    professionnelles des Utilisateurs. Toutefois, il ne saurait être tenu responsable en cas d'intrusion illégitime 
    dans ses systèmes informatiques ou de détournement de données, sauf faute prouvée de sa part.`,
  },
  {
    title: "8. Droit de Retrait et de Modification",
    paragraph: `L'Utilisateur peut retirer son consentement à tout moment. Les données ne seront plus consultables 
    par les recruteurs dès lors que l'Utilisateur retire son consentement.`,
    detail: {
      variable: "contact@youmeet.info",
      content: (variable: string) =>
        `Si vous avez des questions ou des préoccupations concernant ces CGU, veuillez nous contacter à ${variable}.`,
    },
  },
  {
    title: "9. Modifications des CGU",
    paragraph: `[Nom du site] se réserve le droit de modifier les présentes CGU à tout moment. Les Utilisateurs 
    seront informés de toute modification importante et devront accepter les nouvelles conditions pour continuer 
    à utiliser les services.`,
  },
  {
    title: "10. Juridiction et Droit Applicable",
    paragraph: `Les présentes CGU sont régies par le droit en vigueur en France. Tout litige relatif à leur interprétation 
    et/ou leur exécution relève de la compétence exclusive des tribunaux compétents.`,
  },
];

export default function GeneralConditions() {
  return (
    <div>
      <div className="min-h-screen dark:darkBg">
        <SubLayout
          newClasses="py-[72px] bg-grey50 dark:darkBg"
          newStyles={{
            maxWidth: "1100px",
            display: "block",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="p-[24px]">
            <CGUTitle />
            {paragraphs.map((p) => (
              <ParagraphWithTitle
                key={p.title}
                title={p.title}
                paragraph={p.paragraph}
                paragraphs={p.paragraphs}
                points={p.points}
                detail={p.detail}
                titles={p.titles}
              />
            ))}
          </div>
        </SubLayout>
      </div>

      <Footer />
    </div>
  );
}
