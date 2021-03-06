import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import lowerCase from 'lodash/lowerCase';
import ReactHtmlParser from 'react-html-parser';
import cx from 'classnames';
import { format } from 'date-fns';

import { getMeta } from 'services/meta';

import NoContent from 'components/no-content';
import Button from 'components/button';
import Modal from 'components/modals/modal';
import H4 from 'components/html/h4';
import H5 from 'components/html/h5';

import DownloadIcon from 'assets/icons/download.svg';
import LinkIcon from 'assets/icons/link.svg';

import getMetaData from './selectors';
import { MetaModalWrapper, modalWrapperStyles } from './styles';

class MetaModal extends PureComponent {
  static propTypes = {
    onRequestClose: PropTypes.func,
    /** slug for fetching data from gfw-metadata service */
    metakey: PropTypes.string,
    /** name of location for citiation */
    locationName: PropTypes.string,
    open: PropTypes.bool,
  };

  state = {
    loading: false,
    error: false,
    data: {},
  };

  componentDidMount() {
    this.handleGetMetaData();
  }

  componentDidUpdate(prevProps) {
    const { open } = this.props;
    if (open && open !== prevProps.open) {
      this.handleGetMetaData();
    }
  }

  handleGetMetaData = () => {
    const { metakey } = this.props;
    if (metakey) {
      this.setState({ loading: true, error: false });
      getMeta(metakey)
        .then((response) =>
          this.setState({ data: response?.data, loading: false, error: false })
        )
        .catch(() => this.setState({ loading: false, error: true }));
    }
  };

  parseContent = (html) => (
    <>
      {ReactHtmlParser(html, {
        transform: (node) =>
          node?.name === 'a' ? (
            <a
              key={node?.attribs?.href}
              href={node?.attribs?.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node?.children?.[0]?.data}
            </a>
          ) : (
            ''
          ),
      })}
    </>
  );

  render() {
    const { open, onRequestClose, locationName } = this.props;
    const { data, loading, error } = this.state;
    const { tableData, metaData } = getMetaData({ data });
    const {
      title,
      subtitle,
      overview,
      citation,
      map_service,
      learn_more,
      download_data,
      amazon_link,
    } = metaData || {};

    const parsedCitation =
      citation &&
      citation
        .replace('[selected area name]', locationName)
        .replace('[date]', format(new Date(), 'dd/mm/yyyy'));

    return (
      <Modal
        open={open}
        onRequestClose={onRequestClose}
        title={title}
        loading={loading}
        customStyles={modalWrapperStyles}
      >
        <MetaModalWrapper>
          {error && !loading && (
            <NoContent message="There was a problem finding this info. Please try again later." />
          )}
          {!loading && isEmpty(metaData) && !error && (
            <NoContent message="Sorry, we cannot find what you are looking for." />
          )}
          {!loading && !error && !isEmpty(metaData) && (
            <div>
              <p className="subtitle">{subtitle}</p>
              <div className="meta-table element-fullwidth">
                {tableData &&
                  Object.keys(tableData).map((key, i) =>
                    tableData[key] ? (
                      <div
                        key={key}
                        className={cx('table-row', { dark: i % 2 })}
                      >
                        <H5 className="title-column">{lowerCase(key)}</H5>
                        <div className="description-column">
                          {this.parseContent(tableData[key])}
                        </div>
                      </div>
                    ) : null
                  )}
              </div>
              {overview && (
                <div className="overview">
                  <H4>Overview</H4>
                  <div className="body">{this.parseContent(overview)}</div>
                </div>
              )}
              {parsedCitation && (
                <div className="citation">
                  <H5>Citation</H5>
                  <div className="body">
                    {this.parseContent(parsedCitation)}
                  </div>
                </div>
              )}
              {(learn_more || download_data || map_service || amazon_link) && (
                <div className="actions">
                  {download_data && (
                    <a
                      href={download_data}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button clear>
                        <DownloadIcon />
                        DOWNLOAD DATA
                      </Button>
                    </a>
                  )}
                  {learn_more && (
                    <a
                      href={learn_more}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button clear>
                        <LinkIcon />
                        LEARN MORE
                      </Button>
                    </a>
                  )}
                  {(map_service || amazon_link) && (
                    <a
                      href={map_service || amazon_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button clear>
                        <LinkIcon />
                        OPEN IN ARCGIS
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </MetaModalWrapper>
      </Modal>
    );
  }
}

export default MetaModal;
