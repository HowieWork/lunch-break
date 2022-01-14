import { Fragment } from 'react';
import Head from 'next/head';
import ContactForm from '../components/Input/ContactForm';

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact</title>
        <meta name='description' content='Send us your messages.' />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
