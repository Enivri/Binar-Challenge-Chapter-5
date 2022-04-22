const models = require('../models')

const Cars = models.Cars

const getCars = async (req, res) => {
    const cars = await Cars.findAll()
    res.send(cars);
};

const postCars = async (req, res) => {
    const cars = await Cars.create({
        ...req.body
    })
    res.send(cars);
};

const getCarsUpdate = async (req, res) => {
    const { id } = req.params
    const cars = await Cars.findOne({
        where: {
            id
        }
    })
    res.send(cars);
};

const updateCar = async (req, res) => {
    const car = await Cars.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    })
    res.send(car)
};

const deleteCar = async (req, res) => {
    const car = await Cars.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).send()
};



module.exports = { getCars, postCars, getCarsUpdate, updateCar, deleteCar }