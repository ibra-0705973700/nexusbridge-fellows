import { FormEvent, useState } from 'react';
import { ArrowRight, Briefcase, Compass, UserCheck } from 'lucide-react';
import { DEMO_USERS } from '../data/seedData';
import { LANGUAGE_NAMES, TranslationStrings } from '../i18n';
import { LanguageCode, SkillDomain, UserProfile, UserRole } from '../types';

interface AuthScreenProps {
  onAuthenticate: (user: UserProfile) => void;
  registeredUsers: UserProfile[];
  onRegisterUser: (user: UserProfile) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  t: TranslationStrings;
}

const ROLES: UserRole[] = ['Displaced Talent', 'Industry Mentor', 'Hiring Partner'];
const SKILLS: SkillDomain[] = ['Software', 'Data', 'Design', 'Finance', 'Operations'];

export function AuthScreen({
  onAuthenticate,
  registeredUsers,
  onRegisterUser,
  language,
  onLanguageChange,
  t,
}: AuthScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [errorMsg, setErrorMsg] = useState('');

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Displaced Talent');
  const [primarySkill, setPrimarySkill] = useState<SkillDomain>('Software');
  const [hostCountry, setHostCountry] = useState('Kenya');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>(language);

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const normalized = signInEmail.trim().toLowerCase();
    if (!normalized || !signInPassword.trim()) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    const found = [...DEMO_USERS, ...registeredUsers].find(
      (u) => u.email.toLowerCase() === normalized
    );

    if (!found) {
      setErrorMsg('Account not found. Try Create Account or use a 1-Click Judge Demo Login.');
      return;
    }

    if (found.password && found.password !== signInPassword) {
      setErrorMsg('Incorrect password. Please try again.');
      return;
    }

    onAuthenticate(found);
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !password.trim() || !hostCountry.trim()) {
      setErrorMsg('Please fill out all required fields to create your account.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    const exists = [...DEMO_USERS, ...registeredUsers].some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      setErrorMsg('An account with this email already exists. Please sign in.');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      role,
      primarySkill,
      hostCountry: hostCountry.trim(),
      preferredLanguage,
    };

    onLanguageChange(preferredLanguage);
    onRegisterUser(newUser);
    onAuthenticate(newUser);
  };

  const handleDemoLogin = (demoUser: UserProfile) => {
    onLanguageChange(demoUser.preferredLanguage);
    onAuthenticate(demoUser);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Mission Context + 1-Click Judge Demo Logins */}
        <section className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-orange-600">
              {t.footerText}
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-slate-950 text-balance max-w-2xl">
              {t.authHeroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.authHeroSubtitle}
            </p>
          </div>

          {/* Key SDG Alignment Metrics / Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-200 py-5">
            <div>
              <div className="font-mono tabular-nums text-xl font-semibold text-indigo-900">
                SDG 8
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Decent paid returnships & local workforce entry
              </p>
            </div>
            <div>
              <div className="font-mono tabular-nums text-xl font-semibold text-indigo-900">
                SDG 10
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Skills-first matching without credential bias
              </p>
            </div>
            <div>
              <div className="font-mono tabular-nums text-xl font-semibold text-indigo-900">
                SDG 17
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Mentor & employer chapters across host regions
              </p>
            </div>
          </div>

          {/* 3 Prominent 1-Click Demo Login Buttons for Judges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-display font-semibold text-base text-slate-900">
                {t.demoLoginHeading}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">{t.demoLoginSub}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[0])}
                className="group text-left p-4 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-900 hover:border-indigo-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <UserCheck
                    className="h-5 w-5 text-indigo-700 group-hover:text-orange-300 transition-colors"
                    aria-hidden="true"
                  />
                  <ArrowRight
                    className="h-4 w-4 text-indigo-600 group-hover:text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 font-display font-semibold text-sm text-slate-900 group-hover:text-white">
                  Displaced Talent
                </div>
                <div className="text-xs text-slate-600 group-hover:text-indigo-100 mt-0.5">
                  Amina Hassan · Software
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[1])}
                className="group text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-900 hover:border-indigo-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <Compass
                    className="h-5 w-5 text-orange-600 group-hover:text-orange-300 transition-colors"
                    aria-hidden="true"
                  />
                  <ArrowRight
                    className="h-4 w-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 font-display font-semibold text-sm text-slate-900 group-hover:text-white">
                  Industry Mentor
                </div>
                <div className="text-xs text-slate-600 group-hover:text-indigo-100 mt-0.5">
                  Dr. Claire Moreau · Data
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin(DEMO_USERS[2])}
                className="group text-left p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-900 hover:border-indigo-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <div className="flex items-center justify-between">
                  <Briefcase
                    className="h-5 w-5 text-indigo-700 group-hover:text-orange-300 transition-colors"
                    aria-hidden="true"
                  />
                  <ArrowRight
                    className="h-4 w-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 font-display font-semibold text-sm text-slate-900 group-hover:text-white">
                  Hiring Partner
                </div>
                <div className="text-xs text-slate-600 group-hover:text-indigo-100 mt-0.5">
                  David Kimani · Operations
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Sign In / Sign Up Card */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.signIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.signUp}
            </button>
          </div>

          <h2 className="font-display font-bold text-xl text-slate-900">
            {mode === 'signin' ? t.welcomeBack : t.createAccount}
          </h2>

          {errorMsg && (
            <div
              role="alert"
              className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700"
            >
              {errorMsg}
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="mt-5 space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t.email}
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="you@organization.org"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="signin-password" className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t.password}
                </label>
                <input
                  id="signin-password"
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-900 hover:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                {t.signIn}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="mt-5 space-y-3.5">
              <div>
                <label htmlFor="signup-name" className="block text-xs font-medium text-slate-700 mb-1">
                  {t.fullName}
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Fatima Abdi"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-email" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.email}
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fatima@example.org"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.password}
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 4 chars"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-role" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.role}
                  </label>
                  <select
                    id="signup-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="signup-skill" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.primarySkill}
                  </label>
                  <select
                    id="signup-skill"
                    value={primarySkill}
                    onChange={(e) => setPrimarySkill(e.target.value as SkillDomain)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {SKILLS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signup-country" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.hostCountry}
                  </label>
                  <input
                    id="signup-country"
                    type="text"
                    value={hostCountry}
                    onChange={(e) => setHostCountry(e.target.value)}
                    placeholder="Kenya, Jordan, France..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label htmlFor="signup-lang" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.preferredLanguage}
                  </label>
                  <select
                    id="signup-lang"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as LanguageCode)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {(Object.keys(LANGUAGE_NAMES) as LanguageCode[]).map((code) => (
                      <option key={code} value={code}>
                        {LANGUAGE_NAMES[code]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
              >
                {t.signUp}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
