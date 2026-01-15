const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");


async function register(req, res){
    try {
        const { firstname, lastname, email, password } = req.body;

        if(!email) return res.status(400).send({message: "El email es obligatorio"});
        if(!password) return res.status(400).send({message: "La contraseña es obligatoria"});

        const user = new User({
            firstname,
            lastname,
            email: email.toLowerCase(),
            role: "user",
            active: false
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        user.password = hashPassword;

        const userStorage = await user.save();

        return res.status(200).send(userStorage);

    } catch (error) {

        if(error.code === 11000){
            return res.status(400).send({message: "El email ya está registrado"});
        }

        return res.status(500).send({message: "Error al crear el usuario", error});
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ message: "El email es obligatorio" });
    if (!password) return res.status(400).send({ message: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    try {
        const userStorage = await User.findOne({ email: emailLowerCase });

        if (!userStorage) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        bcrypt.compare(password, userStorage.password, (bcryptError, check) =>{
            if(bcryptError){
                res.status(500).send({message: "Error del servidor"})
            } else if(!check){
                res.status(400).send({message: "Contraseña incorrecta"})
            } else if(!userStorage.active){
                res.status(401).send({message: "Usuario no autorizado o no activo"})
            } else{
                res.status(200).send({
                    acces: jwt.createAccesToken(userStorage),
                    refresh: jwt.createRefreshToken(userStorage),
                });
            }
        }) 

        

    } catch (error) {
        return res.status(500).send({ message: "Error del servidor" });
    }
}

async function refreshAccessToken(req, res){
    const {token} = req.body;

    if(!token) res.status(400).send({message: "Token requerido"});

    const{user_id} = jwt.decoded(token);

    const userStorage = await User.findOne({_id: user_id});

    if(!userStorage){
        res.status(500).send({message: "Error del servidor"})
    } else{
        res.status(200).send({
            accessToken: jwt.createAccesToken(userStorage)
        })
    }

}

module.exports={
    register,
    login,
    refreshAccessToken,
};