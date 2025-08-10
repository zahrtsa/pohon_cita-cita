// Warna daun per kelas (Tailwind classes)
const warnaMap = {
  red: ["bg-red-300", "text-red-800"],
  yellow: ["bg-yellow-300", "text-yellow-800"],
  green: ["bg-green-300", "text-green-800"],
  blue: ["bg-blue-300", "text-blue-800"],
  purple: ["bg-purple-300", "text-purple-800"],
};

// Data Cita-Cita dan Penjelasannya
const citaCitaData = {
  koki: "Seorang koki adalah orang yang membuat masakan lezat di dapur. Kamu bisa membuat kue, sup, atau makanan kesukaanmu!",
  petani:
    "Petani adalah pahlawan yang menanam sayur, buah, dan padi. Tanpa mereka, kita tidak bisa makan nasi dan sayur sehat!",
  montir:
    "Montir hebat bisa memperbaiki mobil, motor, atau sepeda yang rusak. Mereka membuat kendaraan bisa berjalan lagi!",
  "penjaga kebun binatang":
    "Orang yang menjaga dan memberi makan hewan-hewan di kebun binatang. Mereka adalah sahabat para hewan!",
  "petugas pemadam kebakaran":
    "Pahlawan berani yang memadamkan api dan menyelamatkan orang. Mereka juga membantu saat ada bencana!",
  guru: "Guru adalah orang yang mengajari kita membaca, menulis, dan banyak hal keren lainnya. Mereka membimbing kita untuk jadi pintar!",
  perawat:
    "Perawat adalah malaikat penolong yang merawat orang sakit di rumah sakit. Mereka memastikan kita cepat sembuh!",
  "dokter hewan":
    "Dokter hewan merawat hewan-hewan yang sakit. Mereka adalah dokter khusus untuk anjing, kucing, burung, dan lainnya.",
  "pelatih hewan":
    "Pelatih hewan mengajari anjing, lumba-lumba, atau hewan lain untuk melakukan trik lucu dan bermanfaat.",
  polisi:
    "Polisi menjaga keamanan dan ketertiban. Mereka melindungi kita dari bahaya dan membuat jalan raya aman.",
  musisi:
    "Musisi adalah orang yang bisa menyanyi atau memainkan alat musik seperti gitar, piano, atau drum. Mereka membuat lagu yang indah!",
  penulis:
    "Penulis membuat cerita seru, buku dongeng, atau puisi. Mereka mengajak kita berpetualang lewat kata-kata.",
  "aktor/aktris":
    "Aktor atau aktris adalah orang yang bermain peran di film atau sinetron. Mereka bisa menjadi siapa saja yang mereka mau!",
  fotografer:
    "Fotografer suka mengambil foto pemandangan, keluarga, atau hewan. Mereka mengabadikan momen-momen indah.",
  "desainer mode":
    "Desainer mode adalah orang yang membuat baju-baju keren dan trendi. Mereka merancang pakaian untuk kita pakai.",
  "pelatih olahraga":
    "Pelatih olahraga mengajari kita cara bermain sepak bola, basket, atau renang. Mereka membantu kita menjadi atlet yang kuat!",
  pengacara:
    "Pengacara adalah orang pintar yang membantu orang lain di pengadilan. Mereka membela kebenaran dan keadilan.",
  manajer:
    "Manajer adalah pemimpin yang membantu timnya bekerja dengan baik. Mereka memastikan semua rencana berjalan lancar.",
  "pemilik toko":
    "Pemilik toko menjalankan toko mereka sendiri, menjual makanan, mainan, atau barang lainnya. Mereka adalah pengusaha hebat!",
  "pemandu wisata":
    "Pemandu wisata mengajak orang-orang jalan-jalan ke tempat baru dan bercerita tentang tempat itu. Seru!",
  dokter:
    "Dokter adalah orang yang memeriksa dan mengobati kita saat sakit. Mereka menjaga agar kita selalu sehat.",
  astronom:
    "Astronom adalah ilmuwan yang mempelajari bintang, planet, dan galaksi di luar angkasa. Mereka suka melihat ke langit!",
  peneliti:
    "Peneliti suka mencari tahu hal-hal baru di laboratorium. Mereka bisa menemukan obat atau penemuan penting.",
  detektif:
    "Detektif adalah orang yang memecahkan misteri dan teka-teki. Mereka sangat jeli dan pintar!",
  apoteker:
    "Apoteker adalah orang yang membantu dokter memberikan obat yang tepat untuk pasien.",
  "pegawai bank":
    "Pegawai bank membantu kita menyimpan uang dengan aman. Mereka mengurus keuangan agar tidak ada yang hilang.",
  pustakawan:
    "Pustakawan adalah penjaga buku di perpustakaan. Mereka membantu kita menemukan buku yang ingin kita baca.",
  sekretaris:
    "Sekretaris membantu bosnya mengatur jadwal, surat, dan dokumen agar semua pekerjaan teratur dan rapi.",
  satpam:
    "Satpam menjaga keamanan sebuah gedung, sekolah, atau rumah. Mereka membuat kita merasa aman.",
};

