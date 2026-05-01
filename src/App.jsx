import { useEffect, useState } from 'react'
import BlobCanvas from './components/BlobCanvas'
import Hero from './components/Hero'
import Work from './components/Work'
import Connect from './components/Connect'
import CreativeCoding from './components/CreativeCoding'
import Photography from './components/Photography'

function getPageFromHash() {
  if (window.location.hash === '#creative-coding') return 'creativeCoding'
  if (window.location.hash === '#photography') return 'photography'
  if (window.location.hash === '#portraits') return 'portraits'
  if (window.location.hash === '#street-photography') return 'streetPhotography'
  if (window.location.hash === '#flora') return 'flora'
  if (window.location.hash === '#fauna') return 'fauna'
  return 'home'
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (
      page !== 'photography' &&
      page !== 'portraits' &&
      page !== 'streetPhotography' &&
      page !== 'flora' &&
      page !== 'fauna'
    ) return

    window.requestAnimationFrame(() => {
      const id = window.location.hash.slice(1)
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ block: 'start' })
      }
    })
  }, [page])

  return (
    <>
      <BlobCanvas />
      <main>
        {page === 'creativeCoding' ? (
          <CreativeCoding />
        ) : (
          <>
            <Hero />
            <Work />
            {(page === 'photography' ||
              page === 'portraits' ||
              page === 'streetPhotography' ||
              page === 'flora' ||
              page === 'fauna') && (
              <Photography
                showPortraits={page === 'portraits'}
                showStreetPhotography={page === 'streetPhotography'}
                showFlora={page === 'flora'}
                showFauna={page === 'fauna'}
              />
            )}
            <Connect />
          </>
        )}
      </main>
    </>
  )
}
