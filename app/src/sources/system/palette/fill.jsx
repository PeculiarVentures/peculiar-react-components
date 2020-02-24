import React, { Fragment } from 'react';
import { Typography } from 'lib-react-components';
import classNames from 'classnames';
import colors from './colors.json';
import s from './index.sass';

export default function Usage() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
