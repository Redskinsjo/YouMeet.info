"use client";
import {
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  useMediaQuery,
} from "@mui/material";
import React, {
  ReactElement,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { usePathname, useRouter } from "next/navigation";
import { deepPurple, green, grey } from "@mui/material/colors";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import {
  CustomModalProps,
  ModalContentProps,
  CustomModalType,
  trads,
} from "@youmeet/types/CustomModal";
import Link from "next/link";
import LoginModalContent from "./LoginModalContent";
import {
  GetMyNotificationsDocument,
  Offer,
  UpdateAllMyNotificationsDocument,
  Video,
  Notification,
} from "@youmeet/gql/generated";
import {
  ModalState,
  resetModal,
  setModal,
} from "@youmeet/global-config/features/modal";
import { useTranslation } from "react-i18next";
import BoldText from "./BoldText";
import NewAddCVComponent from "./NewAddCVComponent";
import DetailComponent from "./DetailComponent";
import { client } from "@youmeet/gql/index";
import { FaCheckCircle } from "react-icons/fa";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { renderUrlQuery } from "@youmeet/utils/renderUrlQuery";
import { UnknownAction } from "@reduxjs/toolkit";
import SimpleField from "./formulaire-profil/formComponents/fields/SimpleField";
import { onAddFeedback, onApplying } from "@youmeet/functions/actions";
import { useFormState } from "react-dom";
import { useQuery } from "@apollo/client";
import CustomIcon from "./CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import { giveTimeAgo } from "@youmeet/utils/formatToDatetime";
import OneLineSkeleton from "./OneLineSkeleton";
import { getOffer } from "@youmeet/functions/request";
import {
  BackofficeModalData,
  BackofficeModalDataType,
} from "@youmeet/types/modal";
import BackofficeModalContent from "./backoffice/backofficeComponents/BackofficeModalContent";
import UserRemarkComponent from "./dashboard/dashboardComponents/UserRemarkComponent";
import LoginModalClose from "./LoginModalClose";
import WebcamComponent from "./dashboard/dashboardComponents/WebcamComponent";
import { setError } from "@youmeet/global-config/features/global";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { withData } from "@youmeet/types/api/backend";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { setName } from "@youmeet/utils/setName";
import Logo from "./Logo";
import NewTargetJobComponent from "./dashboard/dashboardComponents/NewTargetJobComponent";
import NewTargetContractTypeComponent from "./dashboard/dashboardComponents/NewTargetContractTypeComponent";
import Image from "next/image";
import AddVideo from "./AddVideo";

const modals: { [type in CustomModalType]: ModalContentProps } = {
  fulfill: {},
  "request-feedback": {
    content: {
      fr: "Merci de nous laisser un feedback dans votre dashboard en nous précisant la problème.+",
      en: "We ask you to go to your dashboard and leave us an explanation of the problem, so that we can resolve it as soon as possible.+",
    },
    title: {
      fr: "Vous venez de rencontrer une erreur.+",
      en: "You just met an error.+",
    },
  },
  custom: {},
  shareProfile: {},
  requestNotCompleted: {
    content: {
      fr: "+Votre demande= n'a pas pu être prise en compte. Réessayez plus tard.+",
      en: "+Your request= could not be taken into account. Please try again later.+",
    },
    title: {
      fr: "Désolé.+",
      en: "Sorry.+",
    },
  },
  home: {},
  offer: {},
  profils: {},
  publicOffer: {},
  sharing: {},
  creditTooLow: {
    content: {
      fr: "+Votre crédit= est trop bas. Ajoutez du crédit ou souscrivez à un abonnement.+",
      en: "+Your credit= is too low. Add some credit or subscribe.+",
    },
    title: {
      fr: "Vous souhaitez voir ce profil.+",
      en: "You wish to check up this profile.+",
    },
  },
  interviewOffer: {
    content: {
      fr: "+Votre demande= a bien été prise en compte. Le candidat reçoit une notification.+",
      en: "+Your request= has been taken into account. The candidate receives a notification.+",
    },
    title: {
      fr: "Merci.+",
      en: "Thank you.+",
    },
  },
  record: {},
  remark: {
    content: {
      fr: "Que pensez-vous des fonctionnalités ? Quelle fonctionnalité utilisez-vous le plus ? Y a t-il une fonctionnalité que vous aimeriez ajouter ?.+",
      en: "What do you think of the features ? Which feature do you use the most ? Is there a feature that you wish to be added ?.+",
    },
    title: {
      fr: "Votre opinion sur l'application+",
      en: "Your opinion on the app+",
    },
  },
  "not-completed": {
    content: {
      fr: "L'action n'a pas été complétée.+",
      en: "The action was not completed.+",
    },
    title: {
      fr: "Réessayez plus tard+",
      en: "Try again later+",
    },
  },
  backoffice: {},
  notifications: {},
  loginPage: {},
  login: {},
  retrieval: {},
  consent3: {},
  feedback: {
    content: {
      fr: "Exprimez votre avis sur la présentation.+",
      en: "Tell your feeling about the presentation.+",
    },
    title: {
      fr: "Feedback+",
      en: "Feedback+",
    },
  },
  videoAdding: {
    content: {
      fr: "Ajoutez les informations suivantes:+",
      en: "Add the following documents:+",
    },
    title: {
      fr: "Vous souhaitez postuler.+",
      en: "You wish to apply.+",
    },
    cta: { fr: "Postuler maintenant+", en: "Apply now+" },
  },
  backofficeConfirm: {
    content: {
      fr: "+Votre demande= a bien été prise en compte.+",
      en: "+Your request= has been taken into account.+",
    },
    title: {
      fr: "Merci.+",
      en: "Thank you.+",
    },
  },
  offerConfirm: {
    content: {
      fr: "+Votre ajout= a bien été pris en compte. Les candidats vont pouvoir consulter votre nouvelle offre.+",
      en: "+Your adding= has been taken into account. The candidates will be able to consult your new offer.+",
    },
    title: {
      fr: "Merci.+",
      en: "Thank you.+",
    },
  },
  consent2: {
    content: {
      fr: "+Votre demande= a bien été prise en compte. L'entreprise reçoit une notification.+",
      en: "+Your request= has been taken into account. The company receives a notification.+",
    },
    title: {
      fr: "Merci.+",
      en: "Thank you.+",
    },
  },
  upload: {},
  video: {},
  unauthorized: {
    title: {
      fr: "Une erreur est survenue.+",
      en: "An error occured.+",
    },
    content: {
      fr: "Vous ne pouvez ajouter de vidéo pour le moment, réessayez plus tard.+",
      en: "You can't add a video now, try again later.+",
    },
  },
  fileTooLarge: {
    title: {
      fr: "Votre fichier est trop volumineux !+",
      en: "Your file is too large!+",
    },
    content: {
      fr: "Essayez de compresser, réduire la taille du fichier.+",
      en: "Try to compress, reduce file size.+",
    },
  },
  consent: {
    content: {
      fr: `Un email vous a été renvoyé !
  Nous vous redirigerons vers notre page d'accueil.+`,
      en: `An email has been sent to you!
      We will redirect you to our home page.+`,
    },
  },
  form: {
    title: {
      fr: "Complétez votre profil avant !+",
      en: "Complete your profile before !+",
    },
    content: {
      fr: `Quel plaisir de vous trouver ici !
  D'abord, prenez le temps de compléter votre profil, vous profiterez un maximum de notre service.+`,
      en: `What a pleasure to find you here!
  First, take the time to complete your profile, you will get the most out of our service.+`,
    },
  },
  search: {
    title: {
      fr: "Complétez votre profil avant !+",
      en: "Complete your profile first!+",
    },
    content: {
      fr: `Quel plaisir de vous trouver ici !
  D'abord, prenez le temps de compléter votre profil, vous profiterez un maximum de notre service.+`,
      en: `What a pleasure to find you here!
  First, take the time to complete your profile, you will get the most out of our service.+`,
    },
    cta: { fr: "Créer profil+", en: "Create profile+" },
  },
  account: {
    title: {
      fr: "Vous souhaitez en savoir plus.+",
      en: "You would like to know more.+",
    },
    cta: { fr: "Souscrire+", en: "Subscribe+" },
    content: {
      fr: `Les profils hautement qualifiés sont +à porter de main=. Il vous suffit de choisir votre abonnement.+`,
      en: `Highly qualified profiles are +at your fingertips=. All you have to do is choose your subscription.+`,
    },
  },
  accountCandidate: {
    title: {
      fr: "Vous souhaitez en savoir plus.+",
      en: "You would like to know more.+",
    },
    cta: { fr: "Souscrire+", en: "Subscribe+" },
    content: {
      fr: `Vous souhaitez +obtenir des références= pour les ajouter à votre profil lors de vos candidatures. Parfait, nous pouvons vous aider !+`,
      en: `You would like to +get references= to add to your profile when applying. Perfect, we can help you!+`,
    },
  },
};

const VideoAddingModal = ({ type, cta, title, content }: CustomModalProps) => {
  const md = useMediaQuery("(max-width:900px)");
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );
  const modal = useSelector((state: RootState) => state?.modal as ModalState);
  const dispatch = useDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [offer, setOffer] = useState<Offer | undefined>();
  const [checkAvailableVideos, setCheckAvailableVideos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chosenVideo, setChosenVideo] = useState<Video | undefined>();
  const [displayAdvices, setDisplayAdvices] = useState(false);

  const fetchOffer = useCallback(async () => {
    if (modal.publicOffer?.id) {
      const off = (await getOffer<Offer>(
        { id: modal.publicOffer.id as string },
        0
      )) as Offer;
      if (off) setOffer(off);
    }
  }, [modal.publicOffer]);

  const customOnApplying = async (extras: {
    originId: string | undefined;
    targetId: string | undefined;
    videoId: string | undefined;
    offerTargetId: string | undefined;
  }) => {
    const result = await onApplying(extras);
    if (result && isPayloadError(result)) {
      return dispatch(setError("not-completed"));
    }
    dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
  };

  useEffect(() => {
    fetchOffer();
    setLoading(false);
    if (user.videos) {
      const principalVideo = getPrincipalVideo(user.videos);
      setChosenVideo(principalVideo);
    }
  }, []);

  const offerJobId = modal.publicOffer?.job?.id as string | undefined;
  const readyToApply =
    user.videos.length > 0 &&
    user.cvFile &&
    offer?.company &&
    offer?.company.id &&
    chosenVideo?.id;

  return !loading ? (
    <ModalWrapper>
      <>
        <div className="w-full flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px]">
          <h3 className="text-purple900 sentences xs:my-0 sm:my-0 md:my-0">
            {modals && modals[type] && modals[type].title && (
              <BoldText
                text={`${t(
                  (title as string) ?? (modals[type].title as trads)[language]
                )}`}
              />
            )}
          </h3>

          <div className="text-blueGrey700 dark:text-blueGrey200 xs:text-[22px] sm:text-[22px] md:text-[22px] text-[19px] text-justify indent-[24px]">
            {!readyToApply ? (
              <>
                {modals && modals[type] && modals[type].content && (
                  <BoldText
                    text={`${t(
                      (content as string) ??
                        (modals[type].content as trads)[language]
                    )}`}
                  />
                )}
              </>
            ) : (
              <div className="flex items-center gap-[12px]">
                <BoldText
                  text={`${t("profile-seems-ready")}`}
                  containerStyle={{ margin: "0px" }}
                />
                <FaCheckCircle style={{ color: green[600] }} />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[24px]">
            <AddVideo
              profil={user}
              setCheckAvailableVideos={setCheckAvailableVideos}
              checkAvailableVideos={checkAvailableVideos}
              chosenVideo={chosenVideo}
              offerJobId={offerJobId}
              setChosenVideo={setChosenVideo}
            />

            {!checkAvailableVideos && !user.cvFile ? (
              <div className="w-full flex-center">
                <span className="text-black dark:text-white font-bold">
                  {t("cv")}
                </span>
                <NewAddCVComponent profil={user} />
              </div>
            ) : !checkAvailableVideos ? (
              <div className="w-full">
                <DetailComponent
                  type="modal2"
                  noLabelColon
                  noPadding
                  label={<></>}
                  value={
                    <FormControlLabel
                      className="dark:text-white text-black font-bold"
                      control={
                        <Switch
                          value={user.cvFile ? true : false}
                          checked={user.cvFile ? true : false}
                          sx={{
                            "& span .MuiSwitch-thumb": {
                              color: user.cvFile ? deepPurple[300] : grey[300],
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: `${
                                user.cvFile ? deepPurple[300] : grey[500]
                              } !important`,
                            },
                          }}
                        />
                      }
                      label={t("cv")}
                      labelPlacement="start"
                    />
                  }
                />
              </div>
            ) : undefined}
          </div>
          {!checkAvailableVideos ? (
            <form
              className="w-full flex flex-col gap-[24px]"
              action={() => {
                customOnApplying.bind(null, {
                  originId: user.id,
                  targetId: offer?.company?.id ?? "",
                  videoId:
                    (chosenVideo?.id as string) ||
                    (getPrincipalVideo(user.videos)?.id as string),
                  offerTargetId: offer?.id as string,
                });
              }}
            >
              <div>
                <BoldText
                  text={`${t("video-mandatory-from-cgu")}`}
                  containerStyle={{ margin: 0 }}
                  fontSizeClass="leading-[1.5]"
                />
                <Link
                  href={`/conditions-generales-utilisation`}
                  className="text-deepPurple900 dark:text-deepPurple200"
                >
                  <span>{t("cgu-initials")}</span>
                </Link>
              </div>
              <Button
                disabled={!readyToApply}
                className="subItem fadeIn"
                type="submit"
              >
                {modals && modals[type] && modals[type].cta && (
                  <BoldText
                    text={`${t(
                      (cta as string) ?? (modals[type].cta as trads)[language]
                    )}`}
                    containerStyle={{ margin: 0 }}
                  />
                )}
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => {
                setCheckAvailableVideos(false);
              }}
              className="subItem fadeIn"
            >
              {t("back")}
            </Button>
          )}
        </div>
        <LoginModalClose />
      </>
    </ModalWrapper>
  ) : undefined;
};

const CustomModalContent = ({
  type,
  cta,
  title,
  content,
}: CustomModalProps) => {
  const [choice, setChoice] = useState(
    type === "accountCandidate" ? "cv" : "premium"
  );
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );
  const dispatch = useDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname();

  return (
    <ModalWrapper>
      <>
        <div className="w-full flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px]">
          <h3 className="text-purple900 sentences">
            {modals && modals[type] && modals[type].title && (
              <BoldText
                text={`${t(
                  (title as string) ?? (modals[type].title as trads)[language]
                )}`}
              />
            )}
          </h3>
          <div className="text-blueGrey700 text-[19px] xs:text-[22px] sm:text-[22px] md:text-[22px] text-justify indent-[24px]">
            {modals && modals[type] && modals[type].content && (
              <BoldText
                text={`${t(
                  (content as string) ??
                    (modals[type].content as trads)[language]
                )}`}
              />
            )}
          </div>
          {type === "remark" && <UserRemarkComponent />}
          {(type === "account" || type === "accountCandidate") && (
            <form
              action={`/api/create-checkout-session?${renderUrlQuery({
                choice,
                id: user?.id,
                email: user?.email,
                customer: user?.customerId,
                redirect: encodeURIComponent(pathname),
              })}`}
              method="POST"
              className="flex-center"
            >
              <div className="flex-col flex-center gap-[24px]">
                {type === "account" && (
                  <div className="flex-center gap-[12px]">
                    <InputLabel id="choice">
                      {t("subscription-choice")}:
                    </InputLabel>
                    <Select
                      labelId="choice"
                      value={choice}
                      label="Votre choix"
                      variant="standard"
                      onChange={(e) => setChoice(e.target.value)}
                    >
                      <MenuItem value={"premium"}>Premium 45€/m</MenuItem>
                      {/* <MenuItem value={"chatbot"}>Chatbot 59€/m</MenuItem> */}
                    </Select>
                  </div>
                )}
                <div className="flex items-center">
                  <HiChevronDoubleRight className="emphasizeVisualLeft text-deepPurple500" />
                  <Button type="submit">
                    {modals && modals[type] && modals[type].cta && (
                      <BoldText
                        text={`${t(
                          (cta as string) ??
                            (modals[type].cta as trads)[language]
                        )}`}
                        containerStyle={{ margin: 0 }}
                      />
                    )}
                  </Button>
                  <HiChevronDoubleLeft className="emphasizeVisualRight text-deepPurple500" />
                </div>
              </div>
            </form>
          )}
          {type === "search" && (
            <Link href={"/formulaire-profil"}>
              <Button className="subItem">
                {modals && modals[type] && modals[type].cta && (
                  <BoldText
                    text={`${t(
                      (cta as string) ?? (modals[type].cta as trads)[language]
                    )}`}
                    containerStyle={{ margin: 0 }}
                  />
                )}
              </Button>
            </Link>
          )}
        </div>
        <LoginModalClose />
      </>
    </ModalWrapper>
  );
};

