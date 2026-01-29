const bcrypt =require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/images");
const user = require("../models/user");

async function getMe(req, res){
    const{user_id} = req.user;

    const response = await User.findById(user_id);

    if(!response){
        res.status(400).send({message: "No se ha encontrado usuario"})
    } else{
        res.status(200).send(response)
    }
    
}

async function getUsers(req, res){
    const {active} = req.query;
    let response = null

    if(active === undefined){
        response = await User.find()
    } else{
        response = await User.find({active})
    }

    if(!response){
        res.status(400).send({message:"No se ha encontrado ningun menu"});
    }else{
        res.status(200).send(response);
    }
} 

async function createUser(req, res){
    const {password} = req.body;
    const user = new User({...req.body, active: false});

    const salt = bcrypt.genSaltSync(10)
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar, "avatar");
        user.avatar = imagePath;
    }

    try {
        const userStorage = await user.save();
        res.status(201).send(userStorage);
    } catch (error) {
        res.status(400).send({ message: "Error al crear el usuario" });
    }
}

async function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;

    // Encriptar password actualizada
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else{
        delete userData.password
    }
    
    //Actualizar imagen de avatar 
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
        
    }

    try {
        await User.findByIdAndUpdate(id, userData, { new: true });
        
        res.status(200).json({
            message: "Usuario actualizado"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
}

async function deleteUser(req, res){
    const {id} = req.params;

    try {
        await user.findByIdAndDelete(id)
        res.status(200).send({message: "Usuario eliminado"})

    } catch (error) {
        res.status(400).send({message:"Error al eliminar el usuario"})
        
    }
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};