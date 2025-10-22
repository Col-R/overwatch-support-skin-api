import express from "express";
import jsondata  from '../data.json'

import { Hero, Skin } from './types'

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

// get all heroes
app.get('/heroes', (_req, res) : void => {
    res.json(data)
})

//get hero by id
app.get('/heroes/:id' , (req, res) => {
    const heroId = req.params.id;
    const hero = data.find((h) => h.id === heroId)

    if (!hero) {
        return res.status(404).json( {error: 'Hero not found'})
    }
    res.json(hero)
})

// get all skins for all heroes
// app.get('/skins', (req, res) => {
//     const allSkins : Skin[] = data.flatMap((hero) => hero.skins);
//     res.json(allSkins)
// })

// filter skins for all heroes by rarity
// example: GET/skins?rarity=mythic
app.get('/skins', (req, res) => {
    const rarity  = req.query.rarity;
    let skins = data.flatMap((hero) => hero.skins);

    if (rarity && typeof rarity === 'string') {
        skins = skins.filter((s) => s.rarity === rarity)
    }
    res.json(skins)
})


// get all skins for a specific hero
// app.get('/heroes/:id/skins', (req, res) => {
//     const heroId = req.params.id;
//     const hero = data.find((h) => h.id === heroId)
//         if (!hero) {
//         return res.status(404).json( {error: 'Hero not found'})
//     }   
//     res.json(hero.skins)
    
// })


// filter skins for a specific hero by rarity
// example: GET/heroes/:id/skins?rarity=epic

app.get('/heroes/:id/skins', (req, res) => {
    const heroId = req.params.id;
    const hero = data.find((h) => h.id === heroId)
        if (!hero) {
        return res.status(404).json( {error: 'Hero not found'})
    }
    const rarity = req.query.rarity;

    let skins = hero.skins;
    if (rarity && typeof rarity === 'string') {
        skins = skins.filter((skin) => skin.rarity.toLowerCase() === rarity)
    }

    if (skins.length === 0) {
        return res.status(404).json ( {message: `No ${rarity} skins found for ${hero}`})
    }

    res.json(skins)

})





app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})