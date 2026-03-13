"use client";
import { useEffect, useState } from "react";

const DESKTOP_BREAKPOINT = 768;
const DESKTOP_AD = {
  width: 1100,
  height: 260,
  label: "desktop",
};
const MOBILE_AD = {
  width: 320,
  height: 320,
  label: "mobile",
};

export default function AdsterraBanner() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const ad = isDesktop ? DESKTOP_AD : MOBILE_AD;

  return (
    <div className="-my-3 md:-my-4 flex justify-center">
      <iframe
        key={ad.label}
        src={`/ads/adsterra_native_banner.html`}
        title="Sponsored content"
        width={ad.width}
        height={ad.height}
        scrolling="no"
        loading="lazy"
        className="max-w-full overflow-hidden border-0"
        style={{
          width: `${ad.width}px`,
          height: `${ad.height}px`,
        }}
      />
    </div>
  );
}
