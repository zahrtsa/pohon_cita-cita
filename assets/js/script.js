// assets/js/script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
    update,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// === FIREBASE CONFIG ===
const firebaseConfig = {
    apiKey: "AIzaSyBAKdSaEaVlUguffXo838UBEFTdyY-S4SE",
    authDomain: "pohon-cita-cita.firebaseapp.com",
    databaseURL:
        "https://pohon-cita-cita-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pohon-cita-cita",
    storageBucket: "pohon-cita-cita.appspot.com",
    messagingSenderId: "445227569579",
    appId: "1:445227569579:web:eb1dbba21c66385ca842ee",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// === warna map ===
const warnaMap = {
    red: ["bg-red-300", "text-red-800"],
    yellow: ["bg-yellow-300", "text-yellow-800"],
    green: ["bg-green-300", "text-green-800"],
    blue: ["bg-blue-300", "text-blue-800"],
    purple: ["bg-purple-300", "text-purple-800"],
};

const namaBorderMap = {
    red: "#fca5a5",
    yellow: "#fde047",
    green: "#86efac",
    blue: "#93c5fd",
    purple: "#c4b5fd",
};

// === Tambahan: mapping warna SweetAlert ===
const sweetAlertColorMap = {
  red: {
    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    title: '#b91c1c',
    text: '#991b1b',
    button: '#dc2626'
  },
  yellow: {
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    title: '#b45309',
    text: '#92400e',
    button: '#f59e0b'
  },
  green: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    title: '#166534',
    text: '#14532d',
    button: '#22c55e'
  },
  blue: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    title: '#1e40af',
    text: '#1e3a8a',
    button: '#3b82f6'
  },
  purple: {
    background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    title: '#6b21a8',
    text: '#581c87',
    button: '#8b5cf6'
  }
};

// === data penjelasan ===
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

// === DOM references ===
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
const warnaDaunHidden = document.getElementById("warnaDaun");
const citaForm = document.getElementById("citaForm");
const leavesContainer = document.getElementById("leaves-container");
const saveImageBtn = document.getElementById("saveImageBtn");
const resetTreeBtn = document.getElementById("resetTreeBtn");

let currentKelas = null;
let leavesData = [];
let tempCustomLeafData = {};
let isDragging = false; // Flag baru untuk membedakan klik dan drag
let unsubscribeListener = null;

// ---- small helpers ----
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
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
        Swal.fire({
            title: "Berhasil!",
            text: "Login admin berhasil!",
            icon: "success",
            confirmButtonColor: '#10b981'
        });
        adminForm.reset();
    } else {
        Swal.fire({
            title: "Gagal!",
            text: "Username atau password salah.",
            icon: "error",
            confirmButtonColor: '#ef4444'
        });
        adminError.textContent = "Username atau password salah.";
    }
};

kelasButtons.forEach((btn) => {
    btn.onclick = () => {
        currentKelas = btn.dataset.kelas;
        kelasTitle.textContent = currentKelas;
        kelasInput.value = currentKelas;
        if (typeof unsubscribeListener === "function") unsubscribeListener();
        attachRealtimeListener(currentKelas);
        showScreen(muridPohon);
    };
});

// === Realtime: attach listener for a class ===
function attachRealtimeListener(kelas) {
    const pathRef = ref(db, `pohon/${kelas}`);
    unsubscribeListener = onValue(pathRef, (snapshot) => {
        const items = [];
        snapshot.forEach((child) => {
            const val = child.val();
            items.push({
                key: child.key,
                nama: val.nama,
                cita: val.cita,
                warna: val.warna,
                top: val.top || null,
                left: val.left || null,
            });
        });
        leavesData = items;
        renderLeaves();
    });
}

