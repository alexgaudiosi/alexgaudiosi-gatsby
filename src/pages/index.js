import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Gallery from 'components/gallery';
import styled from 'styled-components';
import { graphql } from 'gatsby';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;

  h3 {
    margin-bottom: 20x;
  }
`;

const Index = ({ data }) => (
  <Layout>
    <Container>
      <Box>
        <Title as="h2" size="large">
          {data.homeJson.content}
        </Title>
        <Title as="h3">{data.homeJson.subtitle}</Title>
        <Gallery items={data.homeJson.gallery} />
      </Box>
    </Container>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content
      subtitle
      gallery {
        title
        copy
        image {
          childImageSharp {
            gatsbyImageData(height: 500, quality: 90, layout: FULL_WIDTH)
          }
        }
        url
      }
    }
  }
`;
