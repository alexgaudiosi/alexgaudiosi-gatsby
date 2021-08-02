import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Title, Copy } from './item.css';

const Item = ({ title, copy, image, url, target, rel }) => (
  <figure>
    <a href={url} target={target} rel={rel}>
      <Img fluid={image ? image.childImageSharp.fluid : {}} alt={title} />
      <figcaption>
        <Title>{title}</Title>
        <Copy>{copy}</Copy>
      </figcaption>
    </a>
  </figure>
);

Item.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.object.isRequired,
  url: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export default Item;
