/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import uniqueId from 'lodash/uniqueId';

import { composeValidators } from 'components/forms/validations';

import FieldWrapper from 'components/forms/components/field-wrapper';

import { CheckboxWrapper } from './styles';

class Checkbox extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    hidden: PropTypes.bool,
    validate: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
  };

  render() {
    const { name, label, validate, options, hidden, required } = this.props;

    return (
      <Field
        name={name}
        validate={composeValidators(required, validate)}
        component="input"
        type="checkbox"
      >
        {({ meta }) => (
          <FieldWrapper
            label={label}
            name={name}
            {...meta}
            hidden={hidden}
            required={required}
          >
            <CheckboxWrapper>
              {options &&
                options.map((option) => {
                  const id = uniqueId(`checkbox-${option.value}-`);
                  return (
                    <div key={option.value} className="checkbox-option">
                      <Field
                        name={name}
                        id={id}
                        component="input"
                        type="checkbox"
                        value={option.value}
                      >
                        {({ input }) => (
                          <>
                            <div className="checkbox-wrapper">
                              <input {...input} id={id} />
                              {input.checked && <span />}
                            </div>
                            <label className="checkbox-label" htmlFor={id}>
                              {option.label}
                            </label>
                          </>
                        )}
                      </Field>
                    </div>
                  );
                })}
            </CheckboxWrapper>
          </FieldWrapper>
        )}
      </Field>
    );
  }
}

export default Checkbox;
