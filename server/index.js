// server/index.js

const express = require("express");
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 3001;

const app = express();
// Configurar CORS
app.use(cors());

app.get("/api", (req, res) => {
    console.log('holis');
    res.json({ message: "Hola desde el servidor!" });
});

app.get("/api/items/q=:query", async (req, res) => {
    try {
        // Obtener el valor de la URL
        const { query } = req.params;
        // URL de la API externa con el valor proporcionado
        const apiUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
        // Realizar la solicitud utilizando axios
        const response = await axios.get(apiUrl);
        // Enviar la respuesta de la API externa como respuesta de tu servidor
        res.json(response.data);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API externa:', error);
        res.status(500).json({ error: 'Error al consultar la API externa' });
    }
});

app.get("/api/items/:id", async (req, res) => {
    try {
        // Obtener el valor de la URL
        const { id } = req.params;
        // console.log(req);
        // console.log(id);
        // URL de la API externa con el valor proporcionado
        const apiUrl = `https://api.mercadolibre.com/items/${id}`;
        const apiUrl2 = `https://api.mercadolibre.com/items/${id}/description`;
        // Realizar la solicitud utilizando axios
        const response = await axios.get(apiUrl);
        // console.log('response: ',response);
        const response2 = await axios.get(apiUrl2);
        // console.log('response2: ',response2);

        // Unir los datos
        const resultado = { ...response.data, ...response2.data };

        // console.log('resultado: ', resultado);
        // Enviar la respuesta de la API externa como respuesta de tu servidor
        res.json(resultado);
    } catch (error) {
        console.error('Error al realizar la solicitud a la API externa:', error);
        res.status(500).json({ error: 'Error al consultar la API externa' });
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 