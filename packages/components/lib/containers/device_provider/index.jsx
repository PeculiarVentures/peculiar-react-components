import React, { PureComponent } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { getDeviceInfo } from '../../utils/device_info';

/**
 * DeviceProvider component
 */
export default class DeviceProvider extends PureComponent {
  static propTypes = {
    /**
     * This is what will be displayed inside the DeviceProvider
     */
    children: PropTypes.node,
    /**
     * The root where app is rendered
     */
    rootElement: PropTypes.instanceOf(HTMLElement),
  };

  static childContextTypes = {
    device: PropTypes.object,
  };

  static defaultProps = {
    children: null,
    rootElement: undefined,
  };

  state = {
    device: getDeviceInfo(this.props.rootElement),
  };

  getChildContext() {
    return {
      device: this.state.device,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.bindedResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.bindedResize);
  }

  /**
   * onResize window handler
   */
  onResize() {
    this.setState({
      device: getDeviceInfo(this.props.rootElement),
    });
  }

  bindedResize = this.onResize.bind(this);

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return this.props.children;
  }
}
