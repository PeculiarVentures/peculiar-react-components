import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { validator, Typography } from 'lib-react-components';
import classNames from 'classnames';
import publicPath from '../../utils/get_build_path';
import packageJson from '../../../../package.json';
import s from './styles/index.sass';

export default function Sidebar(props) {
  const { pages } = props;

  function renderLink(pathname, text, _props) {
    const { activeClassName, ...other } = _props;

    if (!pathname) {
      return (
        <div {...other}>
          {text}
        </div>
      );
    }

    if (validator(pathname, ['url'])) {
      return (
        <a
          href={pathname}
          {...other}
        >
          {text}
        </a>
      );
    }

    return (
      <NavLink
        to={`${publicPath}${pathname}`}
        href={`${publicPath}${pathname}`}
        exact
        {..._props}
      >
        {text}
      </NavLink>
    );
  }

  return (
    <div
      className={classNames(
        s.sidebar_wrapper,
        'fill_light_grey',
      )}
    >
      <div className={s.logo_container}>
        <NavLink
          to={`${publicPath}/`}
          className={classNames(
            s.logo,
            'text_success',
          )}
          activeClassName={s.logo_active}
          exact
        >
          Alternative UI
        </NavLink>
        <Typography
          type="c1"
          style={{
            marginTop: 6,
          }}
        >
          v{packageJson.version}
        </Typography>
      </div>

      <div className={s.menu}>
        {pages.map(g => (
          <Fragment key={g.title}>
            {renderLink(g.pathname, g.title, {
              className: classNames(
                'b1',
                'text_black',
                s.menu_item_group,
              ),
              activeClassName: s.menu_item_active,
            })}
            <ul>
              {g.children && g.children.map(p => (
                <li key={p.pathname}>
                  {renderLink(p.pathname, p.title, {
                    className: classNames(
                      'b1',
                      'text_black',
                      s.menu_item,
                    ),
                    activeClassName: s.menu_item_active,
                  })}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.object),
};

Sidebar.defaultProps = {
  pages: [],
};
