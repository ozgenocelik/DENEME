// Veriler artık quotes.js dosyasından yükleniyor.

const topicBackgrounds = {
    'aşk': 'https://images.unsplash.com/photo-1518199268815-95a206fa4e?q=80&w=1080&auto=format&fit=crop',
    'duygusal': 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1080&auto=format&fit=crop',
    'motivasyon': 'https://images.unsplash.com/photo-1519750059344-93ec5285888d?q=80&w=1080&auto=format&fit=crop',
    'başarı': 'https://images.unsplash.com/photo-1476820865390-c52aeafa985d?q=80&w=1080&auto=format&fit=crop',
    'felsefe': 'https://images.unsplash.com/photo-1447015237013-0e80b2786dea?q=80&w=1080&auto=format&fit=crop',
    'hayat': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop'
};

const topicInput = document.getElementById('topicInput');
const generateBtn = document.getElementById('generateBtn');
const quoteDisplayArea = document.getElementById('quoteDisplayArea');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const chips = document.querySelectorAll('.chip');

// --- Firebase Yapılandırması (Kullanıcı Tarafından Doldurulmalı) ---
const firebaseConfig = {
    apiKey: "BURAYA_API_KEY_GELECEK",
    authDomain: "PROJE_ID.firebaseapp.com",
    projectId: "PROJE_ID",
    storageBucket: "PROJE_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Firebase'i başlat
let db = null;
if (firebaseConfig.projectId !== "PROJE_ID") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
}

const cardBg = document.getElementById('cardBg');
const quoteCard = document.getElementById('quoteCard');
const downloadBtn = document.getElementById('downloadBtn');
const likeBtn = document.getElementById('likeBtn');
const favoritesList = document.getElementById('favoritesList');
const downloadsList = document.getElementById('downloadsList');

// Çok çeşitli ve göz alıcı estetik arkaplanlar
const aestheticBackgrounds = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519750059344-93ec5285888d?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f41?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1447433583409-a17f6b986cc0?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1080&auto=format&fit=crop'
];

let typingTimeout;
let currentQuote = null;
let favorites = [];
let downloads = [];

let syncKey = localStorage.getItem('hissirdasi_sync_key') || 'default_user';
const welcomeModal = document.getElementById('welcomeModal');
const activeUserNameSpan = document.getElementById('activeUserName');

function updateUIForUser() {
    if (syncKey !== 'default_user') {
        const dbStatus = db ? "☁️" : "⚠️ (Bulut Bağlı Değil)";
        activeUserNameSpan.innerText = `👤 ${syncKey} ${dbStatus}`;
        activeUserNameSpan.parentElement.style.color = db ? "#4ade80" : "#ffb703";
    } else {
        activeUserNameSpan.innerText = "Giriş Yap";
        activeUserNameSpan.parentElement.style.color = "#818cf8";
    }
}

// ... (existing URL and initial load logic)

function generateQuote(requestedTopic) {
    const topic = requestedTopic.toLowerCase().trim();
    if(!topic || topic.length < 2) {
        alert("Lütfen en az 2 harfli bir konu giriniz.");
        return;
    }
    
    changeBackground();
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="loader"></span> Aranıyor...';
    
    setTimeout(() => {
        const filteredQuotes = quotesData.filter(q => 
            q.topics.some(t => t.includes(topic) || topic.includes(t)) ||
            q.text.toLowerCase().includes(topic)
        );
        
        if (filteredQuotes.length > 0) {
            const selectedQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
            displayQuote(selectedQuote);
        } else {
            // Hiç eşleşme yoksa kkjas vb.
            alert(`"${topic}" konusuyla ilgili bir söz bulamadım. Lütfen farklı bir kelime deneyin.`);
            quoteDisplayArea.style.display = 'none';
        }
        
        generateBtn.disabled = false;
        generateBtn.innerHTML = 'Söz Üret';
    }, 600 + Math.random() * 400);
}

function displayQuote(quoteObj) {
    currentQuote = quoteObj;
    quoteDisplayArea.style.display = 'flex';
    updateLikeButtonUI();
    if(typingTimeout) clearTimeout(typingTimeout);
    quoteText.innerHTML = '';
    quoteAuthor.innerHTML = '';
    quoteAuthor.style.opacity = '0';
    let i = 0; const txt = quoteObj.text; const speed = 25; 
    function typeWriter() {
        if (i < txt.length) {
            quoteText.innerHTML += txt.charAt(i); i++;
            typingTimeout = setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                quoteAuthor.innerHTML = `- ${quoteObj.author}`;
                quoteAuthor.style.transition = 'opacity 0.8s ease';
                quoteAuthor.style.opacity = '1';
            }, 300);
        }
    }
    typeWriter();
}

