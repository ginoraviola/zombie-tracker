import locations from "../database.js";

export const getLocations = async (req, res) => {
    res.status(200).json(locations);
}

export const getLocation = async (req, res) => {
    const { id } = req.params;
    const location = locations.find(l => l.key === id);
    res.status(200).json(location);
}

export const moveZombie = async (req, res) => {
    try {
        const {zombie, room, newLocation} = req.body;
        const index = locations.findIndex(l => l.key === room);
        const zombieIndex = locations[index].zombies.findIndex(z => z === zombie);
        if (index > -1 && zombieIndex > -1) {
            locations[index].zombies.splice(zombieIndex, 1);
            const newLocationIndex = locations.findIndex(l => l.key === newLocation);
            locations[newLocationIndex].zombies.push(zombie);

            res.status(200).json({message: 'Success!'});
            return;
        }
        res.status(400).json({message: 'No such zombies'});
    } catch (e) {
        res.status(400).json({message: 'Error relocating zombie'});
    }
    console.log(req);
    res.send(200);
}

export const removeZombie = async (req, res) => {
    const {room, zombie} = req.body;

    try {
        const index = locations.findIndex(location => location.key === room);
        const zombieIndex = locations[index].zombies.findIndex(z => z === zombie);

        if (zombieIndex > -1) {
            locations[index].zombies.splice(zombieIndex, 1);
            res.sendStatus(200);
            return;
        }
        res.status(400).json({message: 'Zombie does not exist'});
    } catch (e) {
        res.status(500).json({message: 'Ups, missed shot, error killing zombie'});
    }
}
