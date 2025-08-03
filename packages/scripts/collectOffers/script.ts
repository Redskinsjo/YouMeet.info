import prisma from "@youmeet/prisma-config/prisma";
import puppeteer, { Page } from "puppeteer";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import dotenv from "dotenv";
dotenv.config();
import { DataType, Site } from "./types";
import { monthsMapping } from "./tools";
import { sites } from "./sites";
import { addErr, resetWaitingTime, slow } from "./tests/collectOffers.test";
import { BetaCandidate } from "@youmeet/gql/generated";
import { uri } from "@youmeet/functions/imports";

export const collectOffers = async (
  searchRole: string,
  workLocation: string,
  candidate: BetaCandidate
) => {
  let browser, crawl, links, r, err;
  let countdown = 0;
  let page: Page;
  let site: Site;
  let interval: NodeJS.Timeout;

  const reset = async () => {
    let result = false;
    countdown = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      countdown++;
      if (countdown > resetWaitingTime) {
        result = true;
        return clearInterval(interval);
      }
    }, 1000);
    if (slow) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
      await promise;
    }
    return result;
  };
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();

  crawl = sites.filter((site) => !site.secure);

  console.log(crawl.length, "crawling sites");

  ////////////
  ////////////
  //////////// SITES
  if (slow && crawl.length !== 0 && process.env.sites)
    crawl = (crawl as Site[]).filter((s) =>
      s.searchLink.includes(process.env.sites)
    );
  for (let p = 0; p < crawl.length; p++) {
    site = crawl[p];

    await page.goto(site.searchLink);
    r = await reset();
    if (r) {
      addErr("search.selector", err);
      continue;
    }

    await page.waitForSelector(site.searchElSelector);

    r = await reset();
    if (r) {
      addErr("search.eval", err);
      continue;
    }
    if (site?.searchElSelector) {
      await page.$eval(
        site.searchElSelector,
        (el, searchRole) =>
          el.setAttribute("value", `${searchRole.toLowerCase()}`),
        searchRole
      );
    }
    r = await reset();
    if (r) {
      addErr("location.eval", err);
      continue;
    }

    if (site?.locationSelector) {
      await page.$eval(
        site.locationSelector,
        (el, workLocation) =>
          el.setAttribute("value", `${workLocation.toLowerCase()}`),
        workLocation
      );
    }
    r = await reset();
    if (r) {
      addErr("submit", err);
      continue;
    }
    if (site.searchButtonElSelector) {
      await page.$eval(site.searchButtonElSelector, (el) =>
        (el as HTMLButtonElement).click()
      );
    } else {
      await page.keyboard.press("Enter");
    }
    r = await reset();
    if (r) {
      addErr("cards.selector", err);
      continue;
    }

    await page.waitForSelector(site.cardsSelector, { timeout: 30000 });

    r = await reset();
    if (r) {
      addErr("links.eval", err);
      continue;
    }
    links = await page.evaluate(site.linksEvalFnc, site.linksEvalArgs);

    r = await reset();
    if (r) {
      addErr("links.time", err);
      continue;
    }

    if (links.length === 0) {
      addErr("links.empty", err);
      continue;
    }

    ////////////
    ////////////
    //////////// LINKS
    console.log(links);
    if (slow && links.length !== 0) links = links.slice(0, 1);
    for (let i = 0; i < links.length; i++) {
      if (links[i].includes("undefined")) {
        addErr("links.undefined", err);
        continue;
      }
      const exist = await prisma.offers.findFirst({
        where: {
          contact: { urlPostulation: links[i] },
        },
      });
      if (exist) {
        addErr("exist.link", err);
        continue;
      }
      await page.goto(links[i]);
      r = await reset();
      if (r) {
        addErr("data.eval", err);
        continue;
      }
      const data = (await page.evaluate(site.dataEvalFnc)) as DataType;
      r = await reset();
      if (r) {
        addErr("data.time", err);
        continue;
      }
      if (data.error) {
        addErr("data.error", err);
        return;
      } else if (data) {
        if (slow && process.env.sites) {
          await page.waitForSelector(site.applyCtaBtnSelector);
          await page.click(site.applyCtaBtnSelector);
          r = await reset();
          if (r) {
            addErr("apply.wait.final", err);
            continue;
          }
          await page.waitForSelector(site.applyFinalBtnSelector);
          r = await reset();
          if (r) {
            addErr("connect.login", err);
            continue;
          }
          await page.$eval(
            site.connectLoginSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            process.env.APPLY_LOGIN
          );
          r = await reset();
          if (r) {
            addErr("connect.password", err);
            continue;
          }
          await page.$eval(
            site.connectPasswordSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            process.env.APPLY_PASSWORD
          );
          await page.waitForSelector(site.applyFinalBtnSelector);
          r = await reset();
          if (r) {
            addErr("apply.firstname", err);
            continue;
          }
          await page.$eval(
            site.applyFirstnameSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            candidate.user.firstname
          );
          r = await reset();
          if (r) {
            addErr("apply.lastname", err);
            continue;
          }
          await page.$eval(
            site.applyLastnameSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            candidate.user.lastname
          );
          r = await reset();
          if (r) {
            addErr("apply.phone", err);
            continue;
          }
          await page.$eval(
            site.applyPhoneSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            candidate.details.phone.code + candidate.details.phone.number
          );
          r = await reset();
          if (r) {
            addErr("apply.job", err);
            continue;
          }
          await page.$eval(
            site.applyCurrentJobSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            candidate.user.lastname
          );
          r = await reset();
          if (r) {
            addErr("apply.link", err);
            continue;
          }
          await page.$eval(
            site.applyCVSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            `${slow ? `http://localhost:3000` : uri}/on/${
              candidate.user.uniqueName
            }`
          );
          await page.$eval(
            site.applyLinkSelector,
            (el, input) => el.setAttribute("value", `${input.toLowerCase()}`),
            `${slow ? `http://localhost:3000` : uri}/on/${
              candidate.user.uniqueName
            }`
          );
          r = await reset();
          if (r) {
            addErr("apply.checks", err);
            continue;
          }
          site.applyMandatoryChecksSelectors.forEach((check) => {
            page.$eval(check, (el: HTMLInputElement) => {
              el.click();
            });
          });
        }
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
        } catch (error: any) {
          addErr("data.start", err);
        }

        try {
          const exist = await prisma.offers.findFirst({
            where: {
              contact: { urlPostulation: data.link },
            },
          });
          const r = await reset();
          if (exist) {
            addErr("exist.offer", err);
            continue;
          }

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

          if (!slow) {
            const created = await prisma.offers.create({
              data: payload,
            });
            console.log(created.id, "created");
          }
        } catch (error: any) {
          addErr("data.create", err);
        }
      }
    }
  }

  await browser.close();

  return err;
};

export const execute = async () => {
  let errors;
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

  try {
    for (let i = 0; i < candidatesWhoTargetJobAndContract.length; i++) {
      if (errors)
        throw new Error(`errors for: ${(errors as string[]).toString()}`);
      const candidate = candidatesWhoTargetJobAndContract[i];
      const jobId = candidate.targetJobId;

      const job = await prisma.jobs.findUnique({
        where: { id: jobId },
      });

      console.log(job.title.fr, "job.title.fr");
      if (job.title.fr)
        errors = await collectOffers(
          `${job.title.fr}`,
          candidate.targetContractType || "CDI",
          candidate
        );
    }
  } catch (err: any) {
    console.log("msg:", err.message);
  }
  console.log("connecting offers...");

  process.exit();
};

console.log("process.env.sites", process.env.sites);
(async () => await execute())();
