import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';

const Shopify = ({ data }) => (
  <Layout>
    <Head pageTitle={data.shopifyJson.title} />
    <Box>
      <div
        dangerouslySetInnerHTML={{
          __html: data.shopifyJson.content.childMarkdownRemark.html,
        }}
      />
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
    }
  }
`;
