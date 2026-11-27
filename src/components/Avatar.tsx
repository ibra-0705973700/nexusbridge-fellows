import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, initials, size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-14 w-14 text-base',
  }[size];

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses} rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-100`}
      />
    );
  }

  return (
    <div
      aria-label={alt}
      className={`${sizeClasses} rounded-xl shrink-0 flex items-center justify-center font-display font-semibold bg-indigo-950 text-white border border-indigo-900 select-none`}
    >
      {initials}
    </div>
  );
}
