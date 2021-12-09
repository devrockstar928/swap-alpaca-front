import Head from 'next/head'
import Container from '../../components/Container'

export default function Invest() {
  return (
    <Container id="invest-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Invest | Radio</title>
        <meta key="description" name="description" content="Invest..." />
      </Head>
    </Container>
  )
}
