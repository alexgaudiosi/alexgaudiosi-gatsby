import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { timeout } from 'constants/transition';

const enter = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const RoutesContainer = styled.div`
  animation: ${enter} ${timeout}ms ease both;
  animation-delay: ${timeout}ms;
`;

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
    );
  }
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Transition;
