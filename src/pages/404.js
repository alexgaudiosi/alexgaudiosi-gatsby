import React from 'react';
import Box from 'components/box';
import Layout from 'components/layout';
import SiteHead from 'components/head';

const NotFound = () => (
  <Layout>
    <Box>Not found.</Box>
  </Layout>
);

export default NotFound;

export const Head = ({ location }) => <SiteHead location={location} />;
