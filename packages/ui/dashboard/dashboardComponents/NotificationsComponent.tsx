"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BetaUser,
  GetOneInterviewOfferDocument,
  GetOneInterviewOfferQuery,
  GetOneInterviewOfferQueryVariables,
  GetOneOfferDocument,
  GetOneOfferQuery,
  GetOneOfferQueryVariables,
  GetOneProfileSharingDocument,
  GetOneProfileSharingQuery,
  GetOneProfileSharingQueryVariables,
  InterviewOffer,
  Offer,
  ProfileSharing,
  Translated,
  UnlockedUser,
} from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { client } from "@youmeet/gql/index";
import { useTranslation } from "react-i18next";
import BoldText from "../../BoldText";
import { DataGrid, GridLocaleText, GridRowId } from "@mui/x-data-grid";
import { formatToDatetime, giveTimeAgo } from "@youmeet/utils/formatToDatetime";
import { setHiddenName, setName } from "@youmeet/utils/setName";
import { setModal } from "@youmeet/global-config/features/modal";
import {
  SelectionState,
  resetSelection,
} from "@youmeet/global-config/features/selection";
import { Alert, AlertProps, Button } from "@mui/material";
import TooltipedAsset from "../../TooltipedAsset";
import Link from "next/link";
import SubPartContainer from "../../SubPartContainer";
import {
  chatbotProduct,
  premiumProduct,
  uriCandidates,
} from "@youmeet/functions/imports";
import { outfit } from "@youmeet/functions/fonts";
import { BsEyeFill } from "react-icons/bs";
import { UnknownAction } from "@reduxjs/toolkit";
import { UserState, setCredit } from "@youmeet/global-config/features/user";
import {
  onDeleteNotification,
  onUnlockCandidate,
} from "@youmeet/functions/actions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import getOfferOrPreviewValues from "@youmeet/utils/getOfferOrPreviewValues";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import {
  isInterviewOffer,
  isOffer,
  isPayloadError,
  isProfileSharing,
} from "@youmeet/types/TypeGuards";
import { GlobalState, setError } from "@youmeet/global-config/features/global";
import { FaLockOpen } from "react-icons/fa";
import { GetMyUnlockedUsers } from "@youmeet/functions/request";

type RowNotification = {
  id: string;
  jobTitle?: string;
  fullname?: string;
  hourtime?: string;
  createdAt: Date;
};

