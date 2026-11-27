import { FormEvent, useMemo, useState } from 'react';
import { Briefcase, Check, Plus, X } from 'lucide-react';
import { TranslationStrings } from '../i18n';
import { ReturnshipOpportunity, SkillDomain, UserProfile } from '../types';

interface ReturnshipTabProps {
  user: UserProfile;
  returnships: ReturnshipOpportunity[];
  appliedIds: string[];
  onToggleApply: (returnshipId: string) => void;
  onAddReturnship: (opp: ReturnshipOpportunity) => void;
  t: TranslationStrings;
}

const DOMAINS: SkillDomain[] = ['Software', 'Data', 'Design', 'Finance', 'Operations'];

export function ReturnshipTab({
  user,
  returnships,
  appliedIds,
  onToggleApply,
  onAddReturnship,
  t,
}: ReturnshipTabProps) {
  const [selectedDomain, setSelectedDomain] = useState<SkillDomain | 'All'>('All');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'long'>('all');
  const [showPostModal, setShowPostModal] = useState(false);

  // Post New Paid Returnship Form State
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState(
    user.role === 'Hiring Partner' ? 'SavannahGrid Energy' : ''
  );
  const [domain, setDomain] = useState<SkillDomain>(user.primarySkill);
  const [durationWeeks, setDurationWeeks] = useState(8);
  const [monthlyStipend, setMonthlyStipend] = useState('$1,600 / mo');
  const [location, setLocation] = useState(`${user.hostCountry} · Hybrid`);
  const [conversionPathway, setConversionPathway] = useState('Direct Full-Time Offer Track');
  const [skillsInput, setSkillsInput] = useState('TypeScript, Operations, Stakeholder Reporting');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const filteredReturnships = useMemo(() => {
    return returnships.filter((item) => {
      if (selectedDomain !== 'All' && item.domain !== selectedDomain) return false;
      if (durationFilter === 'short' && item.durationWeeks > 6) return false;
      if (durationFilter === 'long' && item.durationWeeks <= 6) return false;
      return true;
    });
  }, [returnships, selectedDomain, durationFilter]);

  const handleCreateReturnship = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !organization.trim() || !monthlyStipend.trim() || !description.trim()) {
      setFormError('Please fill in title, organization, stipend, and description.');
      return;
    }

    const newOpp: ReturnshipOpportunity = {
      id: `ret-${Date.now()}`,
      title: title.trim(),
      organization: organization.trim(),
      domain,
      durationWeeks: Math.min(12, Math.max(4, Number(durationWeeks) || 8)),
      monthlyStipend: monthlyStipend.trim(),
      location: location.trim() || 'Remote',
      conversionPathway: conversionPathway.trim() || 'Full-Time Conversion Evaluation',
      description: description.trim(),
      skills: skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      postedBy: user.fullName,
    };

    onAddReturnship(newOpp);
    setTitle('');
    setDescription('');
    setShowPostModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Row with Post Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight">
            {t.returnshipsTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {t.returnshipsSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>{t.postReturnship}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 mr-1.5">{t.skillDomain}:</span>
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
          {DOMAINS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedDomain === d
                  ? 'bg-indigo-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-lg self-start">
          <button
            type="button"
            onClick={() => setDurationFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              durationFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            4–12 {t.weeks}
          </button>
          <button
            type="button"
            onClick={() => setDurationFilter('short')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              durationFilter === 'short' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            4–6 {t.weeks}
          </button>
          <button
            type="button"
            onClick={() => setDurationFilter('long')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              durationFilter === 'long' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            8–12 {t.weeks}
          </button>
        </div>
      </div>

      {/* Returnships Grid */}
      {filteredReturnships.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <p className="font-display font-semibold text-base text-slate-900">
            No paid returnships match this filter
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDomain('All');
              setDurationFilter('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-indigo-900 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            Show All Returnships
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReturnships.map((opp) => {
            const isApplied = appliedIds.includes(opp.id);
            return (
              <article
                key={opp.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-slate-500">
                        {opp.organization} · {opp.location}
                      </div>
                      <h2 className="font-display font-bold text-lg text-slate-950 mt-0.5">
                        {opp.title}
                      </h2>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono tabular-nums text-base font-bold text-indigo-900">
                        {opp.monthlyStipend}
                      </div>
                      <div className="font-mono tabular-nums text-xs text-slate-500">
                        {opp.durationWeeks} {t.weeks}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{opp.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div>
                      <span className="font-medium text-slate-500">{t.conversionPath}: </span>
                      <span className="font-semibold text-orange-700">{opp.conversionPathway}</span>
                    </div>
                    <div className="text-slate-600">
                      <span className="font-medium text-slate-500">{opp.domain} · </span>
                      <span>{opp.skills.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  {isApplied ? (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.returnshipApplied}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleApply(opp.id)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        {t.withdraw}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onToggleApply(opp.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                    >
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.applyReturnship}</span>
                    </button>
                  )}

                  {opp.postedBy && (
                    <span className="text-xs text-slate-400">Posted by {opp.postedBy}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Post New Paid Returnship Modal */}
      {showPostModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-returnship-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2
                id="post-returnship-title"
                className="font-display font-bold text-lg text-slate-950"
              >
                {t.postReturnship}
              </h2>
              <button
                type="button"
                onClick={() => setShowPostModal(false)}
                aria-label="Close modal"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateReturnship} className="space-y-3.5">
              <div>
                <label htmlFor="ret-title" className="block text-xs font-medium text-slate-700 mb-1">
                  Role / Trial Title
                </label>
                <input
                  id="ret-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Data Platform Returnship"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ret-org" className="block text-xs font-medium text-slate-700 mb-1">
                    Host Organization
                  </label>
                  <input
                    id="ret-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Organization name"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="ret-domain" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.skillDomain}
                  </label>
                  <select
                    id="ret-domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as SkillDomain)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ret-weeks" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.duration} (4–12 {t.weeks})
                  </label>
                  <input
                    id="ret-weeks"
                    type="number"
                    min={4}
                    max={12}
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="ret-stipend" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.monthlyStipend}
                  </label>
                  <input
                    id="ret-stipend"
                    type="text"
                    value={monthlyStipend}
                    onChange={(e) => setMonthlyStipend(e.target.value)}
                    placeholder="$1,600 / mo"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ret-location" className="block text-xs font-medium text-slate-700 mb-1">
                    Location / Work Mode
                  </label>
                  <input
                    id="ret-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Nairobi · Hybrid"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="ret-conversion" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.conversionPath}
                  </label>
                  <input
                    id="ret-conversion"
                    type="text"
                    value={conversionPathway}
                    onChange={(e) => setConversionPathway(e.target.value)}
                    placeholder="Full-Time Offer Track"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ret-skills" className="block text-xs font-medium text-slate-700 mb-1">
                  Key Skills (comma separated)
                </label>
                <input
                  id="ret-skills"
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="ret-desc" className="block text-xs font-medium text-slate-700 mb-1">
                  Trial Scope & Mentorship Support
                </label>
                <textarea
                  id="ret-desc"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project scope, onboarding support, and end-of-trial full-time review."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Publish Returnship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
