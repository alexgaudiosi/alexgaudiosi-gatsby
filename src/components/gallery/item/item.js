import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Title, Copy } from './item.css';

const Item = ({ title, copy, image, url, target, rel }) => (
  <figure>
    <a href={url} target={target} rel={rel}>
      <GatsbyImage
        image={image ? image.childImageSharp.gatsbyImageData : {}}
        alt={title}
      />
      <figcaption>
        <Title>
          <h4>{title}</h4>
        </Title>
      </figcaption>
    </a>
    <Copy>{copy}</Copy>
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
