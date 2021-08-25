import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import posed from 'react-pose';
import { Container } from './header.css';
import Title from 'components/title';
import Nav from 'components/header/nav';

const AnimatedContainer = posed.div({});

const Header = ({ title }) => (
  <AnimatedContainer style={{ maxWidth: '1100px', margin: 'auto' }}>
    <Container>
      <Link to="/">
        <GatsbyImage
          image={}
          alt={title}
          style={{ border: '1px solid' }}
        />
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
