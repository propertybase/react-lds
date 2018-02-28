import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ButtonIcon from './ButtonIcon';

const Button = (props) => {
  const {
    children,
    className,
    flavor,
    href,
    icon,
    iconPosition,
    sprite,
    title,
    ...rest
  } = props;

  const sldsClasses = cx(
    'slds-button',
    { [`slds-button_${flavor}`]: !!flavor },
    className,
  );

  const ButtonEl = href ? 'a' : 'button';
  const position = iconPosition || 'left';
  const content = children || title;

  const isShortcut = !!icon && !!sprite;
  const isRightShortcut = isShortcut && position !== 'left';

  return (
    <ButtonEl
      {...rest}
      className={sldsClasses}
      href={href}
      title={title}
    >
      {isRightShortcut ? content : null}
      {isShortcut && (
        <ButtonIcon
          position={position}
          icon={icon}
          sprite={sprite}
        />
      )}
      {!isRightShortcut ? content : null}
    </ButtonEl>
  );
};

Button.defaultProps = {
  children: null,
  className: null,
  flavor: 'neutral',
  href: null,
  icon: null,
  iconPosition: null,
  sprite: null,
  title: null,
};

Button.propTypes = {
  /**
   * Used to set content in advanced use cases
   */
  children: PropTypes.node,
  /**
   * Title attribute. Will be button content if no children are set
   */
  title: PropTypes.string,
  /**
   * Shortcut to render a button with an icon. Used together with `sprite`
   */
  icon: PropTypes.string,
  /**
   * Shortcut to render a button with an icon. Used together with `icon`
   */
  sprite: PropTypes.string,
  /**
   *  Shortcut to render a button with an icon. Can be "left" or "right". Used together with `icon`
   */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * Optional additional className
   */
  className: PropTypes.string,
  /**
   * Can be either `neutral`, `brand`, `destructive`, `success` or `inverse`
   * Default to `neutral`, set to `null` explicitely to render a plain button
   */
  flavor: PropTypes.oneOf([
    'neutral',
    'brand',
    'destructive',
    'success',
    'inverse'
  ]),
  /**
   * Optional href, renders as `a` when set
   */
  href: PropTypes.string,
};

export default Button;
