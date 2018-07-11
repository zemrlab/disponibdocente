import axios from 'axios';

export default axios.create({
    baseURL: `https://sigap-disponibilidad-servicios.herokuapp.com/`
});

// FASE DESARROLLO
// `http://localhost:8000/`

// FASE PRODUCCION
// `https://apidisponibilidad.herokuapp.com/`
