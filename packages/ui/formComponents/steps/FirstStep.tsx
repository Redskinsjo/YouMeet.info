import Validation from "../fields/Validation";
import SimpleField from "../fields/SimpleField";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import PhoneField from "../fields/PhoneField";
import GenericField from "../fields/GenericField";
import { purple } from "@mui/material/colors";
import SelectField from "../fields/SelectField";
import ContractTypeField from "../fields/ContractTypeField";
import RemoteField from "../fields/RemoteField";
import LanguagesField from "../fields/LanguagesField";
import dynamic from "next/dynamic";
import LoadingButton from "@mui/lab/LoadingButton";

const AvatarsField = dynamic(() => import("../fields/AvatarsField"), {
  ssr: false,
  loading: () => (
    <LoadingButton
      size="small"
      loading={true}
      variant="text"
      style={{
        position: "absolute",
        backgroundColor: "unset",
        zIndex: 10,
      }}
      disabled
    />
  ),
});

export const companyFirstPartPages = [
  {
    field: AvatarsField,
    props: {
      name: "logo",
      id: 1,
      label: "Images",
      type: "text",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "name",
      required: true,
      id: 2,
      label: "Nom de l'entreprise",
      type: "text",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "location",
      required: true,
      id: 3,
      label: "Localité de l'entreprise",
      type: "text",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "resume",
      required: true,
      id: 4,
      multiline: true,
      rows: 6,
      label: "Description de l'entreprise",
      type: "text",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "linkedinProfilePage",
      id: 5,
      label: "Page Linkedin",
      type: "text",
    },
  },
  {
    field: AvatarsField,
    props: {
      name: "video",
      id: 6,
      label: "Video",
      type: "text",
    },
  },
  {
    field: Validation,
    props: {
      name: "validation",
      id: 7,
      type: "text",
    },
  },
] as { field: any; props: NewFieldProps }[];

export const offerFirstPartPages = [
  {
    field: SelectField,
    props: {
      required: true,
      name: "job",
      location: "job",
      placeholder: "Quel est le titre de l'emploi ?",
      label: "Titre de l'emploi",
      id: 1,
      type: "text",
      multiple: false,
    },
  },
  {
    field: GenericField,
    props: {
      required: true,
      name: "content",
      location: "content",
      placeholder: "Quel est le résumé de l'offre ?",
      label: "Résumé de l'offre",
      multiline: 12,
      border: `0.5px solid ${purple[500]}`,
      basic: true,
      id: 2,
      type: "text",
    },
  },
  {
    field: GenericField,
    props: {
      required: true,
      name: "profileSearched",
      location: "profileSearched",
      placeholder: "Quel est le profil recherché ?",
      label: "Profil recherché",
      multiline: 12,
      border: `0.5px solid ${purple[500]}`,
      basic: true,
      id: 3,
      type: "text",
    },
  },

  {
    field: SelectField,
    props: {
      required: true,
      multiple: true,
      name: "requirements",
      location: "requirements",
      placeholder: "Quels sont les requis ?",
      label: "Les requis",
      multiline: 6,
      border: `0.5px solid ${purple[500]}`,
      id: 4,
      type: "text",
    },
  },
  {
    field: GenericField,
    props: {
      name: "revenue",
      basic: true,
      location: "revenue",
      placeholder: "Quel est le salaire proposé ?",
      label: "Revenu annuel de l'emploi",
      border: `0.5px solid ${purple[500]}`,
      id: 5,
      type: "number",
    },
  },
  {
    field: ContractTypeField,
    props: {
      required: true,
      name: "contractType",
      placeholder: "Quel est le type de contrat ?",
      label: "Type de contrat",
      id: 6,
      type: "text",
    },
  },
  {
    field: RemoteField,
    props: {
      required: true,
      name: "remote",
      placeholder: "Est-ce du télétravail ?",
      label: "Télétravail",
      id: 7,
      type: "text",
    },
  },
  {
    field: GenericField,
    props: {
      required: true,
      basic: true,
      name: "location",
      location: "location",
      placeholder: "Quelle est la localistion de l'emploi ?",
      label: "Localisation de l'emploi",
      border: `0.5px solid ${purple[500]}`,
      id: 8,
      type: "text",
    },
  },
  {
    field: GenericField,
    props: {
      type: "month",
      name: "limitDate",
      location: "limitDate",
      placeholder: "Quelle est la date limite de l'offre ?",
      label: "Date limite de l'offre",
      border: `0.5px solid ${purple[500]}`,
      id: 9,
    },
  },
  {
    field: GenericField,
    props: {
      name: "jobDescriptionLink",
      location: "jobDescriptionLink",
      placeholder: "Quel est le lien vers l'offre originale ?",
      label: "Lien vers offre originale",
      border: `0.5px solid ${purple[500]}`,
      id: 10,
      type: "text",
    },
  },
  // {
  //   field: GenericField,
  //   props: {
  //     name: "companyName",
  //     location: "companyName",
  //     placeholder:
  //       "Vous rediffusez: Quel est le nom de l'entreprise qui recrute ?",
  //     label: "Rediffusion: Nom de l'entreprise qui recrute",
  //     border: `0.5px solid ${purple[500]}`,
  //     id: 11,
  //     type: "text",
  //   },
  // },
  {
    field: Validation,
    props: {
      name: "validation",
      id: 11,
      type: "text",
    },
  },
] as { field: any; props: NewFieldProps }[];

export const firstPartPages = [
  {
    field: SimpleField,
    props: {
      name: "firstname",
      id: 0,
      required: true,
      label: "Prénom",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "lastname",
      id: 1,
      required: true,
      label: "Nom",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "email",
      id: 2,
      required: true,
      label: "Email",
    },
  },
  {
    field: PhoneField,
    props: {
      name: "phone",
      id: 3,
      label: "Téléphone",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "linkedinProfileId",
      id: 4,
      label: "Linkedin",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "description",
      id: 5,
      multiline: true,
      rows: 6,
      label: "Description",
    },
  },
  {
    field: AvatarsField,
    props: {
      name: "avatars",
      id: 6,
      label: "Images",
    },
  },
  {
    field: LanguagesField,
    props: {
      name: "languages",
      id: 7,
      label: "Langues",
      select: true,
      multiple: true,
    },
  },
  {
    field: SimpleField,
    props: {
      name: "age",
      id: 8,
      label: "Âge",
    },
  },
  {
    field: SimpleField,
    props: {
      name: "salaryExpected",
      id: 9,
      label: "Salaire, TJM souhaité. Précisez (par an, par mois, par jour)",
    },
  },
  {
    field: Validation,
    props: {
      name: "validation",
      id: 10,
    },
  },
] as { field: any; props: NewFieldProps }[];
