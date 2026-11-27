import { TranslationStrings } from '../i18n';

interface FooterProps {
  t: TranslationStrings;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display font-semibold text-slate-800">{t.brandName}</span>
          <span aria-hidden="true">·</span>
          <span>{t.footerText}</span>
        </div>
        <div className="text-slate-600">{t.sdgFocus}</div>
      </div>
    </footer>
  );
}
