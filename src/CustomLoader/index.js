import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer } from 'semantic-ui-react';

const CustomLoader = props => (
  <Dimmer active={props.active} inverted>
    <img src={props.image} alt="loading..." />
    <p style={{ color: '#484848' }}>{props.loadingMessage}</p>
  </Dimmer>
);

CustomLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  image: PropTypes.string,
  loadingMessage: PropTypes.string,
};

CustomLoader.defaultProps = {
  active: false,
  image: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
  loadingMessage: '',
};

export default CustomLoader;
