import { useEffect, useState } from "react";
import MHPage from "./pages/MHPage";
import JEPage from "./pages/JEPage";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

type Page = "LANDING" | "MH" | "JE" | "ADMIN";

function getInitialPage(): Page {
  if (typeof window === "undefined") return "LANDING";
  const hash = window.location.hash.replace("#", "").toUpperCase();
  if (hash === "MH" || hash === "JE" || hash === "ADMIN") return hash as Page;
  return "LANDING";
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  const go = (p: "MH" | "JE") => {
    setPage(p);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${p}`);
    }
  };

  if (page === "LANDING") return <LandingPage onPick={go} />;
  if (page === "ADMIN") return <AdminPage />;
  if (page === "MH") return <MHPage onGoTo={go} />;
  return <JEPage onGoTo={go} />;
}
