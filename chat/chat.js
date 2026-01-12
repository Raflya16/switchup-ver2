// DATA DUMMY CHAT LIST
const chatList = [
    {
        id: 1,
        name: "Siti Aminah",
        avatar: "https://ui-avatars.com/api/?name=Siti+Aminah&background=random",
        lastMessage: "Halo, barangnya masih ada?",
        time: "10:30",
        unread: 2,
        messages: [
            { text: "Halo kak, iPhone-nya masih ready?", isMe: false, time: "10:28" },
            { text: "Saya minat barter sama Laptop HP", isMe: false, time: "10:29" },
            { text: "Boleh liat foto minusnya?", isMe: true, time: "10:30" }
        ]
    },
    {
        id: 2,
        name: "Budi Santoso",
        avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=random",
        lastMessage: "Oke deal ya gan.",
        time: "Kemarin",
        unread: 0,
        messages: [
            { text: "Sepedanya tukar sama PS4 mau?", isMe: false, time: "Kemarin" },
            { text: "Boleh, kelengkapannya apa aja?", isMe: true, time: "Kemarin" },
            { text: "Fullset gan, stik 2", isMe: false, time: "Kemarin" },
            { text: "Oke deal ya gan.", isMe: true, time: "Kemarin" }
        ]
    }
];

let activeChatId = null;

// 1. RENDER LIST USER (KIRI)
function renderChatList() {
    const container = document.getElementById('userListContainer');
    container.innerHTML = '';

    chatList.forEach(chat => {
        container.innerHTML += `
            <div onclick="openChat(${chat.id})" class="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition border-b border-gray-50 ${activeChatId === chat.id ? 'bg-blue-50' : ''}">
                <img src="${chat.avatar}" class="w-12 h-12 rounded-full bg-gray-200 object-cover">
                <div class="ml-4 flex-grow overflow-hidden">
                    <div class="flex justify-between items-baseline">
                        <h4 class="font-bold text-gray-900 truncate">${chat.name}</h4>
                        <span class="text-xs text-gray-400">${chat.time}</span>
                    </div>
                    <p class="text-sm text-gray-500 truncate">${chat.lastMessage}</p>
                </div>
                ${chat.unread > 0 ? `<span class="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">${chat.unread}</span>` : ''}
            </div>
        `;
    });
}

// 2. BUKA CHAT WINDOW (KANAN)
window.openChat = function(id) {
    activeChatId = id;
    const chat = chatList.find(c => c.id === id);
    
    // Tampilan Mobile: Buka layer chat
    document.getElementById('chatWindow').classList.remove('hidden');
    document.getElementById('chatList').classList.add('hidden', 'sm:flex'); // Hide list on mobile

    // Set Header
    document.getElementById('headerImage').src = chat.avatar;
    document.getElementById('headerName').innerText = chat.name;

    // Render Pesan
    renderMessages(chat.messages);
    renderChatList(); // Refresh highlight active
}

// 3. TUTUP CHAT (MODE MOBILE)
window.closeChat = function() {
    document.getElementById('chatWindow').classList.add('hidden');
    document.getElementById('chatList').classList.remove('hidden');
    activeChatId = null;
    renderChatList();
}

// 4. RENDER PESAN BUBBLE
function renderMessages(messages) {
    const container = document.getElementById('messagesArea');
    container.innerHTML = '';

    messages.forEach(msg => {
        const bubbleClass = msg.isMe ? 'bubble-me' : 'bubble-other';
        const alignClass = msg.isMe ? 'justify-end' : 'justify-start';
        
        container.innerHTML += `
            <div class="flex ${alignClass}">
                <div class="bubble ${bubbleClass} shadow-sm">
                    ${msg.text}
                    <div class="text-[10px] opacity-70 text-right mt-1">${msg.time}</div>
                </div>
            </div>
        `;
    });
    
    // Auto scroll ke bawah
    container.scrollTop = container.scrollHeight;
}

// 5. KIRIM PESAN & AUTO REPLY
window.sendMessage = function(e) {
    e.preventDefault();
    if (!activeChatId) return;

    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;

    // Tambah pesan kita
    const chat = chatList.find(c => c.id === activeChatId);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    chat.messages.push({ text: text, isMe: true, time: time });
    chat.lastMessage = text; // Update preview
    
    input.value = '';
    renderMessages(chat.messages);
    renderChatList();

    // SIMULASI BALASAN OTOMATIS (DELAY 1.5 DETIK)
    setTimeout(() => {
        const replies = ["Oke siap gan", "Barang masih ada?", "Bisa kurang gak?", "Nanti saya kabari lagi ya", "Siap COD di mana?"];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        chat.messages.push({ text: randomReply, isMe: false, time: time });
        chat.lastMessage = randomReply;
        
        renderMessages(chat.messages);
        renderChatList();
    }, 1500);
}

// INIT: Cek jika ada parameter URL untuk buka chat spesifik (Opsional)
renderChatList();