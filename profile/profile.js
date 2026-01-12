// --- 1. USER DATA MANAGEMENT ---
// Data Default jika pengguna belum pernah edit profile
const defaultUser = {
    name: "Rafly Ardian",
    email: "rafly@student.id",
    address: "Bekasi, Indonesia",
    avatar: "https://ui-avatars.com/api/?name=Rafly+Ardian&background=0D8ABC&color=fff&size=200"
};

// Ambil User dari LocalStorage, atau pakai default
let currentUser = JSON.parse(localStorage.getItem('switchup_user')) || defaultUser;

// Fungsi Update Tampilan Header Profil
function loadUserProfile() {
    document.getElementById('profileName').innerText = currentUser.name;
    document.getElementById('profileEmail').innerText = currentUser.email;
    document.getElementById('profileAddress').innerText = currentUser.address;
    document.getElementById('profileImage').src = currentUser.avatar;
}

// Panggil saat halaman dimuat
loadUserProfile();

// --- 2. MODAL EDIT LOGIC ---
function openEditModal() {
    // Isi form dengan data saat ini
    document.getElementById('inputName').value = currentUser.name;
    document.getElementById('inputEmail').value = currentUser.email;
    document.getElementById('inputAddress').value = currentUser.address;
    document.getElementById('previewEdit').src = currentUser.avatar;
    document.getElementById('inputPassword').value = ""; // Reset password field

    // Tampilkan Modal
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

// Preview Image saat Edit
function previewEditImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('previewEdit').src = reader.result;
    }
    if(event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

// SIMPAN PERUBAHAN
function saveProfile() {
    const newName = document.getElementById('inputName').value;
    const newEmail = document.getElementById('inputEmail').value;
    const newAddress = document.getElementById('inputAddress').value;
    const newAvatar = document.getElementById('previewEdit').src;
    
    // Validasi sederhana
    if(!newName || !newEmail) {
        alert("Nama dan Email tidak boleh kosong!");
        return;
    }

    // Update Object User
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.address = newAddress;
    currentUser.avatar = newAvatar;

    // Simpan ke Database Browser
    localStorage.setItem('switchup_user', JSON.stringify(currentUser));

    // Update Tampilan
    loadUserProfile();
    closeEditModal();
    alert("Profil berhasil diperbarui!");
}


// --- 3. BARANG SAYA & TAB LOGIC (Sama seperti sebelumnya) ---
const allProducts = JSON.parse(localStorage.getItem('switchup_products')) || [];
const myItems = allProducts.filter(item => item.user === "Rafly Ardian"); // Di demo ini kita hardcode usernya match dengan nama default

// Data Dummy Disukai
const likedItems = [
    { id: 901, name: "PlayStation 5 Digital", category: "Hobi", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400", user: "GamerIndo", condition: "Bekas (Like New)" },
    { id: 902, name: "Vespa Matic S 125", category: "Kendaraan", image: "https://images.unsplash.com/photo-1620802051782-726fa6db033c?w=400", user: "ScooterBoy", condition: "Bekas (Mulus)" },
    { id: 903, name: "Macbook Pro M2", category: "Elektronik", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400", user: "DevMaster", condition: "Baru" }
];

document.getElementById('itemCount').innerText = myItems.length;
let activeTab = 'items';

window.switchTab = function(tabName) {
    activeTab = tabName;
    updateUI();
}

function updateUI() {
    const grid = document.getElementById('contentGrid');
    const tabItems = document.getElementById('tab-items');
    const tabLiked = document.getElementById('tab-liked');

    grid.innerHTML = '';

    if (activeTab === 'items') {
        tabItems.className = "border-primary text-primary border-b-2 py-4 px-2 font-bold text-sm flex items-center gap-2 transition-all cursor-default";
        tabLiked.className = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-4 px-2 font-medium text-sm flex items-center gap-2 transition-all cursor-pointer";
        renderGrid(myItems, true); 
    } else {
        tabItems.className = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-4 px-2 font-medium text-sm flex items-center gap-2 transition-all cursor-pointer";
        tabLiked.className = "border-primary text-primary border-b-2 py-4 px-2 font-bold text-sm flex items-center gap-2 transition-all cursor-default";
        renderGrid(likedItems, false);
    }
}

function renderGrid(data, allowDelete) {
    const grid = document.getElementById('contentGrid');

    if (data.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300"><p class="text-gray-400 mb-4 text-sm">Tidak ada barang.</p></div>`;
        return;
    }

    data.forEach(item => {
        const deleteButton = allowDelete ? `
            <button onclick="deleteItem(${item.id})" class="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow-sm hover:bg-red-50 transition opacity-0 group-hover:opacity-100" title="Hapus Barang"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
        ` : '';

        grid.innerHTML += `
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden relative group">
                <div class="aspect-[4/3] bg-gray-200 relative">
                    <img src="${item.image}" class="w-full h-full object-cover">
                    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3 pt-8"><span class="text-white text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm border border-white/30">${item.condition}</span></div>
                </div>
                <div class="p-3"><h3 class="font-bold text-gray-900 truncate text-sm">${item.name}</h3><p class="text-xs text-gray-500 mt-0.5">${item.category}</p></div>
                ${deleteButton}
            </div>
        `;
    });
}

window.deleteItem = function(id) {
    if(confirm("Hapus barang ini permanen?")) {
        const updated = allProducts.filter(p => p.id !== id);
        localStorage.setItem('switchup_products', JSON.stringify(updated));
        location.reload();
    }
}

// UPDATE DI PROFILE.JS
window.logout = function() {
    if(confirm("Keluar dari akun?")) {
        // Hapus sesi user (Opsional, kalau mau user harus login ulang beneran)
        // localStorage.removeItem('switchup_user'); 
        
        // Redirect ke Halaman Login
        window.location.href = "../auth/login.html";
    }
}

updateUI();