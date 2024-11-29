///////////// params
export const getMeetsParamsQuery = `query GetMeets ($data: MeetInput) {
  meets (data: $data) {
    id
  }
}`;
export const getUsersParamsQuery = `query GetUsers($first: PageParamsInput, $data: BetaUserInput) {
  users(first: $first, data: $data) {
    id
    uniqueName
    firstname
    lastname
    candidate {
      id
      targetJob {
        id
        title {
          fr
          en
        }
      }
    }
  }
}`;
export const getCompetenciesParamsQuery = `query GetCompetencies($data: CompetencyInput, $params: PageParamsInput) {
    competencies(data: $data, params: $params) {
      slug
    }
  }`;
export const getOffersParamsQuery = `query GetOffers($params: PageParamsInput, $data: OfferInput) {
    offers(params: $params, data: $data) {
      id
      slug
    }
  }`;
export const getArticlesParamsQuery = `query GetArticles {
    articles {
      __typename
      id
      slug
      title {
        en
        fr
      }
    }
  }`;

export const ownQueuesParamsQuery = `query OwnQueues($originId: ID, $targetId: ID, $status: [String]) {
    ownQueues(originId: $originId, targetId: $targetId, status: $status) {
      id
    }
  }
  `;

///////////// metadata
export const getCompetencyMetadataQuery = `query GetOneCompetency ($title: String, $slug: String) {
  oneCompetency (title: $title, slug: $slug) {
    id
    title
  }
}`;
export const getUserMetadataQuery = `query GetUser($uniqueName: String, $userId: ID, $email: String) {
  user(email: $email, uniqueName: $uniqueName, userId: $userId) {
    id
    candidate {
      id
      avatars {
        secure_url
      }
    }
    videos {
      id
      file {
        eager {
          transformation
        }
        secure_url
        subtitledUrl
        original_filename
      }
    }
    firstname
    lastname
    fullname
    uniqueName
  }
}`;
export const getArticleMetadataQuery = `query GetOneArticle ($id: ID, $slug: String) {
  oneArticle (id: $id, slug: $slug) {
    id
    title {
      fr
    }
  }
}`;
export const getOfferMetadataQuery = `query GetOffer($id: ID, $slug: String) {
    oneOffer(id: $id, slug: $slug) {
        id
        job {
          id
          title {
            fr
            en
          }
        }
        intitule
        company {
          id
          name
        }
        contractType
        location
        revenue
        requirements {
          id
          title
        }
      }
    }`;

///////////// every
export const getRawUserQuery = `query GetUser($uniqueName: String, $userId: ID, $email: String) {
  user(email: $email, userId: $userId, uniqueName: $uniqueName) {
    id
    auth {
      social {
        user {
          network
          email
          email_verified
          family_name
          given_name
          locale
          name
          nickname
          picture
          sid
          sub
          updated_at
        }
        provider 
        accessToken 
        refreshToken 
        expiryDate
      }
      internal {
        hash
        email
      }
    }
    firstname
    lastname
    fullname
    email
    description
    picture
    isPublic
    uniqueName
    age
    user
    pro
    consent
    languages
    scrapped
    linkedinProfileId
    company {
      id
    }
  }`;
export const getUserQuery = `query GetUser($uniqueName: String, $userId: ID, $email: String, $originId: ID, $fullname: String) {
    user(email: $email, userId: $userId, uniqueName: $uniqueName, originId: $originId, fullname: $fullname) {
        __typename
        id
        auth {
          social {
            user {
              network
              email
              email_verified
              family_name
              given_name
              locale
              name
              nickname
              picture
              sid
              sub
              updated_at
            }
            provider 
            accessToken 
            refreshToken 
            expiryDate
          }
          internal {
            hash
            email
          }
        }
        firstname
        lastname
        fullname
        email
        description
        picture
        isPublic
        uniqueName
        credit
        customerId
        trial
        professionalEmail
        age
        user
        pro
        consent
        languages
        scrapped
        linkedinProfileId
        cvFile {
          eager {
            transformation
          }
          url
          secure_url
        }
        company {
          id
        }
        hiddenFields
        role
        roles {
          id
          title {
            fr
            en
          }
        }
        company {
          id
          name
          resume
          location
          logo {
            url
            secure_url
          }
          video {
            url
            secure_url
            original_filename
          }
          linkedinProfilePage
          sharings {
            id
            origin {
              id
              firstname
              lastname
              fullname
              cardPrice
            }
            offerTarget {
              id
              job {
                id
                title {
                  fr
                  en
                }
              }
            }
            
            createdAt
          }
        }
        candidate {
          id
          targetContractType
          avatars {
            secure_url
            url
          }
          salaryExpected
          targetJob {
            id
            title {
              fr
              en
            }
            topSector {
              id
              bgImage
            }
          }
        }
        details {
          id
          phone {
            number
            code
          }
        }
        myOffers {
          __typename
          id
          job {
            id
            title {
              fr
              en
            }
          }
          content
          profileSearched
          jobDescriptionLink
          limitDate
          requirements {
            id
            title
            slug
          }
          slug
          remote
           company {
            id
            name
          }
          location
          revenue
          contractType
          createdAt
        }
        videos {
          id
          likes
          createdAt
          principal
          meetCandidate {
            id
          }
          job {
            id
            title {
              fr
              en
            }
          }
          file {
            eager {
              transformation
              secure_url
              url
              width
              height
            }
            url
            secure_url
            subtitledUrl
            width
            height
            original_filename
            public_id
          }
        }
        profileViews {
          id
          count
          createdAt
        }
        sharings {
          id
        }
        affiliations {
          id
          children {
            __typename
            id
            firstname
            lastname
            fullname
            email
            description
            picture
            isPublic
            uniqueName
            age
            user
            pro
            consent
            languages
            scrapped
            linkedinProfileId
            cvFile {
              eager {
                transformation
              }
              url
              secure_url
            }
            company {
              id
            }
            candidate {
              id
              targetContractType
              avatars {
                secure_url
                url
              }
              salaryExpected
              targetJob {
                id
                title {
                  fr
                  en
                }
                topSector {
                  id
                  bgImage
                }
              }
            }
            details {
              id
              phone {
                number
                code
              }
            }
            videos {
              id
              likes
              createdAt
              principal
              meetCandidate {
                id
              }
              job {
                id
                title {
                  fr
                  en
                }
              }
              file {
                eager {
                  transformation
                }
                url
                secure_url
                subtitledUrl
                width
                height
                original_filename
                public_id
              }
            }
          }
        }
        createdAt
    }
  }`;

