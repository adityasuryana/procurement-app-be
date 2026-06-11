'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Insert Job Vacancies
    await queryInterface.bulkInsert('JobVacancies', [
      {
        id: 1,
        title: 'Senior Procurement Specialist',
        department: 'Procurement',
        type: 'Full-time',
        location: 'Jakarta (Hybrid)',
        status: 'Aktif',
        deadline: '2026-06-30',
        description: 'Memimpin tim pengadaan strategis untuk proyek konstruksi dan infrastruktur besar. Bertanggung jawab atas kepatuhan regulasi, negosiasi vendor, optimasi biaya, serta menjalin hubungan baik dengan mitra strategis guna menjamin kelancaran rantai pasok.',
        requirements: 'Minimal 5 tahun pengalaman di bidang Procurement atau Supply Chain.\nMemiliki sertifikasi profesi pengadaan nasional (PBJP) / internasional merupakan nilai plus.\nKemampuan negosiasi yang sangat kuat and analisis vendor secara komprehensif.\nMampu menggunakan sistem ERP (seperti SAP atau Oracle) dan platform e-procurement dengan lancar.',
        createdAt: new Date('2026-05-01'),
        updatedAt: new Date('2026-05-01')
      },
      {
        id: 2,
        title: 'Frontend Developer (React)',
        department: 'IT & Digital',
        type: 'Full-time',
        location: 'Bandung (Remote)',
        status: 'Aktif',
        deadline: '2026-06-15',
        description: 'Mengembangkan aplikasi web e-procurement menggunakan React, Next.js, dan Tailwind CSS. Fokus pada pembuatan kode yang bersih, performa yang cepat, aksesibilitas tinggi, serta antarmuka pengguna yang sangat responsif dan premium.',
        requirements: 'Minimal 3 tahun pengalaman kerja profesional dengan React dan Next.js.\nMenguasai Tailwind CSS, TypeScript, dan pengelolaan state global (Zustand/Redux).\nBerpengalaman dalam integrasi RESTful API, penanganan autentikasi JWT, dan real-time data.\nMemiliki portofolio aplikasi web yang menarik, interaktif, dan responsif.',
        createdAt: new Date('2026-05-10'),
        updatedAt: new Date('2026-05-10')
      },
      {
        id: 3,
        title: 'Admin Pengadaan',
        department: 'Procurement',
        type: 'Internship',
        location: 'Jakarta (On-site)',
        status: 'Aktif',
        deadline: '2026-06-25',
        description: 'Mendukung tim administrasi pengadaan dalam hal dokumentasi berkas mitra, verifikasi keaslian dokumen kelengkapan vendor terbaru, dan pengarsipan kontrak kerja sama.',
        requirements: 'Mahasiswa aktif tingkat akhir atau lulusan baru dari jurusan Administrasi, Manajemen, Logistik, atau sejenis.\nTeliti, rapi, disiplin waktu, dan terbiasa menggunakan Microsoft Excel atau Google Sheets secara intensif.\nMampu berkomunikasi dengan ramah dan bekerja sama secara harmonis di dalam tim.',
        createdAt: new Date('2026-05-12'),
        updatedAt: new Date('2026-05-12')
      },
      {
        id: 4,
        title: 'Project Manager',
        department: 'Operation',
        type: 'Full-time',
        location: 'Surabaya (On-site)',
        status: 'Draft',
        deadline: '2026-07-01',
        description: 'Mengelola siklus hidup proyek pengadaan material kelistrikan dari perencanaan hingga serah terima hasil kerja (BAST). Memastikan ketepatan waktu proyek, standar kualitas, serta optimasi anggaran biaya proyek.',
        requirements: 'Minimal 4 tahun pengalaman kerja sebagai Project Manager di bidang logistik/konstruksi.\nBerpengalaman dalam mengelola proyek pengadaan bernilai besar dengan banyak pemangku kepentingan.\nMemiliki sertifikasi PMP (Project Management Professional) menjadi nilai tambah utama.\nKemampuan kepemimpinan, komunikasi strategis, dan manajemen risiko yang sangat baik.',
        createdAt: new Date('2026-05-20'),
        updatedAt: new Date('2026-05-20')
      },
      {
        id: 5,
        title: 'Legal & Compliance Officer',
        department: 'Legal',
        type: 'Full-time',
        location: 'Jakarta (On-site)',
        status: 'Nonaktif',
        deadline: '2026-05-20',
        description: 'Menyusun, meninjau, dan menegosiasikan draf kontrak kerja sama mitra usaha perusahaan. Memastikan kepatuhan hukum terhadap regulasi pengadaan barang/jasa pemerintah maupun komersial.',
        requirements: 'Lulusan S1 Hukum dengan IPK minimal 3.00 dari universitas terakreditasi baik.\nBerpengalaman minimal 2 tahun dalam bidang legal corporate, contract drafting, dan compliance.\nMemahami hukum perdata, hukum dagang Indonesia, serta regulasi pengadaan nasional.',
        createdAt: new Date('2026-04-15'),
        updatedAt: new Date('2026-04-15')
      }
    ], {});

    // 2. Insert Applicants
    await queryInterface.bulkInsert('Applicants', [
      {
        id: 1,
        vacancyId: 1,
        name: 'Ahmad Hidayat',
        email: 'ahmad.hidayat@example.com',
        phone: '081234567890',
        status: 'Review',
        education: 'S1 Manajemen Logistik, Universitas Indonesia',
        experience: '4 tahun sebagai Procurement Specialist di PT Logistik Prima Jaya.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234567/procurement_documents/cv_ahmad_hidayat.pdf',
        createdAt: new Date('2026-05-02'),
        updatedAt: new Date('2026-05-02')
      },
      {
        id: 2,
        vacancyId: 1,
        name: 'Siti Rahmawati',
        email: 'siti.rahma@example.com',
        phone: '085678901234',
        status: 'Interview',
        education: 'S1 Teknik Industri, Institut Teknologi Bandung',
        experience: '5 tahun Supply Chain Coordinator di PT Global Manufacturing.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234568/procurement_documents/cv_siti_rahma.pdf',
        createdAt: new Date('2026-05-05'),
        updatedAt: new Date('2026-05-05')
      },
      {
        id: 3,
        vacancyId: 1,
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        phone: '082134567890',
        status: 'Diterima',
        education: 'S2 Manajemen Bisnis, Universitas Gadjah Mada',
        experience: '6 tahun Procurement Manager di CV Indo Global Tech.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234569/procurement_documents/cv_budi_santoso.pdf',
        createdAt: new Date('2026-05-01'),
        updatedAt: new Date('2026-05-01')
      },
      {
        id: 4,
        vacancyId: 2,
        name: 'Rian Pratama',
        email: 'rian.pratama@example.com',
        phone: '087712345678',
        status: 'Interview',
        education: 'S1 Informatika, Universitas Padjadjaran',
        experience: '3 tahun Frontend Developer dengan React/Redux di Tech Startup.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234570/procurement_documents/cv_rian_pratama.pdf',
        createdAt: new Date('2026-05-11'),
        updatedAt: new Date('2026-05-11')
      },
      {
        id: 5,
        vacancyId: 2,
        name: 'Eka Wijaya',
        email: 'eka.wijaya@example.com',
        phone: '081987654321',
        status: 'Review',
        education: 'S1 Sistem Informasi, Telkom University',
        experience: '2 tahun Frontend Developer menggunakan Next.js & Tailwind CSS.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234571/procurement_documents/cv_eka_wijaya.pdf',
        createdAt: new Date('2026-05-12'),
        updatedAt: new Date('2026-05-12')
      },
      {
        id: 6,
        vacancyId: 2,
        name: 'Dewi Lestari',
        email: 'dewi.lestari@example.com',
        phone: '085234567890',
        status: 'Diterima',
        education: 'S1 Ilmu Komputer, Universitas Indonesia',
        experience: '4 tahun Software Engineer (Frontend) di FinTech Corporation.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234572/procurement_documents/cv_dewi_lestari.pdf',
        createdAt: new Date('2026-05-10'),
        updatedAt: new Date('2026-05-10')
      },
      {
        id: 7,
        vacancyId: 2,
        name: 'Faisal Rahman',
        email: 'faisal.r@example.com',
        phone: '083812345678',
        status: 'Ditolak',
        education: 'S1 Teknik Informatika, Gunadarma University',
        experience: '1 tahun React Junior Developer di Local Software House.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234573/procurement_documents/cv_faisal_rahman.pdf',
        createdAt: new Date('2026-05-11'),
        updatedAt: new Date('2026-05-11')
      },
      {
        id: 8,
        vacancyId: 3,
        name: 'Laras Atika',
        email: 'laras.atika@example.com',
        phone: '089612345678',
        status: 'Review',
        education: 'D3 Administrasi Perkantoran, ASMI',
        experience: 'Fresh Graduate dengan pengalaman magang administrasi di BUMN.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234574/procurement_documents/cv_laras_atika.pdf',
        createdAt: new Date('2026-05-13'),
        updatedAt: new Date('2026-05-13')
      },
      {
        id: 9,
        vacancyId: 3,
        name: 'Doni Setiawan',
        email: 'doni.setiawan@example.com',
        phone: '081287654321',
        status: 'Interview',
        education: 'S1 Administrasi Niaga, Universitas Indonesia',
        experience: 'Magang Admin Logistik selama 6 bulan di Perusahaan Retail.',
        cv: 'https://res.cloudinary.com/dup74g54i/image/upload/v1717234575/procurement_documents/cv_doni_setiawan.pdf',
        createdAt: new Date('2026-05-14'),
        updatedAt: new Date('2026-05-14')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Applicants', null, {});
    await queryInterface.bulkDelete('JobVacancies', null, {});
  }
};
