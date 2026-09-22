import React from 'react';
import PropTypes from 'prop-types';
import { Text } from './title.css';

const Title = ({ children, as = 'span', emphasized = false, size }) => {
  return (
    <Text as={as} $emphasized={emphasized} size={size}>
      {children}
    </Text>
  );
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.string,
  emphasized: PropTypes.bool,
  size: PropTypes.oneOf(['large']),
};

export default Title;
