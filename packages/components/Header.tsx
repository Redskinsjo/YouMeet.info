import React, { useEffect, useRef, useState } from "react";
import Locale from "@youmeet/components/Locale";
import { GoTriangleLeft } from "react-icons/go";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import TooltipedAsset from "./TooltipedAsset";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { blueGrey } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import { UserState } from "@youmeet/global-config/features/user";
import { HeaderComponentProps } from "@youmeet/types/Header";
import { useTranslation } from "react-i18next";
import { outfit } from "@youmeet/functions/fonts";
import RecruiterSpace from "./RecruiterSpace";
import NotificationsComponent from "./NotificationsIconComponent";
import AOS from "aos";
import "aos/dist/aos.css";
import MenuHeaderForMobile from "./MenuHeaderForMobile";
import { Article, Translated } from "@youmeet/gql/generated";
import { getArticlesParams } from "@youmeet/functions/request";
import BlogMenuNav from "./BlogMenuNav";

export default function Header({
  classes,
  newStyles,
  scrollY,
}: HeaderComponentProps) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [megaMenu, setMegaMenu] = useState(false);
  const [articles, setArticles] = useState<
    { id?: string; title: Translated; slug?: string }[]
  >([]);
  const [megaMenuLoading, setMegaMenuLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const scrollTo = (window: Window, type: "solutions" | "prices") => {
    window.scrollTo({
      top: type === "solutions" ? 2639 : 500,
      behavior: "smooth",
    });
  };

  const getArticles = async () => {
    const articles = (await getArticlesParams<Article[]>()) as Article[];
    setArticles(
      articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
      }))
    );
  };

  useEffect(() => {
    setLoading(false);
    if (megaMenu) {
      getArticles();
      setMegaMenuLoading(false);
    }
  }, [megaMenu]);

  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="relative">
      {!loading && (
        <div
          className={`header-classes h-[75px] px-[12px] dark:lightDarkBg dark:border-transparent ${
            classes || ""
          }`}
          style={newStyles}
          data-test="header"
          onMouseEnter={() => {
            if (!xs && !sm && !md) setMegaMenu(true);
          }}
          onMouseLeave={() => setMegaMenu(false)}
        >
          <div className="flex-center gap-[24px]">
            {pathname.includes("/competencies") && (
              <TooltipedAsset
                asset={`Profil de ${
                  searchParams.get("candidate") &&
                  (searchParams.get("candidate") as string)
                    .split(".")
                    .map(
                      (name: string) => name[0].toUpperCase() + name.slice(1)
                    )
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
              className="flex-center gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[3px]"
              style={{ height: "100%" }}
            >
              {pathname === "/" ||
              pathname === "/le-produit/mise-en-relation" ||
              pathname === "/le-produit/ats" ||
              pathname === "/blog" ? (
                <Link
                  title="Naviguer vers la page d'accueil de YouMeet.info"
                  href={"/"}
                  className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                  style={{ textDecoration: "none", height: "100%" }}
                >
                  <div className="flex-center h-full">
                    <div className="p-[6px] relative cursor-pointer h-full flex-center">
                      <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                        {t("home")}
                      </span>
                    </div>
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
              pathname === "/blog" ? (
                <Link
                  title="Naviguer vers le produit de mise en relation de YouMeet.info"
                  href={"/le-produit/mise-en-relation"}
                  className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                  style={{ textDecoration: "none", height: "100%" }}
                >
                  <div className="flex-center h-full">
                    <div className="p-[6px] relative cursor-pointer h-full flex-center">
                      <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                        {t("product")}
                      </span>
                    </div>
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
              pathname === "/blog" ? (
                <Link
                  title="Naviguer vers le blog de YouMeet.info"
                  href={"/blog"}
                  className="text-black flex-center h-full group relative cursor-pointer hover:rounded-t-xl focus-visible:outline-0"
                  style={{ textDecoration: "none", height: "100%" }}
                >
                  <div className="flex-center h-full">
                    <div className="p-[6px] relative cursor-pointer h-full flex-center">
                      <span className="text-[16px] header-item dark:bg-white dark:text-black px-[12px]">
                        {t("blog")}
                      </span>
                    </div>
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
                ? "flex items-center gap-[12px]"
                : "flex items-center xs:gap-[12px] sm:gap-[12px] gap-[24px]"
            }
          >
            {pathname !== "/offres" && (
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
            )}
            {pathname === "/" && <RecruiterSpace />}
            <Locale />

            {user?.id && pathname === "/dashboard" && (
              <NotificationsComponent />
            )}

            <></>
          </div>
        </div>
      )}
      {!!megaMenu && !megaMenuLoading && (
        <div
          data-aos="fade-in"
          onClick={() => setMegaMenu(false)}
          className="absolute h-screen top-[75px] z-[11001] shadow-inner"
        >
          <div
            onMouseEnter={() => setMegaMenu(true)}
            onMouseLeave={() => setMegaMenu(false)}
            className="flex justify-center gap-[24px] w-screen bg-white h-[300px] m-[2px] dark:lightDarkBg"
          >
            <div className="w-[200px]">
              <h3 className="h-[30px] m-0 py-[6px] box-border text-grey500 text-[14px] font-extralight">
                {t("product")}
              </h3>
              <nav className="h-[270px] overflow-hidden overflow-y-scroll box-border py-[6px] border-t-[0.5px] border-0 border-solid border-grey500">
                <ul className="flex flex-col gap-[6px] m-0 p-0">
                  {pathname === "/" && (
                    <li
                      className="darkLi list-none cursor-pointer text-black text-[16px] font-light hover:font-semibold rounded-[7px]"
                      onClick={() => {
                        scrollTo(window, "solutions");
                        setMegaMenu(false);
                      }}
                    >
                      <span className="dark:text-white">{t("solutions")}</span>
                    </li>
                  )}
                  <li className="darkLi list-none cursor-pointer text-[16px] font-light hover:font-semibold">
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
                {t("blog")}
              </h3>
              <BlogMenuNav articles={articles} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
