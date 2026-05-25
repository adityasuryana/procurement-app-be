const { Qrcontact } = require('../models');

const getAllQrContacts = async (req, res) => {
    try {
        const qrcontacts = await Qrcontact.findAll();
        res.status(200).json(qrcontacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQrContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const qrcontact = await Qrcontact.findByPk(id);
        if (!qrcontact) {
            return res.status(404).json({ message: 'QR Contact not found' });
        }
        res.status(200).json(qrcontact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createQrContact = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, position, company, website } = req.body;
        const qrcontact = await Qrcontact.create({ firstName, lastName, phone, email, position, company, website });
        res.status(201).json(qrcontact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateQrContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, position, company, website } = req.body;
        const qrcontact = await Qrcontact.findByPk(id);
        if (!qrcontact) {
            return res.status(404).json({ message: 'QR Contact not found' });
        }
        qrcontact.firstName = firstName;
        qrcontact.lastName = lastName;
        qrcontact.phone = phone;
        qrcontact.email = email;
        qrcontact.position = position;
        qrcontact.company = company;
        qrcontact.website = website;
        await qrcontact.save();
        res.status(200).json(qrcontact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteQrContact = async (req, res) => {
    try {
        const { id } = req.params;
        const qrcontact = await Qrcontact.findByPk(id);
        if (!qrcontact) {
            return res.status(404).json({ message: 'QR Contact not found' });
        }
        await qrcontact.destroy();
        res.status(200).json({ message: 'QR Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllQrContacts, getQrContactById, createQrContact, updateQrContact, deleteQrContact };