export const getUsersQuery = `query GetUsers($first: PageParamsInput, $data: BetaUserInput) {
    users(first: $first, data: $data) {
      id
      auth {
        internal {
          email
        }
        social {
          expiryDate
        }
      }
      languages
      lastname
      picture
      email
      role
      uniqueName
      linkedinProfileId
      description
      firstname
      customerId
      fullname
      credit
      cardPrice
      experiences {
        id
        job {
          id
          title {
            fr
            en
          }
        }
        companyName
        duration
        company {
          id
          name
        }
        isLiveJob
        ending
        duration
        starting
      }
      details {
        id
        phone {
          code
          number
        }
      }
      candidate {
        id
        targetJob {
          id
          title {
            fr
            en
          }
          topSector {
            id
            bgImage
          }
        }
        targetContractType
        avatars {
          url
          secure_url
            eager {
              transformation
            }
        }
      }
      videos {
        id
        principal
        file {
          eager {
            transformation
          }
          url
          secure_url
          subtitledUrl
          width
          height
          original_filename
        }
      }
      user
      pro
      updatedAt
      createdAt
    }
  }`;

export const getCompetencyQuery = `query GetOneCompetency ($title: String, $id: ID, $slug: String) {
    oneCompetency (title: $title, id: $id, slug: $slug) {
      id
      title
      definition
      relatedSkills
      advantages
      examples
      conclusion
      keywords
      importance
      development
    }
  }`;

export const getCompetenciesQuery = `query GetCompetencies($data: CompetencyInput, $params: PageParamsInput) {
    competencies(data: $data, params: $params) {
      __typename
      id
      title
      slug
      advantages
      conclusion
      definition
      examples
      relatedSkills
    }
  }`;

export const getLeadsQuery = `query GetLeads {
    leads {
      id
      name
      phone {
        code
        number
      }
      contacted
      email
      type
      fr
      linkedinProfileId
      trialOffering
      createdAt
      updatedAt
    }
  }`;

export const getUserRemarksQuery = `query GetUserRemarks {
    remarks {
      id
      content
      user {
        id
        user
        pro
        fullname
        company {
          id
          name
        }
      }
    }
  }`;

export const getUserExperiencesQuery = `query GetOneUserExperiences($userId: ID) {
    oneUserExperiences(userId: $userId) {
      id
      starting
      company {
        id
        name
      }
      duration
      ending
      isLiveJob
      job {
        id
        title {
          fr
          en
        }
        topSector {
          id
          title {
            en
            fr
          }
        }
      }
      referenced
    }
  }`;

export const createCompanyProfileMutation = `mutation CreateCompanyProfile($data: ProFormInput) {
    createCompanyProfile(data: $data) {
      id
      linkedinProfilePage
      location
      logo {
        url
        secure_url
        eager {
          transformation
        }
      }
      video {
        url
        secure_url
        eager {
          transformation
        }
      }
      name
      resume
    }
  }
  `;

