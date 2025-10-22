import express from "express";
import jsondata  from '../data.json'

import { Hero } from './types'

// this was weird to debug. it has to be as Hero. Can't be 'satisfies' or data: Hero[].
// it treated "support" as a literal type instead of the "support" | "damage" | "tank" union type and failed
// the fix was to write it as follows:
const data = jsondata as Hero[];
// This is the go to fix when importing static JSON because it doesn't narrow the literals

const app = express()
const PORT  = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (_req, res) : void => {
    res.send("overwatch api is alive")
});

app.get('/heroes', (_req, res) : void => {
    res.json(data)
})

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})