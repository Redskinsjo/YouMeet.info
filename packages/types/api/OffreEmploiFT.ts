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
  lieuTravail: any;

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

  /** Code ROME de l’offre */
  romeCode: string;

  /** Libellé associé au code ROME */
  romeLibelle: string;

  /** Libellé de l’appellation ROME de l’offre */
  appellationlibelle: string;

  /** Entreprise */
  entreprise: {
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
  formations: {
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
  }[];

  /** Langues */
  langues: {
    /** Langue souhaitée */
    libelle: string;

    /** E : la langue est exigée, S : la langue est souhaitée */
    exigence: string;
  }[];

  /** Permis */
  permis: {
    /** Permis demandé */
    libelle: string;

    /** E : le permis est exigée, S : la permis est souhaitée */
    exigence: string;
  }[];

  /** Liste des outils bureautiques utilisés */
  outilsBureautiques: string[];

  /** Compétences */
  competences: {
    /** Code de la compétence */
    code: string;

    /** Libellé de la compétence */
    libelle: string;

    /** E : la compétence est exigée, S : la compétence est souhaitée */
    exigence: string;
  }[];
  /** Salaire */
  salaire: {
    /** Libellé du salaire (ex : 31k€ annuel sur 12 mois) */
    libelle: string;

    /** Commentaire sur le salaire */
    commentaire: string;

    /** Complément 1 de rémunération (prime, véhicule…) */
    complement1: string;

    /** Complément 2 de rémunération (prime, véhicule…) */
    complement2: string;
  };

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
  contact: {
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

  /** Agence Pôle Emploi */
  agence: {
    /** N° de téléphone de l’agence Pôle Emploi*/
    telephone: string;

    /** Courriel de l’agence de Pôle Emploi */
    courriel: string;
  };
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
  qualitesProfessionnelles: {
    /** Libellé de la qualité professionnelle demandée */
    libelle: string;

    /** Description de la qualité professionnelle demandée */
    description: string;
  }[];

  /** Libellé de la tranche d'effectif de l'etablissement */
  trancheEffectifEtab: string;

  /** Origine de l'offre */
  origineOffre: {
    /** Origine de l’offre */
    origine: string;

    /** URL de l’offre sur les sites des partenaires */
    urlOrigine: string;

    partenaires: {
      /** Nom du partenaire */
      nom: string;

      /** URL de l’offre sur les sites des partenaires */
      url: string;

      /** URL du logo sur les sites des partenaires */
      logo: string;
    }[];
  };
  /** Flag des offres difficiles à pourvoir */
  offresManqueCandidats: boolean;
};

export type JobsManyFTParams = {
  /** Sélecteur de champs : il est possible de paramétrer le retour de la requête en définissant les champs souhaités (liste exhaustive des champs possibles : Allowed values).
  Vous pouvez vous aider des exemples de réponse pour identifier les champs que vous voulez récupérer.
  
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

  /** Code compétence. */
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
  // accesEmploi
  // string
  // Acces emploi.

  // Example:
  // Ce métier est accessible avec un CAP/BEP Agricole en travaux forestiers et bûcheronnage.
  // appellations
  // array[object]
  // Liste des appellations rattachées.

  // appellationEsco
  // object
  // Appellation ESCO (en provenance du référentiel 'ESCO')

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // classification
  // string
  // Classification.

  // Allowed values:
  // PRINCIPALE
  // SYNONYME
  // code
  // string
  // Code unique de l'appellation.

  // Example:
  // 12374
  // competencesCles
  // array[object]
  // Liste des Compétences clés rattachées.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi règlementé: oui/non. Ce champ est optionnel.

  // libelle
  // string
  // Libellé de l'appellation.

  // Example:
  // Chef / Cheffe de station fruitière
  // libelleCourt
  // string
  // Libellé court de l'appellation. Ce champ est optionnel.

  // Example:
  // Chef de station fruitière
  // metier
  // object
  // Métier

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationEsco
  // object
  // Appellation ESCO (en provenance du référentiel 'ESCO')

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // classification
  // string
  // Classification.

  // Allowed values:
  // PRINCIPALE
  // SYNONYME
  // code
  // string
  // Code unique de l'appellation.

  // Example:
  // 12374
  // competencesCles
  // array[object]
  // Liste des Compétences clés rattachées.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi règlementé: oui/non. Ce champ est optionnel.

  // libelle
  // string
  // Libellé de l'appellation.

  // Example:
  // Chef / Cheffe de station fruitière
  // libelleCourt
  // string
  // Libellé court de l'appellation. Ce champ est optionnel.

  // Example:
  // Chef de station fruitière
  // metier
  // object
  // Métier

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationEsco
  // object
  // Appellation ESCO (en provenance du référentiel 'ESCO')

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // classification
  // string
  // Classification.

  // Allowed values:
  // PRINCIPALE
  // SYNONYME
  // code
  // string
  // Code unique de l'appellation.

  // Example:
  // 12374
  // competencesCles
  // array[object]
  // Liste des Compétences clés rattachées.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi règlementé: oui/non. Ce champ est optionnel.

  // libelle
  // string
  // Libellé de l'appellation.

  // Example:
  // Chef / Cheffe de station fruitière
  // libelleCourt
  // string
  // Libellé court de l'appellation. Ce champ est optionnel.

  // Example:
  // Chef de station fruitière
  // metier
  // object
  // Métier

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // centresInterets
  // array[object]
  // Liste des centres d'intérêts liés.

  // code
  // string
  // Code unique du centre d'intérêt.

  // Example:
  // 25
  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition du centre d'intérêt. Ce champs est optionnel.

  // libelle
  // string
  // Libellé du centre d'intérêts.

  // Example:
  // Je suis amateur / amatrice de sensations fortes
  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // code
  // string
  // Code unique du métier.

  // Example:
  // A1201
  // codeIsco
  // string
  // Code ISCO (International Standard Classification of Occupations ou CITP en français). Ce champ est optionnel.

  // Example:
  // 6210
  // competencesMobilisees
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // code
  // string
  // Code unique de la compétence.

  // Example:
  // 100007
  // codeOgr
  // string
  // deprecated
  // Code OGR. Cet attribut est déprécié et n'est plus présent que pour des raisons de rétro-compatibilités

  // libelle
  // string
  // Libellé de la compétence.

  // Example:
  // Techniques de soudage
  // type
  // string
  // Cette propriété est forcément à la valeur 'COMPETENCE-DETAILLEE'.

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // competencesMobiliseesEmergentes
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // code
  // string
  // Code unique de la compétence.

  // Example:
  // 100007
  // codeOgr
  // string
  // deprecated
  // Code OGR. Cet attribut est déprécié et n'est plus présent que pour des raisons de rétro-compatibilités

  // libelle
  // string
  // Libellé de la compétence.

  // Example:
  // Techniques de soudage
  // type
  // string
  // Cette propriété est forcément à la valeur 'COMPETENCE-DETAILLEE'.

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // competencesMobiliseesPrincipales
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // code
  // string
  // Code unique de la compétence.

  // Example:
  // 100007
  // codeOgr
  // string
  // deprecated
  // Code OGR. Cet attribut est déprécié et n'est plus présent que pour des raisons de rétro-compatibilités

  // libelle
  // string
  // Libellé de la compétence.

  // Example:
  // Techniques de soudage
  // type
  // string
  // Cette propriété est forcément à la valeur 'COMPETENCE-DETAILLEE'.

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // contextesTravail
  // array[object]
  // Liste des contextes de travail liés.

  // categorie
  // string
  // Catégorie de contexte de travail.

  // Allowed values:
  // CONDITIONS_TRAVAIL
  // TYPE_BENEFICIAIRE
  // LIEU_ET_DEPLACEMENT
  // HORAIRE_ET_DUREE_TRAVAIL
  // TYPE_STRUCTURE_ACCUEIL
  // STATUT_EMPLOI
  // code
  // string
  // Code unique du contexte de travail.

  // Example:
  // 403091
  // libelle
  // string
  // Libellé du contexte de travail.

  // Example:
  // En club sportif
  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition.

  // Example:
  // Réalise des opérations de coupe et d'entretien d'arbres
  // divisionsNaf
  // array[object]
  // Liste des divisions NAF liées.

  // code
  // string
  // Code unique de la division NAF.

  // Example:
  // 24
  // libelle
  // string
  // Libellé de la division NAF.

  // Example:
  // Métallurgie
  // domaineProfessionnel
  // object
  // Domaine professionnel

  // code
  // string
  // Code unique du domaine professionnel.

  // Example:
  // A14
  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // grandDomaine
  // object
  // Grand Domaine

  // libelle
  // string
  // Libellé du domaine professionnel.

  // Example:
  // Production
  // metiers
  // array[object]
  // Liste des métiers rattachés.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi réglementé: oui/non. Ce champ est optionnel.

  // formacodes
  // array[object]
  // Liste des formacodes liés.

  // code
  // string
  // Code unique du formacode V13.

  // Example:
  // 21317
  // libelle
  // string
  // Libellé du formacode.

  // Example:
  // culture algue
  // label
  // string
  // Label (code métier d'origine). Cette valeur est utilisée dans le cas où un métier a été divisé en plusieurs métiers. Ce champ est optionnel.

  // Example:
  // A1201
  // libelle
  // string
  // Libellé du métier.

  // Example:
  // Bûcheronnage et élagage
  // metiersEnProximite
  // array[object]
  // Liste des métiers en proximité.

  // accesEmploi
  // string
  // Acces emploi.

  // Example:
  // Ce métier est accessible avec un CAP/BEP Agricole en travaux forestiers et bûcheronnage.
  // appellations
  // array[object]
  // Liste des appellations rattachées.

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // centresInterets
  // array[object]
  // Liste des centres d'intérêts liés.

  // code
  // string
  // Code unique du métier.

  // Example:
  // A1201
  // codeIsco
  // string
  // Code ISCO (International Standard Classification of Occupations ou CITP en français). Ce champ est optionnel.

  // Example:
  // 6210
  // competencesMobilisees
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesEmergentes
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesPrincipales
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // contextesTravail
  // array[object]
  // Liste des contextes de travail liés.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition.

  // Example:
  // Réalise des opérations de coupe et d'entretien d'arbres
  // divisionsNaf
  // array[object]
  // Liste des divisions NAF liées.

  // domaineProfessionnel
  // object
  // Domaine professionnel

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi réglementé: oui/non. Ce champ est optionnel.

  // formacodes
  // array[object]
  // Liste des formacodes liés.

  // label
  // string
  // Label (code métier d'origine). Cette valeur est utilisée dans le cas où un métier a été divisé en plusieurs métiers. Ce champ est optionnel.

  // Example:
  // A1201
  // libelle
  // string
  // Libellé du métier.

  // Example:
  // Bûcheronnage et élagage
  // metiersEnProximite
  // array[object]
  // Liste des métiers en proximité.

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // secteursActivites
  // array[object]
  // Liste des secteurs d'activites liés.

  // themes
  // array[object]
  // Liste des thèmes liés.

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // accesEmploi
  // string
  // Acces emploi.

  // Example:
  // Ce métier est accessible avec un CAP/BEP Agricole en travaux forestiers et bûcheronnage.
  // appellations
  // array[object]
  // Liste des appellations rattachées.

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // centresInterets
  // array[object]
  // Liste des centres d'intérêts liés.

  // code
  // string
  // Code unique du métier.

  // Example:
  // A1201
  // codeIsco
  // string
  // Code ISCO (International Standard Classification of Occupations ou CITP en français). Ce champ est optionnel.

  // Example:
  // 6210
  // competencesMobilisees
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesEmergentes
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesPrincipales
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // contextesTravail
  // array[object]
  // Liste des contextes de travail liés.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition.

  // Example:
  // Réalise des opérations de coupe et d'entretien d'arbres
  // divisionsNaf
  // array[object]
  // Liste des divisions NAF liées.

  // domaineProfessionnel
  // object
  // Domaine professionnel

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi réglementé: oui/non. Ce champ est optionnel.

  // formacodes
  // array[object]
  // Liste des formacodes liés.

  // label
  // string
  // Label (code métier d'origine). Cette valeur est utilisée dans le cas où un métier a été divisé en plusieurs métiers. Ce champ est optionnel.

  // Example:
  // A1201
  // libelle
  // string
  // Libellé du métier.

  // Example:
  // Bûcheronnage et élagage
  // metiersEnProximite
  // array[object]
  // Liste des métiers en proximité.

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // secteursActivites
  // array[object]
  // Liste des secteurs d'activites liés.

  // themes
  // array[object]
  // Liste des thèmes liés.

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // accesEmploi
  // string
  // Acces emploi.

  // Example:
  // Ce métier est accessible avec un CAP/BEP Agricole en travaux forestiers et bûcheronnage.
  // appellations
  // array[object]
  // Liste des appellations rattachées.

  // appellationsEnvisageables
  // array[object]
  // deprecated
  // Liste des appellations envisageable. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // appellationsProches
  // array[object]
  // deprecated
  // Liste des appellations proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // centresInterets
  // array[object]
  // Liste des centres d'intérêts liés.

  // code
  // string
  // Code unique du métier.

  // Example:
  // A1201
  // codeIsco
  // string
  // Code ISCO (International Standard Classification of Occupations ou CITP en français). Ce champ est optionnel.

  // Example:
  // 6210
  // competencesMobilisees
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesEmergentes
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // competencesMobiliseesPrincipales
  // array (oneOf) [CompetenceDetaillee]array (oneOf) [MacroSavoirEtreProfessionnel]array (oneOf) [MacroSavoirFaire]array (oneOf) [Savoir]

  // array (oneOf) [CompetenceDetaillee]
  // Compétence détaillée (en provenance du référentiel 'Compétences').

  // contextesTravail
  // array[object]
  // Liste des contextes de travail liés.

  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition.

  // Example:
  // Réalise des opérations de coupe et d'entretien d'arbres
  // divisionsNaf
  // array[object]
  // Liste des divisions NAF liées.

  // domaineProfessionnel
  // object
  // Domaine professionnel

  // emploiCadre
  // boolean
  // Emploi cadre: oui/non. Ce champ est optionnel.

  // emploiReglemente
  // boolean
  // Emploi réglementé: oui/non. Ce champ est optionnel.

  // formacodes
  // array[object]
  // Liste des formacodes liés.

  // label
  // string
  // Label (code métier d'origine). Cette valeur est utilisée dans le cas où un métier a été divisé en plusieurs métiers. Ce champ est optionnel.

  // Example:
  // A1201
  // libelle
  // string
  // Libellé du métier.

  // Example:
  // Bûcheronnage et élagage
  // metiersEnProximite
  // array[object]
  // Liste des métiers en proximité.

  // metiersEnvisageables
  // array[object]
  // deprecated
  // Liste des métiers envisageables. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // metiersProches
  // array[object]
  // deprecated
  // Liste des métiers proches. Cette mobilité est obsolète mais conservée pour compatibilité ascendante.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // secteursActivites
  // array[object]
  // Liste des secteurs d'activites liés.

  // themes
  // array[object]
  // Liste des thèmes liés.

  // transitionDemographique
  // boolean
  // Transition démographique: oui/non. Ce champ est optionnel.

  // transitionEcologique
  // boolean
  // Transition écologique: oui/non. Ce champ est optionnel.

  // transitionEcologiqueDetaillee
  // string
  // Transition écologique détaillée. Ce champ est optionnel.

  // Allowed values:
  // EMPLOI_STRATEGIQUE
  // EMPLOI_VERT
  // EMPLOI_BLANC
  // EMPLOI_BRUN
  // transitionNumerique
  // boolean
  // Transition numérique: oui/non. Ce champ est optionnel.

  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // riasecMajeur
  // string
  // Riasec Majeur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // riasecMineur
  // string
  // Riasec Mineur. Ce champ est optionnel.

  // Allowed values:
  // R
  // I
  // A
  // S
  // E
  // C
  // secteursActivites
  // array[object]
  // Liste des secteurs d'activites liés.

  // code
  // string
  // Code unique du secteur d'activité.

  // Example:
  // 79
  // dateFin
  // string
  // <date-time>
  // date de fin de validité (renseignée si l'entité est obsolete)

  // definition
  // string
  // Définition du secteur d'activité. Ce champ est optionnel.

  // libelle
  // string
  // Libellé du secteur d'activité.

  // Example:
  // Agriculture et élevage
  // obsolete
  // boolean
  // boolean définissant si l'entité est obsolete

  // secteurActivite
  // object
  // Secteur d'activités. Il y a seulement deux niveaux de secteur d'activités: l'un qui dispose de sous-secteurs d'activités et l'autre qui dispose d'un secteur d'activité parent et de métiers rattachés.

  // sousSecteurs
  // array[object]
  // Sous-secteur d'activités rattachés.

  // /** Liste des thèmes liés. */
  // themes
  // array[object]

  // /** Code unique du thème.

  // Example:
  // 12 */
  // code: string;

  /** <date-time>
date de fin de validité (renseignée si l'entité est obsolete) */
  dateFin: string;

  /** Définition du thème. Ce champs est optionnel.

Example:
Métiers liés à l'éducation, l'enseignement, l'animation, aux loisirs et aux soins des enfants */
  definition: string;

  /** Libellé du thème.

Example:
Métiers auprès des enfants
metiers
array[object]
Métiers rattachés. */
  libelle: string;

  /** boolean définissant si l'entité est obsolete */
  obsolete: boolean;

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
