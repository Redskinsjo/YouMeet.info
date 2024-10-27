import OpenAI from "openai";
import dotenv from "dotenv";
import prisma from "@youmeet/prisma-config/prisma";
import { Competency } from "@youmeet/gql/generated";
import setUniqueInput from "@youmeet/utils/backoffice/setUniqueInput";
const { setUniqueSlugAndExtension } = setUniqueInput;

dotenv.config();

const list = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "PHP",
  "Laravel",
  "Symfony",
  ".NET",
  "ASP.NET",
  "Java",
  "Spring Boot",
  "Python",
  "Django",
  "Flask",
  "Ruby",
  "Ruby on Rails",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
  "Objective-C",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "Terraform",
  "Ansible",
  "Jenkins",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "JIRA",
  "Confluence",
  "Slack",
  "Trello",
  "Elixir",
  "Phoenix",
  "Haskell",
  "Scala",
  "Perl",
  "MATLAB",
  "R",
  "SAS",
  "Julia",
  "Hadoop",
  "Spark",
  "Kafka",
  "RabbitMQ",
  "Cassandra",
  "Neo4j",
  "CouchDB",
  "Firebase",
  "Heroku",
  "DigitalOcean",
  "Vagrant",
  "Chef",
  "Puppet",
  "CircleCI",
  "Travis CI",
  "Bamboo",
  "Selenium",
  "Cypress",
  "Appium",
  "JUnit",
  "Mocha",
  "Chai",
  "Jest",
  "Enzyme",
  "Protractor",
  "Webpack",
  "Gulp",
  "Grunt",
  "Parcel",
  "Rollup",
  "Babel",
  "ESLint",
  "Prettier",
  "Tailwind CSS",
  "Bootstrap",
  "Foundation",
  "Bulma",
  "Material-UI",
  "Ant Design",
  "Semantic UI",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "Sapper",
  "Meteor",
  "Ember.js",
  "Backbone.js",
  "Knockout.js",
  "Alpine.js",
  "LitElement",
  "Stencil",
  "Electron",
  "Capacitor",
  "Ionic",
  "Cordova",
  "Xamarin",
  "Flutter",
  "React Native",
  "NativeScript",
  "Expo",
  "FastAPI",
  "Tornado",
  "Bottle",
  "Pyramid",
  "Falcon",
  "CherryPy",
  "Sanic",
  "Hug",
  "T3",
  "Feathers.js",
  "LoopBack",
  "NestJS",
  "AdonisJS",
  "Sails.js",
  "Strapi",
  "KeystoneJS",
  "Contentful",
  "Prismic",
  "Sanity",
  "Netlify",
  "Vercel",
  "Surge",
  "Glitch",
  "Repl.it",
  "CodePen",
  "JSFiddle",
  "Plunker",
  "CodeSandbox",
  "StackBlitz",
  "D3.js",
  "Three.js",
  "Chart.js",
  "Highcharts",
  "ApexCharts",
  "Victory",
  "Nivo",
  "Plotly",
  "Vis.js",
  "Sigma.js",
  "Cytoscape.js",
  "PixiJS",
  "Phaser",
  "Babylon.js",
  "Anime.js",
  "GreenSock (GSAP)",
  "Velocity.js",
  "Lottie",
  "Framer Motion",
  "React Spring",
  "React Three Fiber",
  "Konva.js",
  "Paper.js",
  "P5.js",
  "Processing.js",
  "OpenGL",
  "WebGL",
  "Vulkan",
  "DirectX",
  "Unity",
  "Unreal Engine",
  "Godot",
  "CryEngine",
  "Cocos2d",
  "Corona SDK",
  "GameMaker Studio",
  "Construct",
  "RPG Maker",
  "Twine",
  "Ren'Py",
  "GDevelop",
  "Stencyl",
  "Defold",
  "Amazon Lumberyard",
  "PlayCanvas",
  "Three.js",
  "Blender",
  "Maya",
  "3ds Max",
  "Cinema 4D",
  "ZBrush",
  "Substance Painter",
  "Houdini",
  "Modo",
  "SketchUp",
  "Rhino",
  "AutoCAD",
  "SolidWorks",
  "Fusion 360",
  "Onshape",
  "Tinkercad",
  "FreeCAD",
  "OpenSCAD",
  "KiCad",
  "Eagle",
  "Altium Designer",
  "Fritzing",
  "Simulink",
  "LabVIEW",
  "ANSYS",
  "COMSOL Multiphysics",
  "ABAQUS",
  "HyperMesh",
  "MSC Nastran",
  "LS-DYNA",
  "OpenFOAM",
  "GROMACS",
  "LAMMPS",
  "VMD",
  "PyMOL",
  "Chimera",
  "Rosetta",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "Theano",
  "Caffe",
  "MXNet",
  "CNTK",
  "PaddlePaddle",
  "OpenCV",
  "NLTK",
  "SpaCy",
  "Gensim",
  "Hugging Face Transformers",
  "AllenNLP",
  "FastText",
  "CoreNLP",
  "Tesseract",
  "OpenAI Gym",
];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateTitleKeywords = async (
  str: string
): Promise<GeneratedAppelation> => {
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

  const res = result.choices[0].message.content;
  console.log(res);
  if (res) {
    const data = JSON.parse(res);

    if (data?.length === 0) {
      console.log("X no data:", appelation);
      return;
    }

    return data;
  }
};

const getFutureTitle = (c: Competency, newTitle: string | undefined) => {
  const actual = c.title;
  const future = c.title[0].toUpperCase() + c.title.slice(1);
  return newTitle ?? future;
};

type GeneratedAppelation = {
  word: string;
  appelations: string[];
};
type PayloadAfterGeneration = { title: string };
type Appelation = GeneratedAppelation & PayloadAfterGeneration;

