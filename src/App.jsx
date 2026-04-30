import BlobCanvas from './components/BlobCanvas'
import Hero from './components/Hero'
import Work from './components/Work'
import Connect from './components/Connect'

export default function App() {
  return (
    <>
      <BlobCanvas />
      <main>
        <Hero />
        <Work />
        <Connect />
      </main>
    </>
  )
}
