const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
app.use(express.json())
app.get('/', (req,res) => {
  res.send('res go  then send')
})


require('dotenv').config()
const password = '22892289';

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6b83g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("freshvalley").collection("products");
  const items = {name: 'apple2', price: 80, quantity: '1kg'};
  app.get('/products',(req,res) => {
    collection.find({}).toArray((err, documents) => {
      // res.send(documents);
      console.log(documents)
    })
  })
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
  console.log('database connected')
  
});
app.listen(5000, () => console.log('this is another side of the world'))