import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Grid, Icon, MediaObject } from '../../';

const Card = (props) => {
  const {
    body,
    className,
    footer,
    headerRight,
    icon,
    sprite,
    title,
    ...rest,
  } = props;

  const sldsClasses = [
    'slds-card',
    className
  ];

  return (
    <div {...rest} className={cx(sldsClasses)}>
      <Grid className="slds-card__header">
        <MediaObject
          customTag="header"
          center
          className="slds-has-flexi-truncate"
          figureLeft={<Icon sprite={sprite} icon={icon} size="small" />}
          truncate
        >
          <h2>
            <a className="slds-text-link--reset">
              <span className="slds-text-heading--small">{title}</span>
            </a>
          </h2>
        </MediaObject>
        <div className="slds-no-flex">{headerRight}</div>
      </Grid>
      <div className="slds-card__body slds-text-align--center">{body}</div>
      <div className="slds-card__footer">{footer}</div>
    </div>
  );
};

Card.defaultProps = {
  body: null,
  className: null,
  footer: null,
  headerRight: null,
};

Card.propTypes = {
  /**
   * card body, could be a table for example
   */
  body: PropTypes.node,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * footer in the bottom right corner
   */
  footer: PropTypes.node,
  /**
   * card header
   */
  title: PropTypes.string.isRequired,
  /**
   * top right corner of the card, can be used for a Button for example
   */
  headerRight: PropTypes.node,
  /**
   * icon name
   */
  icon: PropTypes.string.isRequired,
  /**
   * icon sprite name
   */
  sprite: PropTypes.string.isRequired,
};

export default Card;
