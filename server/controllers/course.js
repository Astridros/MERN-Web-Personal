const Course = require("../models/course");
const image = require("../utils/images")

async function createCourse(req, res){
    const course = new Course(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
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

module.exports = {
    createCourse,
    getCourses,
};