async function toggleFavorite() {
    if (!currentQuote) return;
    const isFav = favorites.find(f => f.text === currentQuote.text);
    if (db) {
        if (!isFav) {
            await db.collection("favorites").add({
                text: currentQuote.text, author: currentQuote.author,
                syncKey: syncKey,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            await db.collection("favorites").doc(isFav.id).delete();
        }
    } else {
        const index = favorites.findIndex(f => f.text === currentQuote.text);
        if (index === -1) favorites.push(currentQuote);
        else favorites.splice(index, 1);
        localStorage.setItem('hissirdasi_favs_' + syncKey, JSON.stringify(favorites));
        renderFavorites(); updateLikeButtonUI();
    }
}

function updateLikeButtonUI() {
    if (!currentQuote || !likeBtn) return;
    const isFav = favorites.some(f => f.text === currentQuote.text);
    if (isFav) {
        likeBtn.classList.add('active');
        likeBtn.querySelector('span').innerText = 'Beğenildi';
    } else {
        likeBtn.classList.remove('active');
        likeBtn.querySelector('span').innerText = 'Beğen';
    }
}

function renderFavorites() {
    if (!favoritesList) return;
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-msg">Henüz beğenilen bir söz yok.</p>';
        return;
    }
    favoritesList.innerHTML = '';
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.onclick = (e) => { if (!e.target.closest('.remove-fav-btn')) loadQuoteData(fav); };
        item.innerHTML = `
            <div class="fav-content"><p class="fav-text">"${fav.text}"</p><p class="fav-author">${fav.author}</p></div>
            <button class="remove-fav-btn" onclick="removeFavorite(event, '${fav.id || index}')" title="Sil">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        `;
        favoritesList.appendChild(item);
    });
}

function renderDownloads() {
    if (!downloadsList) return;
    if (downloads.length === 0) {
        downloadsList.innerHTML = '<p class="empty-msg">Henüz indirilen bir söz yok.</p>';
        return;
    }
    downloadsList.innerHTML = '';
    downloads.forEach((down, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item download-item';
        item.onclick = (e) => { if (!e.target.closest('.remove-fav-btn')) loadQuoteData(down); };
        item.innerHTML = `
            <div class="fav-content"><p class="fav-text">"${down.text}"</p><p class="fav-author">${down.author}</p></div>
            <button class="remove-fav-btn" onclick="removeDownload(event, '${down.id || index}')" title="Sil">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        `;
        downloadsList.appendChild(item);
    });
}

