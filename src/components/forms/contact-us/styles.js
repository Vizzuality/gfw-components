import theme from 'styles/theme';
import styled from '@emotion/styled';

export const ContactFormWrapper = styled.div`
  .subtitle {
    margin-bottom: 30px;
  }

  h3 {
    margin-bottom: 5px;
    font-size: 26px;
  }

  p {
    margin-bottom: 20px;
  }

  .input-field {
    max-width: 350px;
  }

  .submit-btn {
    min-width: 180px;
  }

  .feedback-message {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: #fff;
    max-width: 500px;

    h3 {
      margin-bottom: 30px;
      text-transform: none;
      opacity: 1;
    }

    p {
      margin-bottom: 30px;
    }

    .button-group {
      display: flex;
      flex-direction: row;

      .close-button {
        background-color: ${theme.colors.error};
        margin-bottom: 0.625rem;
        margin-left: 0.625rem;

        &:hover {
          background-color: #c4143b;
        }
      }
    }
  }
`;
