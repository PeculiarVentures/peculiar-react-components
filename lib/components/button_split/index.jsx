import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonGroup from '../button_group';
import Button from '../button';
import Tooltip from '../tooltip';

/**
 * ButtonSplit component
 */
export default class ButtonSplit {
  static propTypes = {
    /**
     * This is what will be displayed inside the tooltip element.
     */
    children: PropTypes.node.isRequired,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, children, ...other } = this.props;

    return (
      <div
        data-component="button_split"
        className={classnames('button-split', className)}
        {...other}
      >
        <ButtonGroup>
          <Button>Button text</Button>
          <Tooltip
            action="click"
            content={
              <div>
                {children}
              </div>
            }
            color="grey"
          >
            <Button>Icon</Button>
          </Tooltip>
        </ButtonGroup>
      </div>
    );
  }
}
