import { useEffect, useState } from 'react'

const flowerImages = Object.entries(
  import.meta.glob('../../flowers/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
).map(([path, src]) => ({
  src,
  title: path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' '),
}))

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
    href: '#flora',
    year: 'Collection',
  },
]

function FlowerGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    if (!selectedPhoto) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedPhoto])

  return (
    <section id="flora" className="photo-gallery-page">
      <div className="gallery-header">
        <div>
          <h1>Flora</h1>
          <p className="page-intro">A living grid of flower studies.</p>
        </div>
        <span className="gallery-count">{flowerImages.length} photos</span>
      </div>

      <ul className="flower-grid">
        {flowerImages.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              className="flower-tile"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`Open ${photo.title || `flower ${index + 1}`}`}
            >
              <img src={photo.src} alt="" loading={index < 6 ? 'eager' : 'lazy'} />
            </button>
          </li>
        ))}
      </ul>

      {selectedPhoto && (
        <div className="photo-lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedPhoto(null)}>
          <button type="button" className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            Close
          </button>
          <img src={selectedPhoto.src} alt="" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default function Photography({ showFlora = false }) {
  return (
    <>
      <section id="photography" className="project-page photography-page">
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
      {showFlora && <FlowerGallery />}
    </>
  )
}