// DOM references
const homeScreen = document.getElementById("home-screen");
const adminLogin = document.getElementById("admin-login");
const muridClassSelect = document.getElementById("murid-class-select");
const muridPohon = document.getElementById("murid-pohon");
const btnAdmin = document.getElementById("btnAdmin");
const btnMurid = document.getElementById("btnMurid");
const backFromAdmin = document.getElementById("backFromAdmin");
const backFromClassSelect = document.getElementById("backFromClassSelect");
const backFromTree = document.getElementById("backFromTree");
const adminForm = document.getElementById("adminForm");
const adminError = document.getElementById("adminError");
const kelasButtons = document.querySelectorAll(".kelas-btn");
const kelasTitle = document.getElementById("kelasTitle");
const namaInput = document.getElementById("namaInput");
const kelasInput = document.getElementById("kelasInput");
const citaInput = document.getElementById("citaInput");
const warnaDaunSelect = document.getElementById("warnaDaun");
const citaForm = document.getElementById("citaForm");
const leavesContainer = document.getElementById("leaves-container");
const saveImageBtn = document.getElementById("saveImageBtn");
const resetTreeBtn = document.getElementById("resetTreeBtn");

// Pop-up modal elements
const popupModal = document.getElementById("popupModal");
const popupCard = document.getElementById("popupCard");
const popupCitaTitle = document.getElementById("popupCitaTitle");
const popupContent = document.getElementById("popupContent");
const closePopupBtn = document.getElementById("closePopupBtn");
const customCitaModal = document.getElementById("customCitaModal");
const customCitaName = document.getElementById("customCitaName");
const customCitaExplanation = document.getElementById("customCitaExplanation");
const customCitaForm = document.getElementById("customCitaForm");
const closeCustomModalBtn = document.getElementById("closeCustomModalBtn");

let currentKelas = null;
let leavesData = [];
let tempCustomLeafData = {};
let dragStartTime = 0;

// Fungsi drag daun dengan batas container
function makeDraggable(el) {
  let pos1 = 0,
    pos2 = 0,
    initialX = 0,
    initialY = 0;

  el.style.position = "absolute";

  el.onpointerdown = (e) => {
    dragStartTime = new Date().getTime();
    dragMouseDown(e);
  };

  function dragMouseDown(e) {
    e.stopPropagation();
    initialX = e.clientX;
    initialY = e.clientY;

    pos3 = el.offsetLeft;
    pos4 = el.offsetTop;

    document.onpointerup = closeDragElement;
    document.onpointermove = elementDrag;
    document.onpointercancel = closeDragElement;
    el.style.cursor = "grabbing";

    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  }

  function elementDrag(e) {
    e.preventDefault();

    pos1 = e.clientX - initialX;
    pos2 = e.clientY - initialY;

    let newLeft = pos3 + pos1;
    let newTop = pos4 + pos2;

    const container = el.parentElement;
    const maxLeft = container.clientWidth - el.offsetWidth;
    const maxTop = container.clientHeight - el.offsetHeight;

    newLeft = Math.min(Math.max(0, newLeft), maxLeft);
    newTop = Math.min(Math.max(0, newTop), maxTop);

    el.style.top = newTop + "px";
    el.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onpointerup = null;
    document.onpointermove = null;
    document.onpointercancel = null;
    el.style.cursor = "grab";

    const idx = parseInt(el.dataset.index);
    leavesData[idx].top = el.style.top;
    leavesData[idx].left = el.style.left;
    saveLeaves();
  }
}