export default function NotificationsComponent({
  notifications,
  sharings,
  offers,
  profil,
  unlockedUsers,
}: {
  notifications:
    | (ProfileSharing | InterviewOffer | Offer | null)[]
    | undefined
    | null;
  sharings?: boolean;
  offers?: boolean;
  profil: BetaUser;
  unlockedUsers: UnlockedUser[];
}) {
  const [myUnlockedUsers, setMyUnlockedUsers] =
    useState<UnlockedUser[]>(unlockedUsers);
  const unlockedIds = myUnlockedUsers
    ?.map((unlocked) => unlocked?.target?.id)
    .filter((d) => d) as string[];
  const dispatch = useDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const selection = useSelector(
    (state: RootState) => state.selection as SelectionState
  );
  const subscription = useSelector(
    (state: RootState) => (state.global as GlobalState).subscription
  );
  const user = useSelector((state: RootState) => state.user as UserState);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [rows, setRows] = useState<RowNotification[]>([]);

  const isSubscribedPro = useMemo(
    () =>
      subscription
        ? subscription?.subscriptions.find(
            (sub) =>
              (sub.plan.id === chatbotProduct && (sub.plan as any).active) ||
              (sub.plan.id === premiumProduct && (sub.plan as any).active)
          )
        : undefined,
    [subscription]
  );

  const shouldSee = useCallback(
    (not: ProfileSharing) =>
      (not.origin?.id && unlockedIds?.includes(not.origin?.id as string)) ||
      isSubscribedPro
        ? true
        : false,
    [unlockedIds, isSubscribedPro]
  );

  const handleCloseSnackbar = useCallback(() => setSnackbar(null), []);

  const handleEntered = useCallback(() => {
    noButtonRef.current?.focus();
  }, [noButtonRef.current]);

  const handleNo = useCallback(() => {
    const { resolve } = promiseArguments;
    resolve("cancelled");
    setPromiseArguments(null);
  }, [promiseArguments]);

  const handleYes = useCallback(async (id: string, type: "s" | "o" | "i-o") => {
    const { reject, resolve } = promiseArguments;

    const result = await onDeleteNotification(id, type);
    if (result && isPayloadError(result)) {
      setSnackbar({
        children: "La ligne n'a pas pu être supprimée",
        severity: "error",
      });
      reject("failed");
      setPromiseArguments(null);
    } else {
      setRows(rows.filter((row) => row.id !== id));

      setSnackbar({
        children: "La ligne a bien été supprimée",
        severity: "success",
      });
      resolve("success");
      setPromiseArguments(null);
    }
  }, []);

  const handleDeleteClick = useCallback(
    async (id: GridRowId, type: "s" | "o" | "i-o"): Promise<string> => {
      return new Promise((resolve, reject) => {
        setPromiseArguments({ resolve, reject, id, type });
      });
    },
    []
  );

  const renderConfirmDialog = useCallback(() => {
    if (!promiseArguments) {
      return null;
    }

    const { id, type } = promiseArguments;
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Êtes-vous sûr(e)?</DialogTitle>
        <DialogContent dividers sx={{ ...outfit.style }}>
          {`Appuyer sur 'Oui' va supprimer la ligne.`}
        </DialogContent>
        <DialogActions>
          <Button
            ref={noButtonRef}
            onClick={() => handleNo()}
            sx={{ ...outfit.style }}
          >
            Non
          </Button>
          <Button onClick={() => handleYes(id, type)} sx={{ ...outfit.style }}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [promiseArguments]);

  const customOnUnlockCandidate = useCallback(
    async (extras: {
      originId: string | undefined;
      targetId: string;
      cardPrice: number | undefined;
    }) => {
      const { originId, targetId, cardPrice } = extras;
      if (originId && targetId && cardPrice !== undefined) {
        const hasCredit = user.credit >= cardPrice;
        if (hasCredit || isSubscribedPro) {
          const result = await onUnlockCandidate({
            originId,
            targetId,
            cardPrice,
          });

          if (result && isPayloadError(result)) {
            dispatch(setError("requestNotCompleted"));
          } else {
            dispatch(setCredit(result.data.credit as number));
            const unlockedUsers = (await GetMyUnlockedUsers<UnlockedUser[]>({
              originId: profil.id,
            })) as UnlockedUser[];
            setMyUnlockedUsers(unlockedUsers);
          }
        } else {
          dispatch(setError("creditTooLow"));
        }
      } else {
        dispatch(setError("creditTooLow"));
      }
    },
    [user]
  );

  const deleteColumn = useMemo(
    () => ({
      field: "actions",
      headerClassName:
        "text-blueGrey900 dark:text-grey500 font-extralight flex-center",
      headerName: "Actions",
      minWidth: sharings ? 180 : 120,
      renderCell: (row: any) => {
        return (
          <div className="flex-center h-full gap-[6px]">
            <Button
              onClick={async (e) => {
                e.stopPropagation();
                await handleDeleteClick(
                  row.row.id,
                  sharings ? "s" : offers ? "o" : "i-o"
                );
              }}
            >
              {t("delete")}
            </Button>
            {sharings && !shouldSee(row.row) && (
              <div onClick={(e) => e.stopPropagation()}>
                <TooltipedAsset asset={t("unlock-candidate")}>
                  <form
                    action={customOnUnlockCandidate.bind(null, {
                      cardPrice: row.row.cardPrice,
                      originId: user.id,
                      targetId: row.row.origin?.id,
                    })}
                    className={
                      user.professionalEmail
                        ? "cursor-pointer group flex-center"
                        : "cursor-not-allowed group flex-center"
                    }
                  >
                    <Button
                      type="submit"
                      className="bg-transparent hover:bg-deepPurple50 dark:hover:extraLightDarkBg animate-pulse hover:animate-none"
                    >
                      <FaLockOpen className="group-hover:font-bold item text-deepPurple900 dark:text-white" />
                    </Button>
                  </form>
                </TooltipedAsset>
              </div>
            )}
          </div>
        );
      },
    }),
    []
  );

  const getRows = useCallback(() => {
    const rows = (
      (notifications || [])?.filter((not) => not) as (
        | ProfileSharing
        | InterviewOffer
        | Offer
      )[]
    ).map((not) => {
      if (offers && isOffer(not as Offer)) {
        return {
          jobTitle: ((not as Offer)?.job?.title as Translated)[
            language as "fr" | "en"
          ],
          id: not.id,
          location: (not as Offer).location,
          revenue: (not as Offer).revenue,
          contractType: (not as Offer).contractType,
          slug: (not as Offer).slug,
          createdAt: not?.createdAt,
        } as RowNotification;
      } else if (sharings && isProfileSharing(not)) {
        return {
          fullname: shouldSee(not)
            ? setName(not?.origin)
            : setHiddenName(not.origin),
          createdAt: not?.createdAt,
          jobTitle: (not.offerTarget?.job?.title as Translated)[
            language as "fr" | "en"
          ],
          cardPrice: not?.origin?.cardPrice,
          origin: not.origin,
          id: not.id,
        } as RowNotification;
      } else if (isInterviewOffer(not)) {
        return {
          fullname: setName((not as InterviewOffer)?.origin),
          hourtime: (not as InterviewOffer).datetime,
          createdAt: not?.createdAt,
          id: not.id,
        } as RowNotification;
      }
      return {
        createdAt: new Date(),
        id: not.id as string,
      };
    });

    setRows(rows);
  }, [notifications, language]);

  useEffect(() => {
    getRows();
  }, [user, language]);

  return (
    <SubPartContainer
      radius="14px"
      newStyles={{
        padding: "12px",
        border: "unset",
      }}
    >
      <div
        id={
          sharings
            ? "my-notifications-sharing"
            : offers
            ? "my-notifications-offers"
            : "my-notifications-interview-offers"
        }
        className="flex flex-col gap-[12px]"
      >
        <h2 className="text-deepPurple900 dark:text-white">
          {t(
            offers
              ? "all-your-published-offers"
              : sharings
              ? "all-your-sharings"
              : "all-your-interviews"
          )}
        </h2>
        {notifications && notifications.length > 0 && (
          <BoldText
            text={t(
              `${offers ? "offers" : sharings ? "sharings" : "interviews"}-text`
            )}
            fontSizeClass=""
            containerStyle={{ margin: 0 }}
            align="left"
          />
        )}
        {renderConfirmDialog()}
        {notifications && notifications.length > 0 && user.company?.id ? (
          <DataGrid
            style={{
              minHeight: "200px",
            }}
            getRowClassName={(row) =>
              (selection.interviewOfferId === row.id && !sharings) ||
              (selection.profileSharingId === row.id && sharings)
                ? `cursor-pointer animate-pulse`
                : "cursor-pointer dark:text-white"
            }
            hideFooterPagination={true}
            // getCellClassName={() => "dark:text-white dark:darkBg"}
            localeText={
              {
                columnsPanelTextFieldPlaceholder: t("column-title"),
                columnsPanelHideAllButton: t("hide-all"),
                columnsPanelShowAllButton: t("show-all"),
                filterPanelInputLabel: t("value"),
                filterPanelInputPlaceholder: t("filter-value"),
                filterOperatorAfter: t("after"),
                filterOperatorBefore: t("before"),
                filterOperatorContains: t("contains"),
                filterOperatorEndsWith: t("end-with"),
                filterOperatorEquals: t("equals"),
                filterOperatorIs: t("is"),
                filterOperatorIsAnyOf: t("is-one-among"),
                filterOperatorIsEmpty: t("is-empty"),
                filterOperatorIsNotEmpty: t("is-not-empty"),
                filterOperatorNot: t("is-not"),
                filterOperatorOnOrAfter: t("on-or-after"),
                filterOperatorOnOrBefore: t("on-or-before"),
                filterOperatorStartsWith: t("starts-with"),
                filterPanelOperator: t("operator"),
                filterPanelColumns: t("column"),
                footerRowSelected: (count) => `${count} ${t("selected-lines")}`,
                noRowsLabel: t("no-data"),
                toolbarFiltersLabel: t("filter"),
                columnMenuSortAsc: t("sort-asc"),
                columnMenuSortDesc: t("sort-desc"),
                columnMenuFilter: t("filtering"),
                columnMenuHideColumn: t("hide-column"),
                columnMenuManageColumns: t("manager"),
                columnMenuShowColumns: t("show-column"),
                columnMenuUnsort: t("mix"),
              } as Partial<GridLocaleText>
            }
            onRowClick={async (row) => {
              dispatch(resetSelection({}));

              if (sharings) {
                if (!shouldSee(row.row)) {
                  dispatch(
                    setModal({
                      display: "account",
                    }) as UnknownAction
                  );
                  return;
                }
              }
              const variables = {} as GetOneOfferQueryVariables &
                GetOneProfileSharingQueryVariables &
                GetOneInterviewOfferQueryVariables;
              if (sharings) variables.data = { id: String(row.id) as string };
              else variables.id = String(row.id);
              const response = await client.query({
                query: offers
                  ? GetOneOfferDocument
                  : sharings
                  ? GetOneProfileSharingDocument
                  : GetOneInterviewOfferDocument,
                variables,
                fetchPolicy: "no-cache",
              });

              const notif = offers
                ? (response.data as GetOneOfferQuery).oneOffer
                : sharings
                ? (response?.data as GetOneProfileSharingQuery)
                    ?.oneProfileSharing
                : (response?.data as GetOneInterviewOfferQuery)
                    ?.oneInterviewOffer;
              if (notif) {
                const value = {} as {
                  sharing?: ProfileSharing;
                  interview?: InterviewOffer;
                  offerPreview?: OfferContentValues;
                };
                if (offers) {
                  const values = await getOfferOrPreviewValues(
                    notif as Offer,
                    language as "fr" | "en",
                    user.company?.id as string
                  );
                  value.offerPreview = values;
                } else if (sharings) value.sharing = notif as ProfileSharing;
                else value.interview = notif as InterviewOffer;

                if (offers || sharings) {
                  dispatch(
                    setModal({
                      display: offers ? "offer" : "sharing",
                      ...value,
                    }) as UnknownAction
                  );
                }
              }
            }}
            className="w-full bg-white dark:mediumDarkBg dark:darkDatagridHeader dark:darkSortIcon notDarkSortIcon dark:darkSortIcon notDarkSortIcon dark:darkOverlay notDarkOverlay dark:darkLine"
            rows={rows}
            columns={
              offers
                ? [
                    {
                      type: undefined,
                      field: "createdAt",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("createdAt"),
                      minWidth: 140,
                      flex: 1,
                      valueFormatter: (value: any) => {
                        return formatToDatetime(
                          value,
                          false,
                          false,
                          false,
                          language
                        );
                      },
                      renderCell: (row: any) => {
                        return (
                          <TooltipedAsset
                            asset={giveTimeAgo(row.row.createdAt)}
                          >
                            <div
                              className={"px-[4px] dark:text-white"}
                              style={{
                                overflow: "scroll",
                              }}
                            >
                              {row.formattedValue}
                            </div>
                          </TooltipedAsset>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "jobTitle",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("jobTitle"),
                      minWidth: 120,
                      flex: 1,
                      renderCell: (row: any) => {
                        return (
                          <div
                            className="px-[4px] dark:text-white"
                            style={{
                              overflow: "scroll",
                            }}
                          >
                            {row.row.jobTitle}
                          </div>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "location",
                      minWidth: 120,
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("me-organisation-infos-label-location"),
                      width: 160,
                      renderCell: (row: any) => {
                        return (
                          <div className="px-[4px] dark:text-white">
                            {row.row.location}
                          </div>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "revenue",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("revenue"),
                      width: 160,
                      renderCell: (row: any) => {
                        return (
                          <div className="px-[4px] dark:text-white">
                            {row.row.revenue}
                          </div>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "contractType",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("contractType"),
                      width: 160,
                      renderCell: (row: any) => {
                        return (
                          <div className="px-[4px] dark:text-white">
                            {row.row.contractType}
                          </div>
                        );
                      },
                    },
                    {
                      field: "consult",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: "Consulter",
                      minWidth: 100,
                      renderCell: (row: any) => {
                        return (
                          <div className="flex-center">
                            <Link
                              href={`${uriCandidates}/offres/${row.row.slug}`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button>
                                <BsEyeFill className="item" />
                              </Button>
                            </Link>
                          </div>
                        );
                      },
                    },
                    deleteColumn,
                  ]
                : sharings
                ? [
                    {
                      type: undefined,
                      field: "createdAt",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("createdAt"),
                      flex: 1,
                      valueFormatter: (value: any) => {
                        return formatToDatetime(
                          value,
                          false,
                          false,
                          false,
                          language
                        );
                      },
                      cellClassName: "overflow-scroll overflow-x-hidden",
                      renderCell: (row: any) => {
                        return (
                          <TooltipedAsset
                            asset={giveTimeAgo(row.row.createdAt)}
                          >
                            <div
                              className="px-[4px] dark:text-white"
                              style={{
                                overflow: "scroll",
                              }}
                            >
                              {row.formattedValue}
                            </div>
                          </TooltipedAsset>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "jobTitle",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("jobTitle"),
                      minWidth: 260,
                    },
                    {
                      type: undefined,
                      field: "fullname",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("candidate-name"),
                      minWidth: 190,
                    },
                    deleteColumn,
                  ]
                : [
                    {
                      type: undefined,
                      field: "createdAt",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("createdAt"),
                      flex: 1,
                      valueFormatter: (value: any) => {
                        return formatToDatetime(
                          value,
                          false,
                          false,
                          false,
                          language
                        );
                      },
                      cellClassName: "overflow-scroll overflow-x-hidden",
                      renderCell: (row: any) => {
                        return (
                          <TooltipedAsset
                            asset={giveTimeAgo(row.row.createdAt)}
                          >
                            <div
                              className="px-[4px] dark:text-white"
                              style={{
                                overflow: "scroll",
                              }}
                            >
                              {row.formattedValue}
                            </div>
                          </TooltipedAsset>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "hourtime",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("hourtime"),
                      flex: 1,
                      valueFormatter: (value: any) => {
                        return formatToDatetime(
                          value,
                          false,
                          false,
                          false,
                          language
                        );
                      },
                      cellClassName: "overflow-scroll overflow-x-hidden",
                      renderCell: (row: any) => {
                        return (
                          <TooltipedAsset asset={giveTimeAgo(row.row.hourtime)}>
                            <div
                              className="px-[4px] dark:text-white"
                              style={{
                                overflow: "scroll",
                              }}
                            >
                              {row.formattedValue}
                            </div>
                          </TooltipedAsset>
                        );
                      },
                    },
                    {
                      type: undefined,
                      field: "fullname",
                      headerClassName:
                        "text-blueGrey900 dark:text-grey500 font-extralight",
                      headerName: t("recruiter-name"),
                      minWidth: 140,
                    },
                    deleteColumn,
                  ]
            }
            autoHeight
          />
        ) : (
          <div className="w-full flex-center italic text-grey500 font-extralight legend h-[240px]">
            {t("no-data")}
          </div>
        )}
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </SubPartContainer>
  );
}
