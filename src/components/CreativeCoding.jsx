const projects = [
  {
    title: 'Visualization One',
    href: '#',
    year: '2026',
  },
  {
    title: 'Visualization Two',
    href: '#',
    year: '2026',
  },
]

export default function CreativeCoding() {
  return (
    <section className="visualizations-page">
      <a href="#" className="back-link">Back home</a>
      <h1>Creative Coding</h1>

      <ul className="work-list visualization-list">
        {projects.map((item) => (
          <li key={item.title} className="work-item">
            <a
              href={item.href}
              target={item.href.startsWith('#') ? undefined : '_blank'}
              rel={item.href.startsWith('#') ? undefined : 'noreferrer'}
              className="work-link"
            >
              <span className="work-title">{item.title}</span>
              <span className="work-year">{item.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
