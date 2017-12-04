import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Modal = (props) => {
  const {
    children,
    className,
    descriptionId,
    dialog,
    label,
    large,
    open,
    prompt,
    ...rest
  } = props;

  const isOpen = !!open;
  const isDialog = !!dialog || !!prompt;
  const role = prompt ? 'alertdialog' : 'dialog';
  const containerRole = isDialog ? 'document' : null;

  const childrenWithProps = [...children].map((child) => {
    const childName = child ? child.type.displayName || child.type.name : null;

    if (childName === 'ModalHeader') {
      return React.cloneElement(child, {
        key: label,
        label,
        prompt,
        uncloseable: child.props.uncloseable !== undefined ? child.props.uncloseable : !!prompt,
      });
    }

    return child;
  });

  const sldsClasses = [
    'slds-modal',
    { 'slds-modal_prompt': !!prompt },
    { 'slds-fade-in-open': isOpen },
    { 'slds-modal_large': !!large },
    className,
  ];

  return (
    <div
      {...rest}
      className={cx(sldsClasses)}
      role={role}
      aria-describedby={descriptionId}
      aria-hidden={!isOpen}
      aria-labelledby={label}
    >
      <div
        className="slds-modal__container"
        role={containerRole}
        tabIndex={isDialog ? '0' : null}
      >
        {childrenWithProps}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  className: null,
  descriptionId: null,
  dialog: false,
  label: null,
  large: false,
  open: false,
  prompt: false,
};

Modal.propTypes = {
  /**
   * modal content
   */
  children: PropTypes.node.isRequired,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * id of the modal-content (required as aria-describedby). must be set for prompts.
   */
  descriptionId: PropTypes.string,
  /**
   * whether a container is a dialog (optional when `<Modal prompt>`). Needed for PromptForTouch and ModalPrompt
   */
  dialog: PropTypes.bool,
  /**
   * id of the modal-heading
   */
  label: PropTypes.string,
  /**
   * large flavor
   */
  large: PropTypes.bool,
  /**
   * opens the modal
   */
  open: PropTypes.bool,
  /**
   * modal is a prompt
   */
  prompt: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Modal;
