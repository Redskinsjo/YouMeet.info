"use client";
import Footer from "@youmeet/components/Footer";
import SubLayout from "@youmeet/components/SubLayout";
import { grey } from "@mui/material/colors";
import CGUTitle from "@youmeet/app/conditions-generales-utilisation/cguComponents/CGUTitle";
import ParagraphWithTitle from "@youmeet/app/conditions-generales-utilisation/cguComponents/ParagraphWithTitle";
import { DynamicData, ParagraphWithTitleTypes } from "@youmeet/types/cgu";

const paragraphs = [
  {
    rgpd: false,
    title: "Application Web de Mise en Relation Entre Candidats et Recruteurs",
    detail: {
      variable: "07/10/2023",
      content: (variable: string) => `Date d'entrée en vigueur : ${variable}`,
    },
    paragraph: {
      variable: "YouMeet",
      content: (variable: string) =>
        `Bienvenue sur notre application web dédiée au recrutement et à la prise de référence des candidats. Avant d'utiliser notre service, veuillez lire attentivement ces Conditions Générales d'Utilisation (CGU). En accédant et en utilisant notre application web, vous acceptez d'être lié par ces CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.`,
    },
  },
  {
    title: "1. Définitions",
    paragraph:
      "Nous collectons uniquement les données personnelles nécessaires à des fins de recrutement et de prise de référence. Ces informations peuvent inclure :",
    points: [
      {
        variable: "YouMeet",
        content: (variable: string) =>
          `"Application Web" fait référence à ${variable}, développée par Jonathan Carnos, qui permet le recrutement et la prise de référence des candidats.`,
      },
      `"Utilisateur" désigne toute personne ou entité qui accède ou utilise l'application web.`,
      {
        variable: "Jonathan Carnos",
        content: (variable: string) =>
          `"Nous", "notre", "notre entreprise" se réfère à ${variable}.`,
      },
    ],
  },
  {
    title: "2. Utilisation de l'Application Web",
    titles: [
      {
        title: "2.1 Eligibilité",
        paragraph: `L'utilisation de notre application web est réservée aux personnes âgées d'au moins 18 ans. En utilisant notre service, vous déclarez avoir l'âge légal requis. Si vous utilisez notre application web au nom d'une entreprise, vous déclarez avoir l'autorité nécessaire pour lier cette entreprise à ces CGU.`,
      },
      {
        title: "2.2 Compte Utilisateur",
        paragraph: `Pour accéder à certaines fonctionnalités de l'application web, vous devrez créer un compte utilisateur. Vous êtes responsable de maintenir la confidentialité de vos informations de connexion et de toutes les activités associées à votre compte.`,
      },
    ],
  },
  {
    title: "3. Règles d'Utilisation",
    titles: [
      {
        title: "3.1 Respect de la Loi",
        paragraph: `Vous acceptez de respecter toutes les lois applicables lors de l'utilisation de notre application web. Vous ne devez pas utiliser notre service à des fins illégales ou frauduleuses.`,
      },
      {
        title: "3.2 Contenu Utilisateur",
        paragraph: `En publiant, soumettant ou partageant du contenu sur notre application web, vous acceptez de ne pas publier de contenu diffamatoire, offensant, illégal ou contraire à l'éthique. Vous restez seul responsable du contenu que vous partagez.`,
      },
      {
        title: "3.3 Propriété Intellectuelle",
        paragraph: `Notre application web et tout son contenu, y compris le texte, les images, les logos, les marques de commerce, les vidéos et les logiciels, sont protégés par des droits de propriété intellectuelle détenus par notre entreprise. Vous acceptez de ne pas reproduire, distribuer, modifier ou créer des œuvres dérivées de notre contenu sans notre autorisation écrite.`,
      },
    ],
  },
  {
    title: "4. Confidentialité des Données",
    paragraph: `Nous respectons la confidentialité de vos données personnelles. Pour plus d'informations sur la manière dont nous collectons, utilisons et partageons vos données, veuillez vous référer à notre Politique de Confidentialité.`,
  },
  {
    title: "5. Modifications des CGU",
    paragraph: `Nous nous réservons le droit de mettre à jour ces CGU en fonction des évolutions légales ou de notre service. Toute modification sera publiée sur cette page, et votre utilisation continue de l'application web après la publication des modifications constitue votre acceptation des CGU révisées.`,
  },
  {
    title: "6. Résiliation",
    paragraph: `Nous nous réservons le droit de résilier ou de suspendre votre accès à l'application web en cas de non-respect des CGU.`,
  },
  {
    title: "7. Contact",
    paragraph: {
      variable: "contact@youmeet.info",
      content: (variable: string) =>
        `En utilisant notre application web, vous acceptez ces Conditions Générales d'Utilisation. Merci de votre confiance et de votre respect des règles et réglementations pour un usage responsable de notre service.`,
    },
    detail: {
      variable: "contact@youmeet.info",
      content: (variable: string) =>
        `Si vous avez des questions ou des préoccupations concernant ces CGU, veuillez nous contacter à ${variable}.`,
    },
  },
  {
    title: "8. RGPD",
    paragraphs: [],
    titles: [
      {
        title: "3.1 Définitions",
        paragraph: `Les termes « données à caractère personnel », « personne concernée », « sous traitant » et « données sensibles » ont le sens défini par le Règlement Général sur la Protection des Données (RGPD : n° 2016-679)`,
        points: [
          `+Client= : tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le Site objet des présentes conditions générales.`,
          {
            variable: "YouMeet",
            content: (variable: string) =>
              `+Prestations et Services= : ${variable} met à disposition des Clients :`,
          },
          `+Contenu= : Ensemble des éléments constituants l’information présente sur le Site, notamment textes – images – vidéos.`,
          {
            variable: "YouMeet",
            content: (variable: string) =>
              `+Informations clients= : Ci après dénommé « Information (s) » qui correspondent à l’ensemble des données personnelles susceptibles d’être détenues par ${variable} pour la gestion de votre compte, de la gestion de la relation client et à des fins d’analyses et de statistiques.
            `,
          },
          `+Utilisateur= : Internaute se connectant, utilisant le site susnommé.`,
          `+Informations personnelles= : « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).`,
        ],
      },
      {
        title: "3.2 Présentation du site internet",
        paragraph: {
          variable: "YouMeet",
          content: (
            variable: string
          ) => `En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet ${variable} l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi:
          +Propriétaire= :  auto-entreprise Jonathan Carnos   – 23 rue Baron 75017 Paris`,
        },
        points: [
          `+Responsable publication= : Jonathan Carnos – jonathan.carnos@gmail.com
          Le responsable publication est une personne physique ou une personne morale.`,
          `+Webmaster= : Jonathan Carnos – jonathan.carnos@gmail.com`,
          `+Hébergeur= : Vercel Inc – 440 N Barranca Ave #4133 91723 Covina, CA privacy@vercel.com`,
          `+Délégué à la protection des données= : Jonathan Carnos – jonathan.carnos@gmail.com`,
        ],
        detail: {
          variable: `https://fr.orson.io/1371/generateur-mentions-legales`,
          content: (variable: string) =>
            `Ce modèle de mentions légales est proposé par le générateur de mentions légales RGPD d'+Orson.io= : ${variable}`,
        },
      },
      {
        title:
          "3.3 Conditions générales d’utilisation du site et des services proposés",
        paragraphs: [
          `Le Site constitue une œuvre de l’esprit protégée par les dispositions du Code de la Propriété Intellectuelle et des Réglementations Internationales applicables. 
          Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou travaux du Site.`,
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `L’utilisation du site ${variable} implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site ${variable} sont donc invités à les consulter de manière régulière.`,
          },
          {
            variable: `YouMeet`,
            content: (
              variable: string
            ) => `Ce site internet est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par ${variable}, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.
          Le site web ${variable} est mis à jour régulièrement par ${variable} responsable. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.`,
          },
        ],
      },
      {
        title: `3.4 Description des services fournis`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (
              variable: string
            ) => `Le site internet ${variable} a pour objet de fournir une information concernant l’ensemble des activités de la société.
        ${variable} s’efforce de fournir sur le site ${variable} des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Toutes les informations indiquées sur le site ${variable} sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le site ${variable} ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.`,
          },
        ],
      },
      {
        title: `3.5 Limitations contractuelles sur les données techniques`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (
              variable: string
            ) => `Le site utilise la technologie JavaScript.

            Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour
            Le site ${variable} est hébergé chez un prestataire sur le territoire de l’Union Européenne conformément aux dispositions du Règlement Général sur la Protection des Données (RGPD : n° 2016-679)`,
          },
          `L’objectif est d’apporter une prestation qui assure le meilleur taux d’accessibilité. L’hébergeur assure la continuité de son service 24 Heures sur 24, tous les jours de l’année. Il se réserve néanmoins la possibilité d’interrompre le service d’hébergement pour les durées les plus courtes possibles notamment à des fins de maintenance, d’amélioration de ses infrastructures, de défaillance de ses infrastructures ou si les Prestations et Services génèrent un trafic réputé anormal.`,
          {
            variable: `YouMeet`,
            content: (
              variable: string
            ) => `${variable} et l’hébergeur ne pourront être tenus responsables en cas de dysfonctionnement du réseau Internet, des lignes téléphoniques ou du matériel informatique et de téléphonie lié notamment à l’encombrement du réseau empêchant l’accès au serveur.
            `,
          },
        ],
      },
      {
        title: `3.6 Propriété intellectuelle et contrefaçons`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (
              variable: string
            ) => `${variable} est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, icônes et sons.
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : ${variable}.`,
          },
          `L’objectif est d’apporter une prestation qui assure le meilleur taux d’accessibilité. L’hébergeur assure la continuité de son service 24 Heures sur 24, tous les jours de l’année. Il se réserve néanmoins la possibilité d’interrompre le service d’hébergement pour les durées les plus courtes possibles notamment à des fins de maintenance, d’amélioration de ses infrastructures, de défaillance de ses infrastructures ou si les Prestations et Services génèrent un trafic réputé anormal.`,
          `Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.`,
        ],
      },
      {
        title: `3.7 Limitations de responsabilité`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `${variable} agit en tant qu’éditeur du site. ${variable}  est responsable de la qualité et de la véracité du Contenu qu’il publie.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `${variable} ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site internet ${variable}, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `${variable} ne pourra également être tenu responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site ${variable}.
              Des espaces interactifs (possibilité de poser des questions dans l’espace contact) sont à la disposition des utilisateurs. ${variable} se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, ${variable} se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …).`,
          },
        ],
      },
      {
        title: `3.8 Gestion des données personnelles`,
        paragraph: `Le Client est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l’Economie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).`,
        titles: [
          {
            title: `3.8.1 Responsables de la collecte des données personnelles`,
            paragraphs: [
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Pour les Données Personnelles collectées dans le cadre de la création du compte personnel de l’Utilisateur et de sa navigation sur le Site, le responsable du traitement des Données Personnelles est : Jonathan Carnos. ${variable} est représenté par Jonathan Carnos, son représentant légal.`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `En tant que responsable du traitement des données qu’il collecte, ${variable} s’engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient notamment au Client d’établir les finalités de ses traitements de données, de fournir à ses prospects et clients, à partir de la collecte de leurs consentements, une information complète sur le traitement de leurs données personnelles et de maintenir un registre des traitements conforme à la réalité.
                  Chaque fois que ${variable} traite des Données Personnelles, ${variable} prend toutes les mesures raisonnables pour s’assurer de l’exactitude et de la pertinence des Données Personnelles au regard des finalités pour lesquelles ${variable} les traite.`,
              },
            ],
          },
          {
            title: `3.8.2 Finalité des données collectées`,
            paragraph: {
              variable: `YouMeet`,
              content: (variable: string) =>
                `Vos données personnelles ne sont jamais commercialisées et sont utilisées uniquement dans le cadre des finalités mentionnées ci-dessous, en accord avec les réglementations en vigueur sur la protection des données.`,
            },
            points: [
              `Mise en relation avec les recruteurs : Les informations fournies par les candidats sont partagées avec les recruteurs abonnés à YouMeet afin de faciliter les processus de recrutement et d'optimiser les chances d'embauche.`,
              `Navigation et gestion du Site : Les données de connexion et d’utilisation sont utilisées pour assurer la navigation sur le site, ainsi que pour gérer et tracer les services commandés par l’utilisateur, y compris la facturation et l’historique des commandes.`,
              `Prévention et lutte contre la fraude : Les informations telles que le matériel informatique utilisé pour la navigation, l’adresse IP et le mot de passe (hashé) sont traitées pour prévenir et lutter contre les fraudes informatiques (spamming, hacking, etc.).`,
              `Amélioration de l’expérience utilisateur : Les données de connexion et d’utilisation sont analysées pour améliorer la navigation et les fonctionnalités du site.`,
              `Enquêtes de satisfaction : L’adresse email peut être utilisée pour mener des enquêtes de satisfaction facultatives sur les services de YouMeet.`,
              `Campagnes de communication : Le numéro de téléphone et l’adresse email peuvent être utilisés pour envoyer des communications, telles que des notifications, des mises à jour de service, et des offres promotionnelles, avec le consentement préalable de l’utilisateur.`,
            ],
            detail: {
              variable: `YouMeet`,
              content: (variable: string) =>
                `${variable} collecte et utilise vos données personnelles exclusivement dans le cadre de sa mission de mise en relation entre les candidats et les recruteurs ou services de ressources humaines. Les données sont utilisées dans les cas suivants :`,
            },
          },
          {
            title: `3.8.3 Reconnaissance de l'embauche via l'application`,
            paragraph: {
              variable: `YouMeet`,
              content: (variable: string) =>
                `Cette reconnaissance permet à YouMeet de démontrer à ses clients que la mission de mise en relation a été accomplie avec succès. En confirmant l'embauche, l'utilisateur contribue à la transparence et à la fiabilité des résultats obtenus par l'application, permettant ainsi à YouMeet de prouver l'efficacité de ses services et de continuer à améliorer ses fonctionnalités pour répondre aux besoins des utilisateurs.`,
            },
            detail: {
              variable: `YouMeet`,
              content: (variable: string) =>
                `En cas de mise en relation par YouMeet avec un recruteur ou une entreprise aboutissant à une embauche, l'utilisateur reconnaît que son besoin d'emploi a été satisfait grâce aux services de l'application. L'utilisateur s'engage à informer YouMeet de cette embauche en confirmant qu'elle a été réalisée par l'intermédiaire de la plateforme.`,
            },
          },
          {
            title: `3.8.4 Droit d’accès, de rectification et d’opposition`,
            paragraphs: [
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Dès que ${variable} a connaissance du décès d’un Utilisateur et à défaut d’instructions de sa part, ${variable} s’engage à détruire ses données, sauf si leur conservation s’avère nécessaire à des fins probatoires ou pour répondre à une obligation légale.`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Si l’Utilisateur souhaite savoir comment ${variable} utilise ses Données Personnelles, demander à les rectifier ou s’oppose à leur traitement, l’Utilisateur peut contacter ${variable} par écrit à l’adresse suivante :
                  
                Jonathan Carnos – DPO, Jonathan Carnos
                23 rue Baron 75017 Paris.
                 
                Dans ce cas, l’Utilisateur doit indiquer les Données Personnelles qu’il souhaiterait que ${variable} corrige, mette à jour ou supprime, en s’identifiant précisément avec une copie d’une pièce d’identité (carte d’identité ou passeport).`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Les demandes de suppression de Données Personnelles seront soumises aux obligations qui sont imposées à ${variable} par la loi, notamment en matière de conservation ou d’archivage des documents. Enfin, les Utilisateurs de ${variable} peuvent déposer une réclamation auprès des autorités de contrôle, et notamment de la CNIL (https://www.cnil.fr/fr/plaintes).`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Conformément à la réglementation européenne en vigueur, les Utilisateurs de ${variable} disposent des droits suivants :`,
              },
            ],
            points: [
              `droit d'accès (article 15 RGPD) et de rectification (article 16 RGPD), de mise à jour, de complétude des données des Utilisateurs droit de verrouillage ou d’effacement des données des Utilisateurs à caractère personnel (article 17 du RGPD), lorsqu’elles sont inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l'utilisation, la communication ou la conservation est interdite`,
              `droit de retirer à tout moment un consentement (article 13-2c RGPD)`,
              `droit à la limitation du traitement des données des Utilisateurs (article 18 RGPD)`,
              `droit d’opposition au traitement des données des Utilisateurs (article 21 RGPD)`,
              `droit à la portabilité des données que les Utilisateurs auront fournies, lorsque ces données font l’objet de traitements automatisés fondés sur leur consentement ou sur un contrat (article 20 RGPD)`,
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `droit de définir le sort des données des Utilisateurs après leur mort et de choisir à qui ${variable} devra communiquer (ou non) ses données à un tiers qu’ils aura préalablement désigné`,
              },
            ],
          },
          {
            title: `3.8.5 Non-communication des données personnelles`,
            paragraphs: [
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `${variable} s’interdit de traiter, héberger ou transférer les Informations collectées sur ses Clients vers un pays situé en dehors de l’Union européenne ou reconnu comme « non adéquat » par la Commission européenne sans en informer préalablement le client. Pour autant, ${variable} reste libre du choix de ses sous-traitants techniques et commerciaux à la condition qu’il présentent les garanties suffisantes au regard des exigences du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `${variable} s’engage à prendre toutes les précautions nécessaires afin de préserver la sécurité des Informations et notamment qu’elles ne soient pas communiquées à des personnes non autorisées. Cependant, si un incident impactant l’intégrité ou la confidentialité des Informations du Client est portée à la connaissance de ${variable}, celle-ci devra dans les meilleurs délais informer le Client et lui communiquer les mesures de corrections prises. Par ailleurs ${variable} ne collecte aucune « données sensibles ».`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Les Données Personnelles de l’Utilisateur peuvent être traitées par des filiales de ${variable} et des sous-traitants (prestataires de services), exclusivement afin de réaliser les finalités de la présente politique.
                  `,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Dans la limite de leurs attributions respectives et pour les finalités rappelées ci-dessus, les principales personnes susceptibles d’avoir accès aux données des Utilisateurs de ${variable} sont principalement les agents de notre service client.`,
              },
            ],
          },
          {
            rgpd: true,
            title: `3.8.6 Types de données collectées`,
            paragraph: {
              variable: `YouMeet`,
              content: (variable: string) =>
                `Concernant les utilisateurs de ${variable}, nous collectons les données suivantes qui sont indispensables au fonctionnement du service, et qui seront conservées pendant une période maximale de 18 mois mois après la fin de la relation contractuelle: nom, prénom, email, numéro de téléphone, vidéo de présentation personnelle. ${variable} collecte en outre des informations qui permettent d’améliorer l’expérience utilisateur et de proposer des conseils contextualisés: Langues parlées, age, profil Linkedin, expériences professionnelles, description personnelle Ces données sont conservées pour une période maximale de 18 mois mois après la fin de la relation contractuelle`,
            },
          },
        ],
      },
      {
        title: `3.9 Notification d’incident`,
        paragraphs: [
          `Quels que soient les efforts fournis, aucune méthode de transmission sur Internet et aucune méthode de stockage électronique n'est complètement sûre. Nous ne pouvons en conséquence pas garantir une sécurité absolue. 
          Si nous prenions connaissance d'une brèche de la sécurité, nous avertirions les utilisateurs concernés afin qu'ils puissent prendre les mesures appropriées. Nos procédures de notification d’incident tiennent compte de nos obligations légales, qu'elles se situent au niveau national ou européen. Nous nous engageons à informer pleinement nos clients de toutes les questions relevant de la sécurité de leur compte et à leur fournir toutes les informations nécessaires pour les aider à respecter leurs propres obligations réglementaires en matière de reporting.`,
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Aucune information personnelle de l'utilisateur du site ${variable} n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat de ${variable} et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site ${variable}.`,
          },
        ],
        titles: [
          {
            title: `Sécurité`,
            paragraphs: [
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Pour assurer la sécurité et la confidentialité des Données Personnelles et des Données Personnelles de Santé, ${variable} utilise des réseaux protégés par des dispositifs standards tels que par pare-feu, la pseudonymisation, l’encryption et mot de passe.`,
              },
              {
                variable: `YouMeet`,
                content: (variable: string) =>
                  `Lors du traitement des Données Personnelles, ${variable} prend toutes les mesures raisonnables visant à les protéger contre toute perte, utilisation détournée, accès non autorisé, divulgation, altération ou destruction.`,
              },
            ],
          },
        ],
      },
      {
        title: `3.10 Liens hypertextes « cookies » et balises (“tags”) internet`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Le site ${variable} contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de ${variable}. Cependant, ${variable} n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.`,
          },
          `Sauf si vous décidez de désactiver les cookies, vous acceptez que le site puisse les utiliser. Vous pouvez à tout moment désactiver ces cookies et ce gratuitement à partir des possibilités de désactivation qui vous sont offertes et rappelées ci-après, sachant que cela peut réduire ou empêcher l’accessibilité à tout ou partie des Services proposés par le site.`,
        ],
      },
      {
        title: `3.11 « COOKIES »`,
        paragraphs: [
          `Un « cookie » est un petit fichier d’information envoyé sur le navigateur de l’Utilisateur et enregistré au sein du terminal de l’Utilisateur (ex : ordinateur, smartphone), (ci-après « Cookies »). Ce fichier comprend des informations telles que le nom de domaine de l’Utilisateur, le fournisseur d’accès Internet de l’Utilisateur, le système d’exploitation de l’Utilisateur, ainsi que la date et l’heure d’accès. Les Cookies ne risquent en aucun cas d’endommager le terminal de l’Utilisateur.`,
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `${variable} est susceptible de traiter les informations de l’Utilisateur concernant sa visite du Site, telles que les pages consultées, les recherches effectuées. Ces informations permettent à ${variable} d’améliorer le contenu du Site, de la navigation de l’Utilisateur.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Les Cookies facilitant la navigation et/ou la fourniture des services proposés par le Site, l’Utilisateur peut configurer son navigateur pour qu’il lui permette de décider s’il souhaite ou non les accepter de manière à ce que des Cookies soient enregistrés dans le terminal ou, au contraire, qu’ils soient rejetés, soit systématiquement, soit selon leur émetteur. L’Utilisateur peut également configurer son logiciel de navigation de manière à ce que l’acceptation ou le refus des Cookies lui soient proposés ponctuellement, avant qu’un Cookie soit susceptible d’être enregistré dans son terminal. ${variable} informe l’Utilisateur que, dans ce cas, il se peut que les fonctionnalités de son logiciel de navigation ne soient pas toutes disponibles.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Si l’Utilisateur refuse l’enregistrement de Cookies dans son terminal ou son navigateur, ou si l’Utilisateur supprime ceux qui y sont enregistrés, l’Utilisateur est informé que sa navigation et son expérience sur le Site peuvent être limitées. Cela pourrait également être le cas lorsque ${variable} ou l’un de ses prestataires ne peut pas reconnaître, à des fins de compatibilité technique, le type de navigateur utilisé par le terminal, les paramètres de langue et d’affichage ou le pays depuis lequel le terminal semble connecté à Internet.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Le cas échéant, ${variable} décline toute responsabilité pour les conséquences liées au fonctionnement dégradé du Site et des services éventuellement proposés par ${variable}, résultant (i) du refus de Cookies par l’Utilisateur (ii) de l’impossibilité pour ${variable} d’enregistrer ou de consulter les Cookies nécessaires à leur fonctionnement du fait du choix de l’Utilisateur. Pour la gestion des Cookies et des choix de l’Utilisateur, la configuration de chaque navigateur est différente. Elle est décrite dans le menu d’aide du navigateur, qui permettra de savoir de quelle manière l’Utilisateur peut modifier ses souhaits en matière de Cookies.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `À tout moment, l’Utilisateur peut faire le choix d’exprimer et de modifier ses souhaits en matière de Cookies. ${variable} pourra en outre faire appel aux services de prestataires externes pour l’aider à recueillir et traiter les informations décrites dans cette section.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Enfin, en cliquant sur les icônes dédiées aux réseaux sociaux Twitter, Facebook, Linkedin et Google Plus figurant sur le Site de ${variable} ou dans son application mobile et si l’Utilisateur a accepté le dépôt de cookies en poursuivant sa navigation sur le Site Internet ou l’application mobile de ${variable}, Twitter, Facebook, Linkedin et Google Plus peuvent également déposer des cookies sur vos terminaux (ordinateur, tablette, téléphone portable).`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Ces types de cookies ne sont déposés sur vos terminaux qu’à condition que vous y consentiez, en continuant votre navigation sur le Site Internet ou l’application mobile de ${variable}. À tout moment, l’Utilisateur peut néanmoins revenir sur son consentement à ce que ${variable} dépose ce type de cookies.`,
          },
        ],
      },
      {
        title: `3.12 BALISES (“TAGS”) INTERNET`,
        paragraphs: [
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `${variable} peut employer occasionnellement des balises Internet (également appelées « tags », ou balises d’action, GIF à un pixel, GIF transparents, GIF invisibles et GIF un à un) et les déployer par l’intermédiaire d’un partenaire spécialiste d’analyses Web susceptible de se trouver (et donc de stocker les informations correspondantes, y compris l’adresse IP de l’Utilisateur) dans un pays étranger.`,
          },
          `Ces balises sont placées à la fois dans les publicités en ligne permettant aux internautes d’accéder au Site, et sur les différentes pages de celui-ci.`,
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Cette technologie permet à ${variable} d’évaluer les réponses des visiteurs face au Site et l’efficacité de ses actions (par exemple, le nombre de fois où une page est ouverte et les informations consultées), ainsi que l’utilisation de ce Site par l’Utilisateur.`,
          },
          {
            variable: `YouMeet`,
            content: (variable: string) =>
              `Le prestataire externe pourra éventuellement recueillir des informations sur les visiteurs du Site et d’autres sites Internet grâce à ces balises, constituer des rapports sur l’activité du Site à l’attention de ${variable}, et fournir d’autres services relatifs à l’utilisation de celui-ci et d’Internet.`,
          },
        ],
      },
      {
        title: `3.13 Droit applicable et attribution de juridiction`,
        paragraph: {
          variable: `YouMeet`,
          content: (variable: string) =>
            `Tout litige en relation avec l’utilisation du site ${variable} est soumis au droit français. 
            En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris`,
        },
      },
    ],
  },
];

export default function GeneralConditions() {
  return (
    <div className="min-h-screen dark:darkBg">
      <SubLayout
        newClasses="flex-center py-[72px] bg-grey50 dark:darkBg"
        newStyles={{ maxWidth: "1100px" }}
      >
        <div className="flex flex-col gap-[72px] items-center">
          <CGUTitle />
          {paragraphs.map((p) => (
            <ParagraphWithTitle
              key={p.title.slice(0, 20)}
              title={p.title}
              paragraph={p.paragraph}
              paragraphs={p?.paragraphs}
              points={p.points as string[] | DynamicData[] | undefined}
              detail={p.detail}
              titles={p.titles as ParagraphWithTitleTypes[]}
            />
          ))}
        </div>
      </SubLayout>

      <Footer />
    </div>
  );
}
