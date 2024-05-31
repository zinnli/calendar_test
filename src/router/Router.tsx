import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "components";
import * as P from "pages";

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<P.LandingPage />} />
          <Route path="create" element={<P.CreateLuckyDayPage />} />
          <Route path="luckyboard" element={<P.LuckyBoardPage />} />
          <Route path="review" element={<P.ReviewLuckyDayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
