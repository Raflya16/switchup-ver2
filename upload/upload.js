// PREVIEW IMAGE
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const placeholder = document.getElementById('placeholder');
const dropZone = document.getElementById('dropZone');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            dropZone.classList.remove('border-dashed');
            dropZone.classList.add('border-solid', 'border-primary');
        }
        reader.readAsDataURL(file);
    }
});

// TOGGLE KONDISI
function togglePercent() {
    const type = document.getElementById('conditionType').value;
    const percent = document.getElementById('conditionPercent');
    if(type === 'Bekas') percent.classList.remove('hidden');
    else percent.classList.add('hidden');
}

// HANDLE SUBMIT
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil Data Existing
    const products = JSON.parse(localStorage.getItem('switchup_products')) || [];

    // Siapkan Data Baru
    let cond = document.getElementById('conditionType').value;
    if(cond === 'Bekas') cond += ` (${document.getElementById('conditionPercent').value})`;

    const newItem = {
        id: Date.now(), // Unik ID
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        location: document.getElementById('location').value,
        condition: cond,
        user: "Rafly Ardian", // Hardcode user
        image: preview.src || "https://via.placeholder.com/400" // Fallback image
    };

    // Simpan & Redirect
    products.push(newItem);
    localStorage.setItem('switchup_products', JSON.stringify(products));
    
    alert("Barang berhasil diupload!");
    window.location.href = "/index.html";
});
