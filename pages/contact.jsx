import React from 'react'
import Head from 'next/head'
import ContactSection from '../components/ContactSection'

const contact = () => {
  return (
    <div>
      <Head>
        <title>Contato - Web Makers</title>
        <meta
          name="description"
          content="Fale com a Web Makers e receba uma proposta em até 1 dia útil."
        />
      </Head>
      <ContactSection topMargin={false} />
    </div>
  )
}

export default contact