const includes = (str: string, extract: string) => str.includes(extract);
const confirmed = (str: string) => {
  if (includes(str, " ")) return " ";
  if (includes(str, "-")) return "-";
  if (includes(str, ".")) return ".";
  return false;
};
const mainWord = (str: string, extract: string) => {
  const split = str.split(extract);
  const first = split[0];
  const second = split[1];
  if (!!first && first.length >= second.length) return split[0];
  else return split[1];
};

const addMainWord = (
  generated: GeneratedAppelation,
  title: string
): GeneratedAppelation => {
  const appelations = generated.appelations;
  let extract;

  if ((extract = confirmed(title))) {
    const main = mainWord(title, extract);
    appelations.push(main);
    return { ...generated, appelations };
  }
  return generated;
};

const addTitle = (
  generated: GeneratedAppelation,
  title: string
): Appelation => ({ ...generated, title });

const getAppelation = async (title: string) => {
  const generated: GeneratedAppelation = await generateTitleKeywords(title);
  const addedMainWord = addMainWord(generated, title);
  const withTitle = addTitle(addedMainWord, title);
  return withTitle;
};

const getAllAppelations = async (): Promise<Appelation[]> => {
  const result: Appelation[] = [];
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    const appelation = await getAppelation(c);
    result.push(appelation);
  }
  return result;
};

const getOneCompetency = async (appelation: Appelation) => {
  const lower = appelation.appelations.map((a) => a.toLowerCase());
  return await prisma.competencies.findFirst({
    where: {
      OR: [
        { title: { mode: "insensitive", equals: appelation.title } },
        { appelations: { hasSome: appelation.appelations } },
        { appelations: { hasSome: lower } },
      ],
    },
  });
};

const getManyCompetencies = async (c: Competency) => {
  const title = c.title;
  const lower = title.toLowerCase();
  return await prisma.competencies.findMany({
    where: {
      OR: [
        { title: { mode: "insensitive", equals: title } },
        { appelations: { hasSome: [title] } },
        { appelations: { hasSome: [lower] } },
      ],
    },
  });
};

const appelationCorrespondsCompetency = async (appelation: Appelation) => {
  const exist = await getOneCompetency(appelation);

  return exist;
};

const createNewCompetency = async (appelation: Appelation) => {
  const { extension, slug } = await setUniqueSlugAndExtension(
    appelation.title.toLowerCase(),
    0,
    "competencies"
  );
  const created = await prisma.competencies.create({
    data: {
      title: appelation.title,
      slug,
      extension,
      definition: "",
      conclusion: "",
      development: "",
      importance: "",
      advantages: [],
      examples: [],
      keywords: [],
      relatedSkills: [],
      appelations: appelation.appelations,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (created) console.log("✅", "created:", appelation.title);
  else console.log("❌", "not created:", appelation.title);
};

const mergeAppelation = async (
  competency: Competency,
  appelation: Appelation
) => {
  const actualTitle = competency.title;
  const futureTitle = appelation.title;

  const { slug, extension } = await setUniqueSlugAndExtension(
    futureTitle,
    0,
    "competencies"
  );

  const dbAppelations = [...new Set(competency.appelations)];
  const newAppelations = [...new Set(appelation.appelations)];
  const futureAppelations = dbAppelations.concat(newAppelations);

  try {
    const updated = await prisma.competencies.update({
      where: { id: competency.id },
      data: {
        title: futureTitle,
        slug,
        extension,
        appelations: { set: futureAppelations },
      },
    });
    return updated;
  } catch (e) {
    console.log("❌", "error:", e);
    return false;
  }
};

const getDoublons = async (c: Competency) => {
  const title = c.title;

  const exist = await getManyCompetencies(c);

  if (exist.length > 1) {
    console.log("❌", "doublons:", title, "number:", exist.length);
    return exist.slice(1);
  } else {
    console.log("✅", "no doublons:", title);
    return [];
  }
};

const removeDoublons = async (doublons: Competency[]) => {
  for (let i = 0; i < doublons.length; i++) {
    const d = doublons[i];
    await prisma.competencies.delete({ where: { id: d.id } });
  }
};

const handleNewAppelation = async (appelation: Appelation) => {
  const exist = await appelationCorrespondsCompetency(appelation);
  if (exist) {
    console.log("merging...");
    await mergeAppelation(exist, appelation);
  } else {
    console.log("creating...");
    await createNewCompetency(appelation);
  }
};

const fnc = async (appelations: Appelation[]) => {
  const competencies = (await prisma.competencies.findMany()) as Competency[];

  for (let i = 0; i < competencies.length; i++) {
    const c = competencies[i];

    const futureTitle = getFutureTitle(c, undefined);

    try {
      if (c.title !== futureTitle) {
        console.log("✅", "no change:", c.title);

        const competencyInDB = await prisma.competencies.findUniqueOrThrow({
          where: { id: c.id },
        });

        await prisma.competencies.update({
          where: { id: competencyInDB.id },
          data: { title: futureTitle },
        });
      }

      if (c.appelations.length === 0) {
        const appelation = await getAppelation(c.title);
        await handleNewAppelation(appelation);
      }

      const doublons = await getDoublons(c);
      if (doublons.length > 0) {
        console.log("removing doublons...");
        await removeDoublons(doublons);
      }
    } catch (e) {
      console.log("❌", "error:", e);
      continue;
    }
  }

  for (let j = 0; j < appelations.length; j++) {
    const appelation = appelations[j];
    await handleNewAppelation(appelation);
  }
};

(async () => {
  const appelations = await getAllAppelations();
  await fnc(appelations);

  console.log("done");
  process.exit();
})();
