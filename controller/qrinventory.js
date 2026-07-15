const { Qrinventory } = require('../models');
const PDFDocument = require('pdfkit');

const getAllQrInventories = async (req, res) => {
    try {
        const inventories = await Qrinventory.findAll();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQrInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Qrinventory.findByPk(id);
        if (!inventory) {
            return res.status(404).json({ message: 'QR Inventory item not found' });
        }
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createQrInventory = async (req, res) => {
    try {
        const { name, code, category, location, status, quantity, description } = req.body;
        // Check if code already exists
        const existing = await Qrinventory.findOne({ where: { code } });
        if (existing) {
            return res.status(400).json({ error: `Kode Inventory "${code}" sudah terdaftar.` });
        }
        const inventory = await Qrinventory.create({ name, code, category, location, status, quantity, description });
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateQrInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, category, location, status, quantity, description } = req.body;
        const inventory = await Qrinventory.findByPk(id);
        if (!inventory) {
            return res.status(404).json({ message: 'QR Inventory item not found' });
        }

        // Check unique code if changed
        if (code !== inventory.code) {
            const existing = await Qrinventory.findOne({ where: { code } });
            if (existing) {
                return res.status(400).json({ error: `Kode Inventory "${code}" sudah terdaftar.` });
            }
        }

        inventory.name = name;
        inventory.code = code;
        inventory.category = category;
        inventory.location = location;
        inventory.status = status;
        inventory.quantity = quantity;
        inventory.description = description;

        await inventory.save();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteQrInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Qrinventory.findByPk(id);
        if (!inventory) {
            return res.status(404).json({ message: 'QR Inventory item not found' });
        }
        await inventory.destroy();
        res.status(200).json({ message: 'QR Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const downloadPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Qrinventory.findByPk(id);
        if (!inventory) {
            return res.status(404).json({ message: 'QR Inventory item not found' });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="Inventory_${inventory.code}.pdf"`);

        doc.pipe(res);

        // Header Title
        doc.font('Helvetica-Bold')
           .fillColor('#4F46E5')
           .fontSize(20)
           .text('PT DUTA ESA ADIPERKASA', { align: 'center' });

        doc.font('Helvetica')
           .fillColor('#475569')
           .fontSize(9)
           .text('Sistem Informasi Manajemen Aset & Inventory', { align: 'center' });

        doc.moveDown(1);

        // Divider
        doc.strokeColor('#CBD5E1')
           .lineWidth(1)
           .moveTo(50, doc.y)
           .lineTo(562, doc.y)
           .stroke();

        doc.moveDown(2);

        // Document Heading
        doc.font('Helvetica-Bold')
           .fillColor('#1E293B')
           .fontSize(14)
           .text('SPESIFIKASI DETAIL ASET INVENTORY', { align: 'left' });

        doc.moveDown(1.5);

        // Details key-value rows
        const rows = [
            { rowLabel: 'Nama Barang', rowValue: inventory.name },
            { rowLabel: 'Kode Inventory', rowValue: inventory.code },
            { rowLabel: 'Kategori', rowValue: inventory.category },
            { rowLabel: 'Jumlah Unit', rowValue: `${inventory.quantity} Unit` },
            { rowLabel: 'Status Aset', rowValue: inventory.status },
            { rowLabel: 'Lokasi Penempatan', rowValue: inventory.location },
            { rowLabel: 'Tanggal Terdaftar', rowValue: new Date(inventory.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
        ];

        let startY = doc.y;
        rows.forEach((row, i) => {
            // Background row highlight alternate
            if (i % 2 === 0) {
                doc.fillColor('#F8FAFC')
                   .rect(50, startY - 4, 512, 22)
                   .fill();
            }

            doc.font('Helvetica-Bold')
               .fillColor('#475569')
               .fontSize(10)
               .text(row.rowLabel, 60, startY);

            doc.font('Helvetica')
               .fillColor('#0F172A')
               .fontSize(10)
               .text(row.rowValue, 200, startY);

            startY += 22;
        });

        doc.y = startY + 15;

        // Description Box
        doc.font('Helvetica-Bold')
           .fillColor('#1E293B')
           .fontSize(11)
           .text('Deskripsi / Spesifikasi:', 50, doc.y);

        doc.moveDown(0.5);

        // Description border box
        doc.strokeColor('#E2E8F0')
           .lineWidth(0.5)
           .rect(50, doc.y, 512, 80)
           .stroke();

        doc.font('Helvetica')
           .fillColor('#334155')
           .fontSize(9.5)
           .text(inventory.description || 'Tidak ada spesifikasi tambahan.', 60, doc.y + 8, { width: 492, align: 'justify' });

        doc.y = doc.y + 85;
        doc.moveDown(2);

        // Stamp/Footer info
        doc.font('Helvetica-Oblique')
           .fillColor('#94A3B8')
           .fontSize(8)
           .text('Dokumen ini dihasilkan secara otomatis oleh sistem manajemen aset PT Duta Esa Adiperkasa.', 50, doc.y, { align: 'center' });

        doc.end();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllQrInventories,
    getQrInventoryById,
    createQrInventory,
    updateQrInventory,
    deleteQrInventory,
    downloadPdf
};
