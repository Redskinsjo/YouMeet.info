import OpenAI from "openai";
import dotenv from "dotenv";
import prisma from "@youmeet/prisma-config/prisma";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const lowerAllAppelations = async () => {
  const competencies = await prisma.competencies.findMany();
  for (let i = 0; i < competencies.length; i++) {
    const c = competencies[i];
    const appelations = c.appelations;
    const newAppelations = appelations.map((a) => a.toLowerCase());

    await prisma.competencies.update({
      where: { id: c.id },
      data: {
        appelations: { push: newAppelations },
      },
    });
  }
};

const genAppelations = async (str: string) => {
  // misspellings appelations
  const appelation = str.toLowerCase();
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 1,
    frequency_penalty: 1,
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: `Consider this word: '${appelation}'. Determine if it's a competency required for a job, whether technical or functional. If it's technical, 
            it should not make interfere with other technologies, libraries, or frameworks. Generate a list of all the common appelations of the word.
            For example, the Javascript library named React can be written ReactJs, React.js or React JS. Each appellation should thoroughly 
            describe the competency, not overcrossing other competencies.`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "competency_appelations",
        schema: {
          type: "object",
          description:
            "The competency concerned with all its common appelations",
          properties: {
            word: {
              type: "string",
              description: "The competency concerned",
            },
            appelations: {
              type: "array",
              description:
                "A list of a maximum of appelations of the competency",
              items: {
                type: "string",
              },
            },
          },
        },
        description: "List of common misspellings of the word 'React'",
      },
    },
  });

  const res2 = result.choices[0].message.content;
  console.log(res2);
  if (res2) {
    const parsed = JSON.parse(res2);
    const data = parsed.appelations;

    if (data?.length === 0) {
      console.log("X no data:", appelation);
      return;
    }
    return data;
  }
};

const genCompetencies = async (appelations: string[]) => {
  const competencies = await prisma.competencies.findMany();
  const followup: string[] = competencies.map((c) => c.title.toLowerCase());

  // unique appelations
  // all the new appelations to save in the database

  for (let i = 0; i < appelations?.length; i++) {
    const competency = appelations[i].toLowerCase();
    if (followup.includes(competency)) continue;

    const worked = await Promise.all([
      prisma.competencies.create({
        data: {
          title: competency,
          slug: competency,
          definition: "",
          conclusion: "",
          development: "",
          importance: "",
          advantages: [],
          examples: [],
          extension: "",
          keywords: [],
          relatedSkills: [],
          appelations: await genAppelations(competency),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ]);

    if (worked) {
      followup.push(competency);
      console.log(
        "✅",
        "worked for:",
        competency,
        worked[0].appelations.toString()
      );
    }
  }
};

(async () => {
  // const res1 = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   temperature: 0.5,
  //   frequency_penalty: 1,
  //   messages: [
  //     {
  //       role: "user",
  //       content: `Generate a list of unique appelation (only one word per technology) of softwares and tools, that a freelance in the tech industry may master in order to provide
  //         its service, whether of frontend development, backend, development, fullstack development, software engineering, data science, data analysis,
  //         web design and QA engineering. Make sure to provide words that are unique to each competency.`,
  //     },
  //   ],
  //   response_format: {
  //     type: "json_schema",
  //     json_schema: {
  //       name: "tech_competencies",
  //       schema: {
  //         type: "object",
  //         description: "The list of unique appelations of technologies",
  //         properties: {
  //           appelations: {
  //             type: "array",
  //             description:
  //               "A list of unique technologies, libraries and frameworks",
  //             items: {
  //               type: "string",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // let res = res1.choices[0].message.content;
  // console.log(res);

  // if (res) {
  //   const parsed = JSON.parse(res);
  //   const competencies = parsed.appelations;

  //   await genCompetencies(competencies);
  // }

  await lowerAllAppelations();

  console.log("done");
  process.exit();
})();
