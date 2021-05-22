const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    res.send(courses);
  });
  const courses = [
    {
      id: 1,
      name: " Course 1",
    },
    {
      id: 2,
      name: " Course 2",
    },
    {
      id: 3,
      name: " Course 3",
    },
    {
      id: 4,
      name: " Course 4",
    },
  ];
  router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
  
    if (!course) {
      //404
      res.status(404).send("Course with the given id was not found");
    }
    res.send(course);
  });
  
  router.post("/", (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
  });
  
  router.put("/:id", (req, res) => {
    //Look for the course
    // If not found, return 404
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Data not found");
  
    // Validate
    // If invalid , return 400 bad request
    const result = validateCourse(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
  
    //update course
    //return updated course
  
    course.name = req.body.name;
    res.send(course);
  });
  
  router.delete("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).send("Course Not Found");
    }
  
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
  });
  
  function validateCourse(course) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
  }
  
  module.exports = router;