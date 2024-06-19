const pool = require('../db/db')

// Menampilkan semua notes
const getAllNotes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes');
    return res.status(200).send({ success: true, data: result.rows });
  } catch (error) {
    console.log("Error uy", error);
    return res.status(500).send({ message: error.message });
  }
};

// Menampilkan notes yang di pilih By ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`SELECT * FROM notes WHERE id = $1`, [id])
    return res.status(200).send({
      success: true,
      data: 
      result.rows[0]
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: error.message })
  }
}

// Membuat notes
const createNotes = async (req, res) => {
  try {
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
      return res.status(400).send({ success: false, message: 'All fields are required' });
    }
    const result = await pool.query('INSERT INTO notes (title, datetime, note) VALUES ($1, $2, $3) RETURNING *', [title, datetime, note]);
    return res.status(200).send({
      success: true,
      data: {
        title,
        datetime,
        note
      },
      message: 'Note created successfully'
    });
  } catch (error) {
    console.error("Error while creating note:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
}

// Mengubah atau Mengedit notes
const editNotesById = async (req, res) => {
  try {
    const { id } = req.params.id
    const { title, datetime, note } = req.body
    const result = await pool.query(`UPDATE notes SET title = $1, datetime = $2, note = $3 WHERE id = $4 RETURNING *`, [title, datetime, note, id])
    if (!result.rows.length === 0) {
      return res.status(404).send({ success: false, message: 'Note not found' })
    }
    return res.status(200).send({
      success: true,
      data: { title, datetime, note },
      message: 'Noted Succesfully updated!'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: error.message });
  }
}

// Menghapus notes yang dipilih
const deleteNotesById = async (req, res) => {
  try {
    const noteId = req.params.id
    const deleteNoted = await pool.query(`DELETE FROM notes WHERE id = $1`, [noteId])
    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error while creating note:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}



module.exports = {
  getAllNotes,
  getNoteById,
  createNotes,
  editNotesById,
  deleteNotesById
}