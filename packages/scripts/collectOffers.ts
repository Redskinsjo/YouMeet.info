import prisma from "@youmeet/prisma-config/prisma";
import puppeteer from "puppeteer";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import { BetaCandidate, Offer } from "@youmeet/gql/generated";

const monthsMapping = {
  janvier: "january",
  février: "february",
  fevrier: "february",
  mars: "march",
  avril: "april",
  mai: "may",
  juin: "june",
  juillet: "july",
  août: "august",
  aout: "august",
  septembre: "september",
  octobre: "october",
  novembre: "november",
  décembre: "december",
  decembre: "december",
};

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
    const exist = await prisma.offers.findFirst({
      where: {
        contact: { urlPostulation: links[i] },
      },
    });
    if (exist) continue;
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
      const start = data.start
        ? new Date(
            data.start
              .split(" ")
              .map((token) => monthsMapping[token] ?? token)
              .join(" ")
          ).toISOString()
        : undefined;

      try {
        const exist = await prisma.offers.findFirst({
          where: {
            contact: { urlPostulation: data.link },
          },
        });
        if (exist) continue;

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
            limitDate: start,
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

const connectMatches = async (candidates: BetaCandidate[]) => {
  await prisma.betacandidates.updateMany({
    where: { suggestedOpportunities: { none: undefined } },
    data: { suggestedOpportunitiesIds: { set: [] } },
  });
  for (let i = 0; i < candidates.length; i++) {
    console.log("in", i);
    const candidate = candidates[i];

    // for each candidate, link the target job to the job
    if (!candidate?.targetJobId) continue;
    const job = await prisma.jobs.findUnique({
      where: {
        id: candidate.targetJobId,
      },
    });
    if (job) {
      const min4 = (tokens) => tokens.filter((token) => token.length > 4);
      const enTitle = min4(job.title?.en.toLowerCase().split(" "));
      const frTitle = min4(job.title?.fr.toLowerCase().split(" "));
      const tokens = enTitle.concat(frTitle);
      const codes = ["75", "92", "93", "94", "91", "78", "77"];

      let entries = [];
      for (let j = 0; j < tokens.length; j++) {
        for (let k = 0; k < codes.length; k++) {
          entries.push([tokens[j], codes[k]]);
        }
      }

      // récupère les offres qui matchent
      const matchedOffers = await prisma.offers.findMany({
        where: {
          OR: entries.map(([token, code]) => {
            return {
              intitule: { mode: "insensitive", contains: token },
              lieuTravail: { is: { codePostal: { startsWith: code } } },
            };
          }),
        },
      });
      console.log("matched:", matchedOffers.length);

      if (matchedOffers.length === 0) continue;

      console.log([
        candidate.targetContractType,
        job.title,
        matchedOffers.length,
      ]);
      // connect the opportunities to candidate
      const ca = await prisma.betacandidates.update({
        where: { id: candidate.id },
        data: {
          suggestedOpportunities: {
            connect: matchedOffers.map((m) => ({
              id: m.id,
            })),
          },
        },
      });
      // connect the candidate to the opportunity
      await Promise.all(
        matchedOffers.map(
          async (opp) =>
            await prisma.offers.update({
              where: { id: opp.id },
              data: { suggestedCandidates: { connect: { id: candidate.id } } },
            })
        )
      );
    }
  }
  return;
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

  console.log(candidates.length, "candidates");
  // const candidatesWhoTargetJobAndContract = candidates
  //   .filter((cand) => !!cand.targetJobId)
  //   .reduce((acc, curr) => {
  //     if (!acc.find((cand) => cand.targetJobId === curr.targetJobId))
  //       acc.push(curr);
  //     return acc;
  //   }, []);

  // const scrapped = [];

  // for (let i = 0; i < candidatesWhoTargetJobAndContract.length; i++) {
  //   const candidate = candidatesWhoTargetJobAndContract[i];
  //   const jobId = candidate.targetJobId;

  //   const job = await prisma.jobs.findUnique({
  //     where: { id: jobId },
  //   });

  //   if (job.title.fr) {
  //     let search = !!candidate.targetContractType
  //       ? `${job.title.fr} ${candidate.targetContractType} ile-de-france`
  //       : `${job.title.fr} ile-de-france`;
  //     if (!scrapped.includes(search)) await collectOffers(search);
  //   }
  // }
  console.log("connecting...");
  await connectMatches(candidates);
  console.log("exiting");
  process.exit();
})();
