import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [showAnimals, setShowAnimals] = useState(true);
  const [showFlowers, setShowFlowers] = useState(true);
  const [showCars, setShowCars] = useState(true);
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const [photos, setPhotos] = useState([
    { id: 0, alt: "Mak", filename: "obraz1.jpg", category: 1, downloads: 35 },
    { id: 1, alt: "Bukiet", filename: "obraz2.jpg", category: 1, downloads: 43 },
    { id: 2, alt: "Dalmatyńczyk", filename: "obraz3.jpg", category: 2, downloads: 2 },
    { id: 3, alt: "Świnka morska", filename: "obraz4.jpg", category: 2, downloads: 53 },
    { id: 4, alt: "Rotwailer", filename: "obraz5.jpg", category: 2, downloads: 43 },
    { id: 5, alt: "Audi", filename: "obraz6.jpg", category: 3, downloads: 11 },
    { id: 6, alt: "kotki", filename: "obraz7.jpg", category: 2, downloads: 22 },
    { id: 7, alt: "Róża", filename: "obraz8.jpg", category: 1, downloads: 33 },
    { id: 8, alt: "Świnka morska", filename: "obraz9.jpg", category: 2, downloads: 123 },
    { id: 9, alt: "Foksterier", filename: "obraz10.jpg", category: 2, downloads: 22 },
    { id: 10, alt: "Szczeniak", filename: "obraz11.jpg", category: 2, downloads: 12 },
    { id: 11, alt: "Garbus", filename: "obraz12.jpg", category: 3, downloads: 321 }
  ]);

  const filteredPhotos = photos.filter((p) => {
    if (p.category === 1 && showFlowers) {
      return true;
    } else if (p.category === 2 && showAnimals) {
      return true;
    } else if (p.category === 3 && showCars) {
      return true;
    }
    return false;
  });

  const currentPhoto = filteredPhotos[currentPhotoIndex];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === filteredPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? filteredPhotos.length - 1 : prevIndex - 1
    );
  };

  function downloadsUpdate(id) {
    const photosNew = [...photos];
    for (const p of photosNew) {
      if (p.id === id) {
        p.downloads++;
        break;
      }
    }
    setPhotos(photosNew);
  }

  function enlarge(id) {
    setEnlargedPhoto(enlargedPhoto === id ? null : id);
  }

  return (
    <>
      <h1 className="text-center my-4">Kategorie zdjęć</h1>

      <div className="d-flex justify-content-center mb-4">
        <div className="form-check form-switch mx-2">
          <input
            type="checkbox"
            name="kwiaty"
            id="kwiaty"
            className="form-check-input"
            checked={showFlowers}
            onChange={() => setShowFlowers(!showFlowers)}
          />
          <label htmlFor="kwiaty" className="form-check-label">
            Kwiaty
          </label>
        </div>
        <div className="form-check form-switch mx-2">
          <input
            type="checkbox"
            name="zwierzeta"
            id="zwierzeta"
            className="form-check-input"
            checked={showAnimals}
            onChange={() => setShowAnimals(!showAnimals)}
          />
          <label htmlFor="zwierzeta" className="form-check-label">
            Zwierzeta
          </label>
        </div>
        <div className="form-check form-switch mx-2">
          <input
            type="checkbox"
            name="samochody"
            id="samochody"
            className="form-check-input"
            checked={showCars}
            onChange={() => setShowCars(!showCars)}
          />
          <label htmlFor="samochody" className="form-check-label">
            Samochody
          </label>
        </div>
      </div>

      {currentPhoto && (
        <div className="d-flex justify-content-center position-relative">
          <button
            className="btn btn-outline-dark position-absolute start-0 top-50 translate-middle-y"
            onClick={prevPhoto}
          >
            &#10094;
          </button>
          <div className="d-flex flex-column align-items-center">
            <img
              src={`/assets/${currentPhoto.filename}`}
              alt={currentPhoto.alt}
              className={`rounded ${enlargedPhoto === currentPhoto.id ? 'enlarged' : ''}`}
              style={{
                margin: '5px',
                width: enlargedPhoto === currentPhoto.id ? '500px' : '300px',
                transition: 'width 0.3s ease-in-out',
              }}
            />
            <div className="mt-2">
              <h4>Pobrania: {currentPhoto.downloads}</h4>
              <button
                className="btn btn-success mx-1"
                onClick={() => downloadsUpdate(currentPhoto.id)}
              >
                Pobierz
              </button>
              <button
                className="btn btn-primary mx-1"
                onClick={() => enlarge(currentPhoto.id)}
              >
                {enlargedPhoto === currentPhoto.id ? 'Zwiń' : 'Powiększ'}
              </button>
            </div>
          </div>
          <button
            className="btn btn-outline-dark position-absolute end-0 top-50 translate-middle-y"
            onClick={nextPhoto}
          >
            &#10095;
          </button>
        </div>
      )}

      {filteredPhotos.length === 0 && (
        <div className="text-center mt-4">
          <p>Brak zdjęć w tej kategorii. Wybierz inną kategorię!</p>
        </div>
      )}
    </>
  );
}

export default App;
