import * as React from 'react';
import PropTypes from 'prop-types';
import icons from './raw_countries_icons';

/**
 * CountryIcon component.
 */
const CountryIcon = (props) => {
  const { code, ...other } = props;
  const icon = icons[code];

  if (!icon) {
    return null;
  }

  return (
    <svg
      {...other}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icon[0]}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: icon[1] }}
    />
  );
};

CountryIcon.propTypes = {
  code: PropTypes.string.isRequired,
};

export default CountryIcon;
