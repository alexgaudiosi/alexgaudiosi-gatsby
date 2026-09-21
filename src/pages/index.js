import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Gallery from 'components/gallery';
import SiteHead from 'components/head';
import LogoMorph from 'components/logo-morph/logo-morph';
import WorkCarousel from 'components/work-carousel/work-carousel';
import styled from 'styled-components';
import { graphql } from 'gatsby';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;

  h3 {
    margin-bottom: 15px;
  }
`;

const SHOPIFY_CAROUSEL_TITLES = [
  'Salomon',
  'Atomic Skis',
  'Armada Skis',
  'Perple',
  'Bluebella',
  'Finisterre',
  'Penguin Books',
  'WIT Fitness',
];

const Index = ({ data }) => {
  const shopifyProjects = SHOPIFY_CAROUSEL_TITLES.map(title =>
    data.shopifyJson.gallery.find(item => item.title === title)
  ).filter(Boolean);

  return (
    <Layout>
      <Container>
        <Box>
          <Title as="h2" size="large">
            {data.homeJson.content}
          </Title>
          <Title as="h3">{data.homeJson.subtitle}</Title>
          <LogoMorph />
        </Box>
      <WorkCarousel items={shopifyProjects} eyebrow="Shopify builds" />
      <Box>
        <Gallery items={data.homeJson.gallery} />
      </Box>
      </Container>
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

export const Head = ({ data, location }) => (
  <SiteHead pageTitle={data.homeJson.title} location={location} />
);

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
            gatsbyImageData(width: 1800, quality: 92, layout: CONSTRAINED)
          }
        }
        url
        target
      }
    }
    shopifyJson {
      gallery {
        title
        copy
        image {
          childImageSharp {
            gatsbyImageData(width: 1800, quality: 92, layout: CONSTRAINED)
          }
        }
        url
        target
        rel
      }
    }
  }
`;
