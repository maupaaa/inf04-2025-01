import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [showAnimals, setShowAnimals] = useState(true)
  const [showFlowers, setShowFlowers] = useState(true)
  const [showCars, setShowCars] = useState(true)

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
  ])

  const filtredPhotos = photos.filter(p => {
    if (p.category === 1 && showFlowers) {
      return true;
    } else if (p.category === 2 && showAnimals) {
      return true;
    } else if (p.category === 3 && showCars) {
      return true;
    }

    return false;
  })
  function downloadsUpdate(id) {
    const photosNew = [...photos]

    for (const p of photosNew) {
      if (p.id === id) {
        p.downloads++;
        break;
      }
    }
    setPhotos(photosNew)
  }
  return (
    <>
      <h1>Kategorie zdjęć</h1>
      <div className="form-check form-switch form-check-inline">
        <input type="checkbox" name="kwiaty" id="kwiaty" className="form-check-input" checked={showFlowers}onChange={()=>setShowFlowers(!showFlowers)}></input>
          <label for="kwiaty" className="form-check-label">Kwiaty</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input type="checkbox" name="zwierzeta" id="zwierzeta" className="form-check-input" checked={showAnimals}onChange={()=>setShowAnimals(!showAnimals)}></input>
          <label for="zwierzeta" className="form-check-label">Zwierzeta</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input type="checkbox" name="samochody" id="samochody" className="form-check-input" checked={showCars}onChange={()=>setShowCars(!showCars  )}></input>
          <label for="samochody" className="form-check-label">Samochody</label>
      </div>
      <div className='row'>
        {filtredPhotos.map(p=>(
          <div key={p.id} className='col'>
            <img  src={`/assets/${p.filename}`} alt={p.alt} className='rounded' style={{margin:"5px"}}></img>
            <h4>pobrań: {p.downloads}</h4>
            <button className='btn btn-success' onClick={()=> downloadsUpdate(p.id)}>Pobierz</button>
          </div>
        ))}
      </div>
    </>

  );
}

export default App;