const UploadModalContent = () => {
  const { t } = useTranslation();
  return (
    <ModalWrapper>
      <>
        <div className="w-full flex-center flex-col gap-[24px]">
          <Logo gif />

          <div className="dark:text-white">{t("loading")}</div>
        </div>
        <LoginModalClose />
      </>
    </ModalWrapper>
  );
};

const FeedBackModal = ({ type }: CustomModalProps) => {
  const [state, formHandler] = useFormState(onAddFeedback, {
    data: false,
  });
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const [status, setStatus] = useState((state as withData<boolean>)?.data);
  const formRef = useRef<HTMLFormElement | null>(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state && isPayloadError(state)) dispatch(setError("not-completed"));
    else if ((state as withData<boolean>).data) {
      setStatus((state as withData<boolean>).data);
      (formRef.current as HTMLFormElement)?.reset();
      setTimeout(() => {
        setStatus(false);
        dispatch(resetModal("ok") as UnknownAction);
      }, 5000);
    }
  }, [state]);

  return (
    !!modal.user && (
      <ModalWrapper>
        <div className="w-full flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px] p-[12px]">
          <h3 className="text-purple900 sentences">
            {modals && modals[type] && modals[type].title && (
              <BoldText
                text={`${t((modals[type].title as trads)[language])}`}
              />
            )}
          </h3>
          <form
            ref={formRef}
            action={(formData: FormData) => {
              formHandler(formData);
            }}
            className="xs:text-[22px] sm:text-[22px] md:text-[22px] text-blueGrey700 text-[19px] text-center flex-center flex-col gap-[12px]"
          >
            {modals && modals[type] && modals[type].content && (
              <BoldText
                text={`${t((modals[type].content as trads)[language])}`}
              />
            )}
            <SimpleField
              id={1}
              name="feedback"
              type="text"
              label="Feedback"
              multiline={true}
              rows={3}
              required
            />
            <SimpleField
              id={2}
              name="userId"
              type="hidden"
              value={modal.user.id}
              required
            />
            <SimpleField
              id={3}
              name="authorId"
              type="hidden"
              value={user.id}
              required
            />
            <Button type="submit">{t("validate")}</Button>
          </form>
          {status && (
            <div className="text-green500 text-[16px]">
              Votre commentaire a bien été fait
            </div>
          )}
        </div>
      </ModalWrapper>
    )
  );
};

