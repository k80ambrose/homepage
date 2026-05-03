import { useEffect, useState } from 'react'

const flowerImages = Object.entries(
  import.meta.glob('../../photography/flowers/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
)
  .map(([path, src]) => {
    const filename = path.split('/').pop()

    return {
      src,
      filename,
      title: filename
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' '),
    }
  })
  .sort((a, b) => {
    if (a.filename === 'purpflower.JPG') return -1
    if (b.filename === 'purpflower.JPG') return 1
    return a.filename.localeCompare(b.filename)
  })

const portraitImages = Object.entries(
  import.meta.glob('../../photography/portraits/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
)
  .map(([path, src]) => {
    const filename = path.split('/').pop()

    return {
      src,
      filename,
      title: filename
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' '),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))

const streetPhotographyImages = Object.entries(
  import.meta.glob('../../photography/Street Photography/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
)
  .map(([path, src]) => {
    const filename = path.split('/').pop()

    return {
      src,
      filename,
      title: filename
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' '),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))

const faunaImages = Object.entries(
  import.meta.glob('../../photography/Fauna/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
)
  .map(([path, src]) => {
    const filename = path.split('/').pop()

    return {
      src,
      filename,
      title: filename
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' '),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))

const textureImages = Object.entries(
  import.meta.glob('../../photography/Textures/*.{jpg,jpeg,JPG,JPEG}', {
    eager: true,
    as: 'url',
  })
)
  .map(([path, src]) => {
    const filename = path.split('/').pop()
    return {
      src,
      filename,
      title: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    }
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))

const collections = [
  {
    title: 'Flora',
    href: '#flora',
    year: 'Collection',
  },
  {
    title: 'Fauna',
    href: '#fauna',
    year: 'Collection',
  },
  {
    title: 'Portraits',
    href: '#portraits',
    year: 'Collection',
  },
  {
    title: 'Textures',
    href: '#textures',
    year: 'Collection',
  },
  {
    title: 'Street Photography',
    href: '#street-photography',
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
        </div>
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

function NaturalPhotoGallery({ id, title, photos, ariaName }) {
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
    <section id={id} className="photo-gallery-page portrait-gallery-page">
      <div className="gallery-header">
        <div>
          <h1>{title}</h1>
        </div>
      </div>

      <ul className="portrait-grid">
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              className="portrait-tile"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`Open ${photo.title || `${ariaName} ${index + 1}`}`}
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

export default function Photography({
  showPortraits = false,
  showStreetPhotography = false,
  showFlora = false,
  showFauna = false,
  showTextures = false,
}) {
  return (
    <>
      <section id="photography" className="project-page photography-page">
        <h1>Photography</h1>

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
            </li>
          ))}
        </ul>
      </section>
      {showPortraits && (
        <NaturalPhotoGallery
          id="portraits"
          title="Portraits"
          photos={portraitImages}
          ariaName="portrait"
        />
      )}
      {showStreetPhotography && (
        <NaturalPhotoGallery
          id="street-photography"
          title="Street Photography"
          photos={streetPhotographyImages}
          ariaName="street photo"
        />
      )}
      {showTextures && (
        <NaturalPhotoGallery
          id="textures"
          title="Textures"
          photos={textureImages}
          ariaName="texture"
        />
      )}
      {showFlora && <FlowerGallery />}
      {showFauna && (
        <NaturalPhotoGallery
          id="fauna"
          title="Fauna"
          photos={faunaImages}
          ariaName="fauna photo"
        />
      )}
    </>
  )
}
