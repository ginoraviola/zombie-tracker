let locations = [
    {
        key: 'school-key',
        label: 'School',
        zombies: []
    },
    {
        key: 'warehouse-key',
        label: 'Warehouse',
        zombies: []
    },
    {
        key: 'hospital-key',
        label: 'Hospital',
        zombies: []
    },
];

export const hydrateDatabase = () => {
    locations.forEach(location => {
        const zombiesAmount = Math.floor(Math.random() * (15 - 2) + 2);
        for (let i = 0; i <= zombiesAmount; i++) {
            location.zombies.push(`${location.key}-${genId()}`);
        }
    })
}

const genId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export default locations;