export const getAccountInfosQuery = `query GetAccountInfos($userId: ID) {
    accountInfos(userId: $userId) {
      __typename
      id
      lastname
      picture
      languages
      age
      credit
      email
      description
      fullname
      extension
      uniqueName
      scrapped
      firstname
      linkedinProfileId
      customerId
      isPublic
      user
      pro
      role
      consent
      hiddenFields
      details {
        id
        birthday
        websites
        facebook
        twitter
        phone {
          code
          number
        }
      }
      experiences {
        id
        starting
        company {
          id
          name
        }
        duration
        ending
        isLiveJob
        job {
          id
          title {
            fr
            en
          }
          topSector {
            id
            title {
              en
              fr
            }
          }
        }
        referenced
      }
      candidate {
        id
        targetJob {
          id
          title {
            fr
            en
          }
          topSector {
            id
          }
        }
        avatars {
          url
          secure_url
          width
          height
        }
        salaryExpected
      }
      company {
        id
        name
        resume
        location
        linkedinProfilePage
        logo {
          asset_id
          public_id
          width
          height
          format
          created_at
          url
          secure_url
          folder
          original_filename
          eager {
            transformation
            width
            height
            bytes
            format
            url
            secure_url
          }
          duration
        }
      }     
      video {
        asset_id
        public_id
        width
        height
        format
        created_at
        url
        secure_url
        folder
        original_filename
        eager {
          transformation
          width
          height
          bytes
          format
          url
          secure_url
        }
        duration  
      }
    }
  }`;

export const createCandidateMutation = `mutation CreateCandidate($data: CandidateInput) {
    createCandidate(data: $data) {
      id
      user {
        id
        fullname
      }
    }
  }`;
export const getArticlesQuery = `query GetArticles {
    articles {
      id
      slug
      createdAt
      bgImage
      title {
        en
        fr
      }
      description {
        en
        fr
      }
      introduction {
        en
        fr
      }
      conclusion {
        en
        fr
      }
      links {
        href
        label {
          fr
          en
        }
      }
      paragraphs {
        content {
          fr
          en
        }
        title {
          fr
          en
        }
      }
      new
      updatedAt
    }
  }`;

export const getArticleQuery = `query GetOneArticle ($id: ID, $slug: String) {
    oneArticle (id: $id, slug: $slug) {
        id
        title {
          en
          fr
        }
        bgImage
        conclusion {
          fr
          en
        }
        introduction {
          fr
          en
        }
        description {
          fr
          en
        }
        links {
          href
          label {
            fr
            en
          }
        }
        paragraphs {
          content {
            en
            fr
          }
          title {
            fr
            en
          }
        }
        createdAt
        updatedAt
        new
    }
  }`;

export const updateUserMutation = `mutation UpdateUser($data: BetaUserInput, $userId: ID, $uniqueName: String) {
    updateUser(data: $data, userId: $userId, uniqueName: $uniqueName) {
      __typename
      id
      hiddenFields
      isPublic
      cvFile {
        eager {
          transformation
        }
        url
        secure_url
      }
    }
  }`;

export const deleteVideoMutation = `mutation DeleteVideo($id: String) {
    deleteVideo(id: $id) {
      id
    }
  }`;

export const submitVideoMutation = `mutation SubmitVideo($data: VideoInput) {
    submitVideo(data: $data) {
      id
      file {
        eager {
          transformation
        }
        subtitledUrl
        url
        secure_url
        original_filename
      }
      job {
        id
        title {
          fr
          en
        }
      }
      createdAt
    }
  }`;

export const createFeedbackMutation = `mutation CreateFeedback ($data: FeedbackInput) {
    createFeedback (data: $data) {
      id
    }
  }`;

export const getLeadFormResponsesQuery = `query GetLeadFormResponses($leadId: ID) {
    leadFormResponses(leadId: $leadId) {
      id
      content
      type
      isTrue
      lead {
        id
        name
        email
        phone {
          code
          number
        }
        type
        token
        fr
        contacted
        prospected
        linkedinProfileId
      }
      question {
        id
        title
        type
      }
      createdAt
      updatedAt
    }
  }`;

export const getCompetencySlugQuery = `query GetOneCompetency ($title: String, $id: ID) {
    oneCompetency (title: $title, id: $id) {
      slug
    }
  }`;

export const getOffersQuery = `query GetOffers($params: PageParamsInput, $data: OfferInput) {
  offers(params: $params, data: $data) {
    __typename
    id
    slug
    contractType
    intitule
    job {
      id
      title {
        fr
        en
      }
    }
    typeContratLibelle
    qualificationLibelle
    companyName
    entreprise {
      nom
      logo
    }
    location 
    lieuTravail {
      libelle
    }
    company {
      id
      name
      logo {
        secure_url
        url
        eager {
          transformation
        }
      }
    }
    outilsBureautiques
    dureeTravailLibelleConverti
    nombrePostes
    experienceLibelle
    permis {
      libelle
      exigence
    }
  }
}`;

