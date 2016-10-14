import React from 'react';

import { getUniqueHash, prefixClasses } from '../../utils';

const FormElementError = (props, { cssPrefix }) => {
  const { className, error, id, ...rest } = props;
  const prefix = (classes, passThrough) => prefixClasses(cssPrefix, classes, passThrough);

  const renderError = () => {
    if (error) {
      return (
        <div
          {...rest}
          id={getUniqueHash(error, id)}
          className={prefix('form-element__help', className)}
        >
          {error}
        </div>
      );
    }

    return null;
  };

  return renderError();
};

FormElementError.contextTypes = { cssPrefix: React.PropTypes.string };

FormElementError.propTypes = {
  /**
   * element triggered on the containing form element
   */
  error: React.PropTypes.string,
  /**
   * id of the parent component carrying the error
   */
  id: React.PropTypes.string.isRequired,
};

export default FormElementError;
