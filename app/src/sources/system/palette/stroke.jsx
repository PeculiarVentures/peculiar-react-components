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
            'fill_white',
            [`stroke_${c}`],
            s.color_item,
          )}
        >
          <Typography
            className={s.color_name}
            align="center"
            color="black"
          >
            {c}
          </Typography>
        </div>
      ))}
    </Fragment>
  );
}
