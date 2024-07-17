type PrivateCookiePayload = {
  email: string;
  name: string;
  experienceId?: string;
  queueId?: string;
  consentId?: string;
  viewerUserId: string;
  authorship: "candidate" | "profile";
};

export default PrivateCookiePayload;
