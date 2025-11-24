const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /students
router.get('/', studentController.getStudents);

// POST /students
router.post('/', studentController.createStudent);

// PUT /students/:id
router.put('/:id', studentController.updateStudent);

// DELETE /students/:id
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
