// FILE: client/src/App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [registrants, setRegistrants] = useState([]);
  const [formData, setFormData] = useState({ name: '', division: '' });
  const [status, setStatus] = useState('');


  const API_URL = "http://localhost:3000/api"; 

  useEffect(() => {
    fetchRegistrants();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const response = await fetch(`${API_URL}/registrants`);
      const data = await response.json();
      setRegistrants(data);
    } catch (error) {
      console.error("Gagal mengambil data. Cek server nyala ga?", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Mengirim...');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Pendaftaran Berhasil!');
        fetchRegistrants(); 
        setFormData({ name: '', division: '' });
      } else {
        setStatus(`Gagal: ${result.message}`);
      }
    } catch (error) {
      setStatus('Error koneksi ke server.');
    }
  };

  return (
    <div className="container">
      <h1>Pendaftaran Panitia Cultural Festival</h1>
      
      <div className="card">
        <h2>Form Pendaftaran</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="division"
            placeholder="Divisi (IT/Acara/Humas)"
            value={formData.division}
            onChange={handleChange}
            required
          />
          <button type="submit">Daftar Sekarang</button>
        </form>
        <p style={{color: 'red'}}>{status}</p>
      </div>

      <div className="list-area">
        <h2>Data Pendaftar</h2>
        <ul>
          {registrants.map((reg) => (
            <li key={reg.id}>
              <strong>{reg.name}</strong> - Divisi {reg.division}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App