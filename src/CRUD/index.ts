import express from 'express';

const app = express();

app.use(express.json());

type Vehicle = {
    id: number;
    name: string;
    price: number;
}

let vehicles: Vehicle[] = [
    { id: 1, name: 'Car', price: 20000 },
    { id: 2, name: 'Bike', price: 1500 },
    { id: 3, name: 'Truck', price: 50000 }
];

// Create a new vehicle
app.post('/vehicles', (req, res) => {
    const { name, price } = req.body;
    const newVehicle = {
        id: vehicles.length + 1,
        name,
        price
    };
    vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
});

// Read all vehicles
app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

// Read a single vehicle by ID
app.get('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).send('Vehicle not found');
    res.json(vehicle);
});

// Update a vehicle by ID
app.put('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).send('Vehicle not found');

    const { name, price } = req.body;
    vehicle.name = name || vehicle.name;
    vehicle.price = price || vehicle.price;

    res.json(vehicle);
});

// Delete a vehicle by ID
app.delete('/vehicles/:id', (req, res) => {
    const vehicleIndex = vehicles.findIndex(v => v.id === parseInt(req.params.id));
    if (vehicleIndex === -1) return res.status(404).send('Vehicle not found');

    const deletedVehicle = vehicles.splice(vehicleIndex, 1);
    res.json(deletedVehicle[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});