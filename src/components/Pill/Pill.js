import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { IconButton } from '../../';

const Pill = (props) => {
  const {
    bare,
    className,
    icon,
    label,
    onClose,
    portrait,
    title,
    url,
    ...rest
  } = props;

  const isLinked = !!url;
  const LabelElement = isLinked ? 'a' : 'span';

  const sldsClasses = [
    'slds-pill',
    { 'slds-pill_bare': bare },
    className
  ];

  const closeButton = onClose === null ? null : (
    <IconButton
      onClick={onClose}
      className="slds-pill__remove"
      sprite="utility"
      icon="close"
      title="Remove"
    />
  );

  return (
    <span {...rest} className={cx(sldsClasses)}>
      {icon && <span className="slds-pill__icon_container">{icon}</span>}
      {portrait && <span className="slds-pill__icon_container">{portrait}</span>}
      <LabelElement href={isLinked ? url : null} className="slds-pill__label" title={title}>
        {label}
      </LabelElement>
      {closeButton}
    </span>
  );
};

Pill.defaultProps = {
  className: null,
  icon: null,
  onClose: null,
  portrait: null,
  url: null,
  bare: false,
};

Pill.propTypes = {
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * optional Icon that receives '.pill__icon_container' class
   */
  icon: PropTypes.node,
  /**
   * content of the pill label
   */
  label: PropTypes.string.isRequired,
  /**
   * onClose handler for the pill, if left out, Pill doesn't have close button
   */
  onClose: PropTypes.func,
  /**
   * optional image that receives '.pill__icon' class
   */
  portrait: PropTypes.node,
  /**
   * title of the pill label
   */
  title: PropTypes.string.isRequired,
  /**
   * optional url for the link label
   */
  url: PropTypes.string,
  /**
   * bare flavor
   */
  bare: PropTypes.bool,
};

export default Pill;
