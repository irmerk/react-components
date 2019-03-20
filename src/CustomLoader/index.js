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
  image: '/assets/images/logos/loading.gif',
  loadingMessage: '',
};

export default CustomLoader;
