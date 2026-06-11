const { JobVacancy, Applicant } = require('../models');
const { uploadToCloudinary } = require('../middleware/upload');

// ── Vacancy Controllers ──────────────────────────────────────────────────────

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await JobVacancy.findAll({
      include: [{ model: Applicant, as: 'applicants' }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    const vacancy = await JobVacancy.findByPk(id, {
      include: [{ model: Applicant, as: 'applicants' }]
    });
    if (!vacancy) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVacancy = async (req, res) => {
  try {
    const {
      title,
      department,
      type,
      location,
      status,
      deadline,
      description,
      requirements
    } = req.body;

    const newVacancy = await JobVacancy.create({
      title,
      department,
      type,
      location,
      status: status || 'Draft',
      deadline,
      description,
      requirements
    });

    res.status(201).json(newVacancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    const {
      title,
      department,
      type,
      location,
      status,
      deadline,
      description,
      requirements
    } = req.body;

    const vacancy = await JobVacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }

    vacancy.title = title !== undefined ? title : vacancy.title;
    vacancy.department = department !== undefined ? department : vacancy.department;
    vacancy.type = type !== undefined ? type : vacancy.type;
    vacancy.location = location !== undefined ? location : vacancy.location;
    vacancy.status = status !== undefined ? status : vacancy.status;
    vacancy.deadline = deadline !== undefined ? deadline : vacancy.deadline;
    vacancy.description = description !== undefined ? description : vacancy.description;
    vacancy.requirements = requirements !== undefined ? requirements : vacancy.requirements;

    await vacancy.save();
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    const vacancy = await JobVacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    await vacancy.destroy();
    res.status(200).json({ message: 'Lowongan pekerjaan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ── Applicant Controllers ────────────────────────────────────────────────────

const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      include: [{ model: JobVacancy, as: 'vacancy' }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const applyJob = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    if (isNaN(vacancyId)) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }
    const { name, email, phone, education, experience } = req.body;

    // Check if the vacancy exists and is Active
    const vacancy = await JobVacancy.findByPk(vacancyId);
    if (!vacancy) {
      return res.status(404).json({ message: 'Lowongan pekerjaan tidak ditemukan' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Berkas CV (PDF/Gambar) wajib dilampirkan' });
    }

    // Upload CV file to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    const cvUrl = uploadResult.secure_url;

    const newApplicant = await Applicant.create({
      vacancyId,
      name,
      email,
      phone,
      education,
      experience,
      cv: cvUrl,
      status: 'Review' // Initial status
    });

    res.status(201).json(newApplicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Data pelamar tidak ditemukan' });
    }
    const { status } = req.body;

    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ message: 'Data pelamar tidak ditemukan' });
    }

    if (!status) {
      return res.status(400).json({ message: 'Status baru wajib disertakan' });
    }

    applicant.status = status;
    await applicant.save();

    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Data pelamar tidak ditemukan' });
    }
    const applicant = await Applicant.findByPk(id);
    if (!applicant) {
      return res.status(404).json({ message: 'Data pelamar tidak ditemukan' });
    }
    await applicant.destroy();
    res.status(200).json({ message: 'Data pelamar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getAllApplicants,
  applyJob,
  updateApplicantStatus,
  deleteApplicant
};
