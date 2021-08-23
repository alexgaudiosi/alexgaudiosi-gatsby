import React from 'react';
import { Link } from 'gatsby';
import { Container } from './nav.css';

const Nav = () => (
  <Container>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/engineering">Engineering</Link>
      </li>
      <li>
        <Link to="/shopify">Shopify</Link>
      </li>
    </ul>
  </Container>
);

export default Nav;
