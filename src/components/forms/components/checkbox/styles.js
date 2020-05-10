import theme from 'styles/theme';
import styled from '@emotion/styled';

export const CheckboxWrapper = styled.div`
  .checkbox-option {
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0 20px;

    label {
      cursor: pointer;
      padding-left: 10px;
    }
  }

  input[type='checkbox'] {
    position: relative;
    width: 25px;
    height: 25px;
    min-width: 25px;
    border: 1px solid ${theme.colors.border};
    appearance: none;
    color: ${theme.colors.green};
    cursor: pointer;
    border-radius: 4px;

    &::-ms-check {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }

  input[type='checkbox']::before {
    content: '✔';
    position: absolute;
    left: 5px;
    top: 2px;
    visibility: hidden;
    font-size: 16px;
  }

  input[type='checkbox']:checked::before {
    visibility: visible;
  }

  input[type='checkbox']:disabled {
    border-color: black;
    background: #ddd;
    color: gray;
  }
`;
