import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const ThankYou = ({ data }) => (
  <Layout>
    <Container>
      <Head pageTitle={data.thankYouJson.title} />
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: data.thankYouJson.content.childMarkdownRemark.html,
          }}
        />
      </Box>
    </Container>
  </Layout>
);

ThankYou.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ThankYou;

export const query = graphql`
  query ThankYouQuery {
    thankYouJson {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
