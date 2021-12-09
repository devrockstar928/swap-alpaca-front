import Head from 'next/head'
import Container from '../../components/Container'

export default function Tokens() {
  return (
    <Container id="tokens-page" className="py-4 md:py-8 lg:py-12" maxWidth="full">
      <Head>
        <title>Tokens | Radio</title>
        <meta key="description" name="description" content="RadioSwap tokens." />
      </Head>
    </Container>
  )
}
