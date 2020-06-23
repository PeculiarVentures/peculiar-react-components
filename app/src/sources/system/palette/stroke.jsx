import React, { Fragment } from 'react';
import { Typography, Box } from 'lib-react-components';
import classNames from 'classnames';
import colors from './colors.json';
import s from './index.sass';

export default function Usage() {
  return (
    <Fragment>
      {colors.map(c => (
        <Box
          key={c}
          stroke={c}
          fill="white"
          className={classNames(
            'shadow',
            'round_small',
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
        </Box>
      ))}
    </Fragment>
  );
}