function showScreen(screen) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

btnAdmin.onclick = () => showScreen(adminLogin);
btnMurid.onclick = () => showScreen(muridClassSelect);

backFromAdmin.onclick = () => {
  adminError.textContent = "";
  adminForm.reset();
  showScreen(homeScreen);
};
backFromClassSelect.onclick = () => showScreen(homeScreen);
backFromTree.onclick = () => {
  clearLeaves();
  showScreen(muridClassSelect);
};

adminForm.onsubmit = (e) => {
  e.preventDefault();
  const user = adminForm.adminUser.value.trim();
  const pass = adminForm.adminPass.value.trim();
  if (user === "admin" && pass === "admin123") {
    alert("Login admin berhasil! Fitur admin belum tersedia.");
    adminForm.reset();
  } else {
    adminError.textContent = "Username atau password salah.";
  }
};

kelasButtons.forEach((btn) => {
  btn.onclick = () => {
    currentKelas = btn.dataset.kelas;
    kelasTitle.textContent = currentKelas;
    kelasInput.value = currentKelas;
    loadLeaves();
    showScreen(muridPohon);
  };
});

function loadLeaves() {
  leavesData =
    JSON.parse(localStorage.getItem("citaCita_kelas" + currentKelas)) || [];
  renderLeaves();
}

function saveLeaves() {
  localStorage.setItem(
    "citaCita_kelas" + currentKelas,
    JSON.stringify(leavesData)
  );
}

function renderLeaves() {
  leavesContainer.innerHTML = "";
  leavesData.forEach((leaf, index) => {
    const leafEl = document.createElement("div");
    leafEl.classList.add(
      "leaf",
      "absolute",
      "rounded-full",
      "p-3",
      "font-semibold",
      "text-center",
      "cursor-grab",
      "select-none",
      "shadow-md",
      "flex",
      "items-center",
      "justify-center",
      "text-sm",
      "pop-in"
    );
    const [bg, text] = warnaMap[leaf.warna] || [
      "bg-green-300",
      "text-green-800",
    ];
    leafEl.classList.add(bg, text);

    if (!leaf.top || !leaf.left) {
      leaf.top = `${
        10 + Math.random() * (leavesContainer.clientHeight - 40)
      }px`;
      leaf.left = `${
        10 + Math.random() * (leavesContainer.clientWidth - 100)
      }px`;
    }

    leafEl.style.top = leaf.top;
    leafEl.style.left = leaf.left;
    leafEl.textContent = leaf.cita;
    leafEl.title = `Nama: ${leaf.nama}\nCita-cita: ${leaf.cita}`;
    leafEl.dataset.index = index;

    leafEl.onclick = (e) => {
      e.stopPropagation();
      const dragTime = new Date().getTime() - dragStartTime;

      if (dragTime > 200) {
        return;
      }
      const key = leaf.cita.toLowerCase();
      showAspirationPopup(key, leaf.cita);
    };

    makeDraggable(leafEl);
    leavesContainer.appendChild(leafEl);
  });
}

