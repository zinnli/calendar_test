import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
`;

export const TitleBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 30px;
    margin-bottom: 10px;
    color: ${theme.colors.black};
    ${theme.fonts.headline1}
    border-bottom: 1px  solid ${theme.colors.gray};
  `}
`;

export const MenuBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 5px;
    color: ${theme.colors.black};
    ${theme.fonts.headline1}
    border-bottom: 1px solid ${theme.colors.gray};
    cursor: pointer;
  `}
`;