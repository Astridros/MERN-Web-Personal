const Menu = require("../models/menu");

async function createMenu(req, res){
    const menu = new Menu(req.body);

    try {
        const userStorage = await menu.save();
        res.status(200).send(userStorage);
        
    } catch (error) {
        res.status(400).send({message:"Error al crear menu"})
    }
}


module.exports ={
    createMenu,
};