"use client";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReactElement, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import products from "@youmeet/raw-data/produits.json";
import { ModalState } from "@youmeet/global-config/features/modal";
import React from "react";

const BoldText = dynamic(() => import("../../../BoldText"));

const images = [
  "https://res.cloudinary.com/de822mdsy/image/upload/v1716233816/ygprotpwltkl9efosbat.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1716140848/ekjkwuurugtyluilxhxm.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1716140596/rfboyaw3wyrfuhjdxegy.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1716136344/mt4wdmmlvxgkft2qshqk.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1707345219/culhp0lfc2mzymshvdjm.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1707345208/cuiu89l7qm0cst3asgk6.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1707345173/qjwz2wetop24obxychx5.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1706294048/szo6gbz8rk5r2j94kwao.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1706293702/k7huzyw60oae7hb7m3fh.webp",
];

const words = [
  "talent",
  "developer",
  "productOwner",
  "recruiter",
  "expertAccountant",
  "receptionnist",
  "contentManager",
];

export default function ProductComponent() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollingUp, setScrollinUp] = useState(false);
  const { t, i18n } = useTranslation();
  const md = useMediaQuery("(max-width:900px)");
  const sm = useMediaQuery("(max-width:720px)");
  const xs = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState<ReactElement | undefined>();
  const [counting, setCounting] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [displayed, setDisplayed] = useState([]);

  const punchlines = products[0].punchlines;

  const grid = useMemo(() => {
    if (displayed && displayed.length > 0) {
      return (
        <div className="product-grid box-border">
          {displayed.map(
            (punchline: { text: string; cta: string }, i: number) => {
              return (
                <div
                  key={punchline.cta || i}
                  className={
                    i === 0 ||
                    i === 3 ||
                    i === 4 ||
                    i === 7 ||
                    i === 8 ||
                    i === 11 ||
                    i === 12 ||
                    i === 15 ||
                    i === 16
                      ? "w-full min-h-[480px] xs:min-h-[360px] sm:min-h-[360px] md:min-h-[360px] bg-deepPurple50 dark:extraLightDarkBg flex-center flex-col group shadow-2xl gap-[24px] p-[24px] xs:p-[12px] sm:p-[12px] box-border"
                      : "w-full min-h-[480px] xs:min-h-[360px] sm:min-h-[360px] md:min-h-[360px] bg-white dark:mediumDarkBg flex-center flex-col group shadow-2xl gap-[24px] p-[24px] xs:p-[12px] sm:p-[12px] box-border"
                  }
                >
                  {i === 0 ||
                  i === 3 ||
                  i === 4 ||
                  i === 7 ||
                  i === 8 ||
                  i === 11 ||
                  i === 12 ||
                  i === 15 ||
                  i === 16 ? (
                    <div className="flex flex-col gap-[12px]">
                      <div className="flex-1 flex flex-col flex-center m-0 p-0">
                        <h3 className="text-blueGrey900 dark:text-white sentences px-[48px] xs:px-0 text-center">
                          {t(punchline.cta)}
                        </h3>
                        <span
                          className={
                            i === 0 ||
                            i === 3 ||
                            i === 4 ||
                            i === 7 ||
                            i === 8 ||
                            i === 11 ||
                            i === 12 ||
                            i === 15 ||
                            i === 16
                              ? "w-[25%] h-[2px] group-hover:bg-blueGrey900 dark:group-hover:bg-white"
                              : "w-[25%] h-[2px]"
                          }
                        />
                      </div>
                      <div
                        className={
                          i === 0 ||
                          i === 3 ||
                          i === 4 ||
                          i === 7 ||
                          i === 8 ||
                          i === 11 ||
                          i === 12 ||
                          i === 15 ||
                          i === 16
                            ? "text-blueGrey900 text-justify indent-8 xss:indent-2 xs:indent-2 sm:indent-4 px-[48px] xs:px-[12px] sm:px-[12px] md:px-[12px] max-w-[65%] xs:max-w-full sm:max-w-full md:max-w-[90%] flex-[2] overflow-scroll"
                            : "text-blueGrey900 text-justify indent-8 xss:indent-2 xs:indent-2 sm:indent-4 px-[48px] xs:px-[12px] sm:px-[12px] md:px-[12px] max-w-[65%] xs:max-w-full sm:max-w-full md:max-w-full flex-[2] overflow-scroll"
                        }
                      >
                        <BoldText
                          text={punchline.text}
                          fontSizeClass="dark:text-black"
                          align="justify"
                          containerStyle={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      alt="une image représentant un métier"
                      src={
                        images[
                          i === 1
                            ? 0
                            : i === 2
                            ? 1
                            : i === 5
                            ? 2
                            : i === 6
                            ? 3
                            : i === 9
                            ? 4
                            : i === 10
                            ? 5
                            : i === 13
                            ? 6
                            : i === 14
                            ? 7
                            : 8
                        ]
                      }
                      width={0}
                      height={0}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      );
    }
    return [];
  }, [scrollY, i18n.language, xs, sm, displayed]);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window) {
        if (scrollY > window.scrollY) setScrollinUp(true);
        else setScrollinUp(false);
        setScrollY(window.scrollY);
      }
    });
    if (loading) setLoading(false);
  }, [scrollY]);

  useEffect(() => {
    const displayed = (punchlines as any[]).reduce((acc, curr, i) => {
      const followedByImg = i === 0 || i === 2 || i === 4 || i === 6;

      if (followedByImg) {
        acc.push(curr);
        acc.push({ cta: "", text: "" });
        acc.push({ cta: "", text: "" });
        return acc;
      } else {
        acc.push(curr);
        return acc;
      }
    }, []);
    setDisplayed(displayed);
  }, [dispatch]);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    const interval = setInterval(() => {
      setCounting((counting) => {
        if (counting < words.length - 1) {
          return counting + 1;
        } else {
          return 0;
        }
      });
      setWord(
        <span className="wording bg-black px-[6px] pb-[4px] rounded-[14px]">
          {t(words[counting])}
        </span>
      );
    }, 3000);

    setIntervalId(interval);
    return () => clearInterval(interval);
  }, [counting]);

  return (
    <div>
      <div className="w-screen linkingProductBg flex xs:flex-col sm:flex-col md:flex-col">
        <Image
          width={1536}
          height={1536}
          src={
            "https://res.cloudinary.com/de822mdsy/image/upload/v1716305668/pnqltcib50sqqc2jw5ae.webp"
          }
          alt="un visage humain et des phrases de présentation dans plusieurs langues"
          style={{
            width: xs || sm || md ? "100vw" : "500px",
            height: "auto",
          }}
        />

        <div className="min-w-[495px] xs:w-screen sm:w-screen xs:min-w-0 sm:min-w-0 md:min-w-screen p-[48px] py-[72px] xs:p-[24px] xs:py-[36px] sm:p-[24px] sm:py-[36px] md:p-[48px] box-border flex flex-col flex-1">
          <div className="flex flex-col gap-[12px]">
            <h1 className="dark:text-white font-bold my-0 text-white">
              {t("homeTitleSecondary")}
            </h1>
            <p className="dark:text-grey500 sentences text-grey300">
              <span>{t("homeDescription")}</span>
              {word}
              <span>.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mediumBg dark:darkBg">{grid}</div>
    </div>
  );
}
