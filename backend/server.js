const express = require('express');
const cors = require('cors');
const data = require('./data.js');
const mongoose = require('mongoose');
const config = require('./config')
const userRouter = require('./router/userRoutes.js');
const bodyParser = require('body-parser');
const orderRouter = require('./router/orderRouter.js');


mongoose.connect(config.MONGODB_URL, {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {console.log('connect to mongodb..')})
.catch(err => console.log(err.reason))

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id)
  if(product){
    res.send(product)
  } else {
    res.status(404).send({message: 'ops!'})
  }
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'validationError' ? 400 : 500;
  res.status(status).send({message: err.message})
})

app.listen(5000, () => {
  console.log('server is running on port 5000...');
});
