import React from 'react';
import { Grid, MediaObject, Icon } from '../../index';
import { prefixClasses } from '../../utils';

const Card = (props, { cssPrefix }) => {
  const {
    body,
    className,
    footer,
    header,
    headerRight,
    icon,
    sprite,
    ...rest,
  } = props;
  const prefix = (classes, passThrough) => prefixClasses(cssPrefix, classes, passThrough);

  return (
    <div {...rest} className={prefix('card', className)}>
      <Grid className={prefix('card__header')}>
        <MediaObject
          center
          className={prefix('has-flexi-truncate')}
          figureLeft={<Icon sprite={sprite} icon={icon} size="small" />}
        >
          <a className={prefix('text-link--reset')}>
            <span className={prefix('text-heading--small')}>{header}</span>
          </a>
        </MediaObject>
        <div className={prefix('no-flex')}>{headerRight}</div>
      </Grid>
      <div className={prefix(['card__body', 'text-align--center'])}>{body}</div>
      <div className={prefix(['card__footer'])}>{footer}</div>
    </div>
  );
};

Card.contextTypes = {
  /**
   * the css prefix
   */
  cssPrefix: React.PropTypes.string,
};

Card.propTypes = {
  /**
   * card body, could be a table for example
   */
  body: React.PropTypes.node,
  /**
   * class name
   */
  className: React.PropTypes.string,
  /**
   * footer in the bottom right corner
   */
  footer: React.PropTypes.node,
  /**
   * card header
   */
  header: React.PropTypes.string.isRequired,
  /**
   * top right corner of the card, can be used for a Button for example
   */
  headerRight: React.PropTypes.node,
  /**
   * icon name
   */
  icon: React.PropTypes.string.isRequired,
  /**
   * icon sprite name
   */
  sprite: React.PropTypes.string.isRequired,
};

export default Card;
