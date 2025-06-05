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

const monthMappingNum = {
  "01": "january",
  "02": "february",
  "03": "march",
  "04": "april",
  "05": "may",
  "06": "june",
  "07": "july",
  "08": "august",
  "09": "september",
  "10": "october",
  "11": "november",
  "12": "december",
};

const wttjLink = "https://www.welcometothejungle.com";
const thalesLink = "https://careers.thalesgroup.com";
const glassdoorLink = "https://www.glassdoor.fr";
const doctolibLink = "https://careers.doctolib.fr";
const freelanceInformatiqueLink = "https://www.freelance-informatique.fr";
const helloWorkLink = "https://www.hellowork.com";
const weAreSanderLink = "https://www.wearesander.com";
const emploiParisLink = "https://emploi.paris.fr";
const chooseYourBossLink = "https://chooseyourboss.com";
const capgeminiLink = "https://www.capgemini.com";

type DataType = {
  link: string;
  searchLink: string;
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
  searchLink: string;
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
    searchLink: wttjLink,
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
    searchLink: doctolibLink,
    searchElSelector: ".input-search__input",
    cardsSelector: ".job-card",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));

      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
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
    link: chooseYourBossLink,
    searchLink: `${chooseYourBossLink}/offres/emploi-it`,
    searchElSelector: "#offer-search-skill",
    locationSelector: "#offer-search-location",
    cardsSelector: ".card.offer",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));

      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: chooseYourBossLink,
      cardsSelector: ".card.offer",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const jobTitle = document.querySelector(".headline h1");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

        const company = document.querySelector("a.company-link");
        if (company?.textContent) data.company = company?.textContent;

        data.link = window.location.href;

        data.source = "chooseYourBoss";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    secure: true,
    link: emploiParisLink,
    searchLink: `${emploiParisLink}/offres`,
    searchElSelector: "input[name='what[search]']",
    cardsSelector: ".job-card",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));

      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: emploiParisLink,
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
    link: weAreSanderLink,
    searchLink: `${weAreSanderLink}/fr/jobs`,
    searchElSelector: "#careers-search-input",
    searchButtonElSelector: "#careers-search-submit",
    cardsSelector: "#job-listings-grid > a",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cards = document.querySelectorAll(cardsSelector);

      const hrefs = [...cards].map((card) => card?.getAttribute("href"));

      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
      );
    },
    linksEvalArgs: {
      link: weAreSanderLink,
      cardsSelector: "#job-listings-grid > a",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const contract = document.evaluate(
          `//*[contains(text(), 'Type de Contrat')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (contract?.nextSibling?.textContent)
          data.contract = contract?.nextSibling?.textContent;

        const location = document.evaluate(
          `//*[contains(text(), 'Région')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (location?.nextSibling?.textContent)
          data.location = location?.nextSibling?.textContent;

        const salaire = document.evaluate(
          `//*[contains(text(), 'Proposition salariale')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (salaire?.nextSibling?.textContent)
          data.salary = salaire?.nextSibling?.textContent;

        const jobTitle = document.querySelector("#career-details-title.h1");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

        data.link = window.location.href;

        data.source = "wearesander";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    link: freelanceInformatiqueLink,
    searchLink: `${freelanceInformatiqueLink}/offres-freelance`,
    searchElSelector: "#competences",
    searchButtonElSelector: "li.banner-search-submit button",
    cardsSelector: "h2.job-title",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);
      const filtered = [...cardsParent].filter((card) => {
        const published =
          card.parentElement.querySelector("i.icon-clock").parentElement
            .textContent;
        const date = published.replace("Publiée le", "").trim().split("/");

        if (date.length === 3) {
          date[1] = monthMappingNum[date[1]];
          const joined = date.join(" ");
          const newDate = new Date(joined);
          const now = new Date();
          if (now.getTime() - newDate.getTime() > 3600 * 1000 * 24 * 30 * 3) {
            return false;
          }
        }
        return true;
      });

      const cards = filtered.map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs
        .map((href) => (href?.includes("https") ? `${href}` : `${link}${href}`))
        .filter((href) => !href.includes("undefined"));
    },
    linksEvalArgs: {
      link: freelanceInformatiqueLink,
      cardsSelector: "h2.job-title",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const dureeTravailLibelleConverti = document.querySelector(
          "[title='Durée'] > div > div:not(.fw-bold)"
        );
        if (dureeTravailLibelleConverti?.textContent)
          data.dureeTravailLibelleConverti =
            dureeTravailLibelleConverti?.textContent;

        const location = document.querySelector(
          "[title='Localisation'] > div > h2 > a"
        );
        if (location?.textContent) data.location = location?.textContent;

        const jobTitle = document.querySelector("h1.title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

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
        data.contract = "freelance";

        data.source = "freelance-informatique";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    link: capgeminiLink,
    searchLink: `${capgeminiLink}/careers/join-capgemini/job-search`,
    searchElSelector: "#searchsubmit",
    searchButtonElSelector: ".search-button",
    cardsSelector: ".joblink",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cards = document.querySelectorAll(cardsSelector);

      const hrefs = [...cards].map((card) => card?.getAttribute("href"));
      return hrefs
        .map((href) => (href?.includes("https") ? `${href}` : `${link}${href}`))
        .filter((href) => !href.includes("undefined"));
    },
    linksEvalArgs: {
      link: capgeminiLink,
      cardsSelector: ".joblink",
    },
    dataEvalFnc: () => {
      const data = {} as DataType;

      try {
        const contract = document.evaluate(
          `//*[contains(text(), 'Contract type')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (contract.nextSibling.textContent)
          data.contract = contract.nextSibling.textContent;

        const experienceLevel = document.evaluate(
          `//*[contains(text(), 'Experience level')]`,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (experienceLevel.nextSibling.textContent)
          data.experience = experienceLevel.nextSibling.textContent;

        const location = document.querySelector("span.box-tag");
        if (location?.textContent) data.location = location?.textContent;

        const jobTitle = document.querySelector("h1.box-title");
        if (jobTitle?.textContent) data.jobTitle = jobTitle.textContent;

        data.link = window.location.href;

        data.source = "capgemini";
        return data;
      } catch (e) {
        return { ...data, error: e };
      }
    },
    dataEvalArgs: {},
  },
  {
    secure: true,
    link: helloWorkLink,
    searchLink: `${helloWorkLink}/fr-fr/emploi.html`,
    searchElSelector: "#competences",
    searchButtonElSelector: "li.banner-search-submit button",
    cardsSelector: "h2.job-title",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
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
  },
  {
    link: thalesLink,
    searchLink: `${thalesLink}/fr/fr/search-results`,
    searchElSelector: "#typehead",
    searchButtonElSelector: "#ph-search-backdrop",
    cardsSelector: ".jobs-list-item",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      console.log(hrefs);
      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
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
            dureeTravailLibelleConverti.textContent.trim();

        // location
        const location = document.querySelector(".au-target.job-location");
        if (location.textContent) {
          data.location = location?.textContent
            .replace("localisation", "")
            .trim();
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
  },
  {
    secure: true,
    link: glassdoorLink,
    searchLink: `${glassdoorLink}/Emploi/index.htm`,
    searchElSelector: "#searchBar-jobTitle",
    locationSelector: "#searchBar-location",
    cardsSelector: "[data-test='jobListing']",
    linksEvalFnc: ({ link, cardsSelector }) => {
      const cardsParent = document.querySelectorAll(cardsSelector);

      const cards = [...cardsParent].map((card) => card.querySelector("a"));
      const hrefs = cards.map((card) => card?.getAttribute("href"));
      return hrefs.map((href) =>
        href?.includes("https") ? `${href}` : `${link}${href}`
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
  },
];

const collectOffers = async (searchRole: string, workLocation: string) => {
  let browser, page, crawl, links, site, r;
  let countdown = 0;
  let interval: NodeJS.Timeout;

  const reset = () => {
    let result = false;
    countdown = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      countdown++;
      if (countdown > 10) {
        result = true;
        return clearInterval(interval);
      }
    }, 1000);
    return result;
  };
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  crawl = sites.filter((site) => !site.secure);

  console.log(crawl.length, "crawling sites");

  for (let p = 0; p < crawl.length; p++) {
    site = crawl[p];

    await page.goto(site.searchLink);
    r = reset();
    if (r) continue;
    try {
      await page.waitForSelector(site.searchElSelector);
    } catch (err: any) {
      console.log("error on searchElSelector");
      continue;
    }
    r = reset();
    if (r) continue;
    console.log(site.searchElSelector, "site.searchElSelector");

    if (site?.searchElSelector) {
      await page.$eval(
        site.searchElSelector,
        (el, searchRole) =>
          el.setAttribute("value", `${searchRole.toLowerCase()}`),
        searchRole
      );
    }
    r = reset();
    if (r) continue;

    if (site?.locationSelector) {
      await page.$eval(
        site.locationSelector,
        (el, workLocation) =>
          el.setAttribute("value", `${workLocation.toLowerCase()}`),
        workLocation
      );
    }
    r = reset();
    if (r) continue;

    if (site.searchButtonElSelector) {
      await page.$eval(site.searchButtonElSelector, (el) =>
        (el as HTMLButtonElement).click()
      );
    } else {
      await page.keyboard.press("Enter");
    }
    r = reset();
    if (r) continue;

    try {
      await page.waitForSelector(site.cardsSelector, { timeout: 10000 });
      console.log("waited");
    } catch (err: any) {
      continue;
    }
    r = reset();
    if (r) continue;

    links = await page.evaluate(site.linksEvalFnc, site.linksEvalArgs);
    r = reset();
    if (r) continue;

    console.log(links.length, "links");

    for (let i = 0; i < links.length; i++) {
      const exist = await prisma.offers.findFirst({
        where: {
          contact: { urlPostulation: links[i] },
        },
      });
      if (exist) continue;
      await page.goto(links[i]);
      r = reset();
      if (r) continue;
      const data = (await page.evaluate(site.dataEvalFnc)) as DataType;
      r = reset();
      if (r) continue;
      console.log(data);
      if (data.error) {
        console.log("error on data (or ancient offer)");
        return;
      } else if (data) {
        const { slug, extension } = await setUniqueSlugAndExtension(
          data.jobTitle
        );

        let start;
        try {
          start = data.start
            ? new Date(
                data.start
                  .split(" ")
                  .map((token) => monthsMapping[token] ?? token)
                  .join(" ")
              ).toISOString()
            : undefined;
        } catch (err: any) {
          console.log("Invalid time value");
        }

        try {
          const exist = await prisma.offers.findFirst({
            where: {
              contact: { urlPostulation: data.link },
            },
          });
          const r = reset();
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
      user: { user: true },
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
    if (job.title.fr)
      await collectOffers(
        `${job.title.fr}`,
        candidate.targetContractType || "CDI"
      );
  }
  console.log("connecting...");

  process.exit();
})();
