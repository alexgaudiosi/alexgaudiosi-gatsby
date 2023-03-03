import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container } from './header.css';
import Title from 'components/title';
import Nav from 'components/header/nav';

const Header = ({ title }) => (
  <div style={{ maxWidth: '1100px', margin: 'auto' }}>
    <Container>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Title as="h1">{title}</Title>
      </Link>
      <Nav />
    </Container>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
