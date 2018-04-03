import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import ControlledMenu from './ControlledMenu';

// https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#is-it-safe
const propTypes = {
  /**
   * The button that triggers the dropdown menu
   */
  button: PropTypes.element.isRequired,
  /**
   * menu should start open
   */
  defaultOpen: PropTypes.bool,
};

class Menu extends Component {
  static propTypes = propTypes

  static defaultProps = {
    defaultOpen: false,
  }

  constructor(props) {
    super(props);
    this.state = { open: this.props.defaultOpen };
  }

  getButton = () => {
    const { button } = this.props;
    return React.cloneElement(button, { onClick: this.toggle });
  }

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const rest = omit(this.props, ['button', 'defaultOpen']);
    return (
      <ControlledMenu
        {...rest}
        button={this.getButton()}
        isOpen={open}
      />
    );
  }
}

export default Menu;
