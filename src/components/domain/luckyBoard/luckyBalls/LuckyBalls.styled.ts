import styled from "@emotion/styled";
import { Theme, css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -55px;
`;

export const RowBox = styled.div`
  display: flex;
`;

export const LuckyBallFace = styled.div<{ imageUrl: string }>`
  width: 80px;
  height: 80px;
  margin: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
  cursor: default;

  @media (max-width: 412px) {
    width: 80px;
    height: 80px;
    margin: 8px;
  }

  @media (max-width: 405px) {
    width: 80px;
    height: 80px;
    margin: 8px;
  }

  @media (max-width: 375px) {
    width: 70px;
    height: 70px;
    margin: 6px;
  }
`;

export const svgFrame = (theme: Theme) => css`
  svg {
    width: 100px;
    height: 100px;
    margin: 10px;
    cursor: pointer;
    pointer-events: auto;
    ${theme.fonts.luckyBall2}

    @media (max-width: 412px) {
      width: 95px;
      height: 95px;
      margin: 8px;
    }

    @media (max-width: 405px) {
      width: 90px;
      height: 90px;
      margin: 8px;
    }

    @media (max-width: 375px) {
      width: 80px;
      height: 80px;
      margin: 6px;
    }
  }
`;

export const LuckyBall_unknown = (theme: Theme) => css`
  ${svgFrame(theme)}
  path {
    fill: ${theme.colors.lightOrange};
  }
`;

export const LuckyBall_D3 = (theme: Theme) => css`
  ${svgFrame(theme)}
  path {
    fill: ${theme.colors.orange};
  }
`;

export const LuckyBall_D2 = (theme: Theme) => css`
  ${svgFrame(theme)}
  path {
    fill: ${theme.colors.orange};
  }
`;

export const LuckyBall_D1 = (theme: Theme) => css`
  ${svgFrame(theme)}
  path {
    fill: ${theme.colors.orange};
  }
`;

export const LuckyBall_Dday = (theme: Theme) => css`
  ${svgFrame(theme)}
  path {
    fill: ${theme.colors.purple};
  }
`;
