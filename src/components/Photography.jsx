const collections = [
  {
    title: 'Portraits',
    description: 'People, presence, and quiet moments.',
    href: '#',
    year: 'Collection',
  },
  {
    title: 'Textures',
    description: 'Surfaces, patterns, material studies, and close looking.',
    href: '#',
    year: 'Collection',
  },
  {
    title: 'Flora',
    description: 'Plants, flowers, gardens, and natural forms.',
    href: '#',
    year: 'Collection',
  },
]

export default function Photography() {
  return (
    <section className="project-page photography-page">
      <a href="#" className="back-link">Back home</a>
      <h1>Photography</h1>
      <p className="page-intro">
        Selected collections of portraits, textures, and flora.
      </p>

      <ul className="work-list project-page-list">
        {collections.map((collection) => (
          <li key={collection.title} className="work-item">
            <a
              href={collection.href}
              target={collection.href.startsWith('#') ? undefined : '_blank'}
              rel={collection.href.startsWith('#') ? undefined : 'noreferrer'}
              className="work-link"
            >
              <span className="work-title">{collection.title}</span>
              <span className="work-year">{collection.year}</span>
            </a>
            <p className="work-desc">{collection.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
