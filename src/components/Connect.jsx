const links = [
  { label: 'Email', href: 'mailto:katiegambrose@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/your-username' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/k8ambrose/' },
  { label: 'Spotify', href: 'https://open.spotify.com/user/katiegambrose?si=18c0034f6d304ba8' },
  { label: 'Photography', href: 'https://your-photography-site.com' },
]

export default function Connect() {
  return (
    <section id="connect">
      <h2 className="section-label">Connect</h2>
      <ul className="connect-list">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
              {l.label} →
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
