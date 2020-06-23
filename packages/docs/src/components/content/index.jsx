import React from 'react';
import PropTypes from 'prop-types';
import s from './styles/index.sass';

const Content = (props) => {
  const { children } = props;

  return (
    <div className={s.content_wrapper}>
      {children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node,
};

Content.defaultProps = {
  children: null,
};

export default Content;
