// 1. DATA DUMMY (Pura-pura ini Database)
const products = [
    {
        id: 1,
        name: "Sepeda Gunung Polygon",
        category: "Kendaraan",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=400",
        location: "Tebet, Jakarta Selatan",
        rating: 4.8,
        user: "Budi Santoso",
        condition: "Bekas (80-90%)",
        conditionColor: "text-gray-800"
    },
    {
        id: 2,
        name: "iPhone 11 64GB Resmi",
        category: "Elektronik",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=400",
        location: "Bandung Wetan",
        rating: 5.0,
        user: "Siti Aminah",
        condition: "Bekas (>90%)",
        conditionColor: "text-gray-800"
    },
    {
        id: 3,
        name: "Nike Air Jordan Merah",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
        location: "Surabaya Pusat",
        rating: 4.5,
        user: "Doni Tata",
        condition: "Baru",
        conditionColor: "text-green-600"
    },
    {
        id: 4,
        name: "Gitar Akustik Yamaha",
        category: "Hobi",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400",
        location: "Depok, Jawa Barat",
        rating: 4.7,
        user: "Rian D'Masiv",
        condition: "Bekas (Mulus)",
        conditionColor: "text-gray-800"
    },
{ 
        id: 5, 
        name: "Kamera Sony Alpha A6000", 
        category: "Elektronik", 
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80", 
        location: "Jakarta Selatan", 
        rating: 4.9,
        user: "Fotografer Indo", 
        condition: "Bekas (90%)"
    },
    {
        id: 6, 
        name: "Converse Chuck Taylor 70s", 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=400&q=80", 
        location: "Yogyakarta", 
        rating: 4.6,
        user: "Anak Indie", 
        condition: "Baru"
    }
];

// 2. FUNGSI UNTUK MERENDER HTML DARI DATA
function renderProducts(data) {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = ''; // Kosongkan grid dulu

    if (data.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-gray-500 text-lg">Tidak ada barang yang cocok.</p>
                <button onclick="filterCategory('all')" class="mt-2 text-primary font-medium hover:underline">Reset Filter</button>
            </div>
        `;
        return;
    }

    data.forEach(item => {
        // Template Literal HTML untuk Kartu Barang
        const cardHTML = `
            <a href="/detailbarang/detail.html?id=${item.id}" class="group block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
                <div class="relative w-full pb-[100%] bg-gray-200">
                        <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${item.image}" alt="${item.name}" />
                        
                        <span class="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                            ${item.category}
                        </span>

                        <span class="absolute top-3 right-3 bg-white/95 backdrop-blur-md ${item.conditionColor} text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100 max-w-[120px] truncate">
                            ${item.condition}
                        </span>
                </div>
                <div class="p-4">
                    <h5 class="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-primary">
                        ${item.name}
                    </h5>
                    
                    <div class="flex items-center text-xs text-gray-500 mb-2">
                        <span class="mr-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                        </span> 
                        <span class="truncate">${item.location}</span>
                    </div>

                    <div class="flex items-center text-xs text-gray-500 mb-3">
                        <span class="text-yellow-400 mr-1">★</span>
                        <span class="font-medium text-gray-700 mr-1">${item.rating}</span>
                    </div>

                    <div class="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div class="flex items-center text-xs text-gray-500">
                            <span class="truncate max-w-[80px]">${item.user}</span>
                        </div>
                        <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Barter</span>
                    </div>
                </div>
            </a>
        `;
        grid.innerHTML += cardHTML;
    });
}

// 3. FUNGSI FILTER KATEGORI
function filterCategory(category) {
    // Reset warna tombol active
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-white', 'text-gray-600');
    });

    // Cari tombol yang diklik (sedikit trick cari berdasarkan text)
    const btns = document.querySelectorAll('.category-btn');
    for (let btn of btns) {
        if (btn.innerText === category || (category === 'all' && btn.innerText === 'Semua')) {
            btn.classList.remove('bg-white', 'text-gray-600');
            btn.classList.add('bg-primary', 'text-white');
        }
    }

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(item => item.category === category);
        renderProducts(filtered);
    }
}

// 4. FUNGSI SEARCH
function handleSearch() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = products.filter(item => {
        return item.name.toLowerCase().includes(keyword) || 
               item.location.toLowerCase().includes(keyword) ||
               item.category.toLowerCase().includes(keyword);
    });

    renderProducts(filtered);
}

// 5. EVENT LISTENER (Jalan saat halaman dibuka)
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products); // Tampilkan semua barang saat awal buka
    
    // Search pakai tombol Enter
    document.getElementById('searchInput').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });
});

// --- UPDATE PROFILE DI NAVBAR HOME ---
const currentUser = JSON.parse(localStorage.getItem('switchup_user'));
if (currentUser) {
    // Cari elemen foto & nama di navbar, lalu update
    // Catatan: Ini cara cepat manipulasi DOM tanpa ubah banyak HTML
    const navProfileImg = document.querySelector('nav img.rounded-full');
    const navProfileName = document.querySelector('nav p.text-sm.font-bold');
    
    if (navProfileImg) navProfileImg.src = currentUser.avatar;
    if (navProfileName) navProfileName.innerText = currentUser.name;
}

// --- DYNAMIC NAVBAR LOGIC ---
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('switchup_user'));
    const navArea = document.getElementById('navUserArea');

    if (user) {
        // JIKA SUDAH LOGIN -> Tampilkan Profil
        navArea.innerHTML = `
            <a href="../profile/profile.html" class="flex items-center gap-3 border-l pl-4 border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition">
                <div class="text-right hidden sm:block">
                    <p class="text-sm font-bold text-gray-700">${user.name}</p>
                    <p class="text-xs text-green-600 font-semibold">120 Token</p>
                </div>
                <img class="h-9 w-9 rounded-full bg-gray-200 border border-gray-200 object-cover" src="${user.avatar}" alt="Profile">
            </a>
        `;
    } else {
        // JIKA BELUM LOGIN (TAMU) -> Tampilkan Tombol Masuk/Daftar
        navArea.innerHTML = `
            <div class="flex gap-3">
                <a href="../auth/login.html" class="px-4 py-2 text-sm font-bold text-gray-600 hover:text-primary transition">
                    Masuk
                </a>
                <a href="../auth/register.html" class="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-md">
                    Daftar
                </a>
            </div>
        `;
    }
}

// Jalankan saat halaman dimuat
updateNavbar();

// ... (Kode Navbar & Filter yang lama tetap di atas) ...

// === LOGIKA SLIDESHOW OTOMATIS ===
let currentSlide = 0;
const totalSlides = 3; // Jumlah slide di HTML
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot-indicator');
let slideInterval;

function updateSlidePosition() {
    // Geser container (0%, -100%, -200%)
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update Dots (Titik indikator)
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('opacity-50');
            dot.classList.add('opacity-100', 'scale-125');
        } else {
            dot.classList.add('opacity-50');
            dot.classList.remove('opacity-100', 'scale-125');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
}

// Fungsi manual jika user klik titik
window.goToSlide = function(index) {
    currentSlide = index;
    updateSlidePosition();
    // Reset timer agar tidak langsung geser setelah diklik
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

// Jalankan Otomatis setiap 4 detik
slideInterval = setInterval(nextSlide, 4000);

