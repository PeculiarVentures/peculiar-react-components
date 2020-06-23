import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './styles/index.sass';

const ItemPlate = (props) => {
  const {
    name,
    icon,
    to,
  } = props;

  return (
    <Link
      className={s.plate}
      href={to}
      to={to}
    >
      <div className={s.plate_text}>
        {name}
      </div>
      <div className={s.plate_icon}>
        {icon}
      </div>
    </Link>
  );
};

ItemPlate.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.node,
  to: PropTypes.string,
};

ItemPlate.defaultProps = {
  name: '',
  icon: null,
  to: '',
};

export default ItemPlate;
