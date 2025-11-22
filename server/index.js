require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


const registrants = [
    { id: 1, name: 'Budi Santoso', division: 'Acara' },
    { id: 2, name: 'Siti Aminah', division: 'Humas' }
];


// app.use(cors());
// app.use(express.json());

// Route Cek Server
app.get('/', (req, res) => {
    res.send('Server Cultural Festival Ready!');
});

// Route Ambil Data
app.get('/api/registrants', (req, res) => {
    res.json(registrants);
});

// Route Daftar Baru
app.post('/api/register', (req, res) => {

    const { nama_lengkap, divisi } = req.body; 

    if (!nama_lengkap || !divisi) {
        return res.status(400).json({ message: 'Data tidak lengkap!' });
    }

    const newRegistrant = {
        id: registrants.length + 1,
        name: nama_lengkap,
        division: divisi
    };

    registrants.push(newRegistrant);
    res.status(201).json({ message: 'Berhasil mendaftar', data: newRegistrant });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});