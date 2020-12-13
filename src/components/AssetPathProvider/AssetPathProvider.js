import { Component, Children } from 'react';
import PropTypes from 'prop-types';

// TODO: Migrate to new Context API with next major version bump
class AssetPathProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
  }

  static childContextTypes = {
    assetBasePath: PropTypes.string.isRequired,
  }

  getChildContext() {
    const { path } = this.props;
    return { assetBasePath: path };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

export default AssetPathProvider;
