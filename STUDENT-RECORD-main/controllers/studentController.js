const Student = require('../models/Student');

// GET /students - fetch all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// POST /students - add new student
exports.createStudent = async (req, res) => {
  try {
    const { name, course, age, city } = req.body;

    // Basic server-side validation
    if (!name || !course) {
      return res.status(400).json({ success: false, message: 'Name and course are required' });
    }

    const newStudent = new Student({ name, course, age, city });
    const saved = await newStudent.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    // If Mongoose validation error, send 400
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// PUT /students/:id - update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// DELETE /students/:id - delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
