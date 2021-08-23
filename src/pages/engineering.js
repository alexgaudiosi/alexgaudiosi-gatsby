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

const Engineering = ({ data }) => (
  <Layout>
    <Container>
      <Head pageTitle={data.engineeringJson.title} />
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: data.engineeringJson.content.childMarkdownRemark.html,
          }}
        />
        <Gallery items={data.engineeringJson.gallery} />
      </Box>
    </Container>
  </Layout>
);

Engineering.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Engineering;

export const query = graphql`
  query EngineeringQuery {
    engineeringJson {
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
