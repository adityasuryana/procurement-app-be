const { Reto } = require('../models');

const getAllRetos = async (req, res) => {
    try {
        const retos = await Reto.findAll({
            order: [['id', 'ASC']]
        });
        res.status(200).json(retos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRetoById = async (req, res) => {
    try {
        const { id } = req.params;
        const reto = await Reto.findByPk(id);
        if (!reto) {
            return res.status(404).json({ message: 'Removable tower not found' });
        }
        res.status(200).json(reto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createReto = async (req, res) => {
    try {
        const {
            owner,
            typeUnit,
            serialNumber,
            snDea,
            unitFrom,
            regional,
            site,
            position,
            customer,
            status,
            rentSell,
            hargaJual,
            hargaBeli,
            hargaSewa,
            hargaCorrective,
            tanggal
        } = req.body;
        const defaultHistory = [
            {
                event: 'CREATED',
                date: new Date().toISOString(),
                details: 'Tower ditambahkan ke sistem'
            }
        ];
        const reto = await Reto.create({
            owner,
            typeUnit,
            serialNumber,
            snDea,
            unitFrom,
            regional,
            site,
            position,
            customer,
            status,
            rentSell,
            hargaJual: hargaJual || null,
            hargaBeli: hargaBeli || null,
            hargaSewa: hargaSewa || null,
            hargaCorrective: hargaCorrective || null,
            tanggal: tanggal || null,
            history: JSON.stringify(defaultHistory)
        });
        res.status(201).json(reto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateReto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            owner,
            typeUnit,
            serialNumber,
            snDea,
            unitFrom,
            regional,
            site,
            position,
            customer,
            status,
            rentSell,
            hargaJual,
            hargaBeli,
            hargaSewa,
            hargaCorrective,
            tanggal
        } = req.body;
        const reto = await Reto.findByPk(id);
        if (!reto) {
            return res.status(404).json({ message: 'Removable tower not found' });
        }

        // Parse existing history or backfill
        let historyArr = [];
        if (reto.history) {
            try {
                historyArr = JSON.parse(reto.history);
            } catch (e) {
                historyArr = [];
            }
        }
        if (historyArr.length === 0) {
            historyArr.push({
                event: 'CREATED',
                date: reto.createdAt || new Date().toISOString(),
                details: 'Tower ditambahkan ke sistem'
            });
        }

        // Format function for history logs
        const formatIDR = (val) => {
            if (val === null || val === undefined || val === '') return '—';
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
        };

        const oldStatus = reto.status;
        const oldHargaCorrective = reto.hargaCorrective;

        // Apply edits
        reto.owner = owner;
        reto.typeUnit = typeUnit;
        reto.serialNumber = serialNumber;
        reto.snDea = snDea;
        reto.unitFrom = unitFrom;
        reto.regional = regional;
        reto.site = site;
        reto.position = position;
        reto.customer = customer;
        reto.status = status;
        reto.rentSell = rentSell;
        reto.hargaJual = hargaJual !== undefined ? hargaJual : reto.hargaJual;
        reto.hargaBeli = hargaBeli !== undefined ? hargaBeli : reto.hargaBeli;
        reto.hargaSewa = hargaSewa !== undefined ? hargaSewa : reto.hargaSewa;
        reto.hargaCorrective = hargaCorrective !== undefined ? (hargaCorrective !== '' ? hargaCorrective : null) : reto.hargaCorrective;
        reto.tanggal = tanggal !== undefined ? tanggal : reto.tanggal;

        const newStatus = reto.status;
        const newHargaCorrective = reto.hargaCorrective;

        // Log corrective history details
        if (newStatus === 'CORRECTIVE' && oldStatus !== 'CORRECTIVE') {
            historyArr.push({
                event: 'CORRECTIVE_START',
                date: new Date().toISOString(),
                details: `Status diubah menjadi CORRECTIVE dengan harga corrective ${formatIDR(newHargaCorrective)}`
            });
        } else if (oldStatus === 'CORRECTIVE' && newStatus !== 'CORRECTIVE') {
            historyArr.push({
                event: 'CORRECTIVE_END',
                date: new Date().toISOString(),
                details: `Status corrective selesai (Status baru: ${newStatus}). Harga corrective sebelumnya: ${formatIDR(oldHargaCorrective)}`
            });
        } else if (newStatus === 'CORRECTIVE' && oldStatus === 'CORRECTIVE' && Number(newHargaCorrective) !== Number(oldHargaCorrective)) {
            historyArr.push({
                event: 'CORRECTIVE_PRICE_UPDATE',
                date: new Date().toISOString(),
                details: `Harga corrective diubah dari ${formatIDR(oldHargaCorrective)} menjadi ${formatIDR(newHargaCorrective)}`
            });
        }

        reto.history = JSON.stringify(historyArr);
        await reto.save();
        res.status(200).json(reto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteReto = async (req, res) => {
    try {
        const { id } = req.params;
        const reto = await Reto.findByPk(id);
        if (!reto) {
            return res.status(404).json({ message: 'Removable tower not found' });
        }
        await reto.destroy();
        res.status(200).json({ message: 'Removable tower deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllRetos, getRetoById, createReto, updateReto, deleteReto };
