import express from 'express'
import { prisma } from './prisma';

const app = express();
app.use(express.json())

app.post('/feedbacks', (req, res) => {
 prisma.feedbacks.create({
  
 })
  

  return res.send('Hello World')
})

app.listen(3333, () => {
  console.log('Server ')
})