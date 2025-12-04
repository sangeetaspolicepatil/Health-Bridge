import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import bedRouter from './routes/bedRoutes.js';
import patientRecordRoutes from "./routes/patientRecordRoutes.js";
import path from 'path';



//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())
// Serve uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))

//api endpoints
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/bed', bedRouter);
app.use('/api/doctor', patientRecordRoutes);
app.use('/api/user', patientRecordRoutes);

app.use('/api/admin', patientRecordRoutes);


app.get('/', (req, res) => {
    res.send('API WORKING')
})

app.listen(port, () => console.log("Server Started ", port))