// === renderLeaves: use leavesData, create DOM elements ===
function renderLeaves() {
    leavesContainer.innerHTML = "";
    leavesData.forEach((leaf, index) => {
        const leafEl = document.createElement("div");
        leafEl.classList.add(
            "leaf", "absolute", "font-semibold", "text-center", "cursor-grab", "select-none", "shadow-md", "pop-in"
        );
        const mapped = warnaMap[leaf.warna];
        if (mapped) {
            leafEl.classList.add(mapped[0], mapped[1]);
        } else {
            leafEl.style.background = "#6ee7b7";
            leafEl.style.color = "#064e3b";
        }
        if (!leaf.top || !leaf.left) {
            const topPx = Math.max(8, Math.random() * (leavesContainer.clientHeight - 60));
            const leftPx = Math.max(8, Math.random() * (leavesContainer.clientWidth - 120));
            leaf.top = `${topPx}px`;
            leaf.left = `${leftPx}px`;
            if (leaf.key && currentKelas) {
                update(ref(db, `pohon/${currentKelas}/${leaf.key}`), { top: leaf.top, left: leaf.left }).catch(console.error);
            }
        }
        leafEl.style.top = leaf.top;
        leafEl.style.left = leaf.left;
        const namaBorderColor = namaBorderMap[leaf.warna] || "#ccc";
        leafEl.innerHTML = `
            <span class="leaf-name" style="border-color: ${namaBorderColor};">${escapeHtml(leaf.nama || "")}</span>
            <span class="leaf-cita">${escapeHtml(leaf.cita || "")}</span>
        `;
        leafEl.dataset.key = leaf.key || "";
        leafEl.dataset.index = index;
        
        // --- LOGIKA KLIK DAN DRAG YANG BARU ---
        leafEl.onclick = (e) => {
            if (isDragging) return;
            e.stopPropagation();
            const leafColor = leaf.warna;
            showAspirationPopup((leaf.cita || "").toLowerCase(), leaf.cita, leafColor);
        };
        
        makeDraggableWithUpdate(leafEl);
        leavesContainer.appendChild(leafEl);
    });
}

// === draggable with DB update on drop ===
function makeDraggableWithUpdate(el) {
    let pos1 = 0, pos2 = 0, initialX = 0, initialY = 0, startLeft = 0, startTop = 0;
    el.style.position = "absolute";
    el.onpointerdown = (e) => {
        isDragging = true; // Tandai sebagai sedang drag
        e.stopPropagation();
        initialX = e.clientX;
        initialY = e.clientY;
        startLeft = el.offsetLeft;
        startTop = el.offsetTop;
        document.onpointerup = closeDrag;
        document.onpointermove = moveDrag;
        document.onpointercancel = closeDrag;
        el.style.cursor = "grabbing";
        if (e.target.setPointerCapture) e.target.setPointerCapture(e.pointerId);
    };
    function moveDrag(e) {
        e.preventDefault();
        pos1 = e.clientX - initialX;
        pos2 = e.clientY - initialY;
        let newLeft = startLeft + pos1;
        let newTop = startTop + pos2;
        const container = el.parentElement;
        const maxLeft = container.clientWidth - el.offsetWidth;
        const maxTop = container.clientHeight - el.offsetHeight;
        newLeft = Math.min(Math.max(0, newLeft), maxLeft);
        newTop = Math.min(Math.max(0, newTop), maxTop);
        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    }
    function closeDrag(e) {
        document.onpointerup = null;
        document.onpointermove = null;
        document.onpointercancel = null;
        el.style.cursor = "grab";
        const key = el.dataset.key;
        if (key && currentKelas) {
            const updated = { top: el.style.top, left: el.style.left };
            update(ref(db, `pohon/${currentKelas}/${key}`), updated).catch(console.error);
        }
        setTimeout(() => isDragging = false, 50); // Setel ulang flag setelah jeda singkat
    }
}

