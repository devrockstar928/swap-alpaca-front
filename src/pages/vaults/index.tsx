import Head from 'next/head'
import Container from '../../components/Container'

export default function Vaults() {
  return (
    <Container id="settings-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Vaults | Radio</title>
        <meta key="description" name="description" content="Radio vaults..." />
      </Head>
    </Container>
  )
}