export const GetOfferQuery = `query GetOneOffer($id: ID, $slug: String) {
  oneOffer(id: $id, slug: $slug) {
    id
    content
    profileSearched
    slug
    company {
      id
      name
      location
    }
    author {
      id
      email
      firstname
      fullname
      lastname
    }
    remote
    requirements {
      id
      title
    }
    rebroadcast
    companyName
    companyLogo
    contractType
    limitDate
    authorInterviewLink
    authorName
    createdAt
    updatedAt
    job {
      id
      title {
        fr
        en
      }
      topSector {
        id
        bgImage
      }
    }
    sector {
      id
    }
    jobDescriptionLink
    authorEmail
    location
    revenue
    sharings {
      id
      origin {
        id
      }
      target {
        id
      }
      offerTarget {
        id
      }
    }
    intitule
    description
    dateCreation
    dateActualisation
    lieuTravail {
      libelle
      latitude
      longitude
      codePostal
      commune
    }
    romeCode
    romeLibelle
    appellationlibelle
    entreprise {
      nom
      description
      logo
      url
      entrepriseAdaptee
    }
    typeContrat
    typeContratLibelle
    natureContrat
    experienceExige
    experienceLibelle
    experienceCommentaire
    formations {
      codeFormation
      domaineLibelle
      niveauLibelle
      commentaire
      exigence
    }
    langues {
      libelle
      exigence
    }
    permis {
      libelle
      exigence
    }
    outilsBureautiques
    competences {
      code
      libelle
      exigence
    }
    salaire {
      libelle
      commentaire
      complement1
      complement2
    }
    dureeTravailLibelle
    dureeTravailLibelleConverti
    complementExercice
    conditionExercice
    alternance
    contact {
      nom
      coordonnees1
      coordonnees2
      coordonnees3
      telephone
      courriel
      commentaire
      urlRecruteur
      urlPostulation
    }
    agence {
      telephone
      courriel
    }
    nombrePostes
    accessibleTH
    deplacementCode
    deplacementLibelle
    qualificationCode
    qualificationLibelle
    codeNAF
    secteurActivite
    secteurActiviteLibelle
    qualitesProfessionnelles {
      libelle
      description
    }
    trancheEffectifEtab
    origineOffre {
      origine
      urlOrigine
      partenaires {
          nom
          url
          logo
      }
    }
    offresManqueCandidats
  }
}`;

export const getNotificationQuery = `query GetNotification ($data: NotificationInput) {
  oneNotification(data:$data) {
    id
  }
}`;

export const createCandidateBasicMutation = `mutation CreateCandidateBasic($data: CandidateBasicInput) {
  createCandidateBasic(data: $data) {
    id
    targetContractType
    targetJob {
      id
      title {
        fr
        en
      }
    }
    avatars {
      url
      secure_url
    }
  }
}
`;

export const getLeadQuery = `query GetOneLead($id: ID, $email: String) {
  oneLead(id: $id, email: $email) {
    id
    name
    email
    phone {
      code
      number
    }
    fr
    parent {
      id
    }
    type
    token
    contacted
    prospected
    linkedinProfileId
    trialOffering
    createdAt
    updatedAt
  }
}`;
export const getCompanyQuery = `query GetOneCompany($id: ID, $filters: BetaCompanyFilters) {
  oneCompany(id: $id, filters: $filters) {
    __typename
    id
    location
    name
    resume
    scrapped
    offers {
      id
      job {
        id
        title {
          fr
          en
        }
      }
    }
    experiences {
      id
      job {
        id
        title {
          fr
          en
        }
      }
      starting
      ending
      references {
        id
        user {
          id
          fullname
          email
          linkedinProfileId
        }
      }
      user {
        id
        fullname
        linkedinProfileId
        email
      }
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}
`;

export const unlockMutation = `mutation Unlock ($data: UnlockInput) {
  unlock (data:$data) {
    id
    credit
  }
}`;

export const createOfferMutation = `mutation CreateOffer($data: OfferInput) {
  createOffer(data: $data) {
    id
  }
}`;

export const createProAccountMutation = `mutation CreateProAccount($data: CreateProAccountInput) {
  createProAccount(data:$data) {
    id
  }
}`;
export const deleteCompanyMutation = `mutation DeleteCompany($id: String) {
  deleteCompany(id:$id) {
    id
  }
}`;

export const getCompaniesQuery = `query GetCompanies($first: PageParamsInput, $filters: BetaCompanyFilters) {
  companies(filters: $filters, first: $first) {
    id
    location
    name
    resume
    scrapped
    logo {
      url
      secure_url
    }
    video {
      url
      secure_url
    }
    experiences {
      id
      job {
        id
        title {
          en
          fr
        }
      }
      starting
      ending
      references {
        id
        user {
          id
          fullname
          email
          linkedinProfileId
        }
      }
      user {
        id
        fullname
        linkedinProfileId
        email
      }
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}
`;

export const getOneDetailsQuery = `query GetOneDetails($filter: BetaDetailsInput!) {
  oneDetails(filter: $filter) {
    id
    profileId
    email
    phone {
      code
      number
    }
    user {
      id
      linkedinProfileId
    }
  }
}
`;

export const createDetailsMutation = `mutation CreateDetails($data: BetaDetailsInput) {
  createDetails(data: $data) {
    __typename
    id
  }
}
`;

export const createUserMutation = `mutation CreateUser($data: BetaUserInput) {
  createUser(data: $data) {
    __typename
    id
    trial
    pro
    customerId
    fullname
    email
  }
}
`;

export const resetEmailLinkQuery = `query ResetEmailLink($email: String) {
  resetEmailLink(email: $email) {
    id
  }
}
`;

export const getJobQuery = `query GetOneJob($id: ID) {
  oneJob(id: $id) {
    __typename
    id
    title {
      fr
      en
    }
    topSector {
      id
    }
    questions {
      id
      text
    }
  }
}`;

