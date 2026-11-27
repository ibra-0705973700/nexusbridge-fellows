import { Globe, LogOut } from 'lucide-react';
import { LANGUAGE_NAMES, TranslationStrings } from '../i18n';
import { LanguageCode, TabId, UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onSignOut: () => void;
  t: TranslationStrings;
}

export function Navbar({
  user,
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  onSignOut,
  t,
}: NavbarProps) {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'matching', label: t.tabMatching },
    { id: 'mentorship', label: t.tabMentorship },
    { id: 'returnships', label: t.tabReturnships },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span
              aria-hidden="true"
              className="h-7 w-7 rounded-lg bg-indigo-900 flex items-center justify-center text-white font-display font-bold text-sm"
            >
              NB
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              {t.brandName}
            </span>
          </div>

          {/* Zone 2: Primary Navigation (when authenticated) */}
          {user ? (
            <nav
              aria-label="Primary sections"
              className="hidden md:flex items-center gap-6 text-sm font-medium"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-xs ${
                      isActive
                        ? 'border-indigo-700 text-indigo-950 font-semibold'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="hidden md:block text-sm text-slate-500 whitespace-nowrap">
              {t.footerText}
            </div>
          )}

          {/* Zone 3: Language Switcher + Logged-in User & Sign Out */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 hover:border-slate-300 transition-colors">
              <Globe className="h-4 w-4 text-indigo-700 shrink-0" aria-hidden="true" />
              <label htmlFor="global-lang-select" className="sr-only">
                {t.languageLabel}
              </label>
              <select
                id="global-lang-select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {(Object.keys(LANGUAGE_NAMES) as LanguageCode[]).map((code) => (
                  <option key={code} value={code}>
                    {LANGUAGE_NAMES[code]}
                  </option>
                ))}
              </select>
            </div>

            {user && (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="hidden sm:flex flex-col text-right leading-tight">
                  <span className="text-xs font-semibold text-slate-900 max-w-[140px] truncate">
                    {user.fullName}
                  </span>
                  <span className="text-[11px] text-slate-500 max-w-[140px] truncate">
                    {user.role}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <LogOut className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Tab Switcher (compact single row, only when logged in) */}
        {user && (
          <nav
            aria-label="Mobile sections"
            className="flex md:hidden items-center gap-1 pb-2.5 overflow-x-auto no-scrollbar"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
