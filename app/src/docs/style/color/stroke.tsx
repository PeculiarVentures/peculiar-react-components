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
    </React.Fragment>
  );
}

export default Usage;
