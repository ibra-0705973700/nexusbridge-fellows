import { FormEvent, useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Trash2, UserPlus } from 'lucide-react';
import { TranslationStrings } from '../i18n';
import { BookedSession, MentorProfile, MilestoneItem } from '../types';
import { Avatar } from './Avatar';

interface MentorTrackerTabProps {
  mentors: MentorProfile[];
  pairedMentorId: string;
  onPairMentor: (mentorId: string) => void;
  sessions: BookedSession[];
  onBookSession: (session: BookedSession) => void;
  onToggleSessionComplete: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  milestones: MilestoneItem[];
  onToggleMilestone: (milestoneId: string) => void;
  t: TranslationStrings;
}

export function MentorTrackerTab({
  mentors,
  pairedMentorId,
  onPairMentor,
  sessions,
  onBookSession,
  onToggleSessionComplete,
  onDeleteSession,
  milestones,
  onToggleMilestone,
  t,
}: MentorTrackerTabProps) {
  const pairedMentor = mentors.find((m) => m.id === pairedMentorId) || mentors[0];

  const [sessionDate, setSessionDate] = useState('2026-12-03');
  const [timeSlot, setTimeSlot] = useState(pairedMentor.availabilitySlots[0] || 'Tue 10:00 EAT');
  const [topic, setTopic] = useState('Host-market CV translation & mock technical interview');
  const [bookingFeedback, setBookingFeedback] = useState('');

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const milestoneRatio = milestones.length > 0 ? completedMilestones / milestones.length : 0;
  // Readiness combines milestone completion (80% weight) + paired mentor (10%) + at least 1 booked session (10%)
  const readinessPercent = Math.min(
    100,
    Math.round(milestoneRatio * 80 + (pairedMentor ? 10 : 0) + (sessions.length > 0 ? 10 : 0))
  );

  const handleBookSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sessionDate || !timeSlot.trim() || !topic.trim()) return;

    const newSession: BookedSession = {
      id: `sess-${Date.now()}`,
      mentorId: pairedMentor.id,
      mentorName: pairedMentor.fullName,
      date: sessionDate,
      timeSlot,
      topic: topic.trim(),
      status: 'Scheduled',
    };

    onBookSession(newSession);
    setBookingFeedback(`1-on-1 booked with ${pairedMentor.fullName} on ${sessionDate}.`);
    setTimeout(() => setBookingFeedback(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Live Readiness Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight">
              {t.mentorshipTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {t.mentorshipSubtitle}
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <div className="text-xs font-medium text-slate-500">{t.readinessProgress}</div>
            <div className="font-mono tabular-nums text-3xl font-bold text-indigo-900">
              {readinessPercent}%
            </div>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="space-y-2">
          <div
            role="progressbar"
            aria-valuenow={readinessPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.readinessProgress}
            className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200"
          >
            <div
              className="h-full bg-indigo-900 transition-transform duration-300 origin-left"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              <strong className="font-mono tabular-nums text-slate-800">
                {completedMilestones}/{milestones.length}
              </strong>{' '}
              milestones verified
            </span>
            <span>
              Paired with <strong className="text-slate-800">{pairedMentor.fullName}</strong> ·{' '}
              <strong className="font-mono tabular-nums text-slate-800">{sessions.length}</strong>{' '}
              session(s) scheduled
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace: Left = Mentors & Booking | Right = Milestones & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Paired Mentor + Book 1-on-1 + Mentor Directory */}
        <div className="lg:col-span-7 space-y-6">
          {/* Paired Mentor & 1-on-1 Session Booking */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3.5">
                <Avatar
                  src={pairedMentor.avatarUrl}
                  alt={pairedMentor.fullName}
                  initials={pairedMentor.initials}
                  size="lg"
                />
                <div>
                  <div className="text-xs font-medium text-orange-600">{t.pairedMentor}</div>
                  <h2 className="font-display font-bold text-lg text-slate-950">
                    {pairedMentor.fullName}
                  </h2>
                  <p className="text-sm text-slate-700">
                    {pairedMentor.title} · {pairedMentor.organization}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {pairedMentor.domain} · {pairedMentor.hostCountry} ·{' '}
                    {pairedMentor.yearsExperience} yrs exp · {pairedMentor.languages.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <h3 className="font-display font-semibold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-700" aria-hidden="true" />
                <span>{t.bookSession}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="session-date" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.sessionDate}
                  </label>
                  <input
                    id="session-date"
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label htmlFor="session-slot" className="block text-xs font-medium text-slate-700 mb-1">
                    {t.sessionTime}
                  </label>
                  <select
                    id="session-slot"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    {pairedMentor.availabilitySlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="session-topic" className="block text-xs font-medium text-slate-700 mb-1">
                  {t.sessionTopic}
                </label>
                <input
                  id="session-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Portfolio review, local hiring etiquette, warm referrals"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                >
                  {t.confirmBooking}
                </button>
                {bookingFeedback && (
                  <span className="text-xs font-medium text-emerald-700">{bookingFeedback}</span>
                )}
              </div>
            </form>
          </section>

          {/* Switch / Pair Industry Mentor Directory */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-display font-semibold text-base text-slate-950">
              {t.selectMentor}
            </h2>
            <div className="divide-y divide-slate-100">
              {mentors.map((mentor) => {
                const isPaired = mentor.id === pairedMentor.id;
                return (
                  <div
                    key={mentor.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={mentor.avatarUrl}
                        alt={mentor.fullName}
                        initials={mentor.initials}
                        size="sm"
                      />
                      <div>
                        <div className="font-display font-semibold text-sm text-slate-900">
                          {mentor.fullName}
                        </div>
                        <div className="text-xs text-slate-600">
                          {mentor.title} · {mentor.organization}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {mentor.domain} · {mentor.focusAreas.slice(0, 2).join(' · ')}
                        </div>
                      </div>
                    </div>

                    {isPaired ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 rounded-lg self-start sm:self-center whitespace-nowrap">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.currentlyPaired}</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onPairMentor(mentor.id);
                          setTimeSlot(mentor.availabilitySlots[0] || 'Tue 10:00 EAT');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-indigo-900 hover:text-white border border-slate-200 rounded-lg transition-colors self-start sm:self-center whitespace-nowrap cursor-pointer"
                      >
                        <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.pairWithMentor}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Fellowship Milestones + Booked Sessions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Milestones Checklist */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-base text-slate-950">
                {t.milestonesTitle}
              </h2>
              <span className="font-mono tabular-nums text-xs font-semibold text-indigo-900">
                {completedMilestones}/{milestones.length}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {milestones.map((ms) => (
                <button
                  key={ms.id}
                  type="button"
                  onClick={() => onToggleMilestone(ms.id)}
                  className="w-full py-3 first:pt-1 last:pb-1 flex items-start gap-3 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
                >
                  {ms.completed ? (
                    <CheckCircle2
                      className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-0.5 transition-colors"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-sm font-medium leading-snug ${
                        ms.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                      }`}
                    >
                      {ms.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {ms.category} · {ms.estimatedTime}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Booked 1-on-1 Sessions List */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-display font-semibold text-base text-slate-950">
              {t.upcomingSessions}
            </h2>

            {sessions.length === 0 ? (
              <p className="text-sm text-slate-500 leading-relaxed">{t.noSessions}</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {sessions.map((sess) => (
                  <div key={sess.id} className="py-3 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{sess.topic}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          <span className="font-mono tabular-nums">{sess.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{sess.timeSlot}</span>
                        </div>
                        <div className="text-xs text-indigo-800 mt-0.5">
                          with {sess.mentorName}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => onToggleSessionComplete(sess.id)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                            sess.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {sess.status === 'Completed' ? 'Completed' : 'Mark Done'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSession(sess.id)}
                          aria-label="Cancel session"
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
