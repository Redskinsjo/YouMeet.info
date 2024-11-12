export type OffreEmploiFTParams = {
  /**  Offres pour lesquelles l’employeur est handi friendly */
  accesTravailleurHandicape?: boolean;
  /**  Code appellation ROME de l’offre, voir le référentiel ci-dessous */
  appellation?: string;
  /**  Code NAF de l’offre, (format 99.99X) */
  codeNAF?: string;
  codeROME?: string;
  /**  Code INSEE de la commune, voir le référentiel ci-dessous */
  commune?: string;
  departement?: string;
  /**  Distance à la commune (pris en compte uniquement si une commune est renseignée, plus d'information dans la documentation) */
  distance?: number;
  domaine?: string;
  /**  Recherche les offres avec une durée de contrat maximale (format double de 0 à 99 bornes incluses) */
  dureeContratMax?: string;
  /**  Recherche les offres avec une durée de contrat minimale (format double de 0 à 99 bornes incluses) */
  dureeContratMin?: string;
  dureeHebdo?: string;
  /**  format HHMM */
  dureeHebdoMax?: string;
  /**  Recherche les offres avec une durée minimale (format HHMM) */
  dureeHebdoMin?: string;
  entreprisesAdaptees?: boolean;
  /**  Niveau d’expérience demandé 1 moins d'un an, 2 de 1 à 3 ans, 3 plus de 3 ans */
  experience?: 1 | 2 | 3;
  /**  D débutant accepté, S expérience souhaitée, E expérience exigée */
  experienceExigence?: "D" | "E" | "S";
  inclureLimitrophes?: boolean;
  /**  format yyyy-MM-dd'T'hh:mm:ss'Z' */
  maxCreationDate?: string;
  /**  format yyyy-MM-dd'T'hh:mm:ss'Z' */
  minCreationDate?: string;
  modeSelectionPartenaires?: "INCLUS" | "EXCLU";
  motsCles?: string;
  natureContrat?: string | "contrat d’apprentissage";
  niveauFormation?: string;
  offresMRS?: boolean;
  offresManqueCandidats?: boolean;
  origineOffre?: 1 | 2;
  partenaires?: string;
  paysContinent?: string;
  periodeSalaire?: "M" | "A" | "H" | "C";
  permis?: string;
  publieeDepuis?: number;
  qualification?: "0" | "9";
  /** Pagination des données. La plage de résultats est limitée à 150.
   p est l’index (débutant à 0) du premier élément demandé ne devant pas dépasser 3000
   d est l’index de dernier élément demandé ne devant pas dépasser 3149
   Example?:
   0-49 ; 50-99 */
  range?: string;
  region?: string;
  salaireMin?: string;
  secteurActivite?: string;
  /** Pertinence décroissante , distance croissante, date de création horodatée décroissante, origine de l’offre : sort=0
   Date de création horodatée décroissante, pertinence décroissante, distance croissante, origine de l’offre : sort=1
   Distance croissante, pertinence décroissante, date de création horodatée décroissante, origine de l’offre : sort=2 */
  sort?: "0" | "1" | "2";
  tempsPlein?: boolean;
  theme?: string;
  typeContrat?: "CDI" | "CDD" | "freelance";
};

