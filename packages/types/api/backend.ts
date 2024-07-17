export type PayloadBackendSuccess<T> = withData<T | undefined | never[]>;
export type ResultNotHandled<T> = T | undefined;
export type Result<T> =
  | ResultNotHandled<T>
  | PayloadBackendError
  | PayloadBackendSuccess<T>;

export type withData<T> = { data: T };

export type PayloadBackendError = {
  type: BACKEND_ERRORS;
  message: string;
  status?: number;
  error: true;
};

export type PayloadBackend = {
  error?: PayloadBackendError;
  success?: boolean | withData<any>;
};

export type PayloadRedirections = {
  error?: {
    type: BACKEND_ERRORS;
    message: BACKEND_MESSAGES;
  };
  success?: {
    uri?: string;
  };
};

export enum BACKEND_ERRORS {
  SIGNING_FAIL = 1,
  UPLOAD_FAIL = 2,
  MISSING_ARGUMENT = 3,
  NOT_CREATED = 4,
  UNKNOWN = 5,
  NO_FILE = 6,
  PROCESSING = 7,
  FILE_TOO_LARGE = 8,
  NOT_DELETED = 9,
  WRONG_FORMAT = 10,
  NO_USER = 11,
  WRONG_CREDENTIALS = 12,
  NO_PRO_USER = 13,
  NO_CAND_USER = 14,
  REQUEST_FEEDBACK = 15,
  ERROR_ON_PATH = 16,
  JSON_NOT_VALID = 17,
  NOT_AUTHORIZED = 18,
  USER_EXIST = 19,
  DATATYPE_INVALID = 20,
  EMAIL_FAIL = 21,
  NOT_VALID = 22,
  NO_PAYLOAD = 22,
  NO_LEAD = 23,
  NOT_CANDIDATE = 24,
  NO_QUERY = 25,
  CONFIDENTIAL = 26,
  NOT_SUCCESSFULL_REGISTRATION = 27,
  TRY_GOOGLE = 28,
  GOOGLE_ERROR = 29,
  COOKIE_CORRUPTED = 30,
  CUSTOMER_NOT_CREATED = 31,
  NO_CHOICE = 32,
  NOT_AUTHENTICATED = 33,
}

export enum BACKEND_MESSAGES {
  SIGNING_FAIL = "La signature a échoué",
  UPLOAD_FAIL = "Le téléchargement a échoué",
  NO_FILE = "Aucun fichier",
  MISSING_ARGUMENT = "Un argument manque",
  PROCESSING = "Une erreur est survenue dans le processus",
  FILE_TOO_LARGE = "Le fichier est trop large",
  NOT_DELETED = "Aucun document n'a été supprimé",
  WRONG_FORMAT = "Le format ne correspond pas",
  NO_USER = "L'utilisateur n'existe pas",
  WRONG_CREDENTIALS = "Le mot de passe ne correspond pas à l'email",
  UNKNOWN = "Une erreur est survenue. Réessayez plus tard.",
  NO_PRO_USER = "L'utilisateur ne peut pas se connecter ici",
  NO_CAND_USER = "L'utilisateur ne peut pas se connecter ici",
  REQUEST_FEEDBACK = "Vous avez rencontré une erreur. Merci de nous faire un retour dans votre dashboard.",
  ERROR_ON_PATH = "Il y a eu une erreur de syntaxe sur le path.",
  JSON_NOT_VALID = "JSON n'est pas valide.",
  NOT_AUTHORIZED = "Vous n'êtes pas autorisé.",
  USER_EXIST = "L'utilisateur existe déjà.",
  DATATYPE_INVALID = "Le type de donnée n'est pas valide pour:",
  EMAIL_FAIL = "L'email n'a pas pu être envoyé.",
  NOT_VALID = "La donnée n'est pas valide.",
  NO_PAYLOAD = "Une erreur est survenue.",
  COOKIE_CORRUPTED = "Votre cookie n'est pas valide.",
  CUSTOMER_NOT_CREATED = "Il y a eu une erreur avec la création de votre abonnement.",
  NO_CHOICE = "Il manque le choix de l'utilisateur.",
  GOOGLE_ERROR = "Un problème avec Google Signin.",
  TRY_GOOGLE = "Mauvaise connexion. Tentez avec Google.",
  CONFIDENTIAL = "Le nom d'utilisateur ou le mot de passe est incorrecte.",
  NOT_AUTHENTICATED = "Vous n'êtes pas autentifié.",
}
