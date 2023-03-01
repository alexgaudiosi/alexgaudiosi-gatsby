import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';
import styled from 'styled-components';
import ContactForm from 'components/contact-form';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const About = ({ data }) => (
  <Layout>
    <Container>
      <Head pageTitle={data.aboutJson.title} />
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: data.aboutJson.content.childMarkdownRemark.html,
          }}
        />
        <hr />
        <Title as="h3">Get in touch:</Title>
        <ContactForm />
      </Box>
    </Container>
  </Layout>
);

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;

export const query = graphql`
  query AboutQuery {
    aboutJson {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