function loadQuoteData(data) {
    changeBackground();
    displayQuote(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.removeFavorite = async function(event, idOrIndex) {
    event.stopPropagation();
    if (db && isNaN(idOrIndex)) await db.collection("favorites").doc(idOrIndex).delete();
    else {
        favorites.splice(idOrIndex, 1);
        localStorage.setItem('hissirdasi_favs_' + syncKey, JSON.stringify(favorites));
        renderFavorites(); updateLikeButtonUI();
    }
};

window.removeDownload = async function(event, idOrIndex) {
    event.stopPropagation();
    if (db && isNaN(idOrIndex)) await db.collection("downloads").doc(idOrIndex).delete();
    else {
        downloads.splice(idOrIndex, 1);
        localStorage.setItem('hissirdasi_downs_' + syncKey, JSON.stringify(downloads));
        renderDownloads();
    }
};

async function saveDownloadToHistory(quote) {
    if (db) {
        await db.collection("downloads").add({
            text: quote.text, author: quote.author,
            syncKey: syncKey,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
        downloads.unshift(quote); if (downloads.length > 10) downloads.pop();
        localStorage.setItem('hissirdasi_downs_' + syncKey, JSON.stringify(downloads));
        renderDownloads();
    }
}

likeBtn.addEventListener('click', toggleFavorite);
generateBtn.addEventListener('click', () => { generateQuote(topicInput.value || "hayat"); });
topicInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') generateQuote(topicInput.value || "hayat"); });
chips.forEach(chip => { chip.addEventListener('click', function() { topicInput.value = this.innerText; generateQuote(this.getAttribute('data-topic')); }); });

const downloadModal = document.getElementById('downloadModal');
const previewImage = document.getElementById('previewImage');
const closeModal = document.getElementById('closeModal');

closeModal.onclick = () => { downloadModal.style.display = "none"; };
window.onclick = (event) => { 
    if (event.target == downloadModal) downloadModal.style.display = "none";
    if (event.target == syncModal) syncModal.style.display = "none";
};

// --- Sync Modal Mantığı ---
const syncModal = document.getElementById('syncModal');
const syncBtn = document.getElementById('syncBtn');
const closeSyncModal = document.getElementById('closeSyncModal');
const saveSyncBtn = document.getElementById('saveSyncBtn');
const syncKeyInput = document.getElementById('syncKeyInput');
const syncStatus = document.getElementById('syncStatus');

// Başlangıçta inputu doldur
if (syncKey !== 'default_user') syncKeyInput.value = syncKey;

// --- Giriş ve Karşılama Mantığı ---
const welcomeLoginBtn = document.getElementById('welcomeLoginBtn');
const skipLoginBtn = document.getElementById('skipLoginBtn');
const welcomeUserInput = document.getElementById('welcomeUserInput');

welcomeLoginBtn.onclick = () => {
    const user = welcomeUserInput.value.trim().toLowerCase();
    if (user) {
        syncKey = user;
        localStorage.setItem('hissirdasi_sync_key', syncKey);
        welcomeModal.style.display = 'none';
        updateUIForUser();
        if (db) setupFirebaseListeners();
        else {
            favorites = JSON.parse(localStorage.getItem('hissirdasi_favs_' + syncKey)) || [];
            downloads = JSON.parse(localStorage.getItem('hissirdasi_downs_' + syncKey)) || [];
            renderFavorites(); renderDownloads();
        }
    }
};

skipLoginBtn.onclick = () => { welcomeModal.style.display = 'none'; };

syncBtn.onclick = () => {
    if (syncKey !== 'default_user') {
        if (confirm(`Şu an "${syncKey}" olarak giriş yapmışsınız. Çıkış yapıp başka bir isimle girmek ister misiniz?`)) {
            syncKey = 'default_user';
            localStorage.setItem('hissirdasi_sync_key', syncKey);
            location.reload(); // Sayfayı sıfırla ki her şey temizlensin
        }
    } else {
        welcomeModal.style.display = "block";
    }
};

closeSyncModal.onclick = () => { syncModal.style.display = "none"; };

saveSyncBtn.onclick = () => {
    const newKey = syncKeyInput.value.trim().toLowerCase();
    if (!newKey) {
        syncStatus.innerText = "Lütfen bir kullanıcı adı girin!";
        syncStatus.style.color = "#ef4444";
        return;
    }
    
    syncKey = newKey;
    localStorage.setItem('hissirdasi_sync_key', syncKey);
    updateUIForUser();
    
    // Link oluşturma
    const shareLink = `${window.location.origin}${window.location.pathname}?anahtar=${syncKey}`;
    document.getElementById('shareLinkInput').value = shareLink;
    document.getElementById('syncLinkArea').style.display = "block";

    if (db) {
        setupFirebaseListeners();
        syncStatus.innerText = "Buluta bağlandınız: " + syncKey;
    } else {
        favorites = JSON.parse(localStorage.getItem('hissirdasi_favs_' + syncKey)) || [];
        downloads = JSON.parse(localStorage.getItem('hissirdasi_downs_' + syncKey)) || [];
        renderFavorites();
        renderDownloads();
        syncStatus.innerText = "⚠️ DİKKAT: Firebase ayarı yapılmadığı için veriler farklı tarayıcıda görünmez.";
        syncStatus.style.color = "#ffb703";
    }
    
    setTimeout(() => { 
        if(db) syncModal.style.display = "none"; 
    }, 3000);
};

// Link Kopyalama
document.getElementById('copyLinkBtn').onclick = () => {
    const input = document.getElementById('shareLinkInput');
    input.select();
    document.execCommand('copy');
    const originalText = document.getElementById('copyLinkBtn').innerText;
    document.getElementById('copyLinkBtn').innerText = "Kopyalandı!";
    setTimeout(() => { document.getElementById('copyLinkBtn').innerText = originalText; }, 2000);
};

// --- Native Canvas Drawing Engine (Ultra Hızlı) ---
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);
    
    const totalHeight = lines.length * lineHeight;
    let startY = y - (totalHeight / 2) + (lineHeight / 2);

    for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k], x, startY);
        startY += lineHeight;
    }
    return totalHeight;
}

async function generateImageWithCanvas() {
    if (!currentQuote) return null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;
    ctx.drawImage(cardBg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "italic 500 52px 'Outfit', sans-serif";
    const maxWidth = 800;
    const lineHeight = 70;
    const textY = canvas.height / 2 - 40;
    const totalTextHeight = wrapText(ctx, `"${currentQuote.text}"`, canvas.width / 2, textY, maxWidth, lineHeight);
    ctx.font = "600 36px 'Outfit', sans-serif";
    ctx.globalAlpha = 0.9;
    ctx.fillText(`- ${currentQuote.author}`, canvas.width / 2, textY + (totalTextHeight / 2) + 80);
    ctx.globalAlpha = 1.0;
    ctx.font = "300 24px 'Outfit', sans-serif";
    ctx.fillText("His Sırdaşı", canvas.width / 2, canvas.height - 60);
    return canvas.toDataURL('image/jpeg', 0.9);
}

downloadBtn.addEventListener('click', async () => {
    if (!currentQuote) return;
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="loader"></span> Üretiliyor...';
    downloadBtn.disabled = true;
    saveDownloadToHistory(currentQuote);
    try {
        const dataUrl = await generateImageWithCanvas();
        if (!dataUrl) throw new Error("Görsel üretilemedi");
        previewImage.src = dataUrl;
        downloadModal.style.display = "block";
        const link = document.createElement('a');
        link.download = `sirdas_sozlugu_${new Date().getTime()}.jpg`;
        link.href = dataUrl;
        link.click();
        downloadBtn.innerHTML = '✔ Tamam!';
        downloadBtn.disabled = false;
        setTimeout(() => { downloadBtn.innerHTML = originalText; }, 1500);
    } catch (err) {
        console.error("İndirme Hatası:", err);
        downloadBtn.innerHTML = '❌ Hata!';
        downloadBtn.disabled = false;
        setTimeout(() => { downloadBtn.innerHTML = originalText; }, 2000);
    }
});
