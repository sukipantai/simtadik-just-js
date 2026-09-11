import React, { useState, useEffect, useRef } from 'react';

// --- DATA TYPES & MOCK INITIAL STATE ---
const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-1',
    trackingCode: 'SMT-2026-0812',
    category: 'instansi',
    fullName: 'Drs. H. Mulyadi, M.Pd.',
    phone: '081234567890',
    identifierNo: '197103151996031002',
    institutionName: 'Cabang Dinas Pendidikan Wilayah III',
    taskLetterNo: '800/142/Disdik/IX/2026',
    purpose: 'Koordinasi Penyaluran Bantuan Sarpras Lab Digital & Monitoring BOS',
    urgency: 'penting',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
    status: 'PENDING',
    targetHost: 'Dr. H. Ahmad Sudrajat, M.Pd. (Kepala Sekolah)',
    createdAt: '2026-09-11 08:30 WIB',
    meetingDate: '2026-09-11',
    startTime: '10:00',
    endTime: '10:45',
    roomLocation: 'Ruang Kepala Sekolah',
    checkInTime: null,
    checkOutTime: null,
    receptionistName: null,
    jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0wODEyIn0.Sec8F92xQp_Z'
  },
  {
    id: 'apt-2',
    trackingCode: 'SMT-2026-0813',
    category: 'ortu',
    fullName: 'Ibu Ratna Kartika, S.E.',
    phone: '085712348899',
    identifierNo: 'NISN Siswa: 0089123488 (Arya Putra X-4)',
    institutionName: 'Komite Kelas X',
    purpose: 'Konsultasi Perizinan Program Pertukaran Pelajar Jepang & Beasiswa',
    urgency: 'biasa',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&fit=crop&q=80',
    status: 'DISETUJUI',
    targetHost: 'Dr. H. Ahmad Sudrajat, M.Pd. (Kepala Sekolah)',
    createdAt: '2026-09-10 14:15 WIB',
    meetingDate: '2026-09-11',
    startTime: '09:00',
    endTime: '09:30',
    roomLocation: 'Ruang Tamu VVIP Lobi',
    checkInTime: null,
    checkOutTime: null,
    receptionistName: 'Rian Pratama (Lobi-1)',
    jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0wODEzIn0.K9xZ1L_p'
  },
  {
    id: 'apt-3',
    trackingCode: 'SMT-2026-0814',
    category: 'vendor',
    fullName: 'Bambang Irawan, S.Kom.',
    phone: '081399887711',
    identifierNo: 'PT Telkom Solusi Indonesia',
    institutionName: 'PT Telkom Solusi Indonesia',
    taskLetterNo: 'TSI/SPK-NET/VIII/2026',
    purpose: 'Finalisasi Berita Acara Uji Terima Fiber Optik 10 Gbps Smart School',
    urgency: 'mendesak',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
    status: 'SEDANG BERLANGSUNG',
    targetHost: 'Ir. Bambang Sujarwo (Wakasek Sarpras)',
    createdAt: '2026-09-11 07:45 WIB',
    meetingDate: '2026-09-11',
    startTime: '08:30',
    endTime: '09:15',
    roomLocation: 'Ruang Rapat Mini Lt. 2',
    checkInTime: '08:28 WIB',
    checkOutTime: null,
    receptionistName: 'Rian Pratama (Lobi-1)',
    jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0wODE0In0.X8mBq20'
  },
  {
    id: 'apt-4',
    trackingCode: 'SMT-2026-0810',
    category: 'siswa',
    fullName: 'Nadia Salsabila Putri (Ketua OSIS)',
    phone: '089611223344',
    identifierNo: 'NISN: 0098765432 / Kelas XI-MIPA 1',
    institutionName: 'OSIS SMAN 1 Prestasi Bangsa',
    purpose: 'Audiensi Pengesahan Proposal Pekan Olahraga & Seni Nasional 2026',
    urgency: 'penting',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
    status: 'SELESAI',
    targetHost: 'Dra. Nurhayati, M.Pd. (Wakasek Kesiswaan)',
    createdAt: '2026-09-10 10:00 WIB',
    meetingDate: '2026-09-11',
    startTime: '07:30',
    endTime: '08:15',
    roomLocation: 'Ruang Kesiswaan Lt. 1',
    checkInTime: '07:25 WIB',
    checkOutTime: '08:20 WIB',
    receptionistName: 'Siti Rahayu (Lobi-2)',
    jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0wODEwIn0.Q9zN1M'
  },
  {
    id: 'apt-5',
    trackingCode: 'SMT-2026-0809',
    category: 'instansi',
    fullName: 'Agus Wijanarko, S.H.',
    phone: '081298765432',
    identifierNo: 'Bawaslu Kota - Divisi Edukasi',
    institutionName: 'Bawaslu Kota',
    taskLetterNo: 'ST/102/BWL/IX/2026',
    purpose: 'Sosialisasi Pemilih Pemula di Lingkungan Sekolah Menengah',
    urgency: 'biasa',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
    status: 'DISETUJUI',
    targetHost: 'Dr. H. Ahmad Sudrajat, M.Pd. (Kepala Sekolah)',
    createdAt: '2026-09-11 06:30 WIB',
    meetingDate: '2026-09-11',
    startTime: '08:00', // Telat > 30 menit (simulasi edge-case)
    endTime: '08:45',
    roomLocation: 'Ruang Kepala Sekolah',
    checkInTime: null,
    checkOutTime: null,
    receptionistName: 'Rian Pratama (Lobi-1)',
    jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0wODA5In0.Z8j2'
  }
];

// Jadwal Dinas Eksternal Kepala Sekolah (Blocked Slot Simulator)
const BLOCKED_SCHEDULES = [
  { start: '10:00', end: '11:00', title: 'Rapat Koordinasi Evaluasi ANBK Cabdin Wilayah III (Via Zoom)' },
  { start: '11:45', end: '13:00', title: 'Istirahat & Supervisi Shalat Berjamaah Masjid Sekolah' }
];

