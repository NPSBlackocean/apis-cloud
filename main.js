import express from 'express';
import http from 'http';

const app = express();
const port = 3000;

// URL da qual buscar os dados
const apiUrl = 'https://servicos-cloud.saude.gov.br/pni-bff/v1/autenticacao/tokenAcesso';

// Endpoint para servir a página principal
app.get('/', async (req, res) => {
    try {
        // Faz a requisição GET para a API
        http.get(apiUrl, (apiRes) => {
            let data = '';

            // Recebe os dados em pedaços
            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            // Quando a resposta completa for recebida
            apiRes.on('end', () => {
                // Converte os dados para JSON
                const jsonData = JSON.parse(data);

                // Envia o HTML como resposta
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Data from API</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            pre { background: #f4f4f4; padding: 10px; border-radius: 4px; }
                        </style>
                    </head>
                    <body>
                        <h1>Data from URL</h1>
                        <pre id="data-container">${JSON.stringify(jsonData, null, 2)}</pre>
                    </body>
                    </html>
                `);
            });
        }).on('error', (err) => {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
 