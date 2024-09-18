const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoute')
const uploadRoute = require('./routes/cloudinaryRouter');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const doctorRoute = require('./routes/doctorRoute');
const labRoute = require('./routes/labRoute');
const searchRoute = require('./routes/searchRoute');
const cartRoute = require('./routes/cartRoute');
const appointmentRoutes = require('./routes/appointmentsRoutes');






dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes

app.use('/api/users',userRouter);
app.use('/api/images', uploadRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/labs',labRoute);
app.use('/api/',searchRoute);
app.use('/api/cart',cartRoute);
app.use('/api/appointments', appointmentRoutes);





mongoose.connect(process.env.MONGO_URI,{ssl:true})
.then(() => console.log("Mongodb Connected"))
.catch((error) => console.error(error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));



