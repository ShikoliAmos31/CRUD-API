const express = require('express')
const mongoose = require('mongoose')
const product = require('./models/productModel')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/', (req, res) => {
    res.send('Hello Node API')
})
app.get('/blog', (req, res) => {
    res.send('Hello Blog')
})

app.get('/products', async(req, res) => {
    try {
        const products = await product.find({});
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




app.post('/products', async(req, res) => {
   try {
       const product = await product.create(req.body)
       res.status(200).json(product);

   } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
   }
})

//update a produc
app.put('/products/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const product = await product.findByIdAndUpdate(id, req.body);
        //check if product exists in database
        if(!product) {
            return res.status(404).json({message: 'Product not found with ID ${id}'})
        }
        const updatedproduct = await product.findById(id);
        res.status(200).json(updatedproduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: 'product nott found with ID ${id} '})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

/*mongoose.set("strictQuery", false)*/
mongoose
.connect('mongodb+srv://amosshikoli:<Amo33154412>@cluster0.sa8te.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then (() => {
    console.log('Database connected')
    app.listen(3000, () => {
        console.log('Node Api is running n port 3000')
    });
}) .catch((error) => {
    console.log('Error connecting to database')
})