export const createProfileSharingMutation = `mutation CreateProfileSharing($data: ProfileSharingInput) {
  createProfileSharing(data: $data) {
    id
    target {
      id
    }
  }
}`;

export const createNotificationMutation = `mutation CreateNotification($data: NotificationInput) {
  createNotification(data: $data) {
    id
  }
}
`;

export const resetPasswordQuery = `query ResetPassword($userId: ID, $password: String) {
  resetPassword(password: $password, userId: $userId) {
    id
  }
}
`;

export const createCustomisationMutation = `mutation CreateCustomisation($originId: ID, $jobId: ID) {
  createCustomisation(originId: $originId, jobId: $jobId) {
    id
  }
}`;

export const createQuestionMutation = `mutation CreateQuestion($data: ConversationInput) {
  createQuestion(data: $data) {
    id
  }
}`;

export const createQueueMutation = `mutation CreateQueue($data: ConversationInput) {
  createQueue(data: $data) {
    id
  }
}`;

export const createSharingRefusalMutation = `mutation CreateSharingRefusal ($data: SharingRefusalInput) {
  createSharingRefusal(data: $data) {
    id
  }
}`;

export const getVideoQuery = `query GetVideo ($id: String) {
  oneVideo(id: $id) {
    id
    transcript
    confidence
    user {
      id
    }
    file {
      url
      secure_url
      subtitledUrl
    }
  }
}`;

export const updateQueueMutation = `mutation UpdateQueue ($id: ID, $data: BetaQueueInput) {
  updateQueue(id:$id, data: $data) {
    id
  }
}`;

export const createConversationMutation = `mutation CreateConversation($data: ConversationInput) {
  createConversation(data: $data) {
    id
  }
}`;
export const createClassicAccountMutation = `mutation CreateClassicAccount($data: BetaUserInput) {
  createClassicAccount(data: $data) {
    id
    user
    pro
    email
    firstname
    lastname
    customerId
    companyId
    scrapped
  }
}
`;

export const getSimpleCompanyQuery = `query GetOneCompany($id: ID, $filters: BetaCompanyFilters) {
  oneCompany(id: $id, filters: $filters) {
    id
    name
  }
}
`;

export const getSimpleUserQuery = `query GetUser($uniqueName: String, $userId: ID, $email: String, $originId: ID, $fullname: String) {
  user(email: $email, userId: $userId, uniqueName: $uniqueName, originId: $originId, fullname: $fullname) {
    __typename
    id
    auth {
      internal {
        hash
        email
      }
    }
    email
    user
    fullname
    customerId
    pro
    uniqueName
    company {
      id
    }
  }
}`;

export const getOneQueueQuery = `query GetOneQueue($id: ID) {
  oneQueue(id: $id) {
    id
    status
    offerTarget {
      id
      job {
        id
        title {
          fr
          en
        }
      }
      company {
        id
        name
        logo {
          url
          secure_url
          width
          height
        }
      }
    }
    target {
      id
      fullname
      firstname
      lastname
      email
      linkedinProfileId
      description
      picture
    }
    origin {
      fullname
      id
      linkedinProfileId
      picture
      email
      roles {
        id
        title {
          fr
          en
        }
      }
    }
    createdAt
    updatedAt
  }
}
`;

export const createThreadMutation = `mutation CreateThread ($queueId: ID) {
  createThread (queueId: $queueId) {
    id
    terminated
    queue {
      id
      offerTarget {
        id
        job {
          id
          title {
            fr
            en
          }
        }
      }
      createdAt
    }
    exchanges {
      id
      question {
        id
        type
        prefix
        text
        generated
      }
      responses {
        id
        type
        content
      }
    }
  }
}`;

export const createResponsesMutation = `mutation CreateResponses ($userId: ID, $threadId: ID, $responses: [ResponseInput]) {
  createResponses (userId: $userId, threadId: $threadId, responses: $responses) {
    id
  }
}`;

export const createErrorMutation = `mutation CreateError ($data: ErrorInput) {
  createError(data: $data) {
    id
  }
}`;

export const errorsQuery = `query GetErrors {
  errors {
    id
    message
    type
    status
    statusText
    environment
    pro
    query
    createdAt
    updatedAt
  }
}`;
export const getProfileViewsQuery = `query GetProfileViews ($userId: ID) {
  profileViews (userId: $userId) {
    id
    createdAt
  }
}`;
export const createProfileViewMutation = `mutation CreateProfileView ($data: ProfileViewInput) {
  createProfileView (data:$data) {
    id
    createdAt
  }
}`;
export const getMyVideosQuery = `query GetMyVideos ($userId: ID) {
  myVideos (userId:$userId) {
    id
  }
}`;
export const getVideosQuery = `query GetVideos {
  videos {
    __typename
    id
    transcript
    confidence
    report
    job {
      id
      frTitle
    }
    user {
      id
      uniqueName
    }
    file {
      eager {
        transformation
        url
        secure_url
        width
        height
      }
      url
      secure_url
      width
      height
      subtitledUrl
      format
      original_filename
      public_id
    }
  }
}`;
export const sendEmailOfferOpportunitiesQuery = `query SendEmailOfferOpportunities ($usersIds: [ID]) {
  sendEmailOfferOpportunities (usersIds:$usersIds) {
    id
  }
}`;
export const getMeetsQuery = `query GetMeets {
  meets {
    id
    meetCandidate {
      id
      firstname
      lastname
      fullname
      email
      phone {
        code
        number
      }
      videos {
        id
        preview
        file {
          eager {
            transformation
          }
          subtitledUrl
          url
          secure_url
          original_filename
        }  
      }
      linkedinProfileId
    }
    meetRecruiter {
      id
      firstname
      lastname
      fullname
      email
      phone {
        code
        number
      }
      linkedinProfileId
    }
  }
}`;

