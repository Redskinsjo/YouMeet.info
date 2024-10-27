import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI();

const basicContext =
  "Tu t'appelles Jonathan et tu es recruteur chez une plateforme de recrutement dénommée YouMeet. Tu ne fais que transmettre la demande du recruteur au candidat qui est intéressé par son profil. Présente-toi de manière explicite. Ton intention est de rassembler des informations pour le recruteur. Tu peux avoir un certain sens de l'humour, mais tu dois rester professionel: donc tu vouvoies ton interlocuteur et tu ne dis pas 'salut'. Sépare les différents points de ta réponse en paragraphes distincts. De toute ta réponse, une question ne doit apparaître qu'une seule fois. ";

export const getSystemCxt = (
  advancedContext = ""
): ChatCompletionMessageParam => ({
  role: "system",
  content: basicContext + advancedContext,
  name: "Jonathan",
});

export const presentationCtx = (
  companyName: string,
  jobTitle: string,
  candidateName: string,
  newCtx?: string
) =>
  `${
    candidateName ? `Ton interlocuteur s'appelle ${candidateName}.` : ""
  }D'abord, présente le fait que tu sois recruteur chez Youmeet. Puis, remercie ton interlocuteur sur le fait qu'il ait candidaté à l'offre ${
    jobTitle ? `de ${jobTitle}` : ""
  }${
    companyName ? ` chez ${companyName}` : ""
  }. Enfin, signe le message de ton nom: Jonathan. ${newCtx ?? ""}. `;

export const questionCtx = (
  type: string,
  prefix: string,
  text: string,
  companyName: string,
  candidateName: string,
  jobTitle: string
) =>
  `${
    type
      ? `Tout d'abord, explique à ${candidateName} que c'est une question de type ${type} pour un poste de ${jobTitle}, `
      : ""
  } ${
    text
      ? `demande à ${candidateName} de la part du recruteur, appelé ${companyName}, ${text} (cette question sera entouré d'un + au début et d'un = à la fin). `
      : ""
  } Donne des indications à ${candidateName} sur quoi répondre à ce type de questions et sur comment répondre, avec quelle attitude. ${
    prefix ? `Enfin, ajoute le commentaire venant du recruteur: ${prefix}.` : ""
  }. Ton message ne doit pas dépasser 75 mots.`;

export const generateChat = async (
  temperature: number | null,
  maxTokens: number | null,
  presencePenalty: number | null,
  frequencePenalty: number | null,
  n: number | null,
  previousMsgs: ChatCompletionMessageParam[],
  model: "gpt-3.5-turbo" | "gpt-4o" | "gpt-4" | "gpt-4-turbo" = "gpt-3.5-turbo"
) => {
  return await openai.chat.completions.create({
    model,
    temperature,
    max_tokens: maxTokens,
    presence_penalty: presencePenalty,
    frequency_penalty: frequencePenalty,
    n,
    messages: [...previousMsgs],
  });
};
