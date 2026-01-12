// DATA DUMMY
const outgoingData = [
    { id: 101, targetItem: "iPhone 11 Pro", targetImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200", myItem: "Sepeda Polygon", owner: "Siti Aminah", status: "Menunggu", statusColor: "bg-yellow-100 text-yellow-700", date: "Hari ini, 10:00" },
    { id: 102, targetItem: "Nike Air Jordan Merah", targetImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", myItem: "iPad Pro 2020", owner: "Kevin Sanjaya", status: "Diproses", statusColor: "bg-blue-100 text-blue-700", date: "Kemarin" },
    { id: 103, targetItem: "Converse Chuck Taylor 70s", targetImage: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&q=80", myItem: "Jaket Kulit", owner: "Galih", status: "Selesai", statusColor: "bg-green-100 text-green-700", date: "20 Jan 2025" }
];

const incomingData = [
    { 
        id: 201, 
        targetItem: "Gitar Yamaha (Punya Saya)", // Barang User
        targetImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200", // Foto barang user
        myItem: "Efek Gitar Boss GT", // Barang Penawar
        owner: "Rian D'Masiv", 
        status: "Perlu Respon", 
        statusColor: "bg-red-100 text-red-700", 
        date: "Baru saja" 
    }
];

// Variable Global untuk tahu item mana yang sedang diklik
let currentSelectedId = null; 

// FUNGSI RENDER LIST
function renderList(type) {
    const container = document.getElementById('transactionList');
    const data = type === 'outgoing' ? outgoingData : incomingData;
    
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<div class="text-center py-20 text-gray-400"><p>Belum ada transaksi.</p></div>`;
        return;
    }

    data.forEach(trx => {
        // Logika Klik: Hanya Incoming yang bisa diklik untuk respon
        // Outgoing hanya alert info biasa
        const clickAction = type === 'incoming' ? `onclick="openModal(${trx.id}, '${trx.myItem}', '${trx.targetItem}')"` : `onclick="alert('Status tawaran ini: ${trx.status}')"`;
        const cursor = type === 'incoming' ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default';

        container.innerHTML += `
            <div ${clickAction} class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition ${cursor}">
                <div class="relative w-20 h-20 flex-shrink-0">
                    <img src="${trx.targetImage}" class="w-full h-full object-cover rounded-lg bg-gray-200">
                    <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border shadow-sm">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                    </div>
                </div>

                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-gray-900 line-clamp-1">${trx.targetItem}</h4>
                        <span class="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${trx.statusColor}">
                            ${trx.status}
                        </span>
                    </div>
                    
                    <p class="text-xs text-gray-500 mb-2">
                        Ditukar dengan: <span class="font-medium text-gray-700">${trx.myItem}</span>
                    </p>

                    <div class="flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-2 mt-2">
                        <span>👤 ${trx.owner}</span>
                        <span>🕒 ${trx.date}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// LOGIKA MODAL
window.openModal = function(id, offerName, myName) {
    currentSelectedId = id;
    document.getElementById('offerItem').innerText = offerName;
    document.getElementById('myItem').innerText = myName;
    document.getElementById('actionModal').classList.remove('hidden');
}

window.closeModal = function() {
    document.getElementById('actionModal').classList.add('hidden');
}

// LOGIKA TERIMA / TOLAK
window.processDecision = function(decision) {
    // Cari item di array
    const item = incomingData.find(i => i.id === currentSelectedId);
    
    if (item) {
        if (decision === 'accept') {
            item.status = "Disetujui";
            item.statusColor = "bg-green-100 text-green-700";
            alert("Selamat! Anda menyetujui barter ini. Silakan lanjut ke Chat untuk janjian.");
        } else {
            item.status = "Ditolak";
            item.statusColor = "bg-gray-100 text-gray-500";
            alert("Anda menolak tawaran ini.");
        }
        // Update tampilan
        renderList('incoming');
        closeModal();
    }
}

// FUNGSI GANTI TAB
window.switchTab = function(type) {
    document.getElementById('tab-outgoing').className = "pb-3 border-b-2 border-transparent text-gray-500 px-4 transition hover:text-gray-700 cursor-pointer";
    document.getElementById('tab-incoming').className = "pb-3 border-b-2 border-transparent text-gray-500 px-4 transition hover:text-gray-700 cursor-pointer";

    document.getElementById('tab-' + type).className = "pb-3 border-b-2 border-primary text-primary px-4 transition font-bold cursor-pointer";
    
    renderList(type);
}

// JALANKAN SAAT LOAD
renderList('outgoing');