export type OffreEmploiFT = {
  /**   Identifiant de l’offre d’emploi */
  id: string;

  /** Intitulé de l’offre */
  intitule: string;

  /** Description de l’offre */
  description: string;

  /** Date de création de l’offre */
  dateCreation: string;

  /** Date de dernière actualisation de l'offre */
  dateActualisation: string;

  /** Lieu de travail*/
  lieuTravail: WorkLocationFT;

  /** Code ROME de l’offre */
  romeCode: string;

  /** Libellé associé au code ROME */
  romeLibelle: string;

  /** Libellé de l’appellation ROME de l’offre */
  appellationlibelle: string;

  /** Entreprise */
  entreprise: EnterpriseFT;

  /** Code du type de contrat proposé (CDD, CDI, etc.) */
  typeContrat: string;

  /** Libellé du type de contrat proposé */
  typeContratLibelle: string;

  /** Nature du contrat (contrat d’apprentissage, etc.) */
  natureContrat: string;

  /** E : l’expérience est exigée, S : l’expérience est souhaitée */
  experienceExige: string;

  /** Libellé de l’expérience */
  experienceLibelle: string;

  /** Commentaire sur l’expérience */
  experienceCommentaire: string;

  /** Formations */
  formations: FormationFT[];

  /** Langues */
  langues: Required[];

  /** Permis */
  permis: Required[];

  /** Liste des outils bureautiques utilisés */
  outilsBureautiques: string[];

  /** Compétences */
  competences: Entity[];
  /** Salaire */
  salaire: SalaryFT;

  /**Libellé de la durée de travail*/
  dureeTravailLibelle: string;

  /**Temps plein ou temps partiel*/
  dureeTravailLibelleConverti: string;

  /**Complément exercice */
  complementExercice: string;

  /** Valeurs du type « Travail de nuit » ; « travail en hauteur »*/
  conditionExercice: string;

  /** Vrai si c’est une offre pour de l’alternance */
  alternance: boolean;

  /** Contact */
  contact: ContactFT;

  /** Agence Pôle Emploi */
  agence: AgencyFT;

  /** Nombre de postes disponibles pour cette offre */
  nombrePostes: number;

  /** Vrai si l’offre est accessible aux travailleurs handicapés */
  accessibleTH: boolean;

  deplacementCode: string;

  /** Description des déplacements demandés */
  deplacementLibelle: string;

  /** Qualification du poste. Pour la qualification, on remonte les 9 valeurs 1 : manœuvre, ... 8 agent de maitrise, 9 cadre*/
  qualificationCode: string;

  /** Libellé de la qualification du poste */
  qualificationLibelle: string;

  /** Code NAF */
  codeNAF: string;

  /** division NAF (comprend les deux premiers chiffre du NAF)*/
  secteurActivite: string;

  /** Secteur d’activité de l’offre */
  secteurActiviteLibelle: string;

  /** Qualités professionnelles */
  qualitesProfessionnelles: ProfessionalQualityFT[];

  /** Libellé de la tranche d'effectif de l'etablissement */
  trancheEffectifEtab: string;

  /** Origine de l'offre */
  origineOffre: OriginOfferFT;

  /** Flag des offres difficiles à pourvoir */
  offresManqueCandidats: boolean;
};

export type JobsManyFTParams = {
  /** Sélecteur de champs : il est possible de paramétrer le retour de la requête en définissant les champs souhaités (liste exhaustive des champs possibles : Allowed values).
  * Vous pouvez vous aider des exemples de réponse pour identifier les champs que vous voulez récupérer.
  *
  Allowed values:
  accesemploi
  appellations(emploireglemente,transitionecologiquedetaillee,libelle,code,emploicadre,transitionecologique,transitionnumerique,transitiondemographique,classification,libellecourt)
  code
  codeisco
  definition
  domaineprofessionnel(libelle,code,granddomaine(libelle,code))
  emploicadre
  emploireglemente
  formacodes(libelle,code)
  label
  libelle
  riasecmajeur
  riasecmineur
  transitiondemographique
  transitionecologique
  transitionecologiquedetaillee
  transitionnumerique
  Example:
  formacodes(libelle,code),libelle,code */
  champs: string;

  /* Code compétence. */
  "code-competence": string;

  /** Code de la division NAF. */
  "code-naf": string;

  /** Riasec majeur. */
  "riasec-majeur": string;

  /** Riasec mineur. */
  "riasec-mineur": string;
};

export type JobFTParams = {
  /** Sélecteur de champs : il est possible de paramétrer le retour de la requête en définissant les champs souhaités (liste exhaustive des champs possibles : Allowed values).
Vous pouvez vous aider de l'exemple de réponse pour identifier les champs que vous voulez récupérer.

Allowed values:
code
libelle
riasecmineur
riasecmajeur
Example:
riasecmineur,riasecmajeur,libelle,code */
  champs: string;

  /** Les filtre(s) de recherche (filters query). Ex : fq=code:1 AND (code:2 OR libelle:app). Si non précisé, aucun filtre n'est appliqué. */
  fq: string;

  /** Lorsque plusieurs mots sont présents dans la recherche (q=mot1 mot2), indique si au moins 1 mot doit correspondre 'OR' ou s'ils doivent tous correspondre 'AND'. Si non précisé, 'OR' est utilisé */
  op: string;

  /** Les indexe(s) de recherche (query fields). Si non précisé, on cherche sur le code et libellé. */
  qf: string;

  /** Le(s) mot(s) et/ou début de mot(s) recherché(s). required*/
  q: string;
};

