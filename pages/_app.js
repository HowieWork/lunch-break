import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* TODO ADD FAV ICON */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
