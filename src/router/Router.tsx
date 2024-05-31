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
          <Route index element={<P.LandingPage />} />
          <Route path="oauth2/kakao/callback" element={<P.Auth />} />
          <Route path="profile" element={<P.Profile />} />
          <Route path="mypage" element={<P.MyPage />} />
          <Route path="mypage/edit" element={<P.EditProfilePage />} />
          <Route path="luckyboard" element={<P.LuckyBoardPage />} />
          <Route path="create" element={<P.CreateLuckyDayPage />} />
          <Route path="luckydays/:id" element={<P.ViewLuckyActivityPage />} />
          <Route path="luckydays/list" element={<P.LuckyDayCycleListPage />} />
          <Route
            path="luckydays/list/:id"
            element={<P.LuckyDayCycleDetailPage />}
          />
          <Route
            path="/luckydays/create/:id"
            element={<P.ReviewLuckyDayPage />}
          />
          <Route
            path="/luckydays/review/:id"
            element={<P.ViewLuckyDayPage />}
          />
        </Route>
        <Route path="loading" element={<P.LoadingPage />} />
        <Route path="404" element={<P.Error404Page />} />
        <Route path="*" element={<P.Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}