export type JobFT = {
  /** Liste des secteurs d'activites liés. */
  secteursActivites: {}[];

  /** Liste des thèmes liés. */
  themes: Theme[];

  /** boolean définissant si l'entité est obsolete */
  obsolete: boolean;

  /** Transition démographique: oui/non. Ce champ est optionnel. */
  transitionDemographique: boolean;

  /** Transition écologique: oui/non. Ce champ est optionnel. */
  transitionEcologique: boolean;

  /** Transition écologique détaillée. Ce champ est optionnel.
   *
   * Allowed values:
   * EMPLOI_STRATEGIQUE
   * EMPLOI_VERT
   * EMPLOI_BLANC
   * EMPLOI_BRUN
   *  */
  transitionEcologiqueDetaillee: string;

  /** Transition numérique: oui/non. Ce champ est optionnel. */
  transitionNumerique: boolean;
};

export type CompetenceDetaillee = {
  /** Code unique de la compétence.

Example:
100007 */
  code: string;

  /** deprecated
Code OGR. Cet attribut est déprécié et n'est plus présent que pour des raisons de rétro-compatibilités @deprecated */
  codeOgr: string;

  /** Libellé de la compétence.

Example:
Techniques de soudage */
  libelle: string;

  /** Cette propriété est forcément à la valeur 'COMPETENCE-DETAILLEE'. */
  type: string;

  /** Riasec Majeur. Ce champ est optionnel.

Allowed values:
R
I
A
S
E
C
@optional
*/
  riasecMajeur: string;

  /** Riasec Mineur. Ce champ est optionnel.
   *
   * Allowed values:
   * R
   * I
   * A
   * S
   * E
   * C
   *
   * @optional
   * */
  riasecMineur: string;
};

export type Theme = {
  /** Code unique du thème.

Example:
12 */
  code: string;

  /** <date-time>
date de fin de validité (renseignée si l'entité est obsolete) */
  dateFin: string;

  /** Définition du thème. Ce champs est optionnel.

Example:
Métiers liés à l'éducation, l'enseignement, l'animation, aux loisirs et aux soins des enfants */
  definition: string;

  /** Libellé du thème.

Example:
Métiers auprès des enfants */
  libelle: string;

  /** Métiers rattachés. */
  metiers: Metier[];

  /** boolean définissant si l'entité est obsolete */
  obsolete: boolean;
};

export type Metier = {
  /** Acces emploi.

Example:
Ce métier est accessible avec un CAP/BEP Agricole en travaux forestiers et bûcheronnage. */
  accesEmploi: string;

  /** Liste des appellations rattachées. */
  appellations: {}[];

  /** Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante. @deprecated */
  appellationsEnvisageables: {}[];

  /** Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante. @deprecated */
  appellationsProches: {}[];

  /** Liste des centres d'intérêts liés. */
  centresInterets: {}[];

  /** Code unique du métier.

Example:
A1201 */
  code: string;

  /** Code ISCO (International Standard Classification of Occupations ou CITP en français). Ce champ est optionnel.

Example:
6210 */
  codeIsco: string;

  /** Compétence détaillée (en provenance du référentiel 'Compétences'). */
  competencesMobilisees: CompetenceDetaillee[];

  /** Compétence détaillée (en provenance du référentiel 'Compétences'). */
  competencesMobiliseesEmergentes: CompetenceDetaillee[];

  /** Compétence détaillée (en provenance du référentiel 'Compétences'). */
  competencesMobiliseesPrincipales: CompetenceDetaillee[];

  /** Liste des contextes de travail liés. */
  contextesTravail: {}[];

  /** <date-time>
date de fin de validité (renseignée si l'entité est obsolete)

definition
string
Définition.

Example:
Réalise des opérations de coupe et d'entretien d'arbres */
  dateFin: string;

  /** Liste des divisions NAF liées. */
  divisionsNaf: {}[];

  /** Domaine professionnel */
  domaineProfessionnel: {};

  /** Emploi cadre: oui/non. Ce champ est optionnel. @optional */
  emploiCadre: boolean;

  /** Emploi réglementé: oui/non. Ce champ est optionnel. @optional */
  emploiReglemente: boolean;

  /** Liste des formacodes liés. */
  formacodes: {}[];

  /** Label (code métier d'origine). Cette valeur est utilisée dans le cas où un métier a été divisé en plusieurs métiers. Ce champ est optionnel.

Example:
A1201
libelle
string
Libellé du métier.

Example:
Bûcheronnage et élagage */
  label: string;

  /** Liste des métiers en proximité. */
  metiersEnProximite: {}[];

  /** Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante. @deprecated */
  metiersEnvisageables: {}[];

  /** Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante. @deprecated */
  metiersProches: {}[];

  /** boolean définissant si l'entité est obsolete */
  obsolete: boolean;

  /** Riasec Majeur. Ce champ est optionnel.

Allowed values:
R
I
A
S
E
C */
  riasecMajeur: string;

  /** Riasec Mineur. Ce champ est optionnel.

Allowed values:
R
I
A
S
E
C */
  riasecMineur: string;

  /** Liste des secteurs d'activites liés. */
  secteursActivites: {}[];

  /** Liste des thèmes liés. */
  themes: {}[];

  /** Transition démographique: oui/non. Ce champ est optionnel. */
  transitionDemographique: boolean;

  /** Transition écologique: oui/non. Ce champ est optionnel. */
  transitionEcologique: boolean;

  /** Transition écologique détaillée. Ce champ est optionnel.

Allowed values:
EMPLOI_STRATEGIQUE
EMPLOI_VERT
EMPLOI_BLANC
EMPLOI_BRUN */
  transitionEcologiqueDetaillee: string;

  /** Transition numérique: oui/non. Ce champ est optionnel. */
  transitionNumerique: boolean;
};

