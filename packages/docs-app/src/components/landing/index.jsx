import React from 'react';
import PropTypes from 'prop-types';
import ItemPlate from '../item_plate';
import s from './styles/index.sass';

const Landing = ({ pages }) => (
  <div className={s.landing_wrapper}>
    {pages.map(p => (
      <div
        key={p.pathname}
        className={s.item}
      >
        <ItemPlate
          to={p.pathname}
          name={p.title}
        />
      </div>
    ))}
  </div>
);

Landing.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
};

Landing.defaultProps = {
  pages: [],
};

export default Landing;
