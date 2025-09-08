const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.use(protect);

router.get('/', getContacts);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