export default function SIMTADIKApp() {
  // Navigation & Global State
  const [activeRole, setActiveRole] = useState('guest-form'); // 'guest-form' | 'guest-ticket' | 'host-dash' | 'receptionist' | 'analytics'
  const [darkMode, setDarkMode] = useState(true);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [selectedTicketId, setSelectedTicketId] = useState('apt-1');
  const [toastMessage, setToastMessage] = useState(null);

  // Helper show notification toast
  const showToast = (title, desc) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentTicket = appointments.find(a => a.id === selectedTicketId) || appointments[0];

  return (
    <div className={`${darkMode ? 'dark bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen font-sans transition-colors duration-200 antialiased selection:bg-cyan-500 selection:text-white`}>
      
      {/* --- TOP GLOBAL NAVIGATION ROLE SWITCHER --- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-700/40 bg-slate-950/80 px-4 py-2.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Telemetry Indicator */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/40">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
                    SIMTADIK
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">v1.1</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">SMAN 1 Prestasi Bangsa</p>
              </div>
            </div>

            {/* Quick Dark Mode & UU PDP Pill on mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Central Role Selector Navigation */}
          <nav className="flex items-center overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            {[
              { id: 'guest-form', label: '1. Form Tamu', icon: '📝' },
              { id: 'guest-ticket', label: '2. E-Ticket QR', icon: '🎫' },
              { id: 'host-dash', label: '3. Dasbor Kepala Sekolah', icon: '🛡️', badge: appointments.filter(a => a.status === 'PENDING').length },
              { id: 'receptionist', label: '4. Terminal Resepsionis', icon: '🖥️' },
              { id: 'analytics', label: '5. Analitik & Audit', icon: '📊' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveRole(tab.id)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeRole === tab.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right Info */}
          <div className="hidden md:flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[11px]">UU PDP 27/2022 Verified</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Toggle Light/Dark"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

        </div>
      </header>

      {/* --- GLOBAL TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 border border-cyan-500/50 shadow-2xl shadow-cyan-500/20 text-white p-4 rounded-xl flex items-start gap-3 animate-slide-up backdrop-blur-lg">
          <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">✓</div>
          <div>
            <h4 className="text-xs font-bold text-cyan-300">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT SWITCHER --- */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {activeRole === 'guest-form' && (
          <GuestRegistrationModule
            onAppointmentCreated={(newApt) => {
              setAppointments([newApt, ...appointments]);
              setSelectedTicketId(newApt.id);
              showToast('Permohonan Terkirim!', `Kode Tiket: ${newApt.trackingCode}. Notifikasi disinkronkan ke Dasbor Pimpinan.`);
              setActiveRole('guest-ticket');
            }}
          />
        )}

        {activeRole === 'guest-ticket' && (
          <GuestTicketModule
            appointment={currentTicket}
            allAppointments={appointments}
            onSelectTicket={(id) => setSelectedTicketId(id)}
            onDirectToReceptionist={() => setActiveRole('receptionist')}
          />
        )}

        {activeRole === 'host-dash' && (
          <HostDashboardModule
            appointments={appointments}
            onUpdateAppointment={(updatedApt, actionTitle) => {
              setAppointments(appointments.map(a => a.id === updatedApt.id ? updatedApt : a));
              showToast('Tindakan Pimpinan Diproses', actionTitle);
            }}
          />
        )}

        {activeRole === 'receptionist' && (
          <ReceptionistTerminalModule
            appointments={appointments}
            onCheckIn={(aptId) => {
              const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
              setAppointments(appointments.map(a => a.id === aptId ? {
                ...a,
                status: 'SEDANG BERLANGSUNG',
                checkInTime: now,
                receptionistName: 'Rian Pratama (Lobi-1)'
              } : a));
              showToast('Tamu Check-In Sukses', 'Status tamu diperbarui menjadi SEDANG BERLANGSUNG. Notifikasi dikirim ke HP pimpinan.');
            }}
            onCheckOut={(aptId) => {
              const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
              setAppointments(appointments.map(a => a.id === aptId ? {
                ...a,
                status: 'SELESAI',
                checkOutTime: now
              } : a));
              showToast('Tamu Check-Out', 'Kunjungan telah selesai. Log kepulangan tersimpan permanen.');
            }}
          />
        )}

        {activeRole === 'analytics' && (
          <AnalyticsAuditModule appointments={appointments} />
        )}
      </main>
    </div>
  );
}

// =========================================================================================
// 1. MODUL TAMU: FORMULIR PENGAJUAN CERDAS + LIVE WEBCAM & DETEKSI LUMINANSI
// =========================================================================================
function GuestRegistrationModule({ onAppointmentCreated }) {
  const [category, setCategory] = useState('instansi');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [urgency, setUrgency] = useState('biasa');
  
  // Dynamic fields
  const [nisn, setNisn] = useState('');
  const [kelas, setKelas] = useState('');
  const [nip, setNip] = useState('');
  const [unitKerja, setUnitKerja] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [taskLetterNo, setTaskLetterNo] = useState('');
  const [taskFileName, setTaskFileName] = useState(null);

  // Webcam & Canvas state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [luminanceAlert, setLuminanceAlert] = useState(false);
  const [luminanceValue, setLuminanceValue] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  // Nyalakan Kamera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraActive(true);
        }
      } else {
        setCameraError('Browser ini tidak mendukung HTML5 getUserMedia.');
      }
    } catch (err) {
      console.warn('Webcam access error:', err);
      setCameraError('Izin akses kamera diblokir atau kamera tidak ditemukan. Mode Simulasi Sensor Biometrik diaktifkan.');
      // Gunakan placeholder berkualitas tinggi untuk demo sandbox
      setIsCameraActive(false);
    }
  };

  // Matikan Kamera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Snapshot & Algoritma Luminansi
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && isCameraActive && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = 480;
      canvas.height = 360;
      context.drawImage(video, 0, 0, 480, 360);

      // Analisis Luminansi Kanvas
      const imageData = context.getImageData(0, 0, 480, 360);
      const data = imageData.data;
      let totalLuminance = 0;
      for (let i = 0; i < data.length; i += 4) {
        // Standar ITU-R BT.601 luminance
        totalLuminance += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
      const avgBrightness = Math.round(totalLuminance / (data.length / 4));
      setLuminanceValue(avgBrightness);

      if (avgBrightness < 35) {
        setLuminanceAlert(true);
      } else {
        setLuminanceAlert(false);
      }

      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedPhoto(photoDataUrl);
      stopCamera();
    } else {
      // Fallback Demo Capture jika peramban tanpa webcam
      const samplePhotos = [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&fit=crop&q=80'
      ];
      const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
      setCapturedPhoto(randomPhoto);
      setLuminanceValue(78);
      setLuminanceAlert(false);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setLuminanceAlert(false);
    setLuminanceValue(null);
    startCamera();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !purpose) {
      alert('Harap lengkapi semua kolom wajib.');
      return;
    }
    if (!capturedPhoto) {
      alert('Harap lakukan verifikasi live capture foto wajah terlebih dahulu.');
      return;
    }

    const trackingNum = Math.floor(1000 + Math.random() * 9000);
    const newAppointment = {
      id: 'apt-' + Date.now(),
      trackingCode: `SMT-2026-${trackingNum}`,
      category,
      fullName,
      phone,
      identifierNo: category === 'siswa' ? `NISN: ${nisn}` : category === 'guru' ? `NIP: ${nip}` : taskLetterNo || '-',
      subIdentifier: category === 'siswa' ? `Kelas: ${kelas}` : category === 'guru' ? `Unit: ${unitKerja}` : null,
      institutionName: category === 'instansi' || category === 'vendor' ? institutionName : 'Internal Sekolah',
      taskLetterNo: taskLetterNo || null,
      taskLetterFile: taskFileName,
      purpose,
      urgency,
      photoUrl: capturedPhoto,
      status: 'PENDING',
      targetHost: 'Dr. H. Ahmad Sudrajat, M.Pd. (Kepala Sekolah)',
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      meetingDate: '2026-09-11',
      startTime: 'Menunggu Konfirmasi',
      endTime: 'Menunggu Konfirmasi',
      roomLocation: 'Ruang Kepala Sekolah',
      checkInTime: null,
      checkOutTime: null,
      jwtSignature: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTSU1UQURJSyIsImV4cCI6MTc4OTA5ODAwMCwidHJhY2siOiJTTVQtMjAyNi0' + trackingNum + 'In0.SignKey'
    };

    onAppointmentCreated(newAppointment);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-medium mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Sistem Buku Tamu & Registrasi Audiensi Terpadu
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Formulir Pengajuan Audiensi</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Daftarkan rencana kunjungan Anda ke pimpinan SMAN 1 Prestasi Bangsa. Sistem dilengkapi verifikasi biometrik langsung demi akuntabilitas lobi.
            </p>
          </div>
          <div className="flex md:flex-col items-end justify-between border-t md:border-t-0 md:border-l border-slate-700/60 pt-3 md:pt-0 md:pl-6 text-right">
            <span className="text-xs text-slate-400">Protokol Keamanan</span>
            <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5">TLS 1.3 / UU PDP 2022</span>
            <span className="text-[10px] text-slate-500 mt-1">Anti-Spoofing Enabled</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Kategori Tamu (5 Interactive Cards) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <label className="block text-sm font-semibold text-slate-200 mb-3">
            Langkah 1: Pilih Kategori Tamu <span className="text-cyan-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { id: 'siswa', label: 'Siswa', icon: '🎓', desc: 'Konsultasi / OSIS' },
              { id: 'ortu', label: 'Orang Tua / Wali', icon: '👨‍👩‍👧', desc: 'Akademik & Murid' },
              { id: 'guru', label: 'Guru / Staf', icon: '💼', desc: 'Kedinasan Internal' },
              { id: 'instansi', label: 'Instansi Luar', icon: '🏛️', desc: 'Dinas / Pemda / Lembaga' },
              { id: 'vendor', label: 'Vendor / Rekanan', icon: '🤝', desc: 'Pengadaan & SPK' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  category === item.id
                    ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                    : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="text-2xl mb-1.5">{item.icon}</div>
                  <div className={`text-xs font-bold ${category === item.id ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {item.label}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                {category === item.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Kolom Data Diri & Adaptif */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            Langkah 2: Data Tamu & Informasi Penugasan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nama Lengkap & Gelar <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="cth. Dr. H. Mulyadi, M.Pd."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nomor WhatsApp Aktif (Tiket & Notifikasi) <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="cth. 081234567890"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Conditional Fields based on Category */}
          {category === 'siswa' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">NISN (Nomor Induk Siswa Nasional)</label>
                <input
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="10 digit NISN"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kelas / Jurusan</label>
                <input
                  type="text"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="cth. X-5 / XI-MIPA 2"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {category === 'guru' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">NIP / NUPTK</label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="NIP / Identitas Pendidik"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Unit Kerja / MGMP</label>
                <input
                  type="text"
                  value={unitKerja}
                  onChange={(e) => setUnitKerja(e.target.value)}
                  placeholder="cth. Tim Kurikulum Merdeka"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {(category === 'instansi' || category === 'vendor') && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nama Instansi / Lembaga / Perusahaan <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="cth. Cabang Dinas Pendidikan / Bawaslu"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nomor Surat Tugas Resmi</label>
                  <input
                    type="text"
                    value={taskLetterNo}
                    onChange={(e) => setTaskLetterNo(e.target.value)}
                    placeholder="cth. 800/142/Disdik/IX/2026"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Drag & Drop Dokumen Penugasan */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Berkas Surat Tugas (.PDF / .JPG)</label>
                <div
                  onClick={() => setTaskFileName('Surat_Tugas_Resmi_Kedinasan_Disdik.pdf')}
                  className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-4 text-center cursor-pointer bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>{taskFileName ? `Berkas Terlampir: ${taskFileName}` : 'Klik atau seret surat penugasan resmi ke sini'}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Maksimal 5 MB (Enkripsi AES-256 Otomatis)</p>
                </div>
              </div>
            </div>
          )}

          {/* Perihal & Tingkat Urgensi */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Perihal / Tujuan Audiensi <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Jelaskan secara spesifik topik yang ingin dibahas dengan pimpinan sekolah..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Urgensi Badges */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Tingkat Urgensi Pertemuan</label>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'biasa', label: 'Biasa (Standar SOP 3-5 Hari)', color: 'border-slate-600 text-slate-300' },
                { id: 'penting', label: 'Penting (Perlu Konfirmasi 24 Jam)', color: 'border-amber-500/60 text-amber-400' },
                { id: 'mendesak', label: 'Mendesak (Darurat / Hari Ini)', color: 'border-rose-500/80 text-rose-400 font-bold' },
              ].map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    urgency === u.id
                      ? 'bg-slate-700 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400 shadow'
                      : `bg-slate-800/60 ${u.color} hover:bg-slate-800`
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Live Webcam Capture (Anti-Spoofing & Luminance Check) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Langkah 3: Live Biometric Face Capture <span className="text-rose-400">*</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Perekaman wajah langsung melalui peramban (Unggah dari galeri dimatikan untuk mencegah manipulasi).
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-300 font-mono">
              Live Webcam Feed
            </span>
          </div>

          {/* Kamera Area */}
          <div className="relative max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 flex items-center justify-center shadow-inner">
            
            {/* Live Video Feed */}
            {!capturedPhoto && isCameraActive && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />
            )}

            {/* Hasil Capture Foto */}
            {capturedPhoto && (
              <img
                src={capturedPhoto}
                alt="Captured Face"
                className="w-full h-full object-cover"
              />
            )}

            {/* Jika Kamera Dimatikan / Gagal Izin */}
            {!capturedPhoto && !isCameraActive && (
              <div className="text-center p-6 text-slate-400">
                <div className="text-3xl mb-2">📷</div>
                <p className="text-xs">{cameraError || 'Kamera sedang tidak aktif.'}</p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="mt-3 px-3.5 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow transition-all"
                >
                  Buka Kamera Langsung
                </button>
              </div>
            )}

            {/* Cyber Viewfinder Overlay HUD */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 border border-cyan-500/20">
              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400/80">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  AI FACE DETECTION ACTIVE
                </span>
                <span>ISO AUTO • 60 FPS</span>
              </div>
              <div className="w-40 h-48 mx-auto border-2 border-dashed border-cyan-400/50 rounded-3xl relative flex items-center justify-center">
                <div className="w-3 h-3 border-t-2 border-l-2 border-cyan-400 absolute -top-1 -left-1" />
                <div className="w-3 h-3 border-t-2 border-r-2 border-cyan-400 absolute -top-1 -right-1" />
                <div className="w-3 h-3 border-b-2 border-l-2 border-cyan-400 absolute -bottom-1 -left-1" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-cyan-400 absolute -bottom-1 -right-1" />
                <span className="text-[10px] text-cyan-300/60 font-mono tracking-widest">POSISIKAN WAJAH</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>LUM: {luminanceValue !== null ? luminanceValue : '--'}</span>
                <span>COMPRESSION: WebP &lt;180KB</span>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Peringatan Luminansi Gelap (Sesuai FR-2 & Edge Cases) */}
          {luminanceAlert && (
            <div className="p-3 bg-amber-950/80 border border-amber-500/60 rounded-xl text-amber-300 text-xs flex items-center gap-2.5">
              <span className="text-base">⚠️</span>
              <div>
                <strong>Pencahayaan Terlalu Gelap (Luminance &lt; 35).</strong>
                <p className="text-[11px] text-amber-200/90">
                  Harap menghadap ke sumber cahaya atau cari tempat lebih terang agar foto dapat diverifikasi oleh resepsionis.
                </p>
              </div>
            </div>
          )}

          {/* Tombol Ambil Foto / Ulang */}
          <div className="flex justify-center gap-3">
            {!capturedPhoto ? (
              <button
                type="button"
                onClick={capturePhoto}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30 flex items-center gap-2"
              >
                <span>📸</span>
                <span>Ambil Foto Wajah Sekarang</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={retakePhoto}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-2"
              >
                <span>🔄</span>
                <span>Ambil Ulang Foto</span>
              </button>
            )}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Dengan mengirimkan formulir ini, Anda menyetujui pemrosesan identitas digital sesuai UU PDP No. 27/2022.
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Kirim Permohonan Audiensi</span>
            <span>➔</span>
          </button>
        </div>

      </form>
    </div>
  );
}

// =========================================================================================
// 2. MODUL TAMU: E-TICKET QR CODE (MODERN BOARDING PASS MOBILE PASS)
// =========================================================================================
function GuestTicketModule({ appointment, allAppointments, onSelectTicket, onDirectToReceptionist }) {
  const [copied, setCopied] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DISETUJUI':
        return { label: 'DISETUJUI (CONFIRMED)', bg: 'bg-emerald-950/80 border-emerald-500 text-emerald-400' };
      case 'PENDING':
        return { label: 'MENUNGGU KURASI PIMPINAN', bg: 'bg-amber-950/80 border-amber-500 text-amber-400 animate-pulse' };
      case 'SEDANG BERLANGSUNG':
        return { label: 'SEDANG BERLANGSUNG DI RUANGAN', bg: 'bg-cyan-950/80 border-cyan-500 text-cyan-400' };
      case 'SELESAI':
        return { label: 'KUNJUNGAN SELESAI', bg: 'bg-slate-800 border-slate-600 text-slate-300' };
      case 'DITOLAK':
        return { label: 'PERMOHONAN DITOLAK', bg: 'bg-rose-950/80 border-rose-500 text-rose-400' };
      default:
        return { label: status, bg: 'bg-slate-800 border-slate-700 text-slate-400' };
    }
  };

  const statusInfo = getStatusBadge(appointment.status);

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quick Switcher Antar Tiket Demo */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <span className="text-slate-400 font-semibold pl-2">Pilih Tiket Tamu:</span>
        <div className="flex gap-1.5">
          {allAppointments.map((apt) => (
            <button
              key={apt.id}
              onClick={() => onSelectTicket(apt.id)}
              className={`px-2.5 py-1 rounded-lg transition-all font-mono ${
                apt.id === appointment.id
                  ? 'bg-cyan-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {apt.trackingCode} ({apt.status})
            </button>
          ))}
        </div>
      </div>

      {/* Boarding Pass Card */}
      <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 relative">
        
        {/* Top Header Section */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              SMAN 1 PRESTASI BANGSA • OFFICIAL GUEST PASS
            </span>
            <h2 className="text-xl font-black text-white tracking-wide mt-0.5">TIKET MASUK & JADWAL AUDIENSI</h2>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${statusInfo.bg}`}>
            {statusInfo.label}
          </div>
        </div>

        {/* Middle Section: Main Pass Details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left: Guest Photo & Verification */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/20 relative">
              <img src={appointment.photoUrl} alt="Foto Tamu" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-0.5" title="Verified Photo">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-xs font-bold text-white mt-3 text-center">{appointment.fullName}</span>
            <span className="text-[11px] text-cyan-400">{appointment.institutionName || 'Tamu Terverifikasi'}</span>
            <span className="text-[10px] text-slate-400 mt-1 font-mono">{appointment.identifierNo}</span>
          </div>

          {/* Center: Meeting Logistics */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Pihak Penerima (Host)</span>
                <span className="font-semibold text-slate-100">{appointment.targetHost}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Lokasi Ruangan</span>
                <span className="font-semibold text-cyan-300">{appointment.roomLocation || 'Ditetapkan Saat Disetujui'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Tanggal & Waktu</span>
                <span className="font-semibold text-slate-100">
                  {appointment.meetingDate} • {appointment.startTime} - {appointment.endTime} WIB
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Tingkat Urgensi</span>
                <span className="font-semibold uppercase text-amber-400">{appointment.urgency}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Perihal Audiensi:</span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{appointment.purpose}</p>
            </div>
          </div>
        </div>

        {/* Perforated Divider Effect */}
        <div className="relative border-t-2 border-dashed border-slate-700 my-2">
          <div className="absolute -top-3.5 -left-4 w-7 h-7 bg-[#0B0F19] rounded-full border-r border-slate-700" />
          <div className="absolute -top-3.5 -right-4 w-7 h-7 bg-[#0B0F19] rounded-full border-l border-slate-700" />
        </div>

        {/* Bottom Section: QR Code & Security Protocols */}
        <div className="p-6 md:p-8 bg-slate-950/90 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Stylized QR Code (Generative SVG Simulation) */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-2xl bg-white shadow-xl shadow-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center">
              <svg className="w-32 h-32 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                {/* QR Finder patterns */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="13" width="10" height="10" fill="currentColor" />
                <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="77" y="13" width="10" height="10" fill="currentColor" />
                <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="77" width="10" height="10" fill="currentColor" />
                {/* Simulated Data Matrix Dots */}
                <rect x="36" y="8" width="6" height="6" />
                <rect x="46" y="18" width="6" height="6" />
                <rect x="56" y="8" width="6" height="6" />
                <rect x="38" y="38" width="8" height="8" rx="2" fill="#06B6D4" />
                <rect x="50" y="38" width="6" height="6" />
                <rect x="42" y="54" width="6" height="6" />
                <rect x="54" y="54" width="6" height="6" />
                <rect x="68" y="44" width="6" height="6" />
                <rect x="80" y="44" width="6" height="6" />
                <rect x="68" y="68" width="6" height="6" />
                <rect x="78" y="78" width="6" height="6" />
                <rect x="88" y="68" width="6" height="6" />
                <rect x="36" y="76" width="6" height="6" />
                <rect x="48" y="76" width="6" height="6" />
                <rect x="36" y="88" width="6" height="6" />
              </svg>
            </div>
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
              {appointment.trackingCode}
            </span>
          </div>

          {/* Protocols & WhatsApp Action */}
          <div className="flex-1 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span>📋</span> Tata Tertib Resepsionis Lobi SMAN 1:
              </div>
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-0.5">
                <li>Tunjukkan QR ini ke tablet pemindai di Meja Resepsionis Utama.</li>
                <li>Wajib berpakaian rapi dan mengenakan tanda pengenal tamu resmi.</li>
                <li>Toleransi keterlambatan maksimal 30 menit dari slot waktu yang tertera.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => alert(`Simulasi Notifikasi WA dikirim ke ${appointment.phone}:\n"Halo ${appointment.fullName}, tiket audiensi SIMTADIK Anda telah siap: ${appointment.trackingCode}."`)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>💬</span>
                <span>Kirim Salinan ke WhatsApp</span>
              </button>
              
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                {copied ? '✓ Tautan Disalin' : 'Salin Kode Tiket'}
              </button>

              <button
                onClick={onDirectToReceptionist}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
              >
                ⚡ Uji Scan di Terminal Lobi ➔
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// =========================================================================================
// 3. MODUL HOST: DASBOR KURASI, TRIAGE 1-KLIK & ANTI-DOUBLE BOOKING KEPALA SEKOLAH
// =========================================================================================
function HostDashboardModule({ appointments, onUpdateAppointment }) {
  const [activeModal, setActiveModal] = useState(null); // 'approve' | 'reject' | 'reschedule' | 'delegate'
  const [targetItem, setTargetItem] = useState(null);

  // Form states modal
  const [selectedDate, setSelectedDate] = useState('2026-09-11');
  const [selectedSlot, setSelectedSlot] = useState('08:30 - 09:15');
  const [selectedRoom, setSelectedRoom] = useState('Ruang Kepala Sekolah');
  const [rejectionReason, setRejectionReason] = useState('Agenda kedinasan mendadak bersama Cabang Dinas');
  const [rescheduleDate, setRescheduleDate] = useState('2026-09-12');
  const [delegateTarget, setDelegateTarget] = useState('Wakasek Kurikulum (Dr. Hendra)');

  // Anti-Double Booking Simulator
  const isSlotConflicted = selectedSlot === '10:00 - 10:45' || selectedSlot === '10:00 - 11:00';

  const pendingAppointments = appointments.filter(a => a.status === 'PENDING');
  const processedAppointments = appointments.filter(a => a.status !== 'PENDING');

  const openAction = (type, item) => {
    setTargetItem(item);
    setActiveModal(type);
  };

  const handleApprove = () => {
    if (isSlotConflicted) {
      alert('Gagal: Slot waktu bentrok dengan agenda resmi dinas. Silakan pilih jam lain.');
      return;
    }
    const [start, end] = selectedSlot.split(' - ');
    onUpdateAppointment({
      ...targetItem,
      status: 'DISETUJUI',
      meetingDate: selectedDate,
      startTime: start,
      endTime: end,
      roomLocation: selectedRoom
    }, `Permohonan ${targetItem.fullName} disetujui untuk jam ${start} di ${selectedRoom}. Auto-sync Google Calendar aktif.`);
    setActiveModal(null);
  };

  const handleReject = () => {
    onUpdateAppointment({
      ...targetItem,
      status: 'DITOLAK',
      rejectionReason
    }, `Permohonan ${targetItem.fullName} ditolak. Notifikasi penolakan sopan dikirimkan via WhatsApp.`);
    setActiveModal(null);
  };

  const handleDelegate = () => {
    onUpdateAppointment({
      ...targetItem,
      targetHost: delegateTarget,
      status: 'DISETUJUI',
      meetingDate: selectedDate,
      startTime: '09:00',
      endTime: '09:45',
      roomLocation: 'Ruang Rapat Mini Lt. 2'
    }, `Permohonan ${targetItem.fullName} didelegasikan ke ${delegateTarget}.`);
    setActiveModal(null);
  };

  const handleReschedule = () => {
    onUpdateAppointment({
      ...targetItem,
      meetingDate: rescheduleDate,
      status: 'PENDING'
    }, `Jadwal baru diusulkan pada ${rescheduleDate}. Menunggu konfirmasi ulang tamu.`);
    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Pimpinan Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop&q=80"
              alt="Kepala Sekolah"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Dr. H. Ahmad Sudrajat, M.Pd.</h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                Principal Host
              </span>
            </div>
            <p className="text-xs text-slate-400">Kepala SMAN 1 Prestasi Bangsa • Dasbor Triage & Approval</p>
          </div>
        </div>

        {/* Live Indicator Google Calendar */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-slate-300 font-medium">Auto-Sync Google Calendar: <span className="text-emerald-400">Tersambung</span></div>
            <div className="text-[10px] text-slate-500">Kunci Atomik Slot Aktif</div>
          </div>
        </div>
      </div>

      {/* Agenda Terkunci Hari Ini (Anti-Double Booking Reference) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🔒</span> Agenda Kedinasan Terkunci Hari Ini (Slot Tidak Tersedia):
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {BLOCKED_SCHEDULES.map((slot, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/50 flex items-center justify-between text-xs">
              <span className="text-rose-300 font-mono font-bold">{slot.start} - {slot.end} WIB</span>
              <span className="text-slate-300 text-[11px] truncate max-w-[240px]">{slot.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-rose-900/80 text-rose-200 rounded">Bentrok Lock</span>
            </div>
          ))}
        </div>
      </div>

      {/* Antrean Pengajuan (Review Queue) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Antrean Permohonan Masuk</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
              {pendingAppointments.length} Menunggu Tindakan
            </span>
          </h3>
          <span className="text-xs text-slate-400">Target SLA Peninjauan: &lt; 6 Jam Kerja</span>
        </div>

        {pendingAppointments.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            Tidak ada permohonan yang menunggu. Seluruh tamu telah dikurasi.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingAppointments.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
              >
                {/* Guest Profile & Photo */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.photoUrl}
                    alt={item.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/60 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{item.fullName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                        {item.trackingCode}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.urgency === 'mendesak' ? 'bg-rose-950 text-rose-400 border border-rose-600' :
                        item.urgency === 'penting' ? 'bg-amber-950 text-amber-400 border border-amber-600' :
                        'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {item.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.institutionName} • No. Surat: {item.taskLetterNo || '-'}
                    </p>
                    <p className="text-xs text-slate-200 mt-1 font-medium bg-slate-800/60 p-2 rounded-lg border border-slate-800">
                      "{item.purpose}"
                    </p>
                  </div>
                </div>

                {/* 1-Click Triage Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                  <button
                    onClick={() => openAction('approve', item)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                  >
                    <span>✓</span>
                    <span>Setujui (Approve)</span>
                  </button>
                  <button
                    onClick={() => openAction('delegate', item)}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center gap-1"
                  >
                    <span>⇄</span>
                    <span>Disposisi</span>
                  </button>
                  <button
                    onClick={() => openAction('reschedule', item)}
                    className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md shadow-amber-600/30 transition-all flex items-center gap-1"
                  >
                    <span>📅</span>
                    <span>Jadwal Ulang</span>
                  </button>
                  <button
                    onClick={() => openAction('reject', item)}
                    className="px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-semibold border border-rose-800/80 transition-all flex items-center gap-1"
                  >
                    <span>✕</span>
                    <span>Tolak</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Riwayat Pertemuan Terjadwal */}
      <div className="space-y-3 pt-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Audiensi Terkonfirmasi Hari Ini:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {processedAppointments.map((a) => (
            <div key={a.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between items-start">
                <span className="font-bold text-white truncate max-w-[160px]">{a.fullName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  a.status === 'DISETUJUI' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                  a.status === 'SEDANG BERLANGSUNG' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {a.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{a.institutionName || a.category}</p>
              <div className="flex items-center justify-between text-[10px] text-cyan-300 font-mono pt-1 border-t border-slate-800">
                <span>{a.startTime} - {a.endTime} WIB</span>
                <span>{a.roomLocation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL DIALOGS --- */}
      {activeModal && targetItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {activeModal === 'approve' && 'Setujui Audiensi & Kunci Jadwal'}
                {activeModal === 'delegate' && 'Disposisikan Wewenang ke Wakasek'}
                {activeModal === 'reschedule' && 'Usulkan Jadwal Ulang'}
                {activeModal === 'reject' && 'Tolak Permohonan Audiensi'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Tamu: <span className="font-bold text-cyan-400">{targetItem.fullName}</span> ({targetItem.institutionName})
            </p>

            {/* Modal Approve Form with Anti Double Booking */}
            {activeModal === 'approve' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Pilih Slot Waktu:</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                  >
                    <option value="08:30 - 09:15">08:30 - 09:15 WIB (Aman / Tersedia)</option>
                    <option value="09:15 - 10:00">09:15 - 10:00 WIB (Aman / Tersedia)</option>
                    <option value="10:00 - 10:45">10:00 - 10:45 WIB ⚠️ (BENTROK - Rapat Dinas Cabdin)</option>
                    <option value="13:30 - 14:15">13:30 - 14:15 WIB (Aman / Sesi Siang)</option>
                  </select>
                </div>

                {isSlotConflicted && (
                  <div className="p-3 bg-rose-950/80 border border-rose-600 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                    <span>⛔</span>
                    <div>
                      <strong>BENTROK DETEKSI ATOMIK!</strong>
                      <p className="text-[11px] text-rose-200">Slot jam ini terisi agenda Rapat Evaluasi Cabdin. Tombol persetujuan dikunci.</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 mb-1">Pilih Ruangan Pertemuan:</label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Ruang Kepala Sekolah">Ruang Kepala Sekolah (Lt. 1)</option>
                    <option value="Ruang Tamu VVIP Lobi">Ruang Tamu VVIP Lobi Depan</option>
                    <option value="Ruang Rapat Mini Lt. 2">Ruang Rapat Mini Lt. 2</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isSlotConflicted}
                    className={`px-5 py-2 rounded-xl font-bold text-white shadow-lg ${
                      isSlotConflicted
                        ? 'bg-slate-700 cursor-not-allowed text-slate-500'
                        : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                    }`}
                  >
                    Konfirmasi & Kunci Jadwal
                  </button>
                </div>
              </div>
            )}

            {/* Modal Disposisi */}
            {activeModal === 'delegate' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Alihkan Wewenang Penerimaan ke:</label>
                  <select
                    value={delegateTarget}
                    onChange={(e) => setDelegateTarget(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="Wakasek Kurikulum (Dr. Hendra)">Wakasek Kurikulum (Dr. Hendra)</option>
                    <option value="Wakasek Kesiswaan (Dra. Nurhayati)">Wakasek Kesiswaan (Dra. Nurhayati)</option>
                    <option value="Wakasek Sarpras (Ir. Bambang Sujarwo)">Wakasek Sarpras (Ir. Bambang Sujarwo)</option>
                    <option value="Wakasek Humas (Siti Rahma, M.Si.)">Wakasek Humas (Siti Rahma, M.Si.)</option>
                  </select>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Batal</button>
                  <button onClick={handleDelegate} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30">
                    Kirim Disposisi
                  </button>
                </div>
              </div>
            )}

            {/* Modal Tolak */}
            {activeModal === 'reject' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Alasan Penolakan:</label>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Batal</button>
                  <button onClick={handleReject} className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30">
                    Kirim Penolakan
                  </button>
                </div>
              </div>
            )}

            {/* Modal Reschedule */}
            {activeModal === 'reschedule' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Usulan Tanggal Baru:</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Batal</button>
                  <button onClick={handleReschedule} className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30">
                    Ajukan Jadwal Baru
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// =========================================================================================
// 4. MODUL RESEPSIONIS: KIOSK SCANNER & SPLIT-SCREEN VERIFIKASI BIOMETRIK LOBI
// =========================================================================================
function ReceptionistTerminalModule({ appointments, onCheckIn, onCheckOut }) {
  const [scannedCode, setScannedCode] = useState('SMT-2026-0813');
  const [activeScannedGuest, setActiveScannedGuest] = useState(
    appointments.find(a => a.trackingCode === 'SMT-2026-0813') || appointments[0]
  );
  const [matchScore, setMatchScore] = useState(98.4);

  // Cari data tiket saat scanner input berubah
  const handleSearchCode = (code) => {
    setScannedCode(code);
    const found = appointments.find(a => a.trackingCode.toLowerCase() === code.trim().toLowerCase());
    if (found) {
      setActiveScannedGuest(found);
      setMatchScore((96 + Math.random() * 3.5).toFixed(1));
    }
  };

  // Simulasi Edge Case Tamu Terlambat > 30 Menit
  const isLateOver30Mins = activeScannedGuest && activeScannedGuest.trackingCode === 'SMT-2026-0809';

  return (
    <div className="space-y-6">
      
      {/* Kiosk Terminal Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Terminal 01: Meja Resepsionis Lobi Utama
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-wide">
            Kiosk Scanner & Verifikasi Identitas Fisik
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Petugas Piket: <span className="text-slate-200 font-semibold">Rian Pratama (Lobi-1)</span> • Validasi Instan &lt; 500 ms
          </p>
        </div>

        {/* Scanner Barcode / QR Simulation Input */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <input
            type="text"
            value={scannedCode}
            onChange={(e) => handleSearchCode(e.target.value)}
            placeholder="Scan / Ketik Kode Tiket..."
            className="px-4 py-2.5 rounded-xl bg-slate-800 border border-cyan-500/50 text-cyan-300 font-mono text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={() => handleSearchCode(scannedCode)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30"
          >
            Verifikasi Tiket
          </button>
        </div>
      </div>

      {/* Quick Select demo buttons */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
        <span className="text-slate-400 font-medium whitespace-nowrap">Uji Coba Cepat:</span>
        {appointments.map((a) => (
          <button
            key={a.id}
            onClick={() => handleSearchCode(a.trackingCode)}
            className={`px-3 py-1 rounded-lg border font-mono transition-all ${
              activeScannedGuest?.id === a.id
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {a.trackingCode} ({a.fullName.split(' ')[0]}) {a.trackingCode === 'SMT-2026-0809' && '⚠️ Telat'}
          </button>
        ))}
      </div>

      {activeScannedGuest ? (
        <div className="space-y-6">
          
          {/* Edge Case Warning: Terlambat > 30 Menit */}
          {isLateOver30Mins && (
            <div className="p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-500/80 text-amber-200 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-extrabold text-xs font-mono uppercase">
                      JADWAL KEDALUWARSA
                    </span>
                    <span className="text-xs font-bold text-amber-300">Tamu Terlambat 45 Menit dari Jadwal 08:00 WIB</span>
                  </div>
                  <p className="text-xs text-amber-200/80 mt-1">
                    Sesuai SOP lobi, slot otomatis dibatalkan jika melebihi 30 menit. Silakan konfirmasi dispensasi ke pimpinan sebelum memproses check-in.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert('Menghubungi Ajudan/Sekretaris Kepala Sekolah via WhatsApp Gateway untuk dispensasi masuk...')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow whitespace-nowrap"
              >
                📞 Hubungi Pimpinan via WA
              </button>
            </div>
          )}

          {/* SPLIT-SCREEN VISUAL VERIFICATION CARD */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  Modul Verifikasi Fisik Meja Resepsionis
                </span>
                <h3 className="text-lg font-bold text-white">
                  Pencocokan Biometrik Wajah: Pendaftaran Online vs Tamu di Lobi
                </h3>
              </div>

              {/* AI Confidence Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold">Biometric Match: {matchScore}% (Match Verified)</span>
              </div>
            </div>

            {/* Side-by-Side Dual Feeds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sisi Kiri: Foto Saat Pendaftaran Web */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span>🌐</span> 1. Foto Pendaftaran Web Tamu
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                    WebP Secure Vault
                  </span>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 relative shadow-inner">
                  <img
                    src={activeScannedGuest.photoUrl}
                    alt="Foto Registrasi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 rounded text-[10px] font-mono text-slate-300">
                    Capture Timestamp: {activeScannedGuest.createdAt}
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Live Feed Kamera Resepsionis Lobi */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span>📹</span> 2. Kamera HD Meja Resepsionis Lobi
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    LIVE FEED 1080P
                  </span>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/60 relative shadow-inner">
                  <img
                    src={activeScannedGuest.photoUrl}
                    alt="Live Cam Lobi"
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  {/* Futuristic HUD Scanning Grid */}
                  <div className="absolute inset-0 pointer-events-none border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-36 h-44 border-2 border-emerald-400/80 rounded-2xl relative animate-pulse flex items-center justify-center">
                      <div className="text-[9px] font-mono text-emerald-300 bg-black/60 px-1.5 py-0.5 rounded">
                        FACE MATCHED
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-emerald-950/90 border border-emerald-500/40 rounded text-[10px] font-mono text-emerald-300">
                    TERMINAL 01 • SENSOR AKTIF
                  </div>
                </div>
              </div>

            </div>

            {/* Rincian Tiket Tamu */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Nama Tamu</span>
                <span className="font-bold text-white text-sm">{activeScannedGuest.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Instansi / Kategori</span>
                <span className="font-semibold text-cyan-300">{activeScannedGuest.institutionName || activeScannedGuest.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Pihak yang Dituju</span>
                <span className="font-semibold text-slate-200">{activeScannedGuest.targetHost}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Ruangan Ditetapkan</span>
                <span className="font-semibold text-emerald-400">{activeScannedGuest.roomLocation}</span>
              </div>
            </div>

            {/* Tombol Aksi Meja Lobi */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
              
              {activeScannedGuest.status === 'DISETUJUI' && (
                <button
                  onClick={() => onCheckIn(activeScannedGuest.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <span>✓</span>
                  <span>Konfirmasi Check-in Masuk (Cetak ID Tamu)</span>
                </button>
              )}

              {activeScannedGuest.status === 'SEDANG BERLANGSUNG' && (
                <button
                  onClick={() => onCheckOut(activeScannedGuest.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <span>👋</span>
                  <span>Konfirmasi Check-out Selesai (Kembalikan ID)</span>
                </button>
              )}

              {activeScannedGuest.status === 'SELESAI' && (
                <div className="px-4 py-2 bg-slate-800 rounded-xl text-slate-400 text-xs font-medium">
                  Kunjungan telah selesai pada: {activeScannedGuest.checkOutTime || 'Hari ini'}.
                </div>
              )}

              {activeScannedGuest.status === 'PENDING' && (
                <div className="px-4 py-2 bg-amber-950/80 border border-amber-600 rounded-xl text-amber-300 text-xs">
                  Permohonan ini masih berstatus PENDING di Kepala Sekolah.
                </div>
              )}

            </div>

          </div>

        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
          Kode tiket tidak ditemukan. Harap arahkan kartu QR tamu ke scanner meja depan.
        </div>
      )}

    </div>
  );
}

// =========================================================================================
// 5. MODUL ANALITIK & AUDIT TRAIL KEPATUHAN UU PDP NO. 27/2022
// =========================================================================================
function AnalyticsAuditModule({ appointments }) {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredLogs = appointments.filter(a =>
    a.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.trackingCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (a.institutionName && a.institutionName.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Banner Kepatuhan Regulasi UU PDP */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950/60 to-slate-950 border border-blue-500/40 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400 flex items-center justify-center text-2xl text-blue-400">
            ⚖️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Audit Trail & Kepatuhan UU No. 27 Tahun 2022 (UU PDP)</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono">
                Compliant
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Enkripsi Transit TLS 1.3 Aktif • Berkas Foto Terisolasi Presigned URL • Kebijakan Pembersihan Retensi Otomatis 180 Hari.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Mengekspor Berita Acara Rekapitulasi Tamu Resmi Dinas (Format PDF / XLSX) dengan stempel digital...')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-2 whitespace-nowrap"
        >
          <span>📥</span>
          <span>Ekspor Dokumen Audit Resmi</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tamu Minggu Ini', val: '48 Kunjungan', change: '+14% vs pekan lalu', icon: '👥', color: 'border-cyan-500/40 text-cyan-400' },
          { label: 'Rata-rata Durasi Audiensi', val: '28.5 Menit', change: 'Efisien (SLA < 45m)', icon: '⏱️', color: 'border-blue-500/40 text-blue-400' },
          { label: 'On-Time Arrival Rate', val: '92.8%', change: 'Disiplin Lobi Meningkat', icon: '🎯', color: 'border-emerald-500/40 text-emerald-400' },
          { label: 'Integritas Log Kriptografi', val: '100% Valid', change: 'Zero Tampering Detected', icon: '🛡️', color: 'border-purple-500/40 text-purple-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center text-xl mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-mono font-bold ${kpi.color}`}>{kpi.val}</span>
            </div>
            <div className="text-xs font-medium text-slate-300">{kpi.label}</div>
            <div className="text-[10px] text-slate-500 mt-1">{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Tabel Log Aktivitas (Audit Trail) */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-sm font-bold text-white">Log Aktivitas Resepsionis & Check-in Tamu</h4>
            <p className="text-[11px] text-slate-400">Seluruh pergerakan tamu tersimpan dengan stempel waktu atomik.</p>
          </div>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Cari nama, instansi, atau kode..."
            className="w-full sm:w-64 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Kode Tiket</th>
                <th className="p-3">Nama Tamu & Kategori</th>
                <th className="p-3">Pejabat Penerima</th>
                <th className="p-3">Check-in Lobi</th>
                <th className="p-3">Check-out Lobi</th>
                <th className="p-3">Petugas Resepsionis</th>
                <th className="p-3">Status Pertemuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-cyan-400 font-bold">{log.trackingCode}</td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{log.fullName}</div>
                    <div className="text-[10px] text-slate-400">{log.institutionName || log.category}</div>
                  </td>
                  <td className="p-3 text-slate-200">{log.targetHost}</td>
                  <td className="p-3 font-mono text-emerald-400">{log.checkInTime || '-'}</td>
                  <td className="p-3 font-mono text-blue-400">{log.checkOutTime || '-'}</td>
                  <td className="p-3 text-slate-400">{log.receptionistName || 'Piket Depan'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      log.status === 'SEDANG BERLANGSUNG' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' :
                      log.status === 'SELESAI' ? 'bg-slate-800 text-slate-300' :
                      log.status === 'DISETUJUI' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                      'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
