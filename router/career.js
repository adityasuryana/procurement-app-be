const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const {
  getAllVacancies,
  getVacancyById,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  getAllApplicants,
  applyJob,
  updateApplicantStatus,
  deleteApplicant
} = require('../controller/career');

// ── Vacancy Routes ───────────────────────────────────────────────────────────
router.get('/vacancies', getAllVacancies);
router.get('/vacancies/:id', getVacancyById);
router.post('/vacancies', createVacancy);
router.put('/vacancies/:id', updateVacancy);
router.delete('/vacancies/:id', deleteVacancy);

// ── Applicant Routes ─────────────────────────────────────────────────────────
router.get('/applicants', getAllApplicants);
router.post('/vacancies/:vacancyId/apply', upload.single('cv'), applyJob);
router.put('/applicants/:id/status', updateApplicantStatus);
router.delete('/applicants/:id', deleteApplicant);

module.exports = router;
