import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import qs from 'query-string';
import { Global } from '@emotion/core';

import { checkLoggedIn } from 'services/user';

import { Media, MediaContextProvider } from 'utils/responsive';
import { APP_URL } from 'constants';

import gfwLogo from 'assets/logos/gfw.png';
import MenuIcon from 'assets/icons/menu.svg';
import CloseIcon from 'assets/icons/close.svg';

import NavLink from 'components/header/components/nav-link';
import { Row, Column } from 'components/grid';

import NavMenu from './components/nav-menu';
import NavAlt from './components/nav-alt';
import SubmenuPanel from './components/submenu-panel';

import defaultConfig from './config';

import { HeaderWrapper, bodyStyles } from './styles';

class Header extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    loggedIn: PropTypes.bool,
    loggingIn: PropTypes.bool,
    setQueryToUrl: PropTypes.func,
    NavLinkComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    openContactUsModal: PropTypes.func,
    appUrl: PropTypes.string,
    navMain: PropTypes.array,
    languages: PropTypes.array,
    pathname: PropTypes.string,
    showMenu: PropTypes.bool,
    afterLangSelect: PropTypes.func,
    customLogo: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    loggedIn: false,
    appUrl: APP_URL,
    showMenu: true,
    ...defaultConfig,
  };

  state = {
    pathname: this.props.pathname || '',
    showSubmenu: false,
    clickOutside: false,
    lang: 'en',
    languages: this.props.languages,
  };

  componentDidMount() {
    this.checkLoggedIn();
    this.getLanguages();
    this.findPathname();
  }

  componentDidUpdate(prevProps, prevState) {
    const { showSubmenu } = this.state;
    if (prevState.showSubmenu && !showSubmenu) {
      document.body.classList.remove('Header__no-scroll');
    } else if (!prevState.showSubmenu && showSubmenu) {
      document.body.classList.add('Header__no-scroll');
    }
  }

  checkLoggedIn = () => {
    const query =
      (typeof window !== 'undefined' && qs.parse(window.location.search)) || {};
    const urlToken = query && query.token;
    const token = urlToken || localStorage.getItem('userToken');

    if (urlToken) {
      delete query.token;
      const cleanQuery = query && qs.stringify(query);
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}`
      );
    }

    if (token) {
      this.setState({ loggedIn: false, loggingIn: true });
      checkLoggedIn(token)
        .then((response) => {
          if (response.status < 400 && response.data) {
            this.setState({ loggedIn: true, loggingIn: false });
          } else {
            this.setState({ loggedIn: false, loggingIn: false });
          }
        })
        .catch(() => {
          this.setState({ loggedIn: false, loggingIn: false });
        });
    }
  };

  getLanguages = () => {
    if (
      typeof window !== 'undefined' &&
      window.Transifex &&
      window.Transifex.live
    ) {
      const languages = window.Transifex.live.getAllLanguages();
      this.setState({
        lang: window.Transifex.live.detectLanguage(),
        languages:
          languages && languages.map((l) => ({ label: l.name, value: l.code })),
      });
    }
  };

  findPathname = () => {
    if (!this.props.pathname && typeof window !== 'undefined') {
      this.setState({ pathname: window.location.pathname });
    }
  };

  handleLangSelect = (lang) => {
    const { afterLangSelect } = this.props;
    if (typeof window !== 'undefined' && window.Transifex) {
      window.Transifex.live.translateTo(lang);
    }
    this.setState({ lang });

    if (afterLangSelect) {
      afterLangSelect(lang);
    }
  };

  render() {
    const { className, appUrl, navMain, showMenu, customLogo } = this.props;
    const { showSubmenu, clickOutside, languages, lang } = this.state;
    const activeLang = languages && languages.find((l) => l.value === lang);

    return (
      <MediaContextProvider>
        <Global styles={bodyStyles} />
        <HeaderWrapper className={className}>
          <Row>
            <Column>
              <NavLink className="logo" href="/" appUrl={appUrl}>
                <img
                  src={customLogo || gfwLogo}
                  alt="Global Forest Watch"
                  width="76"
                  height="76"
                />
              </NavLink>
              <div className="nav">
                <Media
                  greaterThanOrEqual="mdl"
                  className={cx('nav-desktop', { 'show-menu': showMenu })}
                >
                  {showMenu && (
                    <NavMenu
                      {...this.props}
                      {...this.state}
                      menuItems={navMain}
                    />
                  )}
                  <NavAlt
                    {...this.props}
                    {...this.state}
                    activeLang={activeLang}
                    handleLangSelect={this.handleLangSelect}
                    handleShowSubmenu={(show) =>
                      this.setState({ showSubmenu: show })}
                  />
                </Media>
                <Media lessThan="mdl" className="nav-mobile">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      if (!showSubmenu && !clickOutside) {
                        this.setState({ showSubmenu: false });
                      }
                    }}
                  >
                    <div className="nav-item nav-more">
                      {showSubmenu && (
                        <button
                          className="nav-link"
                          onClick={() => {
                            if (!clickOutside) {
                              this.setState({ showSubmenu: false });
                            }
                          }}
                        >
                          close
                          <CloseIcon className="icon-submenu icon-close" />
                        </button>
                      )}
                      {!showSubmenu && (
                        <button
                          className="nav-link"
                          onClick={() => {
                            if (!clickOutside) {
                              this.setState({ showSubmenu: true });
                            }
                          }}
                        >
                          more
                          <MenuIcon className="icon-submenu icon-menu" />
                        </button>
                      )}
                    </div>
                  </OutsideClickHandler>
                </Media>
              </div>
            </Column>
          </Row>
          {showSubmenu && (
            <OutsideClickHandler
              onOutsideClick={() => {
                this.setState({ showSubmenu: false, clickOutside: true });
                setTimeout(() => this.setState({ clickOutside: false }), 50);
              }}
            >
              <SubmenuPanel
                {...this.props}
                {...this.state}
                handleLangSelect={this.handleLangSelect}
                activeLang={activeLang}
                hideMenu={() => this.setState({ showSubmenu: false })}
              />
            </OutsideClickHandler>
          )}
        </HeaderWrapper>
      </MediaContextProvider>
    );
  }
}

export default Header;