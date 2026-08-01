    "use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/70 text-sm text-center sm:text-left">
          Usamos ferramentas de análise para entender como você usa nosso site
          e melhorar sua experiência. Nenhum dado pessoal identificável é
          coletado.{" "}
          <a href="/politica-de-privacidade" className="underline hover:text-white">
            Saiba mais
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handleConsent("declined")}
            className="text-white/60 text-sm px-4 py-2 rounded-full border border-white/20 hover:text-white hover:border-white/40 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="text-sm px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/30 hover:border-indigo-400 transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}