// === LOGIKA LOGIN ===
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validasi Sederhana (Demo Only)
        // Di dunia nyata, ini akan cek ke server database
        if (email && password) {
            const btn = document.querySelector('button[type="submit"]');
            btn.innerText = "Memproses...";
            btn.disabled = true;

            setTimeout(() => {
                // Simpan sesi user (Pura-puranya ambil dari DB)
                // Jika user belum pernah register, kita buat data dummy berdasarkan email
                const existingUser = localStorage.getItem('switchup_user');
                
                if(!existingUser) {
                    const dummyUser = {
                        name: "User Demo",
                        email: email,
                        address: "Jakarta, Indonesia",
                        avatar: `https://ui-avatars.com/api/?name=${email}&background=random`
                    };
                    localStorage.setItem('switchup_user', JSON.stringify(dummyUser));
                }

                alert("Login Berhasil!");
                window.location.href = "/index.html";
            }, 1000);
        }
    });
}

// === LOGIKA REGISTER ===
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        
        const btn = document.querySelector('button[type="submit"]');
        btn.innerText = "Mendaftarkan...";
        btn.disabled = true;

        setTimeout(() => {
            // Buat User Baru Object
            const newUser = {
                name: name,
                email: email,
                address: "Belum diatur",
                avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
            };

            // Simpan ke LocalStorage
            localStorage.setItem('switchup_user', JSON.stringify(newUser));

            alert("Pendaftaran Berhasil! Selamat datang, " + name);
            window.location.href = "/index.html";
        }, 1500);
    });
}

// LOGIKA TAMU
function guestLogin() {
    // Hapus data user lama jika ada (biar bersih)
    localStorage.removeItem('switchup_user');
    // Langsung lempar ke Home
    window.location.href = "/index.html";
}