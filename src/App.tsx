import { useEffect, useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Footer } from './components/Footer';
import { MentorTrackerTab } from './components/MentorTrackerTab';
import { Navbar } from './components/Navbar';
import { ReturnshipTab } from './components/ReturnshipTab';
import { SkillsMatchingTab } from './components/SkillsMatchingTab';
import {
  INITIAL_MENTORS,
  INITIAL_MILESTONES,
  INITIAL_OPEN_ROLES,
  INITIAL_RETURNSHIPS,
  INITIAL_TALENT_PROFILES,
} from './data/seedData';
import { TRANSLATIONS } from './i18n';
import {
  BookedSession,
  LanguageCode,
  MatchStatus,
  MilestoneItem,
  ReturnshipOpportunity,
  TabId,
  UserProfile,
} from './types';

const STORAGE_KEYS = {
  user: 'nbf_current_user',
  registeredUsers: 'nbf_registered_users',
  language: 'nbf_language',
  matchStatuses: 'nbf_match_statuses',
  pairedMentorId: 'nbf_paired_mentor_id',
  sessions: 'nbf_booked_sessions',
  milestones: 'nbf_milestones',
  returnships: 'nbf_returnships',
  appliedReturnships: 'nbf_applied_returnships',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    loadFromStorage<UserProfile | null>(STORAGE_KEYS.user, null)
  );
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() =>
    loadFromStorage<UserProfile[]>(STORAGE_KEYS.registeredUsers, [])
  );
  const [language, setLanguage] = useState<LanguageCode>(() =>
    loadFromStorage<LanguageCode>(STORAGE_KEYS.language, 'en')
  );
  const [activeTab, setActiveTab] = useState<TabId>('matching');

  // Core Tab 1 state
  const [matchStatuses, setMatchStatuses] = useState<Record<string, MatchStatus>>(() =>
    loadFromStorage<Record<string, MatchStatus>>(STORAGE_KEYS.matchStatuses, {})
  );

  // Core Tab 2 state
  const [pairedMentorId, setPairedMentorId] = useState<string>(() =>
    loadFromStorage<string>(STORAGE_KEYS.pairedMentorId, INITIAL_MENTORS[1].id)
  );
  const [sessions, setSessions] = useState<BookedSession[]>(() =>
    loadFromStorage<BookedSession[]>(STORAGE_KEYS.sessions, [
      {
        id: 'sess-seed-1',
        mentorId: INITIAL_MENTORS[1].id,
        mentorName: INITIAL_MENTORS[1].fullName,
        date: '2026-12-01',
        timeSlot: 'Wed 16:00 EAT',
        topic: 'System design portfolio walkthrough & local partner referrals',
        status: 'Scheduled',
      },
    ])
  );
  const [milestones, setMilestones] = useState<MilestoneItem[]>(() =>
    loadFromStorage<MilestoneItem[]>(STORAGE_KEYS.milestones, INITIAL_MILESTONES)
  );

  // Core Tab 3 state
  const [returnships, setReturnships] = useState<ReturnshipOpportunity[]>(() =>
    loadFromStorage<ReturnshipOpportunity[]>(STORAGE_KEYS.returnships, INITIAL_RETURNSHIPS)
  );
  const [appliedReturnships, setAppliedReturnships] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEYS.appliedReturnships, [])
  );

  // Persist updates to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.registeredUsers, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, JSON.stringify(language));
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.matchStatuses, JSON.stringify(matchStatuses));
  }, [matchStatuses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.pairedMentorId, JSON.stringify(pairedMentorId));
  }, [pairedMentorId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.milestones, JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.returnships, JSON.stringify(returnships));
  }, [returnships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.appliedReturnships, JSON.stringify(appliedReturnships));
  }, [appliedReturnships]);

  const t = TRANSLATIONS[language];

  const handleUpdateMatchStatus = (itemId: string, status: MatchStatus) => {
    setMatchStatuses((prev) => ({ ...prev, [itemId]: status }));
  };

  const handleBookSession = (session: BookedSession) => {
    setSessions((prev) => [session, ...prev]);
  };

  const handleToggleSessionComplete = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, status: s.status === 'Completed' ? 'Scheduled' : 'Completed' }
          : s
      )
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const handleToggleMilestone = (milestoneId: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === milestoneId ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleToggleApplyReturnship = (returnshipId: string) => {
    setAppliedReturnships((prev) =>
      prev.includes(returnshipId)
        ? prev.filter((id) => id !== returnshipId)
        : [...prev, returnshipId]
    );
  };

  const handleAddReturnship = (opp: ReturnshipOpportunity) => {
    setReturnships((prev) => [opp, ...prev]);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setActiveTab('matching');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        user={currentUser}
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
        t={t}
      />

      <div className="flex-1">
        {!currentUser ? (
          <AuthScreen
            onAuthenticate={(u) => {
              setCurrentUser(u);
              setActiveTab('matching');
            }}
            registeredUsers={registeredUsers}
            onRegisterUser={(u) => setRegisteredUsers((prev) => [...prev, u])}
            language={language}
            onLanguageChange={setLanguage}
            t={t}
          />
        ) : (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'matching' && (
              <SkillsMatchingTab
                user={currentUser}
                talents={INITIAL_TALENT_PROFILES}
                roles={INITIAL_OPEN_ROLES}
                matchStatuses={matchStatuses}
                onUpdateMatchStatus={handleUpdateMatchStatus}
                t={t}
              />
            )}

            {activeTab === 'mentorship' && (
              <MentorTrackerTab
                mentors={INITIAL_MENTORS}
                pairedMentorId={pairedMentorId}
                onPairMentor={setPairedMentorId}
                sessions={sessions}
                onBookSession={handleBookSession}
                onToggleSessionComplete={handleToggleSessionComplete}
                onDeleteSession={handleDeleteSession}
                milestones={milestones}
                onToggleMilestone={handleToggleMilestone}
                t={t}
              />
            )}

            {activeTab === 'returnships' && (
              <ReturnshipTab
                user={currentUser}
                returnships={returnships}
                appliedIds={appliedReturnships}
                onToggleApply={handleToggleApplyReturnship}
                onAddReturnship={handleAddReturnship}
                t={t}
              />
            )}
          </main>
        )}
      </div>

      <Footer t={t} />
    </div>
  );
}
