import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from 'assets/icons/close.svg';

import { PillWrapper } from './styles';

const Pill = (props) => {
  const { className, label, onRemove, onClick, active } = props;

  return (
    <PillWrapper
      className={className}
      onClick={onClick}
      removable={onRemove}
      active={active}
      role="button"
      tabIndex={onClick ? 0 : ''}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove}>
          <CloseIcon />
        </button>
      )}
    </PillWrapper>
  );
};

Pill.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Pill;