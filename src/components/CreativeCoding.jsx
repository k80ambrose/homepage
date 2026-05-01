const projects = [
  {
    title: 'Visualization One',
    description: 'Add a short note about what this visualization explores.',
    href: '#',
    year: '2026',
  },
  {
    title: 'Visualization Two',
    description: 'Replace this with a link to another map, chart, or visual experiment.',
    href: '#',
    year: '2026',
  },
]

export default function CreativeCoding() {
  return (
    <section className="visualizations-page">
      <a href="#" className="back-link">Back home</a>
      <h1>Creative Coding</h1>
      <p className="page-intro">
        A place for maps, charts, and interactive visual experiments.
      </p>

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
            <p className="work-desc">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
