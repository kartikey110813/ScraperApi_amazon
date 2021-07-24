const express = require('express');
const request = require('request-promise')

const app = express();
const PORT =  5000;
const apiKey = 'YOUR_API_KEY';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())

app.get('/',(req,res) => {
    res.send('welcome to amazon scrapper api')
})

// Routes
// Get the Product details

app.get('/products/:productId', async (req,res) => {
     const {productId} = req.params;

     try {
         const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`)

         res.json(JSON.parse(response))

     } catch (error) {
         res.json(error)
     }
})

// Get product reviews
app.get('/products/:productId/reviews', async (req,res) => {
    const {productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})

// Get product Offers
app.get('/products/:productId/offers', async (req,res) => {
    const {productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})

// Get Search results
app.get('/search/:searchQuery', async (req,res) => {
    const {searchQuery} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT,() => console.log('App is successfully running on host 5000'));