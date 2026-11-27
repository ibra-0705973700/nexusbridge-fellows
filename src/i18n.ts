import { LanguageCode } from './types';

export interface TranslationStrings {
  brandName: string;
  languageLabel: string;
  signOut: string;
  signIn: string;
  signUp: string;
  welcomeBack: string;
  createAccount: string;
  authHeroTitle: string;
  authHeroSubtitle: string;
  demoLoginHeading: string;
  demoLoginSub: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  primarySkill: string;
  hostCountry: string;
  preferredLanguage: string;
  tabMatching: string;
  tabMentorship: string;
  tabReturnships: string;
  matchingTitle: string;
  matchingSubtitle: string;
  browseTalent: string;
  browseRoles: string;
  skillDomain: string;
  availability: string;
  allDomains: string;
  allAvailability: string;
  searchPlaceholder: string;
  matchScore: string;
  sendInvite: string;
  applyRole: string;
  inviteSent: string;
  appliedStatus: string;
  shortlisted: string;
  accepted: string;
  advanceStatus: string;
  withdraw: string;
  mentorshipTitle: string;
  mentorshipSubtitle: string;
  readinessProgress: string;
  pairedMentor: string;
  selectMentor: string;
  pairWithMentor: string;
  currentlyPaired: string;
  bookSession: string;
  sessionDate: string;
  sessionTime: string;
  sessionTopic: string;
  confirmBooking: string;
  upcomingSessions: string;
  noSessions: string;
  milestonesTitle: string;
  returnshipsTitle: string;
  returnshipsSubtitle: string;
  postReturnship: string;
  applyReturnship: string;
  returnshipApplied: string;
  conversionPath: string;
  monthlyStipend: string;
  duration: string;
  weeks: string;
  footerText: string;
  sdgFocus: string;
}

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  fr: 'Français',
  sw: 'Kiswahili',
  so: 'Soomaali',
};

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    brandName: 'NexusBridge Fellows',
    languageLabel: 'Language',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    signUp: 'Create Account',
    welcomeBack: 'Sign in to your workspace',
    createAccount: 'Join the fellowship network',
    authHeroTitle: 'Bridge verified global skills to local experience & paid pathways.',
    authHeroSubtitle:
      'Connecting displaced professionals with industry mentors, skills-first hiring partners, and structured 4–12 week paid returnships.',
    demoLoginHeading: '1-Click Demo Login for Judges',
    demoLoginSub: 'Explore any perspective immediately with pre-loaded data.',
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    role: 'Account Role',
    primarySkill: 'Primary Skill Domain',
    hostCountry: 'Host Country',
    preferredLanguage: 'Preferred Language',
    tabMatching: 'Skills-First Matching',
    tabMentorship: 'Mentor-Fellowship Tracker',
    tabReturnships: 'Returnship Marketplace',
    matchingTitle: 'Skills-First Matching',
    matchingSubtitle:
      'Filter verified displaced talent or open partner roles by core capability and readiness.',
    browseTalent: 'Verified Talent',
    browseRoles: 'Open Partner Roles',
    skillDomain: 'Skill Domain',
    availability: 'Availability',
    allDomains: 'All Domains',
    allAvailability: 'Any Availability',
    searchPlaceholder: 'Search by skill, name, country, or keyword...',
    matchScore: 'Match Score',
    sendInvite: 'Send Invite',
    applyRole: 'Apply in 1 Click',
    inviteSent: 'Invite Sent',
    appliedStatus: 'Applied',
    shortlisted: 'Shortlisted',
    accepted: 'Accepted',
    advanceStatus: 'Advance Stage',
    withdraw: 'Withdraw',
    mentorshipTitle: 'Mentor-Fellowship Tracker',
    mentorshipSubtitle:
      'Pair with a local industry mentor, book 1-on-1 coaching, and track fellowship milestones.',
    readinessProgress: 'Readiness Progress',
    pairedMentor: 'Your Paired Mentor',
    selectMentor: 'Available Industry Mentors',
    pairWithMentor: 'Pair with Mentor',
    currentlyPaired: 'Paired Mentor',
    bookSession: 'Book 1-on-1 Session',
    sessionDate: 'Session Date',
    sessionTime: 'Time Slot',
    sessionTopic: 'Focus Topic',
    confirmBooking: 'Confirm 1-on-1 Session',
    upcomingSessions: 'Booked 1-on-1 Sessions',
    noSessions: 'No sessions booked yet. Schedule your first mentorship session above.',
    milestonesTitle: 'Fellowship Readiness Milestones',
    returnshipsTitle: 'Paid Returnship Marketplace',
    returnshipsSubtitle:
      '4-to-12 week paid returnships with monthly stipends and clear full-time conversion pathways.',
    postReturnship: 'Post Paid Returnship',
    applyReturnship: 'Apply in 1 Click',
    returnshipApplied: 'Application Submitted',
    conversionPath: 'Conversion Pathway',
    monthlyStipend: 'Monthly Stipend',
    duration: 'Duration',
    weeks: 'weeks',
    footerText: 'PLP Mini Hackathon · Track 3: Local Experience & Networks',
    sdgFocus: 'Aligned with UN SDGs 8 (Decent Work), 10 (Reduced Inequalities) & 17 (Partnerships)',
  },
  fr: {
    brandName: 'NexusBridge Fellows',
    languageLabel: 'Langue',
    signOut: 'Déconnexion',
    signIn: 'Connexion',
    signUp: 'Créer un compte',
    welcomeBack: 'Accédez à votre espace',
    createAccount: 'Rejoindre le réseau de boursiers',
    authHeroTitle: 'Reliez les compétences mondiales vérifiées aux réseaux locaux et parcours rémunérés.',
    authHeroSubtitle:
      'Mettre en relation les talents déplacés avec des mentors sectoriels, des employeurs et des stages de retour rémunérés de 4 à 12 semaines.',
    demoLoginHeading: 'Connexion Démo en 1 Clic (Jury)',
    demoLoginSub: 'Testez instantanément chaque profil avec des données préchargées.',
    fullName: 'Nom complet',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    role: 'Rôle du compte',
    primarySkill: 'Domaine de compétence',
    hostCountry: "Pays d'accueil",
    preferredLanguage: 'Langue préférée',
    tabMatching: 'Matching par Compétences',
    tabMentorship: 'Suivi Mentorat',
    tabReturnships: 'Marché Returnship',
    matchingTitle: 'Matching par Compétences',
    matchingSubtitle:
      'Filtrez les talents vérifiés ou les postes ouverts par domaine technique et disponibilité.',
    browseTalent: 'Talents Vérifiés',
    browseRoles: 'Postes Partenaires',
    skillDomain: 'Domaine',
    availability: 'Disponibilité',
    allDomains: 'Tous les domaines',
    allAvailability: 'Toute disponibilité',
    searchPlaceholder: 'Rechercher par compétence, nom ou pays...',
    matchScore: 'Score de compatibilité',
    sendInvite: 'Envoyer une invitation',
    applyRole: 'Postuler en 1 clic',
    inviteSent: 'Invitation envoyée',
    appliedStatus: 'Candidature envoyée',
    shortlisted: 'Présélectionné',
    accepted: 'Accepté',
    advanceStatus: 'Étape suivante',
    withdraw: 'Retirer',
    mentorshipTitle: 'Suivi Mentorat & Préparation',
    mentorshipSubtitle:
      'Associez-vous à un mentor local, réservez une séance 1-à-1 et validez vos jalons.',
    readinessProgress: 'Progression de préparation',
    pairedMentor: 'Votre Mentor Associé',
    selectMentor: 'Mentors Sectoriels Disponibles',
    pairWithMentor: 'Choisir ce mentor',
    currentlyPaired: 'Mentor actuel',
    bookSession: 'Réserver une séance 1-à-1',
    sessionDate: 'Date de la séance',
    sessionTime: 'Créneau horaire',
    sessionTopic: 'Sujet principal',
    confirmBooking: 'Confirmer la séance',
    upcomingSessions: 'Séances 1-à-1 réservées',
    noSessions: 'Aucune séance réservée. Planifiez votre première rencontre ci-dessus.',
    milestonesTitle: 'Jalons du programme',
    returnshipsTitle: 'Marché des Returnships Rémunérés',
    returnshipsSubtitle:
      'Programmes rémunérés de 4 à 12 semaines avec bourse mensuelle et voie vers un CDI.',
    postReturnship: 'Publier un Returnship',
    applyReturnship: 'Postuler en 1 clic',
    returnshipApplied: 'Candidature envoyée',
    conversionPath: 'Voie de conversion',
    monthlyStipend: 'Allocation mensuelle',
    duration: 'Durée',
    weeks: 'semaines',
    footerText: 'PLP Mini Hackathon · Volet 3 : Expérience locale & Réseaux',
    sdgFocus: 'Aligné sur les ODD 8 (Travail décent), 10 (Inégalités réduites) & 17 (Partenariats)',
  },
  sw: {
    brandName: 'NexusBridge Fellows',
    languageLabel: 'Lugha',
    signOut: 'Ondoka',
    signIn: 'Ingia',
    signUp: 'Fungua Akaunti',
    welcomeBack: 'Ingia kwenye jukwaa lako',
    createAccount: 'Jiunge na mtandao wa ushirika',
    authHeroTitle: 'Unganisha ujuzi uliothibitishwa na uzoefu wa ndani na nafasi zenye malipo.',
    authHeroSubtitle:
      'Kuunganisha wataalamu waliohamishwa na washauri wa tasnia, waajiri, na programu za malipo za wiki 4 hadi 12.',
    demoLoginHeading: 'Kuingia kwa Majaribio (Majaji)',
    demoLoginSub: 'Jaribu mtazamo wowote mara moja ukiwa na data kamili.',
    fullName: 'Jina Kamili',
    email: 'Barua Pepe',
    password: 'Nenosiri',
    role: 'Wajibu wa Akaunti',
    primarySkill: 'Ujuzi Mkuu',
    hostCountry: 'Nchi Mwenyeji',
    preferredLanguage: 'Lugha Pendwa',
    tabMatching: 'Ulinganishi wa Ujuzi',
    tabMentorship: 'Ufuatiliaji wa Ushauri',
    tabReturnships: 'Soko la Returnship',
    matchingTitle: 'Ulinganishi wa Ujuzi Kwanza',
    matchingSubtitle:
      'Chuja vipaji vilivyothibitishwa au nafasi za kazi kwa ujuzi na upatikanaji.',
    browseTalent: 'Vipaji Vilivyothibitishwa',
    browseRoles: 'Nafasi za Washirika',
    skillDomain: 'Nyanja ya Ujuzi',
    availability: 'Upatikanaji',
    allDomains: 'Nyanja Zote',
    allAvailability: 'Upatikanaji Wowote',
    searchPlaceholder: 'Tafuta kwa ujuzi, jina, au nchi...',
    matchScore: 'Alama ya Ulinganifu',
    sendInvite: 'Tuma Mwaliko',
    applyRole: 'Omba kwa Bonyezo 1',
    inviteSent: 'Mwaliko Umetumwa',
    appliedStatus: 'Maombi Yametumwa',
    shortlisted: 'Amechaguliwa',
    accepted: 'Amekubaliwa',
    advanceStatus: 'Hatua Inayofuata',
    withdraw: 'Ondoa',
    mentorshipTitle: 'Ufuatiliaji wa Mshauri na Ushirika',
    mentorshipSubtitle:
      'Unganishwa na mshauri wa tasnia, weka miadi ya 1-kwa-1, na kamilisha hatua za utayari.',
    readinessProgress: 'Maendeleo ya Utayari',
    pairedMentor: 'Mshauri Wako Aliyechaguliwa',
    selectMentor: 'Washauri wa Tasnia Waliopo',
    pairWithMentor: 'Chagua Mshauri',
    currentlyPaired: 'Mshauri Aliyeunganishwa',
    bookSession: 'Weka Kipindi cha 1-kwa-1',
    sessionDate: 'Tarehe ya Kipindi',
    sessionTime: 'Muda',
    sessionTopic: 'Mada ya Mazungumzo',
    confirmBooking: 'Thibitisha Kipindi',
    upcomingSessions: 'Vipindi Vilivyowekwa',
    noSessions: 'Hakuna vipindi vilivyowekwa bado. Panga kipindi chako cha kwanza hapo juu.',
    milestonesTitle: 'Hatua za Utayari wa Ushirika',
    returnshipsTitle: 'Soko la Returnship Yenye Malipo',
    returnshipsSubtitle:
      'Programu za wiki 4–12 zenye malipo ya kila mwezi na njia ya ajira ya kudumu.',
    postReturnship: 'Tangaza Returnship Mpya',
    applyReturnship: 'Omba kwa Bonyezo 1',
    returnshipApplied: 'Maombi Yamepokelewa',
    conversionPath: 'Njia ya Ajira ya Kudumu',
    monthlyStipend: 'Posho ya Kila Mwezi',
    duration: 'Muda',
    weeks: 'wiki',
    footerText: 'PLP Mini Hackathon · Njia ya 3: Uzoefu wa Ndani na Mitandao',
    sdgFocus: 'Inazingatia Malengo ya UN SDG 8, 10 & 17',
  },
  so: {
    brandName: 'NexusBridge Fellows',
    languageLabel: 'Luqadda',
    signOut: 'Ka Bax',
    signIn: 'Soo Gal',
    signUp: 'Samee Koonto',
    welcomeBack: 'Soo gal goobtaada shaqo',
    createAccount: 'Ku biir shabakadda Fellows',
    authHeroTitle: 'Ku xir xirfadaha la xaqiijiyay khibradda maxalliga ah iyo fursadaha mushaharka leh.',
    authHeroSubtitle:
      'Isku xirka xirfadlayaasha barakacay iyo lataliyayaal khibrad leh, shirkadaha shaqaaleysiiya, iyo barnaamijyo tababar shaqo oo 4–12 toddobaad ah.',
    demoLoginHeading: 'Galitaan Degdeg ah ee Garsoorayaasha',
    demoLoginSub: 'Si toos ah u tijaabi door kasta adigoo adeegsanaya xog diyaarsan.',
    fullName: 'Magaca Buuxa',
    email: 'Cinwaanka Email-ka',
    password: 'Furaha Sirta',
    role: 'Doorka Koontada',
    primarySkill: 'Xirfadda Ugu Weyn',
    hostCountry: 'Dalka Martida Loo Yahay',
    preferredLanguage: 'Luqadda La Doorbiday',
    tabMatching: 'Isku-aadinta Xirfadaha',
    tabMentorship: 'La-talinta & Horumarka',
    tabReturnships: 'Suuqa Returnship',
    matchingTitle: 'Isku-aadinta Xirfadaha',
    matchingSubtitle:
      'Kala shaandhee xirfadlayaasha la xaqiijiyay ama jagooyinka furan iyadoo lagu saleynayo xirfad iyo diyaar-garow.',
    browseTalent: 'Xirfadlayaasha La Xaqiijiyay',
    browseRoles: 'Jagooyinka Shirkadaha',
    skillDomain: 'Qaybta Xirfadda',
    availability: 'Helitaanka',
    allDomains: 'Dhammaan Qaybaha',
    allAvailability: 'Waqti Kasta',
    searchPlaceholder: 'Raadi xirfad, magac, ama dal...',
    matchScore: 'Dhibcaha Iswaafajinta',
    sendInvite: 'Dir Casuumaad',
    applyRole: 'Codso 1 Guji',
    inviteSent: 'Casuumaad La Diray',
    appliedStatus: 'La Codsaday',
    shortlisted: 'Liiska Gaaban',
    accepted: 'La Aqbalay',
    advanceStatus: 'Horumarin Heer',
    withdraw: 'Ka Noqo',
    mentorshipTitle: 'Raadraaca La-talinta & Tababarka',
    mentorshipSubtitle:
      'La saaxiib lataliye khibrad leh, qabso kulan 1-ka-1 ah, oo dhammaystir tallaabooyinka diyaargarowga.',
    readinessProgress: 'Horumarka Diyaargarowga',
    pairedMentor: 'Lataliyahaaga La Xushay',
    selectMentor: 'Lataliyayaasha Diyaarka Ah',
    pairWithMentor: 'La Xirir Lataliyahan',
    currentlyPaired: 'Lataliyaha Hadda',
    bookSession: 'Qabso Kulan 1-ka-1',
    sessionDate: 'Taariikhda Kulanka',
    sessionTime: 'Waqtiga',
    sessionTopic: 'Mawduuca Kulanka',
    confirmBooking: 'Xaqiiji Kulanka',
    upcomingSessions: 'Kulamada La Qabtay',
    noSessions: 'Weli kulan lama qabsan. Jadwal u samee kulankaaga ugu horreeya kor.',
    milestonesTitle: 'Tallaabooyinka Diyaargarowga',
    returnshipsTitle: 'Suuqa Returnship-ka Mushaharka Leh',
    returnshipsSubtitle:
      'Barnaamijyo 4 ilaa 12 toddobaad ah oo leh gunno bille ah iyo waddo shaqo joogto ah.',
    postReturnship: 'Daabac Returnship Cusub',
    applyReturnship: 'Codso 1 Guji',
    returnshipApplied: 'Codsiga Waa La Diray',
    conversionPath: 'Waddada Shaqo Joogtada Ah',
    monthlyStipend: 'Gunnada Bisha',
    duration: 'Muddada',
    weeks: 'toddobaad',
    footerText: 'PLP Mini Hackathon · Qaybta 3: Khibradda Maxalliga & Shabakadaha',
    sdgFocus: 'La jaanqaadaya UN SDGs 8, 10 & 17',
  },
};
