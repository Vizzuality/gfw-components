import theme from 'styles/theme';
import { css } from '@emotion/core';

export const modalWrapperStyles = css`
  width: 100%;

  ${theme.mediaQueries.medium} {
    width: 650px;
  }

  .modal-content {
    padding-bottom: 20px;

    .c-form-submit {
      margin-top: 30px;
    }
  }
`;
