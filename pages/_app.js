import { Provider } from 'next-auth/client';

import Head from 'next/head';
import Layout from '../components/Layout/Layout';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/images/site/favicon.png' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