export const getOneMeetQuery = `query GetOneMeet ($id: ID) {
  oneMeet (id: $id) {
    id
    expired
    meetCandidate {
      id
      email
      firstname
      lastname
      fullname
      linkedinProfileId
      phone {
        code
        number
      }
      job {
        id
        title {
          fr
          en
        }
      } 
      videos {
        id
        preview
        principal
        confidence
        transcript
        file {
          url
          secure_url
          subtitledUrl
          eager {
            transformation
          }
            original_filename
        }
      }
    }
    meetRecruiter {
      id
      email
      firstname
      lastname
      fullname
      linkedinProfileId
      phone {
        code
        number
      }
    }
  }
}`;

export const deleteMeetMutation = `mutation DeleteMeet ($id: ID) {
  deleteMeet (id:$id) {
    id
  }
}`;

export const createMeetMutation = `mutation CreateMeet ($data: MeetInput) { 
  createMeet (data:$data) {
    id
    token
    expired
    meetCandidate {
      id
      firstname
      lastname
      email
    }
     meetRecruiter {
      id
      firstname
      lastname
      email 
    }
  }
}`;
export const getMeetCandidatesQuery = `query GetMeetCandidates { 
  meetCandidates {
    id
    firstname
    lastname
    fullname
  }
}`;
export const getMeetCandidateQuery = `query GetOneMeetCandidate ($id: ID) { 
  oneMeetCandidate (id:$id) {
    id
    firstname
    lastname
    fullname
    email
    linkedinProfileId
    phone {
      code
      number
    }
    videos {
      id
      preview
      file {
        eager {
          transformation
        }
        url
        subtitledUrl
        secure_url
        original_filename
      }
    }
  }
}`;
export const updateMeetMutation = `mutation UpdateMeet ($data: MeetInput, $id: ID) { 
  updateMeet (data:$data, id:$id) {
    id
    firstname
    lastname
    fullname
    email
    linkedinProfileId
    phone {
      code
      number
    }
    videos {
      id
      preview
      file {
        eager {
          transformation
        }
        url
        subtitledUrl
        secure_url
        original_filename
      }
    }
  }
}`;
export const sendEmailQuery = `query SendEmail ($data: EmailInput) { 
  sendEmail (data:$data) {
    success
    error
  }
}`;

export const getMyUnlockedUsersQuery = `query GetMyUnlockedUsers($originId: ID) {
  myUnlockedUsers(originId: $originId) {
    id
    origin {
      id
    }
    target {
      id
    }
  }
}
`;

export const getMyFavoritesQuery = `query GetMyFavorites($data: FavoriteInput, $first: PageParamsInput) {
  myFavorites(data: $data, first: $first) {
    id
    target {
      __typename
      id
      firstname
      lastname
      fullname
      email
      description
      picture
      isPublic
      uniqueName
      age
      user
      pro
      consent
      languages
      scrapped
      linkedinProfileId
      cvFile {
        url
        secure_url
      }
      details {
        id
        phone {
          number
          code
        }
      }
      candidate {
        id
        targetContractType
        salaryExpected
        avatars {
          secure_url
          url
          eager {
            transformation
          }
        }
        targetJob {
          id
          title {
            fr
            en
          }
          topSector {
            id
            bgImage
          }
        }
      }
      videos {
        id
        likes
        principal
        report
        job {
          id
          title {
            fr
            en
          }
        }
        transcript
        confidence
        audio {
          url
          secure_url
        }
        file {
          url
          secure_url
          subtitledUrl
          width
          height
          original_filename
          public_id
          eager {
            transformation
          }
        }
      }
    }
    origin {
      id
    }
  }
}
`;

export const getJobsQuery = `query GetJobs($data: JobInput, $first: PageParamsInput) {
  jobs(data: $data, first: $first) {
    id
    title {
      en
      fr
    }
    topSector {
      id
      title {
        fr
        en
      }
    }
  }
}
`;

export const getHomeOffersQuery = `query GetOffers($params: PageParamsInput, $data: OfferInput) {
  offers(params: $params, data: $data) {
    __typename
    id
    slug
    remote
    job {
      id
      title {
        fr
        en
      }
    }
    company {
      id
      name
      location
      logo {
        secure_url
        url
      }
    }
  }
}`;

