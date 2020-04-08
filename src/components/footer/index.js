import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Media, MediaContextProvider } from 'utils/responsive';
import { APP_URL, HOWTO_URL, BLOG_URL } from 'utils/constants';

import Carousel from 'components/carousel';
import Button from 'components/button';

import WriIcon from 'assets/logos/wri.svg';
import ArrowIcon from 'assets/icons/arrow-down.svg';
import FacebookIcon from 'assets/icons/social/facebook.svg';
import GoogleplusIcon from 'assets/icons/social/google-plus.svg';
import InstagramIcon from 'assets/icons/social/instagram.svg';
import TwitterIcon from 'assets/icons/social/twitter.svg';
import YoutubeIcon from 'assets/icons/social/youtube.svg';

import partners from './partners.json';

import './styles.scss';

const images = require.context('assets/logos/partners', true);

class Footer extends PureComponent {
  static propTypes = {
    NavLinkComponent: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
    openContactUsModal: PropTypes.func.isRequired
  };

  renderCarousel = slidesToShow => (
    <Carousel
      className="partners-slide"
      settings={{
        slidesToShow,
        slidesToScroll: slidesToShow,
        infinite: true,
        nextArrow: (
          <Button
            theme="theme-button-clear square"
            ariaLabel="next partners logos"
          >
            <ArrowIcon />
          </Button>
        ),
        prevArrow: (
          <Button
            theme="theme-button-clear square"
            ariaLabel="prev partners logos"
          >
            <ArrowIcon />
          </Button>
        ),
        lazyLoad: true
      }}
    >
      {partners.map((p, i) => (
        <div className="carousel-slide" key={`${p.name}${i}`}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={p.url}
            aria-label={p.name}
          >
            <img
              className="logo-grey"
              src={images(`./${p.name}.png`)}
              alt={p.name}
            />
            <img
              className="logo-color"
              src={images(`./${p.name}hover.png`)}
              alt={p.name}
            />
          </a>
        </div>
      ))}
    </Carousel>
  );

  render() {
    const { NavLinkComponent, openContactUsModal } = this.props;

    return (
      <MediaContextProvider>
        <div className="c-footer">
          <div className="footer-main">
            <div className="row footer-links">
              <div className="column small-12 medium-6">
                <ul className="footer-links-texts">
                  <li>
                    <a href={APP_URL}>GFW</a>
                  </li>
                  <li>
                    <a href={BLOG_URL}>Blog</a>
                  </li>
                  <li>
                    <a href={HOWTO_URL}>How to portal</a>
                  </li>
                </ul>
              </div>
              <div className="column small-12 medium-6">
                <ul className="footer-links-social">
                  <li>
                    <a
                      href="https://twitter.com/globalforests"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="twitter"
                    >
                      <TwitterIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/globalforests/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="facebook"
                    >
                      <FacebookIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/globalforests/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="instagram"
                    >
                      <InstagramIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCAsamYre1KLulf4FD-xJfLA"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="youtube"
                    >
                      <YoutubeIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://groups.google.com/forum/#!forum/globalforestwatch"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="google groups forum"
                    >
                      <GoogleplusIcon />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="column small-12">
                <div className="footer-contact-us">
                  <button className="contact-btn" onClick={openContactUsModal}>
                    CONTACT US
                  </button>
                  {
                    NavLinkComponent ? (
                      <NavLinkComponent href="/subscribe">
                        <Button className="subscribe-btn">
                          Subscribe to the GFW newsletter
                        </Button>
                      </NavLinkComponent>
) : (
  <a
    href="https://globalforestwatch.org/subscribe"
  >
    <Button className="subscribe-btn">
      Subscribe to the GFW newsletter
    </Button>
  </a>
)
                  }
                </div>
              </div>
            </div>
            <div className="row footer-partners">
              <div className="column small-12 medium-3">
                <div className="footer-wri">
                  <p>A partnership convened by</p>
                  <a
                    href="https://www.wri.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="world resource institute"
                  >
                    <WriIcon className="wri-logo" />
                  </a>
                </div>
              </div>
              <div className="column small-12 medium-9">
                <div className="footer-partners-slide">
                  <div className="footer-logos">
                    <p>Partners</p>
                    <Media greaterThanOrEqual="md">
                      {this.renderCarousel(4)}
                    </Media>
                    <Media lessThan="md">{this.renderCarousel(1)}</Media>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column small-12">
                <div className="footer-terms">
                  {
                    NavLinkComponent
                      ? (
                        <NavLinkComponent href="/terms" className="terms">
                          Terms of Service
                        </NavLinkComponent>
)
                      : <a className="terms">Terms of Service</a>
                  }
                  {' · '}
                  {
                    NavLinkComponent
                      ? (
                        <NavLinkComponent
                          href="/privacy-policy"
                          className="terms"
                        >
                          Privacy Policy
                        </NavLinkComponent>
)
                      : <a className="terms">Privacy Policy</a>
                  }
                  {' · '}
                  <a
                    className="terms"
                    href="http://stats.pingdom.com/ghabapk9rihc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Global Forest Watch System Status
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MediaContextProvider>
    );
  }
}
export default Footer;
