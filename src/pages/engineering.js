import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import SiteHead from 'components/head';
import Gallery from 'components/gallery';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Engineering = ({ data }) => (
  <Layout>
    <Container>
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: data.engineeringJson.content.childMarkdownRemark.html,
          }}
        />
        <hr />
        <Gallery items={data.engineeringJson.gallery} />
      </Box>
    </Container>
  </Layout>
);

Engineering.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Engineering;

export const Head = ({ data, location }) => (
  <SiteHead pageTitle={data.engineeringJson.title} location={location} />
);

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
            gatsbyImageData(
              width: 1800
              height: 500
              quality: 90
              layout: CONSTRAINED
            )
          }
        }
        url
        target
        rel
      }
    }
  }
`;
