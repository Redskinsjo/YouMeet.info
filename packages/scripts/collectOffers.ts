import prisma from "@youmeet/prisma-config/prisma";
import puppeteer from "puppeteer";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import regions from "@youmeet/raw-data/regions_departements.json";

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

const wttjLink = "https://www.welcometothejungle.com";
const thalesLink = "https://careers.thalesgroup.com/fr/fr/search-results";
const glassdoorLink = "https://www.glassdoor.fr/Emploi/index.htm";
const doctolibLink = "https://careers.doctolib.fr/";
const freelanceInformatiqueLink =
  "https://www.freelance-informatique.fr/offres-freelance";
const helloWorkLink = "https://www.hellowork.com/fr-fr/emploi.html";

type DataType = {
  link: string;
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
  dureeTravailLibelleConverti: string;
};

type linksEvalArgs = { link: string; cardsSelector: string };

type Site = {
  link: string;
  searchElSelector: string;
  locationSelector?: string;
  searchButtonElSelector?: string;
  cardsSelector: string;
  linksEvalFnc: (args: linksEvalArgs) => string[];
  linksEvalArgs: linksEvalArgs;
  dataEvalFnc: () => DataType;
  dataEvalArgs: any;
  secure?: boolean;
};

const sites: Site[] = [
  {
    link: wttjLink,
    searchElSelector: "#search-query-field",
    searchButtonElSelector: "[data-testid='homepage-search-button']",
    cardsSelector: "[data-testid='search-results-list-item-wrapper']",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) => `${link}${href}`);
    },
    linksEvalArgs: {
      link: wttjLink,
      cardsSelector: "[data-testid='search-results-list-item-wrapper']",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

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
          data.experience = experience?.parentElement?.textContent;
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

        data.source = "wttj";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    link: doctolibLink,
    searchElSelector: ".input-search__input",
    cardsSelector: ".job-card",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));

      return hrefs.map((href) =>
        href.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: doctolibLink,
      cardsSelector: ".job-card",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const contract = document.querySelector(
          "svg[aria-label='Type de contrat:'] + p.paragraph"
        );
        if (contract?.textContent) data.contract = contract?.textContent;

        const location = document.querySelector(
          "svg[aria-label='Endroit:'] + p.paragraph"
        );
        if (location?.textContent) data.location = location?.textContent;

        const jobTitle = document.querySelector("h1.title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

        data.company = "Doctolib";

        data.link = window.location.href;

        data.source = "doctolib";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    secure: true,
    link: freelanceInformatiqueLink,
    searchElSelector: "#competences",
    searchButtonElSelector: "li.banner-search-submit button",
    cardsSelector: "h2.job-title",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) =>
        href.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: freelanceInformatiqueLink,
      cardsSelector: "h2.job-title",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const contract = document.querySelector(
          "[title='Durée'] > div > div:not(.fw-bold)"
        );
        if (contract?.textContent) data.contract = contract?.textContent;

        const location = document.querySelector(
          "[title='Localisation'] > h2 > a"
        );
        if (location?.textContent) data.location = location?.textContent;

        const jobTitle = document.querySelector("h1.title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;
        const company = document.querySelector(
          "#the-company-section a div span"
        );

        const salaire = document.querySelector(
          "[title='Tarif Journalier Moyen'] > div > h2"
        );
        if (salaire?.textContent) {
          data.salary = salaire.textContent;
        }
        const start = document.querySelector(
          "[title='Date de début'] > div > div:not(.fw-bold)"
        );
        if (start?.textContent) data.start = start.textContent;

        data.link = window.location.href;

        data.source = "freelance-informatique";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    link: helloWorkLink,
    searchElSelector: "#competences",
    searchButtonElSelector: "li.banner-search-submit button",
    cardsSelector: "h2.job-title",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) =>
        href.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: helloWorkLink,
      cardsSelector: "h2.job-title",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const contract = document.querySelector(
          "[title='Durée'] > div > div:not(.fw-bold)"
        );
        if (contract?.textContent) data.contract = contract?.textContent;

        const location = document.querySelector(
          "[title='Localisation'] > h2 > a"
        );
        if (location?.textContent) data.location = location?.textContent;

        const jobTitle = document.querySelector("h1.title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;
        const company = document.querySelector(
          "#the-company-section a div span"
        );

        const salaire = document.querySelector(
          "[title='Tarif Journalier Moyen'] > div > h2"
        );
        if (salaire?.textContent) {
          data.salary = salaire.textContent;
        }
        const start = document.querySelector(
          "[title='Date de début'] > div > div:not(.fw-bold)"
        );
        if (start?.textContent) data.start = start.textContent;

        data.link = window.location.href;

        data.source = "freelance-informatique";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
    secure: true,
  },
  {
    link: thalesLink,
    searchElSelector: "#typehead",
    searchButtonElSelector: "#ph-search-backdrop",
    cardsSelector: ".jobs-list-item",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      console.log(hrefs);
      return hrefs.map((href) =>
        href.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: { link: thalesLink, cardsSelector: ".jobs-list-item" },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        // contract
        const dureeTravailLibelleConverti = document.querySelector(
          ".au-target.hiringType"
        );
        if (dureeTravailLibelleConverti)
          data.dureeTravailLibelleConverti =
            dureeTravailLibelleConverti.textContent;

        // location
        const location = document.querySelector(".au-target.job-location");
        if (location.textContent) {
          data.location = location?.textContent;
        }

        // jobTitle
        const jobTitle = document.querySelector("h1.job-title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

        // company
        const company = document.querySelector(
          "#the-company-section a div span"
        );
        if (company?.textContent) {
          data.company = company.textContent;
        }

        // link
        data.link = window.location.href;
        // source
        data.source = "thales";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
    secure: true,
  },
  {
    link: glassdoorLink,
    searchElSelector: "#searchBar-jobTitle",
    locationSelector: "#searchBar-location",
    cardsSelector: "[data-test='jobListing']",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) =>
        href.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: wttjLink,
      cardsSelector: "[data-test='jobListing']",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      return data;
    },
    dataEvalArgs: {},
    secure: true,
  },
];

