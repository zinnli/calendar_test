import { Theme, css } from "@emotion/react";

export const archiveModal = (theme: Theme) => css`
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    strong {
      color: ${theme.colors.orange};
    }
  }
`;