export const getHomeCompetenciesQuery = `query GetCompetencies($data: CompetencyInput, $params: PageParamsInput) {
  competencies(data: $data, params: $params) {
    __typename
    id
    slug
    title
    definition
    advantages
  }
}`;

export const getCompetenciesTitleQuery = `query GetCompetencies($data: CompetencyInput, $params: PageParamsInput) {
  competencies(data: $data, params: $params) {
    title
  }
}`;

export const updateVideoMutation = `mutation UpdateVideo($data: VideoInput) {
  updateVideo(data: $data) {
    id
  }
}
`;

export const getCandidateQuery = `query GetCandidate($data: BetaUserInput, $userId: ID, $email: String) {
  oneCandidate(data: $data, userId: $userId, email: $email) {
    id
    targetJob {
      title {
        fr
        en
      }
    }
  }
}`;

export const getSharingQuery = `query GetOneProfileSharing($data: ProfileSharingInput) {
  oneProfileSharing(data: $data) {
    id
  }
}`;

export const getOneCompleteSharingQuery = `query getOneCompleteSharingQuery($data: ProfileSharingInput) {
  oneProfileSharing(data: $data) {
    origin {
      __typename
      id
      firstname
      lastname
      fullname
      email
      description
      picture
      isPublic
      uniqueName
      age
      user
      pro
      consent
      languages
      scrapped
      linkedinProfileId
      cvFile {
        url
        secure_url
      }
      hiddenFields
      role
      roles {
        id
        title {
          fr
          en
        }
      }
      candidate {
        id
        targetContractType
        avatars {
          secure_url
          url
          eager {
            transformation
          }
        }
        targetJob {
          id
          title {
            fr
            en
          }
          topSector {
            id
            bgImage
          }
        }
      }
      details {
        id
        phone {
          number
          code
        }
      }
    }
    target {
      __typename
      id
      location
      name
      resume
    }
    video {
      id
      likes
      principal
      report
      job {
        id
        title {
          fr
          en
        }
      }
      transcript
      confidence
      audio {
        url
        secure_url
      }
      file {
        url
        secure_url
        subtitledUrl
        width
        height
        original_filename
        public_id
        eager {
          transformation
        }
      }
    }
    offerTarget {
      id
      content
      profileSearched
      slug
      company {
        id
        name
        location
      }
      author {
        id
        email
        firstname
        fullname
        lastname
      }
      remote
      requirements {
        id
        title
      }
      rebroadcast
      companyName
      companyLogo
      contractType
      limitDate
      authorInterviewLink
      authorName
      createdAt
      updatedAt
      job {
        id
        title {
          fr
          en
        }
        topSector {
          id
          bgImage
        }
      }
      sector {
        id
      }
      jobDescriptionLink
      authorEmail
      location
      revenue
      sharings {
        id
        origin {
          id
        }
        target {
          id
        }
        offerTarget {
          id
        }
      }
      intitule
      description
      dateCreation
      dateActualisation
      lieuTravail {
        libelle
        latitude
        longitude
        codePostal
        commune
      }
      romeCode
      romeLibelle
      appellationlibelle
      entreprise {
        nom
        description
        logo
        url
        entrepriseAdaptee
      }
      typeContrat
      typeContratLibelle
      natureContrat
      experienceExige
      experienceLibelle
      experienceCommentaire
      formations {
        codeFormation
        domaineLibelle
        niveauLibelle
        commentaire
        exigence
      }
      langues {
        libelle
        exigence
      }
      permis {
        libelle
        exigence
      }
      outilsBureautiques
      competences {
        code
        libelle
        exigence
      }
      salaire {
        libelle
        commentaire
        complement1
        complement2
      }
      dureeTravailLibelle
      dureeTravailLibelleConverti
      complementExercice
      conditionExercice
      alternance
      contact {
        nom
        coordonnees1
        coordonnees2
        coordonnees3
        telephone
        courriel
        commentaire
        urlRecruteur
        urlPostulation
      }
      agence {
        telephone
        courriel
      }
      nombrePostes
      accessibleTH
      deplacementCode
      deplacementLibelle
      qualificationCode
      qualificationLibelle
      codeNAF
      secteurActivite
      secteurActiviteLibelle
      qualitesProfessionnelles {
        libelle
        description
      }
      trancheEffectifEtab
      origineOffre {
        origine
        urlOrigine
        partenaires {
            nom
            url
            logo
        }
      }
      offresManqueCandidats
    }
  }
}`;

export const getAffiliationsQuery = `query GetAffiliations {
  affiliations {
    id
    parent {
      id
      firstname
      lastname
      fullname
      email
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}`;
export const deleteAffiliationMutation = `mutation DeleteAffiliation($id: ID) {
  deleteAffiliation(id: $id) {
    id
    parent {
      id
      firstname
      lastname
      fullname
      email
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}`;
export const createAffiliationMutation = `mutation CreateAffiliation($parentId: ID, $childrenIds: [ID]) {
  createAffiliation(parentId: $parentId, childrenIds: $childrenIds) {
    id
    parent {
      id
      firstname
      lastname
      fullname
      email
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}`;
export const getAffiliationQuery = `query GetAffiliation($id: ID, $parentId: ID) {
  affiliation(id: $id, parentId: $parentId) {
    id
    parent {
      id
      firstname
      lastname
      fullname
      email
      details {
        id
        phone {
          code
          number
        }
      }
    }
  }
}`;

