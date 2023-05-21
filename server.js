const express= require("express")
const app= express()
const Product= require("./models/productModel")
const mongoose= require ("mongoose")

//middleware(can accept json)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/',(req,res)=>{
    res.send('Hey prekvy ')
})

//for gettin all the items from database
app.get('/product', async(req,res)=>{
    try{
       const product = await Product.find({});
       res.status(200).json(product)
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//for getting one item by id
app.get('/product/:id', async(req,res)=>{
    try{
        const {id} =req.params;
      const product= await Product.findById(id);
      res.status(200).json(product);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:err.message})
    }
})

app.post('/product',async(req,res)=>{
   try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
   }catch(err){
    console.log(err.message);
    res.status(500).json({message:err.message})
   }
})

//used update product
app.put('/product/:id', async(req,res)=>{
    try{
         const {id} =req.params;
         const product = await Product.findByIdAndUpdate(id, req.body);
         if(!product){
            return res.status(404).json({message:`cannot find product id ${id}`})
         }
         const updatedProduct = await Product.findById(id)
         res.status(200).json(updatedProduct);
    }catch(err){
          res.status(400).json({message:message.error})
    }
})

//delete product
app.delete('/product/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot not find by ${id}`})
        }
        res.status(200).json(product);

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

mongoose.connect("mongodb+srv://preksha:admin123@cluster0.yy2so1p.mongodb.net/Node-API")
.then(()=>{
    app.listen(3000,()=>{
        console.log("running");
    })
    console.log("mongo connected")
}).catch((error)=>{
    console.log(error)
})