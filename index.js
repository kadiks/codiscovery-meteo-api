require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { request } = require('gaxios');

const { PORT =  3000 } = process.env;

const HOST = 'https://www.metaweather.com';

const app = express();

app.get('*', async (req, res) => {
    // console.log('req.url', req.url);
    if (req.url.startsWith('/api')) {
        const { data } = await axios.get(`${HOST}${req.url}`);
        res.json(data);
        return;
    }
    if (req.url.startsWith('/static')) { 
        // https://stackoverflow.com/a/64531817/185771
        (await request({
            url:`${HOST}${req.url}`,
            responseType: 'stream'
        })).data.pipe(res);
        return;
    }
    res.send('Your url should start with: /api');
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});