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

async function getMenus(req, res){
    const {active} = req.query;

    let response = null
    
    if(active === undefined){
        response = await Menu.find().sort({order: "asc"});
    } else{
        response = await Menu.find({active}).sort({order: "asc"});
    }
    
    if(!response){
        res.status(400).send({message:"No se ha encontrado ningun menu"});
    }else{
        res.status(200).send(response);
    }
}

async function updateMenu(req,res){
    const {id} = req.params;
    const menuData = req.body;

    try {
         await Menu.findByIdAndUpdate(id, menuData, { new: true });
            
        res.status(200).json({
            message: "Menu actualizado"
        });
    
    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el menu",
            error: error.message
        });
    }
}

async function deleteMenu(req, res){
    const {id} = req.params

    try {
        await Menu.findByIdAndDelete(id);
        res.status(200).send({message: "Menu eliminado"})
    } catch (error) {
        res.status(400).send.json({
            message: "Error al eliminar menu",
            error: error.message
        })
    }
}


module.exports ={
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
};