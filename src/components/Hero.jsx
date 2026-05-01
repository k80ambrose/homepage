import { useState, useEffect } from 'react'

export default function Hero() {
  const [faded, setFaded] = useState(false)

  useEffect(() => {
    const onScroll = () => setFaded(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero">
      <h1>Kate<br />Ambrose</h1>
      <p className="hero-tagline">
        Developer &amp; researcher.<br />
        Building for government. Based in New York.
      </p>

      <div className={`scroll-hint${faded ? ' scroll-hint--faded' : ''}`} aria-hidden="true">
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
          <path d="M1 1L14 14L27 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
