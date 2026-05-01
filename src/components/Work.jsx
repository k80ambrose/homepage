const projects = [
  {
    title: 'The Choreography of Choice: Browsing Netflix as a Cultural Exercise',
    description: 'A user study examining how recommendation algorithms shape personal taste — and how our choices quietly shape them back.',
    href: 'https://k80ambrose.github.io/howwebrowse/',
    year: '2024',
  },
  {
    title: 'Creative Coding',
    description: 'A collection of interactive maps, charts, and visual experiments.',
    href: '#creative-coding',
    year: 'Ongoing',
  },
  {
    title: 'Photography',
    description: 'Selected photography projects and visual work.',
    href: '#photography',
    year: 'Ongoing',
  },
]

export default function Work() {
  return (
    <section id="work">
      <h2 className="section-label">Selected Projects</h2>
      <ul className="work-list">
        {projects.map((p) => (
          <li key={p.title} className="work-item">
            <a
              href={p.href}
              target={p.href.startsWith('#') ? undefined : '_blank'}
              rel={p.href.startsWith('#') ? undefined : 'noreferrer'}
              className="work-link"
            >
              <span className="work-title">{p.title}</span>
              <span className="work-year">{p.year}</span>
            </a>
            <p className="work-desc">{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
