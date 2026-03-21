const quotesData = [
    // --- DUYGUSAL & HAYAT ---
    { text: "Bazen doğru olanı yapmak için en çok istediklerimizden vazgeçmemiz gerekir.", author: "Spiderman", topics: ["duygusal", "fedakarlık", "doğru"] },
    { text: "En tehlikeli kelime 'ama' dır. Daha önceki her şeyi unutturur.", author: "Ned Stark", topics: ["duygusal", "hayat", "felsefe", "ama"] },
    { text: "Gözyaşları, kalbin konuşamadığı kelimelerdir.", author: "Sokrates", topics: ["duygusal", "aşk", "hüzün", "üzüntü"] },
    { text: "Bazen birini unutmak için, önce onu nasıl hatırladığını unutman gerekir.", author: "Anonim", topics: ["duygusal", "aşk", "ayrılık", "unutmak"] },
    { text: "Bir kalbi kırmak, bir bardağı kırmaktan daha kolaydır. Ama o bardağı geri yapıştıramazsın.", author: "Anonim", topics: ["duygusal", "felsefe", "kalp", "kırgınlık"] },
    { text: "Hayat, sen planlar yaparken başına gelenlerdir.", author: "John Lennon", topics: ["hayat", "felsefe"] },
    { text: "Hiçbir şey için geç değildir ama her şey için vakit dardır.", author: "Anonim", topics: ["hayat", "zaman", "pişmanlık"] },
    { text: "Zorluklar, başarının değerini artıran süslerdir.", author: "Moliere", topics: ["hayat", "başarı", "zorluk"] },
    { text: "Gülümsemek, adaleti bulutların arasından sızan güneş gibidir.", author: "Anonim", topics: ["duygusal", "umut", "gülümsemek"] },
    { text: "Yarasız olanlar, yaralıların acısını anlayamazlar.", author: "Shakespeare", topics: ["duygusal", "empati", "acı"] },
    
    // --- MOTİVASYON & BAŞARI ---
    { text: "Başarı, başarısızlıklardan başarısızlıklara, hevesini kaybetmeden ilerleme yeteneğidir.", author: "Winston Churchill", topics: ["motivasyon", "başarı", "ilham", "pes etme"] },
    { text: "Bekleme. Zaman asla 'tamamen doğru' olmayacak.", author: "Napoleon Hill", topics: ["motivasyon", "erteleme", "zaman", "başarı"] },
    { text: "Düşebileceğin en dibe düştüğünde, gidebileceğin tek bir yön vardır: Yukarı.", author: "Buster Moon", topics: ["motivasyon", "umut", "başarı", "hırs"] },
    { text: "Bin millik bir yolculuk, tek ve küçük bir adımla başlar.", author: "Lao Tzu", topics: ["başarı", "felsefe", "motivasyon", "yolculuk"] },
    { text: "Fırsatlar doğmaz, onları siz yaratırsınız.", author: "Chris Grosser", topics: ["başarı", "motivasyon", "fırsat"] },
    { text: "Sadece çok uzağa gitme riskini alanlar, ne kadar uzağa gidebileceklerini görebilirler.", author: "T.S. Eliot", topics: ["motivasyon", "başarı", "risk"] },
    { text: "Hiçbir zaman vazgeçmeyen bir insanı yenmek çok zordur.", author: "Babe Ruth", topics: ["motivasyon", "başarı", "kararlılık"] },
    { text: "Hayallerini takip etmeyenler, hayatlarını başkalarının hayallerini gerçekleştirmek için harcarlar.", author: "Anonim", topics: ["motivasyon", "hayal", "başarı"] },
    { text: "Gelecek, hayallerinin güzelliğine inananlarındır.", author: "Eleanor Roosevelt", topics: ["motivasyon", "gelecek", "umut"] },
    { text: "Yapamayacağınızı düşündüğünüz şeyi yapın. Başarısız olun. Tekrar deneyin. İkinci seferde daha iyi yapın.", author: "Oprah Winfrey", topics: ["motivasyon", "başarı", "azim"] },

    // --- AŞK & SEVGİ ---
    { text: "Fırtınanın şiddeti ne olursa olsun, martı sevdiği denizden asla vazgeçmez.", author: "Anonim", topics: ["aşk", "duygusal", "sadakat", "sevgi"] },
    { text: "Gerçek sevgi, kusurları görmek ama yine de sevmektir.", author: "Anonim", topics: ["aşk", "felsefe", "sevgi", "kusur"] },
    { text: "Cehennem insan yüreğinde sevginin bittiği yerdir.", author: "Dostoyevski", topics: ["aşk", "duygusal", "felsefe", "cehennem"] },
    { text: "Aşk, iki bedende yaşayan tek bir ruhtur.", author: "Aristo", topics: ["aşk", "sevgi", "felsefe"] },
    { text: "Seni sevmek, bir denizin ortasında fırtınaya yakalanıp yine de kıyıya çıkmak istememek gibi.", author: "Anonim", topics: ["aşk", "duygusal", "sevgi"] },
    { text: "Gözlerin gözlerime değdiğinde bütün kelimeler anlamını yitirir.", author: "Anonim", topics: ["aşk", "duygusal", "romantik"] },
    { text: "Birini gerçekten seviyorsan, onun mutluluğu senin mutluluğundan daha önemlidir.", author: "Anonim", topics: ["aşk", "sevgi", "fedakarlık"] },
    { text: "Kalp hiçbir zaman unutmaz, sadece alışır.", author: "Anonim", topics: ["aşk", "duygusal", "özlem"] },
    { text: "Sevmek, sıradan bir insanı özel kılan tek mucizedir.", author: "Anonim", topics: ["aşk", "sevgi", "mucize"] },
    { text: "En iyi sevgi, ruhu uyandıran ve bizi daha fazlasına ulaşmaya zorlayan sevgidir.", author: "The Notebook", topics: ["aşk", "film", "duygusal"] },

    // --- FELSEFE & BİLGELİK ---
    { text: "Sorgulanmamış bir hayat, yaşanmaya değmez.", author: "Sokrates", topics: ["felsefe", "hayat", "sorgula"] },
    { text: "Acı çekmiyoruz diye mutluyuz sanıyoruz.", author: "Fyodor Dostoyevski", topics: ["felsefe", "duygusal", "hayat", "mutluluk", "acı"] },
    { text: "Karanlığa küfredeceğine bir mum yak.", author: "Çin Atasözü", topics: ["felsefe", "hayat", "motivasyon", "umut"] },
    { text: "Aynı nehirde iki kez yıkanılmaz.", author: "Herakleitos", topics: ["felsefe", "değişim", "hayat"] },
    { text: "Bilgiye sahip olduğun için her şeyi göremezsin, ama bilgeliğe sahip olduğun için her şeyi anlayabilirsin.", author: "Anonim", topics: ["felsefe", "bilgelik"] },
    { text: "İnsanlar sadece söylediklerinizi ve yaptıklarınızı unuturlar ama onlara nasıl hissettirdiğinizi asla unutmazlar.", author: "Maya Angelou", topics: ["felsefe", "hayat", "his"] },
    { text: "Dünyayı değiştirmek istiyorsan önce kendinden başla.", author: "Mahatma Gandhi", topics: ["felsefe", "değişim", "motivasyon"] },
    { text: "Kendini tanıyan, evreni ve tanrıları tanır.", author: "Sokrates", topics: ["felsefe", "bilgelik", "kendini tanı"] },
    { text: "Düşünüyorum, öyleyse varım.", author: "Descartes", topics: ["felsefe", "varoluş"] },
    { text: "En büyük zafer, hiç düşmemek değil, her düştüğünde ayağa kalkmaktır.", author: "Konfüçyüs", topics: ["felsefe", "başarı", "motivasyon"] },

    // --- TÜRK DÜŞÜNÜRLER VE ŞAİRLER ---
    { text: "Ya olduğun gibi görün, ya göründüğün gibi ol.", author: "Mevlana", topics: ["felsefe", "dürüstlük", "mevlana"] },
    { text: "Hayatta en hakiki mürşit ilimdir.", author: "Mustafa Kemal Atatürk", topics: ["bilgi", "bilim", "atatürk"] },
    { text: "Vatanını en çok seven görevini en iyi yapandır.", author: "Mustafa Kemal Atatürk", topics: ["vatan", "başarı", "atatürk"] },
    { text: "Beni görmek demek mutlaka yüzümü görmek değildir. Benim fikirlerimi anlıyorsanız bu kafidir.", author: "Mustafa Kemal Atatürk", topics: ["fikir", "atatürk"] },
    { text: "Cahillik yarı doktor candan eder, yarı hoca dinden eder.", author: "Atasözü", topics: ["bilgi", "eğitim"] },
    { text: "Gülmek, bir gün bile yaşasan kâr sayılmalıdır.", author: "Nâzım Hikmet", topics: ["hayat", "mutluluk", "şiir"] },
    { text: "Ölmek bir şey değildir, yaşamamak korkunçtur.", author: "Victor Hugo", topics: ["felsefe", "hayat"] },
    { text: "Sevmek, birbirine bakmak değil, birlikte aynı yöne bakmaktır.", author: "Antoine de Saint-Exupéry", topics: ["aşk", "sevgi"] },
    { text: "Sen nefes aldıkça umut hep vardır.", author: "Anonim", topics: ["umut", "hayat"] },
    { text: "En büyük engel zihinlerdeki engeldir.", author: "Anonim", topics: ["motivasyon", "engel", "başarı"] },

    // --- DİZİ & FİLM DÜNYASI ---
    { text: "Hayat bir kutu çikolata gibidir, içinden ne çıkacağını asla bilemezsin.", author: "Forrest Gump", topics: ["film", "hayat", "sürpriz"] },
    { text: "Güç seninle olsun.", author: "Star Wars", topics: ["film", "motivasyon", "güç"] },
    { text: "Sadece gülümsüyor olması mutlu olduğu anlamına gelmez.", author: "Joker", topics: ["film", "duygusal", "joker"] },
    { text: "Korku karanlık tarafa giden yoldur.", author: "Yoda", topics: ["film", "korku", "felsefe"] },
    { text: "Bizim kim olduğumuzu gösteren şey yeteneklerimiz değil, yaptığımız seçimlerdir.", author: "Albus Dumbledore", topics: ["film", "felsefe", "seçim"] },
    { text: "Neden düşeriz biliyor musun? Tekrar ayağa kalkmayı öğrenmek için.", author: "Batman Begins", topics: ["film", "motivasyon", "başarı"] },
    { text: "Hatıralar insanı sıcak tutar ama aynı zamanda canını da yakar.", author: "Murakami", topics: ["duygusal", "hatıra"] },
    { text: "Umut iyi bir şeydir, belki de en iyisi. Ve iyi şeyler asla ölmez.", author: "Esaretin Bedeli", topics: ["film", "umut", "motivasyon"] },
    { text: "Herkes ölür ama herkes gerçekten yaşamaz.", author: "Braveheart", topics: ["film", "hayat", "felsefe"] },
    { text: "Benim için hayatın anlamı, sevdiğim insanlarla geçirdiğim her saniyedir.", author: "Anonim", topics: ["hayat", "sevgi"] },

    // --- EKSTRA ---
    { text: "Zamanın her saniyesini sanki son saniyenmiş gibi yaşa.", author: "Anonim", topics: ["hayat", "zaman"] },
    { text: "Affetmek, bir mahkumu serbest bırakmaktır; ve o mahkumun sen olduğunu fark etmektir.", author: "Anonim", topics: ["felsefe", "affetmek", "huzur"] },
    { text: "Kitaplar, aklın çocuklarıdır.", author: "Jonathan Swift", topics: ["bilgi", "kitap"] },
    { text: "Düşmanını affet ama ismini asla unutma.", author: "John F. Kennedy", topics: ["hayat", "bilgelik"] },
    { text: "Mutluluk, sahip olduklarımızın tadını çıkarmaktır.", author: "Anonim", topics: ["mutluluk", "felsefe"] }
];
