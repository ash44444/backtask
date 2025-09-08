const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  const { name, type } = req.query;
  const query = { businessId: req.user._id };
  if (name) query.name = new RegExp(name, 'i');
  if (type) query.type = type;
  try {
    const contacts = await Contact.find(query);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addContact = async (req, res) => {
  const { name, phone, email, address, type } = req.body;
  try {
    const contact = new Contact({
      name,
      phone,
      email,
      address,
      type,
      businessId: req.user._id
    });
    await contact.save();
    res.status(201).json({ message: 'Contact added', contact });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, businessId: req.user._id },
      updates,
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact updated', contact });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOneAndDelete({ _id: id, businessId: req.user._id });
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
