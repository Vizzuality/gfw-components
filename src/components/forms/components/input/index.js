import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { composeValidators } from 'components/forms/validations';
import InputComponent from 'components/html/input';

import FieldWrapper from 'components/forms/components/field-wrapper';

class Input extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    hidden: PropTypes.bool,
    validate: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    collapse: PropTypes.bool,
    infoClick: PropTypes.func,
  };

  render() {
    const {
      name,
      label,
      validate,
      type,
      placeholder,
      hidden,
      required,
      infoClick,
      collapse,
    } = this.props;

    return (
      <Field
        name={name}
        validate={composeValidators(required, validate)}
        type={type}
      >
        {({ input, meta }) => (
          <FieldWrapper
            label={label}
            name={name}
            {...meta}
            hidden={hidden}
            required={required}
            infoClick={infoClick}
            collapse={collapse}
            value={input.value}
          >
            <InputComponent {...input} type={type} placeholder={placeholder} />
          </FieldWrapper>
        )}
      </Field>
    );
  }
}

export default Input;
