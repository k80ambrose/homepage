const projects = [
  {
    title: 'The Choreography of Choice: Browsing Netflix as a Cultural Exercise',
    description: 'A user study examining how recommendation algorithms shape personal taste — and how our choices quietly shape them back.',
    href: '#',
    year: '2024',
  },
  {
    title: 'Project Two',
    description: 'Brief description of this project and the problem it solves.',
    href: '#',
    year: '2023',
  },
  {
    title: 'Project Three',
    description: 'Brief description of this project and the problem it solves.',
    href: '#',
    year: '2023',
  },
]

export default function Work() {
  return (
    <section id="work">
      <h2 className="section-label">Selected Work</h2>
      <ul className="work-list">
        {projects.map((p) => (
          <li key={p.title} className="work-item">
            <a href={p.href} target="_blank" rel="noreferrer" className="work-link">
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