// === popup logic ===
// === popup logic ===
function showAspirationPopup(citaKey, originalCita, leafColor) {
  const explanation = citaCitaData[citaKey] || "Maaf, penjelasan untuk cita-cita ini belum tersedia.";
  const color = sweetAlertColorMap[leafColor] || sweetAlertColorMap.green;
  
  let iconHtml = '<span>🌟</span>';
  if (citaKey.includes('koki')) { iconHtml = '<span>👨‍🍳</span>';
  } else if (citaKey.includes('petani')) { iconHtml = '<span>🧑‍🌾</span>';
  } else if (citaKey.includes('montir')) { iconHtml = '<span>🔧</span>';
  } else if (citaKey.includes('penjaga kebun binatang')) { iconHtml = '<span>🦓</span>';
  } else if (citaKey.includes('petugas pemadam kebakaran')) { iconHtml = '<span>👨‍🚒</span>';
  } else if (citaKey.includes('guru')) { iconHtml = '<span>👩‍🏫</span>';
  } else if (citaKey.includes('perawat')) { iconHtml = '<span>👩‍⚕️</span>';
  } else if (citaKey.includes('dokter hewan')) { iconHtml = '<span>🐶</span>';
  } else if (citaKey.includes('pelatih hewan')) { iconHtml = '<span>🐬</span>';
  } else if (citaKey.includes('polisi')) { iconHtml = '<span>👮</span>';
  } else if (citaKey.includes('musisi')) { iconHtml = '<span>🎸</span>';
  } else if (citaKey.includes('penulis')) { iconHtml = '<span>✍️</span>';
  } else if (citaKey.includes('aktor/aktris')) { iconHtml = '<span>🎭</span>';
  } else if (citaKey.includes('fotografer')) { iconHtml = '<span>📸</span>';
  } else if (citaKey.includes('desainer mode')) { iconHtml = '<span>👗</span>';
  } else if (citaKey.includes('pelatih olahraga')) { iconHtml = '<span>⛹️</span>';
  } else if (citaKey.includes('pengacara')) { iconHtml = '<span>⚖️</span>';
  } else if (citaKey.includes('manajer')) { iconHtml = '<span>💼</span>';
  } else if (citaKey.includes('pemilik toko')) { iconHtml = '<span>🏪</span>';
  } else if (citaKey.includes('pemandu wisata')) { iconHtml = '<span>🗺️</span>';
  } else if (citaKey === 'dokter') { iconHtml = '<span>🩺</span>';
  } else if (citaKey.includes('astronom')) { iconHtml = '<span>🔭</span>';
  } else if (citaKey.includes('peneliti')) { iconHtml = '<span>🔬</span>';
  } else if (citaKey.includes('detektif')) { iconHtml = '<span>🕵️</span>';
  } else if (citaKey.includes('apoteker')) { iconHtml = '<span>💊</span>';
  } else if (citaKey.includes('pegawai bank')) { iconHtml = '<span>🏦</span>';
  } else if (citaKey.includes('pustakawan')) { iconHtml = '<span>📚</span>';
  } else if (citaKey.includes('sekretaris')) { iconHtml = '<span>📝</span>';
  } else if (citaKey.includes('satpam')) { iconHtml = '<span>💂</span>';
  }
  
  Swal.fire({
    title: `${iconHtml} ${originalCita}`,
    html: `
      <div class="swal-cita-container">
        <div class="explanation-box">
          <p>${explanation}</p>
        </div>
      </div>
    `,
    confirmButtonText: "Tutup",
    confirmButtonColor: color.button,
    showCloseButton: true,
    didOpen: (popup) => {
      popup.style.background = color.background;
      const titleEl = popup.querySelector('.swal2-title');
      const htmlEl = popup.querySelector('.swal2-html-container');
      if(titleEl) titleEl.style.color = color.title;
      // Perhatikan di sini, kita menargetkan .explanation-box
      const explanationBoxEl = popup.querySelector('.explanation-box');
      if(explanationBoxEl) explanationBoxEl.style.color = color.text;
    }
  });
}