export const getMyReferencesQuery = `query GetMyReferences($userId: ID) {
  myReferences(userId: $userId) {
    id
    concerned
    content
    createdAt
    type
    updatedAt
    user {
      id
    }
    valid
    experience {
      id
      job {
        id
        title {
          fr
          en
        }
      }
      duration
      companyName
      company {
        id
        name
      }
    }
  }
}
`;

export const createLeadMutation = `mutation CreateLead($data: LeadInput) {
  createLead(data: $data) {
    id
  }
}
`;

export const deleteLeadMutation = `mutation DeleteLead($leadId: ID) {
  deleteLead(leadId: $leadId) {
    id
  }
}
`;

export const updateLeadMutation = `mutation UpdateLead($data: LeadInput) {
  updateLead(data: $data) {
    id
  }
}
`;

export const sendEmailToLeadQuery = `query SendEmailToLead(
  $data: LeadInput
  $type: String
  $leadsIds: [String]
  $negativeAnswerForDesign: Boolean
  $negativeAnswerForDev: Boolean
) {
  sendEmailToLead(
    data: $data
    type: $type
    leadsIds: $leadsIds
    negativeAnswerForDev: $negativeAnswerForDev
    negativeAnswerForDesign: $negativeAnswerForDesign
  ) {
    id
    type
    name
    email
  }
}
`;

export const deleteProfileSharingMutation = `mutation DeleteOneProfileSharing($id: ID) {
  deleteProfileSharing(id: $id) {
    id
  }
}`;

export const deleteOfferMutation = `mutation DeleteOffer($id: ID) {
  deleteOffer(id: $id) {
    id
  }
}
`;

export const deleteInterviewOfferMutation = `mutation DeleteOneInterviewOffer($id: ID) {
  deleteInterviewOffer(id: $id) {
    id
  }
}`;

export const videoByPublicIdQuery = `query GetVideoByPublicId($publicId: String) {
  videoByPublicId(publicId: $publicId) {
    id
    file {
      eager {
        transformation
        width
        height
        bytes
        format
        url
        secure_url
      }
    }
  }
}`;

export const getUserCandidateQuery = `query GetUser($uniqueName: String, $userId: ID, $email: String, $originId: ID, $fullname: String) {
  user(email: $email, userId: $userId, uniqueName: $uniqueName, originId: $originId, fullname: $fullname) {
      __typename
      id
      auth {
        internal {
          hash
          email
        }
      }
      firstname
      lastname
      fullname
      email
      description
      picture
      isPublic
      uniqueName
      age
      user
      pro
      consent
      languages
      scrapped
      linkedinProfileId
      cvFile {
        url
        secure_url
      }
      hiddenFields
      role
      roles {
        id
        title {
          fr
          en
        }
      }
      candidate {
        id
        targetContractType
        avatars {
          secure_url
          url
          eager {
            transformation
          }
        }
        targetJob {
          id
          title {
            fr
            en
          }
          topSector {
            id
            bgImage
          }
        }
      }
      details {
        id
        phone {
          number
          code
        }
      }
      videos {
        id
        likes
        principal
        report
        job {
          id
          title {
            fr
            en
          }
        }
        transcript
        confidence
        audio {
          url
          secure_url
        }
        file {
          url
          secure_url
          subtitledUrl
          width
          height
          original_filename
          public_id
          eager {
            transformation
          }
        }
      }
      recruiterQueues {
        id
        status
        seen
        customisation {
          id
          questions {
            id
            type
            prefix
            text
          }
        }
        offerTarget {
          id
          jobDescriptionLink
          job {
            id
            title {
              fr
              en
            }
          }
          limitDate
          location
          requirements {
            title
            id
          }
          content
          revenue
          contractType
          authorName
          authorInterviewLink
          authorEmail
          sector {
            id
            bgImage
          }
        }
        createdAt
        updatedAt
      }
  }
}`;

export const searchSomeoneQuery = `query SearchSomeone($uniqueName: String, $userId: ID, $email: String, $originId: ID, $fullname: String) {
  user(email: $email, userId: $userId, uniqueName: $uniqueName, originId: $originId, fullname: $fullname) {
    __typename
    id
    fullname
    uniqueName
  }
}`;

export const getSharingsQuery = `query GetSharings {
  sharings {
    id
    origin {
      id
      fullname
      email
    }
    target {
      id
      name
      url
      logo {
        url
        secure_url
      }
    }
    offerTarget {
      id
      intitule
      job {
        title {
          fr
          en
        }
      }
      entreprise {
        logo
      }
    }
  }
}`;

export const createRemarkMutation = `mutation CreateUserRemark($data: RemarkInput) {
  createRemark(data: $data) {
    id
    content
  }
}
`;
