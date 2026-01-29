const Post = require("../models/post");
const image = require("../utils/images")

async function createPost(req, res){
    const post = new Post(req.body);
    post.createdAt = Date.now();

    const imagePath = image.getFilePath(req.files.miniature,"blog");
    post.miniature = imagePath;

    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        return res.status(400).json({message: "Error creating post", error});
    }
}

async function getPosts(req, res){
    const {page =1, limit=10} = req.query;
      try {
        const options = {
          page: parseInt(page),
          limit: parseInt(limit)
        };
    
        const posts = await Post.paginate({}, options);
    
        res.status(200).send(posts);
      } catch (error) {
        res.status(400).send({ message: "Error al obtener los posts", error });
    
      }
}

async function updatePost(req, res) {
    const { id } = req.params;
    const update = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(
            req.files.miniature,
            "blog"
        );
    
        update.miniature = imagePath;
      }
    
      try {
            await Post.findByIdAndUpdate(id, update, { new: true });
            
            res.status(200).json({
                message: "Post actualizado"
            });
    
        } catch (error) {
            res.status(400).json({
                message: "Error al actualizar el post",
                error: error.message
            });
        }

}

async function deletePost (req, res) {
    const { id } = req.params;

    try {
            await Post.findByIdAndDelete(id);
            res.status(200).send({message: "Post eliminado"})
        } catch (error) {
            res.status(400).json({
                message: "Error al eliminar post",
                error: error.message
            })
        }
}

async function getPost(req, res) {
    const { path } = req.params;

    try {
        const post = await Post.findOne({path});
        if(!post){
            return res.status(404).send({message: "Post no encontrado"});
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener el post",
            error: error.message
        })
    }


}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
};