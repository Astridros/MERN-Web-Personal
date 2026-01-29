const Course = require("../models/course");
const image = require("../utils/images")

async function createCourse(req, res){
    const course = new Course(req.body);

    const imagePath = image.getFilePath(
        req.files.miniature,
        "course" 
    );

    course.miniature = imagePath;

    try {
        const courseStorage = await course.save();
        res.status(200).send(courseStorage);
        
    } catch (error) {
        res.status(400).send({message:"Error al crear el curso"})
    }

}

async function getCourses(req, res) {
    const {page =1, limit=10} = req.query;
  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    };

    const courses = await Course.paginate({}, options);

    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: "Error al obtener los cursos" });

  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const update = req.body;

  if(req.files.miniature){
    const imagePath = image.getFilePath(
        req.files.miniature,
        "course"
    );

    update.miniature = imagePath;
  }

  try {
        await Course.findByIdAndUpdate(id, update, { new: true });
        
        res.status(200).json({
            message: "Curso actualizado"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al actualizar el curso",
            error: error.message
        });
    }
}

async function deleteCourse(req, res){
    const {id} = req.params;

    try {
        await Course.findByIdAndDelete(id);
        res.status(200).send({message: "Curso eliminado"})
    } catch (error) {
        res.status(400).send.json({
            message: "Error al eliminar curso",
            error: error.message
        })
    }
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
};