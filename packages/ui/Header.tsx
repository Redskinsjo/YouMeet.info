import { useEffect, useState } from "react";
import Locale from "./Locale";
import { GoTriangleLeft } from "react-icons/go";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import TooltipedAsset from "./TooltipedAsset";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { blueGrey } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import { UserState } from "@youmeet/global-config/features/user";
import { HeaderComponentProps } from "@youmeet/types/Header";
import { useTranslation } from "react-i18next";
import RecruiterSpace from "./RecruiterSpace";
import NotificationsComponent from "./NotificationsIconComponent";
import MenuHeaderForMobile from "./MenuHeaderForMobile";
import { Article } from "@youmeet/gql/generated";
import { getArticlesParams } from "@youmeet/functions/request";
import BlogMenuNav from "./blog/BlogMenuNav";
import { ReducedArticle } from "@youmeet/types/ReducedArticle";

export default function Header({ classes, newStyles }: HeaderComponentProps) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const [megaMenu1, setMegaMenu1] = useState(false);
  const [megaMenu2, setMegaMenu2] = useState(false);
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [articles, setArticles] = useState<ReducedArticle[]>([]);
  const router = useRouter();
  router.prefetch(`/${searchParams.get("candidate")}`);
  router.prefetch("/le-produit/mise-en-relation");
  router.prefetch("/");
  router.prefetch("/blog");
  router.prefetch("/offres");

  const scrollTo = (window: Window, type: "solutions" | "prices") => {
    window.scrollTo({
      top: type === "solutions" ? 2639 : 500,
      behavior: "smooth",
    });
  };

  const getArticles = async () => {
    const result = (await getArticlesParams<Article[]>()) as Article[];
    const articles = result.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
    }));
    setArticles(articles);
  };

  useEffect(() => {
    if (articles.length === 0) getArticles();
    document.addEventListener("scroll", () => {
      setMegaMenu1(false);
    });
  }, [megaMenu1, megaMenu2]);

  return (
    <div className="relative">
      <div
        className={`header-classes h-[75px] dark:border-transparent ${
          classes || ""
        }`}
        style={newStyles}
        data-test="header"
      >
        <div className="flex items-center justify-start flex-1 p-[12px] box-border gap-[24px] xs:hidden sm:hidden md:hidden">
          {pathname.includes("/competencies") && (
            <TooltipedAsset
              asset={`Profil de ${
                searchParams.get("candidate") &&
                (searchParams.get("candidate") as string)
                  .split(".")
                  .map((name: string) => name[0].toUpperCase() + name.slice(1))
                  .join(" ")
              }`}
            >
              <Link
                role="link"
                title="Retourner à la liste des compétences"
                href={`/${searchParams.get("candidate")}`}
                className="flex items-center text-deepPurple500"
                legacyBehavior
              >
                <GoTriangleLeft
                  className="text-[48px]"
                  style={{ color: blueGrey[100] }}
                />
              </Link>
            </TooltipedAsset>
          )}
        </div>
        <MenuHeaderForMobile />
        {!xs && !sm && !md && (
          <div
            className="flex-center flex-1 gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[3px] h-full p-[12px] box-border"
            onMouseEnter={() => {
              setMegaMenu1(true);
              setMegaMenu2(true);
            }}
            onMouseLeave={() => {
              setMegaMenu1(false);
            }}
          >
            {pathname === "/" ||
            pathname === "/le-produit/mise-en-relation" ||
            pathname === "/le-produit/ats" ||
            pathname.includes("blog") ||
            pathname.includes("offres") ||
            pathname.includes("medias") ? (
              <Link
                title="Naviguer vers la page d'accueil de YouMeet.info"
                href={"/"}
                className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                style={{ textDecoration: "none", height: "100%" }}
              >
                <div
                  className="flex-center h-full"
                  onMouseEnter={() => {
                    setMegaMenu1(true);
                  }}
                >
                  <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                    {t("home")}
                  </span>
                  <div
                    className={
                      pathname === "/"
                        ? "absolute bottom-0 w-[25%] h-[2px] bg-black dark:bg-white blinkSide"
                        : "absolute bottom-0 w-[25%] h-[2px] blinkSide"
                    }
                  />
                </div>
              </Link>
            ) : undefined}
            {pathname === "/" ||
            pathname.includes("le-produit") ||
            pathname.includes("competences") ||
            pathname.includes("blog") ||
            pathname.includes("medias") ||
            pathname.includes("offres") ||
            pathname === "/blog" ? (
              <Link
                title="Naviguer vers le produit de mise en relation de YouMeet.info"
                href={"/le-produit/mise-en-relation"}
                className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                style={{ textDecoration: "none", height: "100%" }}
              >
                <div
                  className="flex-center h-full"
                  onMouseEnter={() => {
                    setMegaMenu1(true);
                  }}
                >
                  <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                    {t("what-we-do")}
                  </span>
                  <div
                    className={
                      pathname === "/le-produit/mise-en-relation" ||
                      pathname === "/le-produit/ats"
                        ? "absolute bottom-0 w-[25%] h-[2px] bg-black dark:bg-white blinkSide"
                        : "absolute bottom-0 w-[25%] h-[2px] blinkSide"
                    }
                  />
                </div>
              </Link>
            ) : undefined}
            {pathname === "/" ||
            pathname.includes("le-produit") ||
            pathname.includes("competences") ||
            pathname.includes("blog") ||
            pathname.includes("medias") ||
            pathname.includes("offres") ||
            pathname === "/blog" ? (
              <Link
                title="Naviguer vers le blog de YouMeet.info"
                href={"/blog"}
                className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                style={{ textDecoration: "none", height: "100%" }}
              >
                <div
                  className="flex-center h-full"
                  onMouseEnter={() => {
                    setMegaMenu1(true);
                  }}
                >
                  <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                    {t("biographies")}
                  </span>
                  <div
                    className={
                      pathname === "/blog"
                        ? "absolute bottom-0 w-[25%] h-[2px] bg-black dark:bg-white blinkSide"
                        : "absolute bottom-0 w-[25%] h-[2px] blinkSide"
                    }
                  />
                </div>
              </Link>
            ) : undefined}
          </div>
        )}
        <div
          className={
            pathname !== "/" &&
            pathname !== "/les-prix" &&
            pathname !== "/le-produit/mise-en-relation" &&
            pathname !== "/le-produit/ats"
              ? "flex flex-1 items-center justify-end gap-[12px] p-[12px] box-border"
              : "flex flex-1 items-center justify-end xs:gap-[12px] sm:gap-[12px] gap-[24px] p-[12px] box-border"
          }
        >
          {/* {pathname !== "/offres" && (
            <Link
              title="Naviguer vers la page des offres d'emploi et de stage sur YouMeet.info"
              href={`/offres`}
              className="no-underline text-black cursor-pointer"
              style={{ ...outfit.style }}
              passHref
            >
              <div className="subItem w-fit px-[12px] rounded-xl h-[32px] flex-center text-grey900 animate-pulse bg-grey100">
                {t("company-offers")}
              </div>
            </Link>
          )} */}
          {pathname === "/" && <RecruiterSpace />}
          <Locale />

          {user?.id && pathname === "/dashboard" && <NotificationsComponent />}

          <></>
        </div>
      </div>

      {(!!megaMenu1 || !!megaMenu2) && !!articles && (
        <div className="absolute h-screen top-[69px] z-[11001] shadow-inner">
          <div
            onMouseEnter={() => {
              setMegaMenu2(true);
            }}
            onMouseLeave={() => {
              if (!megaMenu1) setMegaMenu2(false);
            }}
          >
            <div className="flex justify-center z-[110] gap-[24px] w-screen h-[300px] m-[2px] dark:lightDarkBg lightBg border-y-[2px] border-l-0 border-r-0 border-solid border-black">
              <div className="w-[200px]">
                <h3 className="h-[30px] m-0 py-[6px] box-border text-grey500 text-[14px] font-extralight">
                  {t("product")}
                </h3>
                <nav className="h-[270px] overflow-hidden overflow-y-scroll box-border py-[6px] border-t-[0.5px] border-0 border-solid border-grey500">
                  <ul className="flex flex-col gap-[6px] m-0 p-0">
                    {pathname === "/" && (
                      <li
                        className="darkLi list-none cursor-pointer text-black text-[16px] font-light hover:font-medium rounded-[7px]"
                        onClick={() => {
                          scrollTo(window, "solutions");
                          setMegaMenu1(false);
                        }}
                      >
                        <span className="dark:text-white">
                          {t("exclusive-job-offer-suggestions")}
                        </span>
                      </li>
                    )}
                    <li className="darkLi list-none cursor-pointer text-[16px] font-light hover:font-medium">
                      <Link
                        href="/le-produit/mise-en-relation"
                        className="no-underline text-black"
                      >
                        <span className="dark:text-white">
                          {
                            { fr: "Mise en Relation", en: "Linking" }[
                              language as "fr" | "en"
                            ]
                          }
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="w-[200px]">
                <h3 className="h-[30px] m-0 py-[6px] box-border text-grey500 text-[14px] font-extralight">
                  {t("biographies")}
                </h3>
                <BlogMenuNav articles={articles} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
