import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Media, mediaStyles, MediaContextProvider } from 'utils/responsive';
import { APP_URL } from 'utils/constants';

import config from './config';
import gfwLogo from 'assets/logos/gfw.png?webp';
import Developer from 'assets/icons/developer.svg?sprite';

import NavMenu from './components/nav-menu';
// import NavAlt from './components/nav-alt';
// import SubmenuPanel from './components/submenu-panel';

import './styles.scss';

class Header extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    navMain: PropTypes.array.isRequired,
    apps: PropTypes.array.isRequired,
    moreLinks: PropTypes.array.isRequired,
    fullScreen: PropTypes.bool,
    loggedIn: PropTypes.bool,
    loggingIn: PropTypes.bool,
    hideMenu: PropTypes.bool,
    setQueryToUrl: PropTypes.func,
    myGfwLinks: PropTypes.array.isRequired,
    NavLinkComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    openContactUsModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    fullScreen: false,
    loggedIn: false,
    hideMenu: false,
  };

  state = {
    fullScreenOpen: false,
  };

  // componentDidMount() {
  //   console.log(mediaStyles);
  //   const $style = document.createElement("style");
  //   document.head.appendChild($style);
  //   $style.type = 'text/css';
  //   $style.innerHTML = mediaStyles;
  // }

  componentDidUpdate(prevProps) {
    const { fullScreen } = this.props;
    if (fullScreen && !prevProps.fullScreen) {
      this.closeFullScreen();
    }
  }

  closeFullScreen = () => {
    this.setState({ fullScreenOpen: false });
  };

  render() {
    const {
      className,
      openContactUsModal,
      loggedIn,
      fullScreen,
      setQueryToUrl,
      loggingIn,
      NavLinkComponent,
    } = this.props;
    const {
      moreLinks,
      myGfwLinks,
      apps,
      navMain
    } = config;
    const { fullScreenOpen } = this.state;

    return (
      <MediaContextProvider>
        <div
          className={cx(
            'c-header',
            { 'full-screen': fullScreen },
            { 'full-screen-open': fullScreenOpen },
            className
          )}
        >
          <div className={cx('row', { expanded: fullScreen })}>
            <div className="column small-12 ">
              {!fullScreen || fullScreenOpen ? (
                <Fragment>
                  {NavLinkComponent ? (
                    <NavLinkComponent href="/" className="logo">
                      <img
                        src={gfwLogo}
                        alt="Global Forest Watch"
                        width="76"
                        height="76"
                      />
                    </NavLinkComponent>
                  ) : (
                    <a href={APP_URL} className="logo">
                      <img
                        src={gfwLogo}
                        alt="Global Forest Watch"
                        width="76"
                        height="76"
                      />
                    </a>
                  )}
                </Fragment>
              ) : (
                <button
                  className="logo map-tour-main-menu"
                  onClick={() => this.setState({ fullScreenOpen: true })}
                  type="button"
                >
                  <img
                    src={gfwLogo}
                    alt="Global Forest Watch"
                    width="76"
                    height="76"
                  />
                </button>
              )}
              {(!fullScreen || fullScreenOpen) && (
                <div className="nav">
                  <Media greaterThanOrEqual="md" className="nav-menu">
                    <NavMenu
                      menuItems={navMain}
                      fullScreen={fullScreen}
                      NavLinkComponent={NavLinkComponent}
                    />
                  </Media>
                  {/* <NavAlt
                    showSubmenu={fullScreen && fullScreenOpen}
                    closeSubMenu={() => this.setState({ fullScreenOpen: false })}
                    moreLinks={moreLinks}
                    myGfwLinks={myGfwLinks}
                    navMain={navMain}
                    apps={apps}
                    openContactUsModal={openContactUsModal}
                    loggedIn={loggedIn}
                    loggingIn={loggingIn}
                    setQueryToUrl={setQueryToUrl}
                    NavLinkComponent={NavLinkComponent}
                  /> */}
                </div>
              )}
            </div>
          </div>
          {/* <SubmenuPanel
            relative
            className="submenu-panel"
            languages={[]}
            activeLang="en"
            handleLangSelect={this.handleLangSelect}
            hideMenu={this.handleCloseSubmenu}
            {...config}
          /> */}
        </div>
      </MediaContextProvider>
    );
  }
}

export default Header;
