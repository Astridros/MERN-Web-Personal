function register(req, res){
    console.log("se ha ejecutado el registro");

    res.status(200).send({
        message: "TODO OK"
    });
}

module.exports={
    register,
};