const { Qrasset } = require('../models');
const PDFDocument = require('pdfkit');

const getAllQrAssets = async (req, res) => {
    try {
        const assets = await Qrasset.findAll();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQrAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Qrasset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ message: 'QR Asset item not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createQrAsset = async (req, res) => {
    try {
        const { name, code, category, location, status, description } = req.body;
        // Check if code already exists
        const existing = await Qrasset.findOne({ where: { code } });
        if (existing) {
            return res.status(400).json({ error: `Kode Aset "${code}" sudah terdaftar.` });
        }
        const asset = await Qrasset.create({ name, code, category, location, status, description });
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateQrAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, category, location, status, description } = req.body;
        const asset = await Qrasset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ message: 'QR Asset item not found' });
        }

        // Check unique code if changed
        if (code !== asset.code) {
            const existing = await Qrasset.findOne({ where: { code } });
            if (existing) {
                return res.status(400).json({ error: `Kode Aset "${code}" sudah terdaftar.` });
            }
        }

        asset.name = name;
        asset.code = code;
        asset.category = category;
        asset.location = location;
        asset.status = status;
        asset.description = description;

        await asset.save();
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteQrAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Qrasset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ message: 'QR Asset item not found' });
        }
        await asset.destroy();
        res.status(200).json({ message: 'QR Asset item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const downloadPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Qrasset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ message: 'QR Asset item not found' });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="Asset_${asset.code}.pdf"`);

        doc.pipe(res);

        // Header Title
        doc.font('Helvetica-Bold')
           .fillColor('#3c58b9') // Matching blue color of DEA logo
           .fontSize(20)
           .text('PT DUTA ESA ADIPERKASA', { align: 'center' });

        doc.font('Helvetica')
           .fillColor('#475569')
           .fontSize(9)
           .text('Sistem Informasi Manajemen Aset', { align: 'center' });

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
           .text('SPESIFIKASI DETAIL ASET', { align: 'left' });

        doc.moveDown(1.5);

        // Details key-value rows
        const rows = [
            { rowLabel: 'Nama Barang', rowValue: asset.name },
            { rowLabel: 'Kode Aset', rowValue: asset.code },
            { rowLabel: 'Kategori', rowValue: asset.category },
            { rowLabel: 'Status Aset', rowValue: asset.status },
            { rowLabel: 'Lokasi Penempatan', rowValue: asset.location },
            { rowLabel: 'Tanggal Terdaftar', rowValue: new Date(asset.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
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
           .text(asset.description || 'Tidak ada spesifikasi tambahan.', 60, doc.y + 8, { width: 492, align: 'justify' });

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

const getQrAssetByToken = async (req, res) => {
    try {
        const { token } = req.params;
        const asset = await Qrasset.findOne({ where: { token } });
        if (!asset) {
            return res.status(404).json({ message: 'QR Asset item not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllQrAssets,
    getQrAssetById,
    getQrAssetByToken,
    createQrAsset,
    updateQrAsset,
    deleteQrAsset,
    downloadPdf
};
