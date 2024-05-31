import { Outlet, useLocation } from "react-router-dom";

import { Header } from "./header";
import * as S from "./Layout.styled";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <S.LayoutContainer>
      {!(pathname === "/404" || pathname === "/loading") && <Header />}
      <Outlet />
    </S.LayoutContainer>
  );
};

export default Layout;
