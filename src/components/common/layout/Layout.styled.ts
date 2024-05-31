import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const LayoutContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(var(--svh, 1svh) * 100);
    background-color: ${theme.colors.background};
    overflow: hidden;

    &::after {
      max-width: 430px;
      /* min-height: 100vh; */
      background-size: cover;
      background-position: center;
      background-image: url("/images/background.webp");
    }
  `}
`;

export const Layout = styled.div`
  max-width: 430px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;
