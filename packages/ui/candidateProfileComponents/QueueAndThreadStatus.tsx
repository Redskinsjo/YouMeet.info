import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import {
  BetaQueue,
  BetaWhatsappThread,
  GetOneThreadDocument,
} from "@youmeet/gql/generated";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IoChevronDown } from "react-icons/io5";
import DetailComponent from "../DetailComponent";
import { MdOutlineCancel } from "react-icons/md";
import {
  formatToDatetime,
  giveTimeAgo,
} from "@youmeet/utils/basics/formatToDatetime";
import TooltipedAsset from "../TooltipedAsset";
import { useCallback, useEffect, useRef, useState } from "react";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { outfit } from "@youmeet/functions/fonts";
import { onCancelConversation } from "@youmeet/functions/actions";
import { FaRegEye } from "react-icons/fa";
import { client } from "@youmeet/gql/index";
import BoldText from "../BoldText";
import { setName } from "@youmeet/utils/basics/setName";
import OneLineSkeleton from "../OneLineSkeleton";

export default function QueueAndThreadStatus({ queue }: { queue: BetaQueue }) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);
  const [thread, setThread] = useState<BetaWhatsappThread | undefined>();

  const getThread = async () => {
    const response = await client.query({
      query: GetOneThreadDocument,
      variables: { queueId: queue.id },
    });
    const thread = response.data.oneThread;
    if (thread) setThread(thread);
  };

  const handleCloseSnackbar = useCallback(() => setSnackbar(null), []);

  const handleEntered = useCallback(() => {
    noButtonRef.current?.focus();
  }, [noButtonRef.current]);

  const handleNo = useCallback(() => {
    const { resolve } = promiseArguments;
    resolve("cancelled");
    setPromiseArguments(null);
  }, [promiseArguments]);

  const handleYes = useCallback(
    async (id: string) => {
      const { reject, resolve } = promiseArguments;

      const result = await onCancelConversation(id, { status: "cancelled" });
      if (result && isPayloadError(result)) {
        setSnackbar({
          children: "La conversation n'a pas pu être annulée",
          severity: "error",
        });
        reject("failed");
        setPromiseArguments(null);
      } else {
        setSnackbar({
          children: "La conversation a bien été annulée",
          severity: "success",
        });
        resolve("success");
        setPromiseArguments(null);
      }
    },
    [promiseArguments]
  );

  const handleCancelClick = useCallback(async (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setPromiseArguments({ resolve, reject, id });
    });
  }, []);

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
          {`Appuyer sur 'Oui' va annuler la conversation.`}
        </DialogContent>
        <DialogActions>
          <Button
            ref={noButtonRef}
            onClick={() => handleNo()}
            sx={{ ...outfit.style }}
          >
            Non
          </Button>
          <Button onClick={() => handleYes(id)} sx={{ ...outfit.style }}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [promiseArguments]);

  useEffect(() => {
    getThread();
  }, []);

  return (
    <div className="w-full">
      {renderConfirmDialog()}
      <Accordion key={queue.id} defaultExpanded={false} className="w-full">
        <AccordionSummary
          expandIcon={<IoChevronDown />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ display: "flex" }}
        >
          {queue.seen && (
            <div className="flex-center">
              <TooltipedAsset asset={t("conversation-was-seen")}>
                <>
                  <FaRegEye className="w-[25px] h-[25px]" />
                </>
              </TooltipedAsset>
            </div>
          )}
          <DetailComponent
            noPadding
            label=""
            noLabelColon
            newStyles={{ width: "fit-content" }}
            value={
              <span
                className={
                  queue.status === "valid"
                    ? "text-green600 dark:text-green200 whitespace-nowrap font-bold"
                    : queue.status === "cancelled"
                    ? "text-red600 dark:text-red600 whitespace-nowrap font-bold"
                    : "text-blueGrey600 dark:text-blueGrey200 whitespace-nowrap font-bold"
                }
              >
                {t(queue.status as string)}
              </span>
            }
          />
          <DetailComponent
            newStyles={{ width: "fit-content" }}
            noPadding
            label={
              <span className="not-italic text-[12px] dark:text-grey200">
                {t("updatedAt")}
              </span>
            }
            value={
              <span className="font-semibold dark:text-white">
                {giveTimeAgo(queue.updatedAt)}
              </span>
            }
          />
          {queue.offerTarget && (
            <DetailComponent
              newStyles={{ width: "fit-content" }}
              noPadding
              label={
                <span className="not-italic text-[12px] dark:text-grey200">
                  {t("offer")}
                </span>
              }
              fullWidth
              value={
                <div className="flex-center gap-[12px]">
                  {queue.offerTarget?.job?.title && (
                    <span className="font-semibold whitespace-nowrap dark:text-white">
                      {queue.offerTarget?.job?.title[language as "fr" | "en"]}
                    </span>
                  )}
                  {queue.offerTarget.location && (
                    <div className="flex gap-[3px] dark:text-grey300">
                      <span>{t("to2")}</span>
                      <span className="font-semibold dark:text-white">
                        {queue.offerTarget?.location}
                      </span>
                    </div>
                  )}
                  {queue.offerTarget.revenue && (
                    <div className="flex gap-[3px] dark:text-grey300">
                      <span>{t("for")}</span>
                      <span className="font-semibold dark:text-white">
                        {queue.offerTarget?.revenue}
                      </span>
                    </div>
                  )}
                  {queue.offerTarget.contractType && (
                    <div className="flex gap-[3px] dark:text-grey300">
                      <span>{t("as")}</span>
                      <span className="font-semibold dark:text-white">
                        {queue.offerTarget?.contractType}
                      </span>
                    </div>
                  )}
                </div>
              }
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <DetailComponent
            label={t("createdAt")}
            noPadding
            value={
              <span>
                {formatToDatetime(
                  queue.createdAt,
                  false,
                  true,
                  false,
                  language
                )}
              </span>
            }
          />

          {thread?.exchanges?.map((exchange) => (
            <div key={exchange?.id}>
              <div className="bg-cyan50 p-[6px] flex flex-col gap-[3px]">
                <DetailComponent
                  type="modal"
                  labelNoWrap
                  noPadding
                  label={t("your-question")}
                  value={
                    <div className="w-[900px] max-w-screen">
                      {exchange?.question?.text as string}
                    </div>
                  }
                />
                <DetailComponent
                  type="modal"
                  labelNoWrap
                  noPadding
                  label={t("question-type")}
                  value={t(exchange?.question?.type as string)}
                />
              </div>
              <DetailComponent
                conversation
                noLabelColon
                label={setName(queue.target)}
                value={
                  <>
                    {exchange?.responses && exchange?.responses?.length > 0 ? (
                      exchange?.responses
                        ?.filter((res) => res?.content)
                        .map((res) => (
                          <BoldText
                            key={res?.id}
                            text={res?.content as string}
                            links
                            containerStyle={{ margin: "0px" }}
                          />
                        ))
                    ) : (
                      <OneLineSkeleton width="100%" />
                    )}
                  </>
                }
              />
            </div>
          ))}
        </AccordionDetails>
        {queue.status !== "valid" && queue.status !== "cancelled" && (
          <div className="w-full flex-bet">
            <div />
            <TooltipedAsset asset={t("cancel")}>
              <div className="p-[12px] w-[22px] h-[22px]">
                <MdOutlineCancel
                  className="text-red600 dark:text-red200 w-full h-full cursor-pointer"
                  onClick={() => {
                    if (queue.id) handleCancelClick(queue.id);
                  }}
                />
              </div>
            </TooltipedAsset>
          </div>
        )}
      </Accordion>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
