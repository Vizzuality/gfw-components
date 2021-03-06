import styled from '@emotion/styled';
import theme from 'styles/theme';

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  .selector {
    appearance: none;
    border-radius: 4px;
    background-color: transparent;
    border: solid 1px ${theme.colors.lightGrey};
    outline: none;
    color: ${theme.colors.darkGrey};
    width: 100%;
    height: 40px;
    padding: 0 32px 0 12px;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
    z-index: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.multiple {
      height: 100px;
      padding: 0;

      option {
        padding: 5px 12px;
      }
    }

    &.placeholder {
      color: #a8a8a8;
    }

    &::-ms-expand {
      display: none;
    }
  }

  .arrow-icon {
    width: 10px;
    height: 10px;
    position: absolute;
    top: calc(50% - 4px);
    right: 15px;
    z-index: 1;
  }

  .select-input {
    margin-top: 5px;
    margin-left: 25px;
    width: calc(100% - 25px);
    max-width: 325px;
  }
`;
