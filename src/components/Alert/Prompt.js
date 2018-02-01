import React from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../../utils';

import { Modal, ModalHeader, ModalContent, ModalFooter, Backdrop, Button } from '../../';

const Prompt = (props) => {
  const {
    buttonText,
    children,
    className,
    description,
    label,
    onClickClose,
    open,
    theme,
    title,
    ...rest
  } = props;

  return (
    <div>
      <Modal {...rest} className={className} label={label} open={open} dialog prompt={theme}>
        <ModalHeader title={title} />
        <ModalContent id={description}>{children}</ModalContent>
        <ModalFooter defaultTheme>
          <Button flavor="neutral" title={buttonText} onClick={onClickClose} />
        </ModalFooter>
      </Modal>
      <Backdrop open={props.open} />
    </div>
  );
};

Prompt.defaultProps = {
  className: null,
  open: false,
  onClickClose: null,
  theme: 'error',
};

Prompt.propTypes = {
  /**
   * prompt close button text
   */
  buttonText: PropTypes.string.isRequired,
  /**
   * prompt content
   */
  children: PropTypes.node.isRequired,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * prompt description
   */
  description: PropTypes.string.isRequired,
  /**
   * prompt label
   */
  label: PropTypes.string.isRequired,
  /**
   * prompt close onClick
   */
  onClickClose: PropTypes.func,
  /**
   * opens the prompt
   */
  open: PropTypes.bool,
  /**
   * slds theme
   */
  theme: PropTypes.oneOf(THEMES),
  /**
   * prompt content
   */
  title: PropTypes.string.isRequired,
};

export default Prompt;
