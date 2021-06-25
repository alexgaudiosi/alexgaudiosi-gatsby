import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Gallery from 'components/gallery';

const Shopify = ({ data }) => (
  <Layout>
    <Head pageTitle={data.shopifyJson.title} />
    <Box>
      <div
        dangerouslySetInnerHTML={{
          __html: data.shopifyJson.content.childMarkdownRemark.html,
        }}
      />
      <Gallery items={data.shopifyJson.gallery} />
    </Box>
  </Layout>
);

Shopify.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Shopify;

export const query = graphql`
  query ShopifyQuery {
    shopifyJson {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      gallery {
        title
        copy
        image {
          childImageSharp {
            fluid(maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        url
      }
    }
  }
`;
