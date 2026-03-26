"use client";

import { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReCaptchaProvider({ children }) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // #region agent log
  useEffect(() => {
    console.log('[DEBUG e2f3ef] ReCaptchaProvider mount', {
      reCaptchaKey: reCaptchaKey ?? 'UNDEFINED',
      keyDefined: !!reCaptchaKey,
      keyLength: reCaptchaKey?.length ?? 0,
      hostname: window.location.hostname,
      hypothesisId: 'A-B',
    });
  }, [reCaptchaKey]);
  // #endregion

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