// === customCita logic ===
async function showCustomCitaForm(tempData) {
    const { value: explanation } = await Swal.fire({
        title: `Cita-Cita Unik! 🌟`,
        html: `
            <p class="mb-4">Wah, cita-cita <b>"${tempData.cita}"</b> itu unik! Bantu kami dengan menjelaskannya, ya!</p>
            <textarea id="customCitaExplanation" class="swal2-textarea" placeholder="Contoh: Petani itu orang yang menanam sayur di sawah." required></textarea>
        `,
        focusConfirm: false,
        preConfirm: () => {
            const textarea = Swal.getPopup().querySelector('#customCitaExplanation');
            if (!textarea.value.trim()) {
                Swal.showValidationMessage('Penjelasan tidak boleh kosong!');
                return false;
            }
            return textarea.value.trim();
        },
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#ef4444'
    });
    if (explanation) {
        const originalCita = tempData.cita;
        const citaKey = originalCita.toLowerCase();
        citaCitaData[citaKey] = explanation;
        if (currentKelas) {
            push(ref(db, `pohon/${currentKelas}`), {
                nama: tempData.nama,
                cita: originalCita,
                warna: tempData.warna,
                top: null,
                left: null,
            });
        }
    }
}

// === form submit: add leaf to Firebase ===
citaForm.onsubmit = (e) => {
    e.preventDefault();
    const nama = namaInput.value.trim();
    const originalCita = citaInput.value.trim();
    const citaKey = originalCita.toLowerCase();
    const warna = warnaDaunHidden.value;
    if (!nama || !originalCita || !warna) {
        Swal.fire({
            title: "Oops!",
            text: "Isi nama, cita-cita dan pilih warna daun ya!",
            icon: "warning",
            confirmButtonColor: '#f59e0b'
        });
        return;
    }
    if (!currentKelas) {
        Swal.fire({
            title: "Perhatian!",
            text: "Pilih kelas dulu ya.",
            icon: "info",
            confirmButtonColor: '#3b82f6'
        });
        return;
    }
    if (citaCitaData[citaKey]) {
        push(ref(db, `pohon/${currentKelas}`), {
            nama,
            cita: originalCita,
            warna,
            top: null,
            left: null,
        });
        showAspirationPopup(citaKey, originalCita, warna);
        citaForm.reset();
        namaInput.focus();
        document.querySelectorAll(".color-option").forEach((c) => c.classList.remove("selected"));
        warnaDaunHidden.value = "";
    } else {
        tempCustomLeafData = { nama, cita: originalCita, warna };
        showCustomCitaForm(tempCustomLeafData);
    }
};

// === color choice buttons handling ===
document.querySelectorAll(".color-option").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".color-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        warnaDaunHidden.value = btn.dataset.color;
    });
});

// === save image ===
saveImageBtn.onclick = () => {
    const container = document.getElementById("tree-container");
    Swal.fire({
        title: 'Mohon tunggu',
        text: 'Sedang membuat gambar pohon...',
        icon: 'info',
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
            domtoimage
                .toPng(container)
                .then(function (dataUrl) {
                    const link = document.createElement("a");
                    link.download = `pohon-kelas${currentKelas || "all"}.png`;
                    link.href = dataUrl;
                    link.click();
                    Swal.fire('Berhasil!', 'Gambar pohon telah tersimpan.', 'success');
                })
                .catch(function (error) {
                    console.error("Ada masalah saat menyimpan gambar:", error);
                    Swal.fire('Gagal!', 'Ada masalah saat menyimpan gambar. Silakan coba lagi.', 'error');
                });
        }
    });
};

// === reset with confirmation ===
resetTreeBtn.onclick = () => {
    if (!currentKelas) {
        Swal.fire({
            title: "Perhatian!",
            text: "Pilih kelas dulu untuk reset.",
            icon: "info",
            confirmButtonColor: '#3b82f6'
        });
        return;
    }
    Swal.fire({
        title: "Yakin mau reset? 🌳",
        text: "Semua daun di pohon ini akan hilang 😢",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, reset!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            remove(ref(db, `pohon/${currentKelas}`))
                .then(() => {
                    Swal.fire('Berhasil!', 'Pohon cita-cita telah di-reset.', 'success');
                })
                .catch((err) => {
                    Swal.fire('Gagal!', 'Reset pohon gagal.', 'error');
                    console.error("Reset gagal:", err);
                });
        }
    });
};

// === helper clearLeaves ===
function clearLeaves() {
    leavesData = [];
    renderLeaves();
}

// === small util to escape HTML ===
function escapeHtml(unsafe) {
    return (unsafe + "").replace(/[&<>"']/g, function (m) {
        return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]);
    });
}