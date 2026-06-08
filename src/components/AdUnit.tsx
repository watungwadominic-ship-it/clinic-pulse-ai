import React, { useEffect, useState } from 'react';

interface AdUnitProps {
  /**
   * Google AdSense Slot ID. (e.g. "1234567890")
   * If not provided, it default to a generic setup or a friendly notice in development.
   */
  slot?: string;
  /**
   * Ad layout/format. Default is "auto" (fluid layout suitable for responsive structures).
   */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /**
   * Set to "true" for full-width responsiveness. Defaut is "true".
   */
  responsive?: 'true' | 'false';
  /**
   * Custom style properties if needed.
   */
  style?: React.CSSProperties;
  /**
   * Label showing Ad caption.
   */
  label?: string;
}

export default function AdUnit({
  slot = "1868855717",
  format = 'auto',
  responsive = 'true',
  style,
  label = "Sponsored Advertisement"
}: AdUnitProps) {
  const [hasAdBlocker, setHasAdBlocker] = useState(false);
  const isDev = process.env.NODE_ENV !== 'production' || window.location.hostname === 'localhost';
  const client = "ca-pub-2111166324364557"; // Saved from index.html

  useEffect(() => {
    // Check if script did not load or is blocked
    const testAdSenseScript = () => {
      if (!window.hasOwnProperty('adsbygoogle')) {
        // Simple heuristic indicating script might be blocked or not loaded yet
        setHasAdBlocker(true);
      }
    };

    // Delay check slightly to allow script load time.
    const timer = setTimeout(testAdSenseScript, 2000);

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn("Google AdSense push caught warning:", error);
    }

    return () => clearTimeout(timer);
  }, [slot]);

  // If in local development, show a beautiful visual placeholder so the design isn't empty, 
  // and show the user what slot is currently active.
  if (isDev) {
    return (
      <div 
        className="my-8 mx-auto w-full max-w-4xl p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center space-y-2 group transition-all duration-300 hover:border-white/20 select-none"
        style={style}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block">
          {label} (Dev Placeholder)
        </span>
        <div className="py-8 space-y-1">
          <p className="text-sm font-semibold text-slate-400">
            AdSense Ad Unit active
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Client: <span className="text-slate-500">{client}</span> | Slot: <span className="text-slate-500">{slot || "Auto / Responsive"}</span>
          </p>
        </div>
        <p className="text-[11px] text-slate-600">
          This slot will populate automatically in production when loaded on Google approved domains.
        </p>
      </div>
    );
  }

  // Active production code path
  return (
    <div className="my-8 mx-auto w-full max-w-4xl overflow-hidden text-center" style={style}>
      {label && (
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 block mb-2 select-none">
          {label}
        </span>
      )}
      
      {hasAdBlocker ? (
        <div className="py-2 px-4 rounded-xl bg-white/[0.01] border border-white/5 text-slate-600 text-xs inline-block">
          Support ClinicPulse AI by disabling your AdBlocker for detailed ROI calculator insights.
        </div>
      ) : (
        <div className="flex justify-center bg-transparent">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', minHeight: '90px', ...style }}
            data-ad-client={client}
            {...(slot ? { 'data-ad-slot': slot } : {})}
            data-ad-format={format}
            data-full-width-responsive={responsive}
          />
        </div>
      )}
    </div>
  );
}
