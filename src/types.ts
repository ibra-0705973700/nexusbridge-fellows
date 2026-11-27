export type LanguageCode = 'en' | 'fr' | 'sw' | 'so';

export type UserRole = 'Displaced Talent' | 'Industry Mentor' | 'Hiring Partner';

export type SkillDomain = 'Software' | 'Data' | 'Design' | 'Finance' | 'Operations';

export type AvailabilityOption = 'Immediate' | 'Within 2 Weeks' | 'Part-Time';

export type MatchStatus = 'None' | 'Sent' | 'Shortlisted' | 'Accepted';

export type TabId = 'matching' | 'mentorship' | 'returnships';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  primarySkill: SkillDomain;
  hostCountry: string;
  preferredLanguage: LanguageCode;
  isDemo?: boolean;
}

export interface TalentProfile {
  id: string;
  fullName: string;
  headline: string;
  domain: SkillDomain;
  availability: AvailabilityOption;
  hostCountry: string;
  originNote: string;
  yearsExperience: number;
  languages: string[];
  verifiedSkills: string[];
  summary: string;
  avatarUrl?: string;
  initials: string;
}

export interface OpenRole {
  id: string;
  title: string;
  organization: string;
  domain: SkillDomain;
  availability: AvailabilityOption;
  location: string;
  workMode: string;
  languages: string[];
  requiredSkills: string[];
  summary: string;
  compensation: string;
}

export interface MentorProfile {
  id: string;
  fullName: string;
  title: string;
  organization: string;
  domain: SkillDomain;
  hostCountry: string;
  languages: string[];
  yearsExperience: number;
  availabilitySlots: string[];
  focusAreas: string[];
  avatarUrl?: string;
  initials: string;
}

export interface BookedSession {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  timeSlot: string;
  topic: string;
  status: 'Scheduled' | 'Completed';
}

export interface MilestoneItem {
  id: string;
  title: string;
  category: string;
  estimatedTime: string;
  completed: boolean;
}

export interface ReturnshipOpportunity {
  id: string;
  title: string;
  organization: string;
  domain: SkillDomain;
  durationWeeks: number;
  monthlyStipend: string;
  location: string;
  conversionPathway: string;
  description: string;
  skills: string[];
  postedBy?: string;
}
