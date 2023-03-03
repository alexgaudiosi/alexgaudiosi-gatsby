import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import styled from 'styled-components';
import ContactForm from 'components/contact-form';
import { accent } from 'constants/theme';

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Contact = styled.div`
  a {
    text-decoration: underline ${accent};
  }
`;

const Divider = styled.hr`
  margin: 40px 0;
`;

const About = ({ data }) => (
  <Layout>
    <Container>
      <Head pageTitle={data.aboutJson.title} />
      <Box>
        <Contact
          dangerouslySetInnerHTML={{
            __html: data.aboutJson.content.childMarkdownRemark.html,
          }}
        />
        <Divider />
        <p>Get in touch:</p>
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
