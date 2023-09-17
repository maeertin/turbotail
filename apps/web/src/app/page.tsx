import { Header } from '../components'
import { Hero } from '../blocks'

interface PageProps {
  searchParams: Record<string, string>
}

export default function Page(props: PageProps) {
  const { searchParams } = props

  return (
    <>
      <Header searchParams={searchParams} />

      <main>
        <Hero />
      </main>
    </>
  )
}
