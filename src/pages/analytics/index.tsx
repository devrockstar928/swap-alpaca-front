import Head from 'next/head'
import Container from '../../components/Container'
import Sidebar from '../../components/Sidebar'

export default function Analytics() {
  return (
    <Container maxWidth="full" className="grid h-full grid-cols-4 mx-auto gap-9">
      <Head>
        <title>Analytics Dashboard | RadioShack</title>
        <meta name="description" content="RADIO Analytics Dashboard by Radio..." />
      </Head>

      <div className="sticky top-0 hidden lg:block md:col-span-1" style={{ maxHeight: '40rem' }}>
        <Sidebar
          items={[
            {
              text: 'Dashboard',
              href: '/analytics/dashboard',
            },
            {
              text: 'Bar',
              href: '/analytics/bar',
            },
            {
              text: 'Pools',
              href: '/analytics/pools',
            },
            {
              text: 'Pairs',
              href: '/analytics/pairs',
            },
            {
              text: 'Tokens',
              href: '/analytics/tokens',
            },
          ]}
        />
      </div>
    </Container>
  )
}
