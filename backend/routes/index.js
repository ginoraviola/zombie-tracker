import express from 'express';
import {getLocation, getLocations, removeZombie} from "../controllers/zombies.js";
import {moveZombie} from "../controllers/zombies.js";

const router = express.Router();

router.get('/locations', getLocations);
router.get('/location/:id', getLocation);

router.post('/relocate', moveZombie);
router.post('/remove', removeZombie);

export default router;
