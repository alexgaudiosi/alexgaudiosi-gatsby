import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Gallery from 'components/gallery';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Shopify = ({ data }) => (
  <Layout>
    <Container>
      <Head pageTitle={data.shopifyJson.title} />
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: data.shopifyJson.content.childMarkdownRemark.html,
          }}
        />
        <hr />
        <Gallery items={data.shopifyJson.gallery} />
      </Box>
    </Container>
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
            gatsbyImageData(height: 500, quality: 90, layout: FULL_WIDTH)
          }
        }
        url
        target
        rel
      }
    }
  }
`;