export type WorkLocationFT = {
  /** Libellé du lieu de travail */
  libelle: string;

  /** Latitude du lieu de travail */
  latitude: number;

  /** Longitude de lieu de travail */
  longitude: number;

  /** Code postal du lieu de travail */
  codePostal: string;

  /** Code Insee du lieu de travail */
  commune: string;
};

export type EnterpriseFT = {
  /** Nom de l’entreprise */
  nom: string;

  /** Description de l’entreprise */
  description: string;

  /** URL du logo de l’entreprise */
  logo: string;

  /** URL du site de l’entreprise */
  url: string;

  /** Flag entreprise adaptee */
  entrepriseAdaptee: boolean;
};

export type FormationFT = {
  /** Code du domaine de formation souhaité */
  codeFormation: string;

  /** Domaine de formation souhaité */
  domaineLibelle: string;

  /** Niveau de formation souhaité */
  niveauLibelle: string;

  /** Commentaire sur la formation */
  commentaire: string;

  /** E : la formation est exigée, S : la formation est souhaitée */
  exigence: string;
};

export type Required = {
  /** Ce qui est requis(e) */
  libelle: string;

  /** E : est exigé(e), S : est souhaité(e) */
  exigence: string;
};

export type Codified = {
  /** Code */
  code: string;
};

export type Entity = Required & Codified;

export type SalaryFT = {
  /** Libellé du salaire (ex : 31k€ annuel sur 12 mois) */
  libelle: string;

  /** Commentaire sur le salaire */
  commentaire: string;

  /** Complément 1 de rémunération (prime, véhicule…) */
  complement1: string;

  /** Complément 2 de rémunération (prime, véhicule…) */
  complement2: string;
};

export type ContactFT = {
  /** Nom du recruteur */
  nom: string;

  /** Adresse du recruteur */
  coordonnees1: string;

  /** Adresse du recruteur */
  coordonnees2: string;

  /** Adresse du recruteur */
  coordonnees3: string;

  /** N° de téléphone du recruteur */
  telephone: string;

  /** Courriel du recruteur */
  courriel: string;

  /** Précision sur le contact de l’offre */
  commentaire: string;

  /** URL du recruteur */
  urlRecruteur: string;

  /** URL du formulaire de postulation */
  urlPostulation: string;
};

export type AgencyFT = {
  /** N° de téléphone de l’agence Pôle Emploi*/
  telephone: string;

  /** Courriel de l’agence de Pôle Emploi */
  courriel: string;
};

export type ProfessionalQualityFT = {
  /** Libellé de la qualité professionnelle demandée */
  libelle: string;

  /** Description de la qualité professionnelle demandée */
  description: string;
};

export type OriginOfferFT = {
  /** Origine de l’offre */
  origine: string;

  /** URL de l’offre sur les sites des partenaires */
  urlOrigine: string;

  partenaires: PartenairFT[];
};

export type PartenairFT = {
  /** Nom du partenaire */
  nom: string;

  /** URL de l’offre sur les sites des partenaires */
  url: string;

  /** URL du logo sur les sites des partenaires */
  logo: string;
};
