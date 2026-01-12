// 1. AMBIL ID BARANG TARGET DARI URL
const params = new URLSearchParams(window.location.search);
const targetId = params.get('target_id');

// 2. LOAD DATA BARANG TARGET DARI LOCALSTORAGE
const allProducts = JSON.parse(localStorage.getItem('switchup_products')) || [];
const targetItem = allProducts.find(p => p.id == targetId);

// Render Target
if (targetItem) {
    document.getElementById('targetImage').src = targetItem.image;
    document.getElementById('targetName').innerText = targetItem.name;
    document.getElementById('targetUser').innerText = "Milik: " + targetItem.user;
} else {
    alert("Barang target tidak valid.");
    window.location.href = "index.html";
}

// 3. DUMMY DATA "BARANG SAYA" (INVENTORY)
// Ini pura-puranya barang yang Anda miliki di gudang
const myInventory = [
    { id: 101, name: "Jam Tangan G-Shock", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200", condition: "Bekas" },
    { id: 102, name: "Keyboard Mechanical", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=200", condition: "Baru" },
    { id: 103, name: "Tas Eiger 30L", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200", condition: "Bekas (Mulus)" }
];

// 4. RENDER "BARANG SAYA" KE GRID
const grid = document.getElementById('myItemsGrid');
let selectedItemId = null;

myInventory.forEach(item => {
    grid.innerHTML += `
        <div onclick="selectItem(${item.id})" id="item-${item.id}" class="inventory-card bg-white p-3 rounded-xl border-2 border-transparent shadow-sm cursor-pointer hover:border-gray-200 transition relative">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <img src="${item.image}" class="w-full h-full object-cover">
            </div>
            <h4 class="font-bold text-gray-800 text-sm truncate">${item.name}</h4>
            <p class="text-xs text-gray-500">${item.condition}</p>
            
            <div id="check-${item.id}" class="hidden absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
        </div>
    `;
});

// 5. FUNGSI PILIH BARANG
window.selectItem = function(id) {
    selectedItemId = id;
    
    // Reset semua style
    document.querySelectorAll('.inventory-card').forEach(el => {
        el.classList.remove('border-primary', 'bg-blue-50');
        el.classList.add('border-transparent');
    });
    document.querySelectorAll('[id^="check-"]').forEach(el => el.classList.add('hidden'));

    // Highlight yang dipilih
    const selectedEl = document.getElementById(`item-${id}`);
    const checkEl = document.getElementById(`check-${id}`);
    
    selectedEl.classList.remove('border-transparent');
    selectedEl.classList.add('border-primary', 'bg-blue-50'); // Biru muda
    checkEl.classList.remove('hidden');

    // Aktifkan Tombol Submit
    const btn = document.getElementById('submitBtn');
    btn.disabled = false;
    btn.classList.remove('bg-gray-300', 'cursor-not-allowed');
    btn.classList.add('bg-primary', 'hover:bg-primary-dark', 'shadow-lg');
}

// 6. FUNGSI SUBMIT (Simulasi Escrow)
window.submitOffer = function() {
    if(!selectedItemId) return;

    // Loading effect
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Memproses Token...";
    btn.disabled = true;

    setTimeout(() => {
        // Redirect ke halaman sukses
        window.location.href = "/success/success.html";
    }, 1500);
}