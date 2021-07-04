const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('images'));
app.use(fileUpload());
app.get('/', (req,res) => {
  res.send('res go  then send')
})


require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ybyba.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("bdgrocery").collection("products");
  const checkOutCollection = client.db("bdgrocery").collection("checkout");
  const orderCollection = client.db("bdgrocery").collection("order");
  app.get('/products',(req,res) => {
    collection.find({}).toArray((err, documents) => {
      res.send(documents);
      // console.log(documents)
    })
  })
  app.get('/products/:id', (req,res) => {
    const id = req.params.id; 
    collection.find({_id: ObjectId(id)})
    .toArray((err,documents) => {
      res.send(documents[0]);
    })
  })
  app.post('/buy', (req,res) => {
    checkOutCollection.insertOne(req.body)
    .then (result => {
      res.send(result.insertedCount > 0)
    })
    // console.log(err)
  })
  app.post('/checkout', (req,res) => {
    checkOutCollection.insertOne(req.body)
    .then (result => {
      res.send(result.insertedCount > 0)
    })
  })
  app.post('/order', (req,res) => {
    orderCollection.insertOne(req.body)
    .then (result => {
      res.send(result.insertedCount > 0)
    })
  })
  app.get('/order', (req,res) => {
    orderCollection.find({email: req.query.email}).toArray((err, documents) => {
      res.send(documents);
      // console.log(documents)
    })
  })
  app.get('/checkout', (req,res) => {
    checkOutCollection.find({email:req.query.email}).toArray((err, documents) => {
      res.send(documents);
      // console.log(documents)
    })
  })
  app.post('/addProduct', (req, res) => {
    // const file = req.files.image;
    const title = req.body.title;
    const price = req.body.price;
    // const newImg = image.data;
    // const encImg = newImg.toString('base64');

    // var image = {
    //     contentType: file.mimetype,
    //     size: file.size,
    //     img: Buffer.from(encImg, 'base64')
    // };

    collection.insertOne({ title, price })
    .then(result => {
        res.send(result.insertedCount > 0);
    })
  })
  app.delete('/delete/:id',(req,res) => {
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then( result => {
      res.send(result.deletedCount > 0)
    })
  })
  console.log(err);
  console.log('Database Connected Successfully');
  // app.post('/addEvents', (req,res) => {
  //   const events = req.body;
  //   collection.insertMany(events, (err, result) => {
  //     console.log(err,result);
  //     res.send({count:result});
  //   })
  // })
  // app.get('/events', (req,res) => {
  //   res.send('res go + then send')

  // })
  
  // collection.insertOne(items)
  // .then(res => {console.log('one product added')})
  // perform actions on the collection object

  
});

app.listen(process.env.PORT || 5000, () => console.log('Port 5000'))
