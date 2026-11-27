import { useMemo, useState } from 'react';
import { Check, Search, Send, ArrowUpRight, RotateCcw } from 'lucide-react';
import { TranslationStrings } from '../i18n';
import { LANGUAGE_NAMES } from '../i18n';
import {
  AvailabilityOption,
  MatchStatus,
  OpenRole,
  SkillDomain,
  TalentProfile,
  UserProfile,
} from '../types';
import { Avatar } from './Avatar';

interface SkillsMatchingTabProps {
  user: UserProfile;
  talents: TalentProfile[];
  roles: OpenRole[];
  matchStatuses: Record<string, MatchStatus>;
  onUpdateMatchStatus: (itemId: string, status: MatchStatus) => void;
  t: TranslationStrings;
}

const DOMAINS: SkillDomain[] = ['Software', 'Data', 'Design', 'Finance', 'Operations'];
const AVAILABILITIES: AvailabilityOption[] = ['Immediate', 'Within 2 Weeks', 'Part-Time'];

function computeMatchScore(
  itemDomain: SkillDomain,
  itemLanguages: string[],
  itemLocation: string,
  itemAvailability: AvailabilityOption,
  user: UserProfile
): number {
  let score = 68;
  if (itemDomain === user.primarySkill) score += 19;
  else score += 6;

  const userLangName = LANGUAGE_NAMES[user.preferredLanguage];
  if (
    itemLanguages.some(
      (l) =>
        l.toLowerCase().includes(userLangName.toLowerCase().slice(0, 4)) ||
        l.toLowerCase() === 'english'
    )
  ) {
    score += 6;
  }

  if (itemLocation.toLowerCase().includes(user.hostCountry.toLowerCase())) {
    score += 5;
  } else if (itemLocation.toLowerCase().includes('remote')) {
    score += 4;
  }

  if (itemAvailability === 'Immediate') score += 2;
  return Math.min(score, 98);
}

