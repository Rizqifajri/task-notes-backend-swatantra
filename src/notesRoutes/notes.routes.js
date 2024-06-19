const express = require('express')
const router = express.Router()
const notesController = require('../notesController/notes.controller')

router.get('/', notesController.getAllNotes);
router.get('/:id', notesController.getNoteById)
router.post('/', notesController.createNotes);
router.delete('/:id', notesController.deleteNotesById);
router.patch('/:id', notesController.editNotesById);


module.exports = router;