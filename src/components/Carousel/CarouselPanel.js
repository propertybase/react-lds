import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CarouselPanel = (props) => {
  const {
    active,
    backgroundStyle,
    children,
    className,
    id,
    imageUrl,
    onKeyboardInteraction,
    title,
    ...rest
  } = props;

  const sldsClasses = [
    'slds-carousel__panel',
    className,
  ];

  const tabIndex = active ? 0 : -1;

  const renderedImage = backgroundStyle
    ? (
      <div
        alt={title}
        className="slds-carousel__image"
        style={{
          ...backgroundStyle,
          backgroundImage: `url('${imageUrl}')`,
        }}
      />
    )
    : (
      <div className="slds-carousel__image">
        <img src={imageUrl} alt={title} />
      </div>
    );

  return (
    <div
      {...rest}
      className={cx(sldsClasses)}
      id={id}
      role="tabpanel"
      aria-hidden={active}
      aria-labelledby={`${id}-indicator`}
    >
      <a
        className="slds-carousel__panel-action slds-text-link_reset"
        onKeyDown={onKeyboardInteraction}
        tabIndex={tabIndex}
      >
        {renderedImage}
        <div className="slds-carousel__content">
          <h2 className="slds-carousel__content-title">{title}</h2>
          <p>{children}</p>
        </div>
      </a>
    </div>
  );
};

CarouselPanel.defaultProps = {
  active: false,
  backgroundStyle: null,
  children: [],
  className: null,
  onKeyboardInteraction: null,
};

CarouselPanel.propTypes = {
  /**
   * indicates whether the panel is currently active
   */
  active: PropTypes.bool,

  /**
   * renders the image as background image and adds the given style
   */
  backgroundStyle: PropTypes.object,

  /**
   * list of carousel panels
   */
  children: PropTypes.node,

  /**
   * class name
   */
  className: PropTypes.string,

  /**
   * unique panel id
   */
  id: PropTypes.string.isRequired,

  /**
   * url for the panel image
   */
  imageUrl: PropTypes.string.isRequired,

  /**
   * Callback for keyboard interaction on an active panel.
   */
  onKeyboardInteraction: PropTypes.func,

  /**
   * title text
   */
  title: PropTypes.string.isRequired,
};

export default CarouselPanel;
