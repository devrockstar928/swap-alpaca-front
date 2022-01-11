import Head from 'next/head'
import Container from '../components/Container'

export default function Dashboard() {
  return (
    <Container id="dashboard-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Dashboard | RadioShack</title>
        <meta name="description" content="Radio" />
      </Head>
    </Container>
  )
}
