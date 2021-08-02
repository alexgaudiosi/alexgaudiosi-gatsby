import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './box.css';

const Box = ({ children, props }) => (
  <Container {...props}>{children}</Container>
);

Box.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.any,
};

export default Box;