const NotificationsModalComponent = () => {
  const user = useSelector((state: RootState) => state.user as UserState);
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const { data, refetch, loading } = useQuery(GetMyNotificationsDocument, {
    variables: {
      targetId: user.id,
      type: ["offer", "view", "like", "feedback", "refusal"],
    },
    fetchPolicy: "no-cache",
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <>
        <div className="w-full h-full flex-col flex-center">
          <h3 className="item my-0">{t("my-notifications")}</h3>
          {!loading ? (
            <div className="w-full h-full flex items-center justify-between gap-[12px] box-border flex-col p-[8px] bg-grey200 rounded-[7px]">
              <div className="overflow-hidden overflow-y-scroll flex flex-col gap-[6px] w-full border-[0.5px] border-solid border-grey500 rounded-[7px]">
                {data?.myNotifications && data?.myNotifications.length ? (
                  (
                    data?.myNotifications.filter((not) => not) as Notification[]
                  ).map((notif) => (
                    <Accordion key={notif?.id}>
                      <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <span>
                          {notif?.type === "offer" ? (
                            <CustomIcon
                              name={CustomIconName.interview}
                              onlyIcon
                              newStyles={{ color: "black" }}
                            />
                          ) : undefined}
                        </span>
                        <span
                          className="text-[14px] break-normal"
                          style={{
                            textRendering: "geometricPrecision",
                          }}
                        >
                          {notif?.content}
                        </span>
                        <div className="flex-1 text-[12px] flex justify-end">
                          {giveTimeAgo(notif.createdAt)}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {notif.type === "feedback" ? (
                          <div>
                            <div className="mx-[3px] text-[14px]">
                              {notif.feedback?.content}
                            </div>

                            <div>
                              <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                                {t("from2")}
                              </span>
                              {notif.origin?.company?.id ? (
                                <span className="mx-[3px] text-[14px]">
                                  {notif.origin?.company.name}
                                </span>
                              ) : setName(notif.origin) ? (
                                <span className="mx-[3px] text-[14px]">
                                  {setName(notif.origin)}
                                </span>
                              ) : undefined}
                            </div>
                          </div>
                        ) : notif.type === "like" ? (
                          <div>
                            <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                              {t("from2")}
                            </span>
                            {notif.origin?.company?.id ? (
                              <span className="mx-[3px] text-[14px]">
                                {notif.origin?.company.name}
                              </span>
                            ) : setName(notif.origin) ? (
                              <span className="mx-[3px] text-[14px]">
                                {setName(notif.origin)}
                              </span>
                            ) : undefined}
                          </div>
                        ) : notif.type === "refusal" ? (
                          <div>
                            <div className="mx-[3px] text-[14px]">
                              {notif.refusal?.reason}
                            </div>
                            <DetailComponent
                              type="modal"
                              label={t("type")}
                              value={t(notif.refusal?.type as string)}
                            />

                            {(notif.origin?.company?.name ||
                              setName(notif.origin)) && (
                              <div>
                                <span className="mx-[3px] text-[14px] text-grey700 dark:text-grey200">
                                  {t("from2")}
                                </span>
                                {notif.origin?.company?.id ? (
                                  <span className="mx-[3px] text-[14px]">
                                    {notif.origin?.company.name}
                                  </span>
                                ) : setName(notif.origin) ? (
                                  <span className="mx-[3px] text-[14px]">
                                    {setName(notif.origin)}
                                  </span>
                                ) : undefined}
                              </div>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <div className="flex-center italic text-grey500 my-[24px] mx-0">
                    {t("no-data")}
                  </div>
                )}
              </div>

              <span
                className={
                  data?.myNotifications && data?.myNotifications.length > 0
                    ? "bottom-[4px] left-0 right-0 p-[4px] flex-center text-[14px] w-full hover:bg-grey300 cursor-pointer"
                    : "bottom-[4px] left-0 right-0 p-[4px] flex-center text-[14px] w-full hover:bg-transparent cursor-default"
                }
                onClick={async () => {
                  if (
                    data?.myNotifications &&
                    data?.myNotifications.length > 0
                  ) {
                    const response = await client.mutate({
                      mutation: UpdateAllMyNotificationsDocument,
                      variables: {
                        targetId: user.id as string,
                        status: "seen",
                      },
                    });
                    const updated = response.data?.updateAllMyNotifications;
                    if (updated) {
                      const response = await client.query({
                        query: GetMyNotificationsDocument,
                        variables: {
                          targetId: user?.id || "",
                          type: ["offer", "view"],
                        },
                        fetchPolicy: "no-cache",
                      });
                      const notifs = response.data?.myNotifications;
                      if (notifs) refetch();
                      dispatch(resetModal("ok") as UnknownAction);
                    }
                  }
                }}
              >
                {t("mark-all-read")}
              </span>
            </div>
          ) : (
            <OneLineSkeleton />
          )}
        </div>
      </>
    </ModalWrapper>
  );
};

const BackofficeModalComponent = () => {
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const content = useMemo(() => {
    let data:
      | {
          data: BackofficeModalData;
          type: BackofficeModalDataType;
        }
      | undefined;
    if (modal) {
      if (modal.queue) {
        data = {
          type: "queue",
          data: modal.queue as Partial<BackofficeModalData>,
        };
      }
      if (modal.lead) {
        data = {
          type: "lead",
          data: modal.lead as Partial<BackofficeModalData>,
        };
      }
      if (modal.thread) {
        data = {
          type: "thread",
          data: modal.thread as Partial<BackofficeModalData>,
        };
      }
      if (modal.job) {
        data = {
          type: "job",
          data: modal.job as Partial<BackofficeModalData>,
        };
      }
      if (modal.company) {
        data = {
          type: "company",
          data: modal.company as Partial<BackofficeModalData>,
        };
      }
      if (modal.user) {
        data = {
          type: "user",
          data: modal.user as Partial<BackofficeModalData>,
        };
      }
      if (data) {
        return <BackofficeModalContent data={data} />;
      }
    }
  }, [modal]);

  return content;
};

export const RecordModal = ({ type }: { type: CustomModalType }) => {
  return (
    <ModalWrapper>
      <>
        <div className="flex-center flex-col gap-[24px] relative">
          <WebcamComponent />
        </div>
        <LoginModalClose type={type} />
      </>
    </ModalWrapper>
  );
};

export const FulfillModal = ({ type }: { type: CustomModalType }) => {
  const { t } = useTranslation();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  return (
    modal.user && (
      <ModalWrapper>
        <>
          <div className="w-full h-full flex-col flex-center gap-[12px]">
            <h3 className="dark:text-white font-semibold">{t("welcome")}</h3>
            <BoldText text={t("happy-to-see-you")} align="center" />
            <BoldText text={t("welcome-incentive")} />
            <Image
              src={
                "https://res.cloudinary.com/de822mdsy/image/upload/v1715768466/youmeet-official/misc/xkvsgrihhzwlkjqi6djw.webp"
              }
              width={300 * 1.5625}
              height={300}
              alt="travailler agréablement sur une table de jardin avec un ordinateur et un café"
            />
            <BoldText text={t("start-with-some-info")} />
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <NewTargetJobComponent profil={modal.user} />
            </div>
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <NewTargetContractTypeComponent profil={modal.user} />
            </div>
            <div className="w-full bg-grey100  dark:extraLightDarkBg rounded-[14px] p-[6px] box-border">
              <AddVideo profil={modal.user} />
            </div>
          </div>
        </>
      </ModalWrapper>
    )
  );
};

export function ModalWrapper({ children }: { children: ReactElement }) {
  return (
    <div
      className="modal-content"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

const CustomModal = ({ type, setDisplayModal, children }: CustomModalProps) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const router = useRouter();

  const modalContent = useMemo(
    () =>
      type ? (
        createElement(
          type === "fulfill"
            ? FulfillModal
            : type === "record"
            ? RecordModal
            : type === "backoffice"
            ? BackofficeModalComponent
            : type === "notifications"
            ? NotificationsModalComponent
            : type === "feedback"
            ? FeedBackModal
            : type === "videoAdding"
            ? VideoAddingModal
            : type === "upload"
            ? UploadModalContent
            : type === "login"
            ? LoginModalContent
            : CustomModalContent,
          {
            setDisplayModal,
            type,
            content: modal.message,
          }
        )
      ) : (
        <></>
      ),
    [type]
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  const aboveError =
    type === "fileTooLarge" ||
    type === "not-completed" ||
    type === "request-feedback" ||
    type === "upload" ||
    type === "backofficeConfirm";

  return (
    !loading && (
      <div
        className="absolute h-full w-full fadeIn"
        style={{
          zIndex: aboveError ? 1101 : 1100,
          background: "rgba(0,0,0,0.5)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (type === "login" || type === "record") router.back();
          if (setDisplayModal)
            setDisplayModal(
              type === "consent2" ||
                type === "consent3" ||
                type === "retrieval" ||
                type === "video"
                ? undefined
                : false
            );
        }}
      >
        {type === "video" ? (
          <div className="w-full h-screen">{modalContent}</div>
        ) : (
          <div className="h-screen flex fixed w-full">
            <div className="relative m-auto box-border xs:w-screen sm:w-screen md:w-screen w-[600px] xs:h-screen sm:h-screen md:h-screen max-h-screen flex-center">
              <div
                className={
                  type === "login"
                    ? "box-border h-full xs:w-screen sm:w-screen xs:h-screen sm:h-screen md:h-screen rounded-[14px] xs:rounded-0 sm:rounded-0 md:rounded-0 flex-center w-full"
                    : "box-border rounded-[14px] xs:rounded-0 sm:rounded-0 md:rounded-0 bg-white xs:h-full sm:h-full md:h-full dark:darkBg flex-center w-full"
                }
              >
                {children ?? modalContent}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CustomModal;
