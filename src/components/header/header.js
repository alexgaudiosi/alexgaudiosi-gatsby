import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import posed from 'react-pose';
import { Container } from './header.css';
import Title from 'components/title';
import Nav from 'components/header/nav';

const AnimatedContainer = posed.div({});

const Header = ({ title }) => (
  <AnimatedContainer style={{ maxWidth: '1100px', margin: 'auto' }}>
    <Container>
      <Link to="/">
        <Title as="h1">{title}</Title>
      </Link>
      <Nav />
    </Container>
  </AnimatedContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
