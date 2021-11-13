const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 8080;

const bodyParser = require ('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {value: '', title: ''} );
});

app.post('/send-url', urlencodedparser, async (req, res) => {
    let url = req.body.myurl;

    await (async () => {
        const response = await got(url);
        const $ = cheerio.load (response.body);
        
        let title = $ ('h1').html();
        let value = $ ('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"]').html();

        res.render('index', {value: value, title: title} );
    })();

});

app.listen(PORT, () => {
    console.log(`O servidor está ouvir na porta ${PORT}`);
});