import express from 'express'

const router = express.Router()

router.get('/',(req,res)=>{
    res.json("You made it to health route, great success.");
})

export default router