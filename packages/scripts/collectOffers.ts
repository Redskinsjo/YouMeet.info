import prisma from "@youmeet/prisma-config/prisma";
import puppeteer from "puppeteer";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";

const x = (selector: string, parent?: Element) =>
  (document || parent).querySelector(selector);
const xs = (selector: string, parent?: Element) =>
  (document || parent).querySelectorAll(selector);
const wttjLink = "https://www.welcometothejungle.com";

const collectOffers = async (searchRole: string) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(wttjLink);

  await page.waitForNetworkIdle();

  console.log(searchRole.toLowerCase(), "job search");
  const search = await page.$eval(
    "#search-query-field",
    (el, searchRole) => el.setAttribute("value", `${searchRole.toLowerCase()}`),
    searchRole
  );

  const searchButton = await page.$eval(
    "[data-testid='homepage-search-button']",
    (el) => (el as HTMLButtonElement).click()
  );

  await page.waitForSelector(
    "[data-testid='search-results-list-item-wrapper']"
  );

  const cardsParent = await page.$(
    "[data-testid='search-results-list-item-wrapper']"
  );

  const links = await page.evaluate(
    ({ wttjLink }) => {
      const cardsParent = document.querySelectorAll(
        "[data-testid='search-results-list-item-wrapper']"
      );

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card.getAttribute("href"));
      return hrefs.map((href) => `${wttjLink}${href}`);
    },
    { wttjLink }
  );

  for (let i = 0; i < links.length; i++) {
    await page.goto(links[i]);
    const data = (await page.evaluate(() => {
      const data = {} as any;

      try {
        const contract = document.querySelector("i[name='contract']");
        if (contract?.parentElement?.textContent)
          data.contract = contract?.parentElement?.textContent;

        const location = document.querySelector("i[name='location']");
        if (location) {
          const element = location?.parentElement?.querySelector("span span");
          if (element?.textContent) data.location = element?.textContent;
        }
        const salary = document.querySelector("i[name='salary']");
        if (salary?.parentElement?.textContent)
          data.salary = salary?.parentElement?.textContent;
        const start = document.querySelector("i[name='clock']");
        if (start) {
          const spans = [...start?.parentElement?.querySelectorAll("span")];
          const rightSpan = spans.map((span) => span).pop();
          if (rightSpan?.textContent) data.start = rightSpan?.textContent;
        }
        const remote = document.querySelector("i[name='remote']");
        if (remote) {
          const spans = [...remote?.parentElement?.querySelectorAll("span")];
          const rightSpan = spans.map((span) => span).shift();
          if (rightSpan?.textContent) data.remote = rightSpan?.textContent;
        }
        const experience = document.querySelector("div > i[name='suitcase']");
        if (experience?.parentElement?.textContent) {
          data.suitcase = experience?.parentElement?.textContent;
        }
        const education_level = document.querySelector(
          "i[name='education_level']"
        );
        if (education_level?.parentElement?.textContent) {
          data.education_level = education_level?.parentElement?.textContent;
        }
        const jobTitle = document.querySelector("h2");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;
        const company = document.querySelector(
          "#the-company-section a div span"
        );
        if (company?.textContent) {
          data.company = company.textContent;
        }
        data.link = window.location.href;
        data.retrievedAt = new Date().toISOString();
        data.source = "wttj";
        return data;
      } catch (e) {
        console.log(e);
        return { error: e };
      }
    })) as {
      link: string;
      retrievedAt: Date;
      source: string;
      company: string;
      jobTitle: string;
      education_level: string;
      experience: string;
      remote: string;
      start: string;
      salary: string;
      location: string;
      contract: string;
      error: Error;
    };
    if (data.error) console.log(data.error);
    else if (data) {
      const { slug, extension } = await setUniqueSlugAndExtension(
        data.jobTitle
      );
      console.log(data.start, "start");

      try {
        const created = await prisma.offers.create({
          data: {
            contact: { urlPostulation: data.link },
            createdAt: data.retrievedAt,
            origineOffre: { origine: data.source },
            entreprise: { nom: data.company },
            intitule: data.jobTitle,
            qualificationLibelle: data.education_level,
            experienceLibelle: data.experience,
            remote: data.remote?.toLowerCase(),
            limitDate: data.start
              ? new Date(data.start).toISOString()
              : undefined,
            salaire: { libelle: data.salary },
            lieuTravail: { libelle: data.location },
            contractType: data.contract,
            contexteTravail: {},
            slug,
            extension,
            idFT: slug + extension,
          },
        });
        console.log(created.id, "created");
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  await browser.close();
};

const connectMatches = async (candidates: any[]) => {
  const offers = await prisma.offers.findMany();
  const parisOffers = offers.filter((offer) => {
    const code = (inc) => offer.lieuTravail?.codePostal?.includes(inc);
    return code("75") || code("92") || code("94") || code("91");
  });
  for (let i = 0; candidates.length; i++) {
    const candidate = candidates[i];

    // for each candidate, link the target job to the job
    if (!candidate?.targetJobId) continue;
    const job = await prisma.jobs.findUnique({
      where: {
        id: candidate.targetJobId,
      },
    });
    if (job) {
      // récupère les offres qui matchent
      const matchOffers = parisOffers.filter((offer) => {
        const min3 = (tokens) => tokens.filter((token) => token.length > 3);
        const intitule = min3(offer.intitule?.split(" "));
        const type = offer.typeContrat?.toLowerCase();

        const enTitle = min3(job.title?.en.split(" "));
        const frTitle = min3(job.title?.fr.split(" "));
        let found = false;
        for (let i = 0; i < enTitle.length; i++) {
          found = !!intitule.find(
            (token) => token.toLowerCase() === enTitle[i]
          );
          if (found) break;
        }
        if (found) return true;
        for (let j = 0; j < frTitle.length; j++) {
          found = !!intitule.find(
            (token) => token.toLowerCase() === frTitle[j]
          );
          if (found) break;
        }
        return found ? true : false;
      });
      if (matchOffers.length === 0) continue;
      console.log([
        candidate.targetContractType,
        job.title,
        matchOffers.length,
      ]);
      const ca = await prisma.betacandidates.update({
        where: { id: candidate.id },
        data: {
          suggestedOpportunities: {
            connect: matchOffers.map((m) => ({
              id: m.id,
            })),
          },
        },
      });
      console.log(ca.id, "connect");
    }
  }
};

(async () => {
  const candidates = await prisma.betacandidates.findMany({
    where: {
      OR: [
        {
          user: { isNot: null },
          targetJob: { isNot: null },
        },
        { user: { isNot: null }, targetContractType: { isSet: true } },
      ],
    },
  });

  const targetedJob = candidates.reduce((acc, curr) => {
    if (!acc.includes(curr.targetJobId)) acc.push(curr.targetJobId);
    return acc;
  }, []);
  const scrapped = [
    "développeur web",
    "directeur d'hôtel",
    "réceptionniste",
    "responsable des ressources humaines",
    "ingénieur logiciel",
    "développeur fullstack",
    "développeur frontend",
    "assistant(e) marketing digital",
    "chef de projet",
    "chef des opérations commerciales",
    "développeur d'applications mobiles",
    "expert en développement durable en entreprise",
    "coach de vie",
  ];
  for (let i = 0; i < targetedJob.length; i++) {
    const jobId = targetedJob[i];

    const job = await prisma.jobs.findUnique({
      where: { id: jobId },
    });

    if (job.title.fr) {
      if (!scrapped.includes(job.title.fr.toLowerCase()))
        await collectOffers(job.title.fr);
    }
  }
  await connectMatches(candidates);
  process.exit();
})();