const collectOffers = async (searchRole: string, workLocation: string) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // const crawl = sites.filter((site) => !site.secure);
  const crawl = [sites[1]];
  // const crawl = sites.slice(0, 1);

  console.log(crawl.length, "crawling sites");
  for (let p = 0; p < crawl.length; p++) {
    const site = crawl[p];

    await page.goto(site.link);

    await page.waitForNetworkIdle();

    console.log(site.searchElSelector, "site.searchElSelector");

    if (site?.searchElSelector) {
      const search = await page.$eval(
        site.searchElSelector,
        (el, searchRole) =>
          el.setAttribute("value", `${searchRole.toLowerCase()}`),
        searchRole
      );
      console.log(search, "search");
    }

    if (site?.locationSelector) {
      const location = await page.$eval(
        site.locationSelector,
        (el, workLocation) =>
          el.setAttribute("value", `${workLocation.toLowerCase()}`),
        workLocation
      );
      console.log(location, "location");
    }

    if (site.searchButtonElSelector) {
      await page.$eval(site.searchButtonElSelector, (el) =>
        (el as HTMLButtonElement).click()
      );
    } else {
      await page.keyboard.press("Enter");
    }

    try {
      await page.waitForSelector(site.cardsSelector, { timeout: 10000 });
    } catch (err: any) {
      continue;
    }

    const links = await page.evaluate(site.linksEvalFnc, site.linksEvalArgs);

    console.log(links.length, "links");
    for (let i = 0; i < links.length; i++) {
      const exist = await prisma.offers.findFirst({
        where: {
          contact: { urlPostulation: links[i] },
        },
      });
      if (exist) continue;
      await page.goto(links[i]);
      const data = (await page.evaluate(site.dataEvalFnc)) as DataType;
      console.log(data);
      if (data.error) console.log(data.error);
      else if (data) {
        const { slug, extension } = await setUniqueSlugAndExtension(
          data.jobTitle
        );

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

          let payload = {} as any;

          if (data.link) payload.contact = { urlPostulation: data.link };

          if (data.source) payload.origineOffre = { origine: data.source };
          if (data.company) payload.entreprise = { nom: data.company };
          if (data.jobTitle) payload.intitule = data.jobTitle;
          if (data.education_level)
            payload.qualificationLibelle = data.education_level;
          if (data.experience) payload.experienceLibelle = data.experience;
          if (data.remote) payload.remote = data.remote?.toLowerCase();
          if (start) payload.limitDate = start;
          if (data.salary) payload.salaire = { libelle: data.salary };
          if (data.location) payload.lieuTravail = { libelle: data.location };
          if (data.contract) payload.contractType = data.contract;
          if (data.dureeTravailLibelleConverti)
            payload.dureeTravailLibelleConverti =
              data.dureeTravailLibelleConverti;

          payload.slug = slug;
          payload.extension = extension;
          payload.idFT = slug + extension;
          payload.contexteTravail = {};
          payload.remote = data.remote?.toLowerCase();
          payload.contact = { urlPostulation: data.link };
          payload.createdAt = new Date();

          const created = await prisma.offers.create({
            data: payload,
          });
          console.log(created.id, "created");
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  await browser.close();
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

  const candidatesWhoTargetJobAndContract = candidates
    .filter((cand) => !!cand.targetJobId)
    .reduce((acc, curr) => {
      if (!acc.find((cand) => cand.targetJobId === curr.targetJobId))
        acc.push(curr);
      return acc;
    }, []);

  console.log(candidatesWhoTargetJobAndContract.length, "candidates");
  for (let i = 0; i < candidatesWhoTargetJobAndContract.length; i++) {
    const candidate = candidatesWhoTargetJobAndContract[i];
    const jobId = candidate.targetJobId;

    const job = await prisma.jobs.findUnique({
      where: { id: jobId },
    });

    console.log(job.title.fr, "job.title.fr");
    if (job.title.fr) await collectOffers(`${job.title.fr}`, "ile-de-france");
  }
  console.log("connecting...");

  process.exit();
})();
