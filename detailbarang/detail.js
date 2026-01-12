// 1. AMBIL ID DARI URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// 2. DATA CADANGAN (Jaga-jaga jika LocalStorage kosong/error)
const defaultData = [
    { id: 1, name: "Sepeda Polygon", category: "Kendaraan", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400", location: "Tebet", user: "Budi", condition: "Bekas (80%)" },
    { id: 2, name: "iPhone 11", category: "Elektronik", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400", location: "Bandung", user: "Siti", condition: "Bekas (95%)" },
    { id: 3, name: "Nike Air Jordan", category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", location: "Surabaya", user: "Doni", condition: "Baru" }
];

// 3. COBA AMBIL DARI LOCALSTORAGE
let products = [];
try {
    const stored = localStorage.getItem('switchup_products');
    products = stored ? JSON.parse(stored) : [];
} catch (e) {
    console.log("Error baca storage, pakai default.");
}

// 4. JIKA DATA KOSONG, PAKAI DATA CADANGAN
if (products.length === 0) {
    products = defaultData;
    // Simpan balik ke storage agar halaman lain kebagian
    localStorage.setItem('switchup_products', JSON.stringify(products));
}

// 5. CARI BARANG YANG DIKLIK
// Gunakan '==' agar string "1" cocok dengan angka 1
const item = products.find(p => p.id == id);

// 6. TAMPILKAN HASILNYA
if (item) {
    // Sembunyikan Loading, Tampilkan Konten
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');

    // Masukkan Data ke HTML
    document.getElementById('d-image').src = item.image;
    document.getElementById('d-category').innerText = item.category;
    document.getElementById('d-name').innerText = item.name;
    document.getElementById('d-location').innerText = item.location;
    document.getElementById('d-condition').innerText = item.condition;
    document.getElementById('d-user').innerText = item.user;
} else {
    // Jika ID benar-benar tidak ada
    document.getElementById('loading').innerHTML = `
        <div class="text-center py-20">
            <h2 class="text-2xl font-bold text-red-500 mb-2">Error: ID ${id} Tidak Ditemukan</h2>
            <p class="text-gray-500 mb-6">Database memiliki ${products.length} barang.</p>
            <a href="/index.html" class="bg-primary text-white px-6 py-2 rounded-full font-bold">Kembali ke Beranda</a>
        </div>
    `;
}

// Navigasi ke Halaman Offer membawa ID Barang Target
function goToOffer() {
    // 1. CEK STATUS LOGIN
    const user = localStorage.getItem('switchup_user');

    if (!user) {
        // JIKA BELUM LOGIN
        alert("Ups! Anda harus login dulu untuk melakukan barter.");
        // Arahkan ke Login
        window.location.href = "/auth/login.html";
        return; // Stop, jangan lanjut ke bawah
    }

    // 2. JIKA SUDAH LOGIN, LANJUTKAN
    window.location.href = `/offer/offer.html?target_id=${id}`;
}   
