import * as React from 'react';
import { Typography } from 'lib-react-components';
import classNames from 'classnames';
import colors from './colors.json';
import * as s from './styles/index.sass';

const Usage: React.SFC = () => {
  return (
    <React.Fragment>
      {colors.map(c => (
        <div
          key={c}
          className={classNames(
            'shadow',
            'round_small',
            [`fill_${c}`],
            s.color_item,
          )}
        >
          <Typography
            className={s.color_name}
            align="center"
            color={classNames(
              {
                white: c !== 'white' && c !== 'grey' && c !== 'light_grey',
                black: c === 'white' || c === 'grey' || c === 'light_grey',
              },
            )}
          >
            {c}
          </Typography>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Usage;
