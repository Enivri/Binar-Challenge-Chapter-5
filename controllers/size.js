const models = require('../models');

const Size = models.Size

const getSize = async (req, res) =>  {
    const query = req.query
    const sizes = await Size.findAll({
        where : query
    })
    res.send(sizes);
};


module.exports = { getSize, }
