const axios = require("axios")
const {unlink} = require('fs')

const pageHome = async (req, res) => {
    const [mutate = null] = req.flash("mutate")
    const [deleted = null] = req.flash("delete")
    const response = await axios.get("http://localhost:2000/api/v1/cars")
    const cards = response.data
    res.render("pagehome", {
        card: cards,
        mutate: mutate,
        deleted: deleted
    });
};

const formHandler = async (req, res) => {
    if (req.files) {
        req.files.foto.mv(`./public/images/${req.files.foto.name}`)
    }
    // console.log(req.body)
    const size = await axios.get( "http://localhost:2000/api/v1/size",{
        params: {name: req.body.ukuran}
    })

    const response = await axios.post("http://localhost:2000/api/v1/cars",{
        model:req.body.nama,
        image:"/images/" + req.files.foto.name,
        rentPerDay:req.body.sewa,
        carSize: size.data[0].id
    })
    req.flash("mutate", true)
    res.redirect("/home")

};

const pageForm = async (req, res) => {
    res.render("pageform", {

    });
};

const pageUpdate = async (req, res) => {
    const{id} = req.params

    const size = await axios.get(`http://localhost:2000/api/v1/size`)
    const availableSize = size.data
    // console.log(availableSize)

    const response = await axios.get(`http://localhost:2000/api/v1/cars/${id}`)
    const initialData = response.data
    console.log(initialData)
    res.render("pageupdate", {
        initialData: initialData,
        availableSize: availableSize
    });
};

const updateCar = async (req, res) => {
    
    const{id} = req.params
    const file = req.files.foto

    // lama
    const response = await axios.get(`http://localhost:2000/api/v1/cars/${id}`)
    const initialData = response.data

    // ukuran
    const size = await axios.get( "http://localhost:2000/api/v1/size",{
        params: {name: req.body.ukuran}
    })
    // yg baru
    const update = await axios.put(`http://localhost:2000/api/v1/cars/${id}`,{
        model:req.body.nama,
        image:"/images/" + file.name,
        rentPerDay:req.body.sewa,
        carSize: size.data[0].id
    }) 
    if (req.files) {
        unlink(`./public${initialData.image}`, err => {

            if (err){
                throw new Error("error removing file")
            }
        })
        file.mv(`./public/images/${file.name}`)
        
    }
    req.flash("mutate", true)
    res.redirect('/home')
    
};

const deleteCar = async (req, res) => {
    const{id} = req.params
    const response = await axios.delete(`http://localhost:2000/api/v1/cars/${id}`)
    req.flash("delete", true)
    res.redirect("/home")
};

module.exports = { pageHome, pageForm, pageUpdate, formHandler, updateCar, deleteCar }
