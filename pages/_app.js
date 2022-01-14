import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/images/site/favicon.png' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
