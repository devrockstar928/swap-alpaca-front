import Head from 'next/head'
import Container from '../../components/Container'

export default function Explore() {
  return (
    <Container id="explore-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Explore | Radio</title>
        <meta key="description" name="description" content="Explore..." />
      </Head>
    </Container>
  )
}
