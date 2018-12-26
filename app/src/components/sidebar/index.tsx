import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from 'lib-react-components';
import classNames from 'classnames';
import packageJson from '../../../../package.json';
import * as s from './styles/index.sass';

interface ISidebarProps {
  pages: any[];
}

const Sidebar: React.SFC<ISidebarProps> = (props) => {
  const { pages } = props;

  function renderLink(pathname: string, text: string, _props: any) {
    const { activeClassName, ...other } = _props;

    if (!pathname) {
      return (
        <div {...other}>
          {text}
        </div>
      );
    }

    // if (validator(pathname, ['url'])) {
    //   return (
    //     <a
    //       href={pathname}
    //       {...other}
    //     >
    //       {text}
    //     </a>
    //   );
    // }

    return (
      <NavLink
        to={pathname}
        href={pathname}
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
          to="/"
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
          <React.Fragment key={g.title}>
            {renderLink(g.pathname, g.title, {
              className: classNames(
                'b1',
                'text_black',
                s.menu_item_group,
              ),
              activeClassName: s.menu_item_active,
            })}
            <ul>
              {g.children && g.children.map((p: any) => (
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