function showAspirationPopup(citaKey, originalCita) {
  const explanation = citaCitaData[citaKey];
  if (explanation) {
    popupCitaTitle.textContent = originalCita;
    popupContent.textContent = explanation;

    popupCard.classList.remove("pop-in");
    popupCard.classList.add("bounce-in");

    popupModal.classList.remove("hidden");
    popupModal.classList.add("flex");
  } else {
    popupCitaTitle.textContent = originalCita;
    popupContent.textContent =
      "Maaf, penjelasan untuk cita-cita ini belum tersedia.";

    popupCard.classList.remove("pop-in");
    popupCard.classList.add("bounce-in");

    popupModal.classList.remove("hidden");
    popupModal.classList.add("flex");
  }
}

closePopupBtn.onclick = () => {
  popupModal.classList.add("hidden");
  popupModal.classList.remove("flex");
};

closeCustomModalBtn.onclick = () => {
  customCitaModal.classList.add("hidden");
  customCitaModal.classList.remove("flex");
  customCitaForm.reset();
  tempCustomLeafData = {};
};

customCitaForm.onsubmit = (e) => {
  e.preventDefault();
  const explanation = customCitaExplanation.value.trim();
  if (explanation) {
    const originalCita = tempCustomLeafData.cita;
    const citaKey = originalCita.toLowerCase();

    citaCitaData[citaKey] = explanation;

    const newLeaf = {
      nama: tempCustomLeafData.nama,
      cita: originalCita,
      warna: tempCustomLeafData.warna,
      top: null,
      left: null,
    };
    leavesData.push(newLeaf);
    saveLeaves();
    renderLeaves();

    customCitaModal.classList.add("hidden");
    customCitaModal.classList.remove("flex");
    customCitaForm.reset();
    tempCustomLeafData = {};
  }
};

// Logika input form yang sudah diubah
citaForm.onsubmit = (e) => {
  e.preventDefault();
  const nama = namaInput.value.trim();
  const originalCita = citaInput.value.trim();
  const citaKey = originalCita.toLowerCase();
  const warna = warnaDaunSelect.value;
  if (!nama || !originalCita || !warna) {
    alert("Isi nama, cita-cita dan pilih warna daun ya!");
    return;
  }

  if (citaCitaData[citaKey]) {
    const newLeaf = {
      nama,
      cita: originalCita,
      warna,
      top: null,
      left: null,
    };
    leavesData.push(newLeaf);
    saveLeaves();
    renderLeaves();

    showAspirationPopup(citaKey, originalCita);

    citaForm.reset();
    namaInput.focus();
  } else {
    tempCustomLeafData = { nama, cita: originalCita, warna };
    customCitaName.textContent = `"${originalCita}"`;
    customCitaModal.classList.remove("hidden");
    customCitaModal.classList.add("flex");
  }
};

resetTreeBtn.onclick = () => {
  if (confirm("Yakin reset pohon? Semua data daun akan hilang.")) {
    leavesData = [];
    saveLeaves();
    renderLeaves();
  }
};

// ... (semua kode di atas tetap sama) ...

// Mengubah fungsi saveImageBtn untuk menggunakan dom-to-image
saveImageBtn.onclick = () => {
  // Ambil elemen yang ingin di-screenshot (kontainer induk)
  const container = document.getElementById("tree-container");

  // Panggil dom-to-image untuk mengonversi elemen menjadi gambar PNG
  domtoimage
    .toPng(container)
    .then(function (dataUrl) {
      // Jika berhasil, buat link download dan klik secara otomatis
      const link = document.createElement("a");
      link.download = `pohon-kelas${currentKelas}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      // Jika terjadi error, tampilkan di konsol dan beri peringatan
      console.error("Ada masalah saat menyimpan gambar:", error);
      alert(
        "Gagal menyimpan gambar. Mohon periksa konsol browser untuk detail error."
      );
    });
};

// ... (semua kode di bawah tetap sama) ...

function clearLeaves() {
  leavesData = [];
  saveLeaves();
  renderLeaves();
}
