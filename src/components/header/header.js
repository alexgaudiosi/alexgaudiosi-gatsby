import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'gatsby';
// import MEDIA from 'helpers/mediaTemplates';
import { Container } from './header.css';
import Title from 'components/title';
import Nav from 'components/header/nav';

// const HeaderLogo = styled.img`
//   width: 30px;
//   height: 30px;
//   padding-right: 10px;

//   ${MEDIA.TABLET`
//     width: 30px;
//     height: 30px;
//   `};
// `;

const Header = ({ title }) => (
  <div style={{ maxWidth: '1100px', margin: 'auto' }}>
    <Container>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        {/* <HeaderLogo src="./poro.svg" alt="" /> */}
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
