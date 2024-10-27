"use client";
import { BetaUser, Translated } from "@youmeet/gql/generated";
import BoldText from "./BoldText";
import Link from "next/link";
import { uri } from "@youmeet/functions/imports";
import { setName } from "@youmeet/utils/basics/setName";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

export default function DiscoverMoreUsers({
  users,
  profil,
}: {
  users: BetaUser[];
  profil?: BetaUser;
}) {
  const pathname = usePathname();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    pathname !== "/dashboard" &&
    !!profil && (
      <div className="border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg xs:w-full sm:w-full flex-col flex-center xs:p-[6px] smp-[6px] p-[16px]">
        <h3 className="dark:text-white my-[6px]">{t("discover-more-users")}</h3>
        <div className="flex-center flex-wrap gap-[12px] p-[12px]">
          {users.map(
            (user) =>
              user.id !== profil?.id && (
                <Link
                  key={user.id}
                  href={`${uri}/${user.uniqueName}`}
                  className="flex-center p-[12px] bg-grey50 dark:mediumDarkBg rounded-[14px] no-underline group"
                >
                  <div className="flex-center flex-col gap-[2px]">
                    <BoldText
                      text={setName(user)}
                      align="center"
                      fontSizeClass="group-hover:text-black group-hover:font-bold"
                      containerStyle={{ margin: "0px" }}
                    />
                    {user.candidate?.targetJob?.title && (
                      <span className="text-[14px] text-blue300 group-hover:text-blue500">
                        {
                          (user.candidate.targetJob.title as Translated)[
                            language as "fr" | "en"
                          ]
                        }
                      </span>
                    )}
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    )
  );
}