export function SkillsMatchingTab({
  user,
  talents,
  roles,
  matchStatuses,
  onUpdateMatchStatus,
  t,
}: SkillsMatchingTabProps) {
  const defaultView = user.role === 'Displaced Talent' ? 'roles' : 'talent';
  const [viewMode, setViewMode] = useState<'talent' | 'roles'>(defaultView);
  const [selectedDomain, setSelectedDomain] = useState<SkillDomain | 'All'>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityOption | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTalents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return talents
      .filter((item) => {
        if (selectedDomain !== 'All' && item.domain !== selectedDomain) return false;
        if (selectedAvailability !== 'All' && item.availability !== selectedAvailability) return false;
        if (!q) return true;
        return (
          item.fullName.toLowerCase().includes(q) ||
          item.headline.toLowerCase().includes(q) ||
          item.hostCountry.toLowerCase().includes(q) ||
          item.verifiedSkills.some((s) => s.toLowerCase().includes(q))
        );
      })
      .map((item) => ({
        item,
        score: computeMatchScore(
          item.domain,
          item.languages,
          item.hostCountry,
          item.availability,
          user
        ),
      }))
      .sort((a, b) => b.score - a.score);
  }, [talents, selectedDomain, selectedAvailability, searchQuery, user]);

  const filteredRoles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return roles
      .filter((item) => {
        if (selectedDomain !== 'All' && item.domain !== selectedDomain) return false;
        if (selectedAvailability !== 'All' && item.availability !== selectedAvailability) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.organization.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.requiredSkills.some((s) => s.toLowerCase().includes(q))
        );
      })
      .map((item) => ({
        item,
        score: computeMatchScore(
          item.domain,
          item.languages,
          item.location,
          item.availability,
          user
        ),
      }))
      .sort((a, b) => b.score - a.score);
  }, [roles, selectedDomain, selectedAvailability, searchQuery, user]);

  const activeCount = viewMode === 'talent' ? filteredTalents.length : filteredRoles.length;
  const contactedCount = Object.values(matchStatuses).filter((s) => s !== 'None').length;

  const renderStatusControl = (id: string, isRole: boolean) => {
    const status = matchStatuses[id] || 'None';

    if (status === 'None') {
      return (
        <button
          type="button"
          onClick={() => onUpdateMatchStatus(id, 'Sent')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{isRole ? t.applyRole : t.sendInvite}</span>
        </button>
      );
    }

    const nextStage: Record<MatchStatus, MatchStatus> = {
      None: 'Sent',
      Sent: 'Shortlisted',
      Shortlisted: 'Accepted',
      Accepted: 'Accepted',
    };

    const statusLabel =
      status === 'Sent'
        ? isRole
          ? t.appliedStatus
          : t.inviteSent
        : status === 'Shortlisted'
        ? t.shortlisted
        : t.accepted;

    const statusStyles =
      status === 'Accepted'
        ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
        : status === 'Shortlisted'
        ? 'text-orange-800 bg-orange-50 border-orange-200'
        : 'text-indigo-800 bg-indigo-50 border-indigo-200';

    return (
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg whitespace-nowrap ${statusStyles}`}
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{statusLabel}</span>
        </span>
        {status !== 'Accepted' && (
          <button
            type="button"
            onClick={() => onUpdateMatchStatus(id, nextStage[status])}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{t.advanceStatus}</span>
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onUpdateMatchStatus(id, 'None')}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          title={t.withdraw}
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          <span>{t.withdraw}</span>
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight">
            {t.matchingTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {t.matchingSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <div className="font-mono tabular-nums text-lg font-semibold text-slate-900">
              {activeCount}
            </div>
            <div className="text-xs text-slate-500">Visible Matches</div>
          </div>
          <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
          <div className="text-right">
            <div className="font-mono tabular-nums text-lg font-semibold text-orange-600">
              {contactedCount}
            </div>
            <div className="text-xs text-slate-500">Active Outreach</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Segmented View Mode Switch */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setViewMode('talent')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'talent'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.browseTalent} ({talents.length})
            </button>
            <button
              type="button"
              onClick={() => setViewMode('roles')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'roles'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.browseRoles} ({roles.length})
            </button>
          </div>

          {/* Search & Availability */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:max-w-xl justify-end">
            <div className="relative flex-1">
              <Search
                className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="shrink-0">
              <label htmlFor="availability-filter" className="sr-only">
                {t.availability}
              </label>
              <select
                id="availability-filter"
                value={selectedAvailability}
                onChange={(e) =>
                  setSelectedAvailability(e.target.value as AvailabilityOption | 'All')
                }
                className="w-full sm:w-auto px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
              >
                <option value="All">{t.allAvailability}</option>
                {AVAILABILITIES.map((av) => (
                  <option key={av} value={av}>
                    {av}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skill Domain Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-500 mr-2">{t.skillDomain}:</span>
          <button
            type="button"
            onClick={() => setSelectedDomain('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedDomain === 'All'
                ? 'bg-indigo-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.allDomains}
          </button>
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedDomain === domain
                  ? 'bg-indigo-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {activeCount === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <p className="font-display font-semibold text-base text-slate-900">
            No matching profiles or roles found
          </p>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try clearing your skill domain or availability filter to view all verified fellows and open partner positions.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain('All');
              setSelectedAvailability('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'talent' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTalents.map(({ item, score }) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <Avatar
                      src={item.avatarUrl}
                      alt={item.fullName}
                      initials={item.initials}
                      size="md"
                    />
                    <div className="min-w-0">
                      <h2 className="font-display font-semibold text-base text-slate-950 truncate">
                        {item.fullName}
                      </h2>
                      <p className="text-sm font-medium text-indigo-800">{item.headline}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-1">
                        <span>{item.domain}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.hostCountry}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono tabular-nums text-lg font-bold text-orange-600">
                      {score}%
                    </div>
                    <div className="text-[11px] text-slate-500 whitespace-nowrap">
                      {t.matchScore}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
                  <div className="text-slate-700">
                    <span className="font-medium text-slate-500">Verified Skills: </span>
                    <span className="font-medium">{item.verifiedSkills.join(' · ')}</span>
                  </div>
                  <div className="text-slate-500">
                    <span>{item.yearsExperience} yrs experience</span>
                    <span aria-hidden="true"> · </span>
                    <span>Languages: {item.languages.join(', ')}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.originNote}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {renderStatusControl(item.id, false)}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRoles.map(({ item, score }) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-500">
                      {item.organization} · {item.workMode}
                    </div>
                    <h2 className="font-display font-semibold text-base text-slate-950 mt-0.5">
                      {item.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-1">
                      <span>{item.domain}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.availability}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono tabular-nums text-lg font-bold text-orange-600">
                      {score}%
                    </div>
                    <div className="text-[11px] text-slate-500 whitespace-nowrap">
                      {t.matchScore}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
                  <div className="text-slate-700">
                    <span className="font-medium text-slate-500">Required Skills: </span>
                    <span className="font-medium">{item.requiredSkills.join(' · ')}</span>
                  </div>
                  <div className="text-slate-500">
                    <span className="font-mono tabular-nums font-medium text-slate-800">
                      {item.compensation}
                    </span>
                    <span aria-hidden="true"> · </span>
                    <span>Languages: {item.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {renderStatusControl(item.id, true)}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
