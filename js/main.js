document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. FAIL-SAFE INTERNAL FALLBACK DICTIONARIES
    // ==========================================
    const fallbackTranslations = {
        it: {
            portfolio_title: "Portfolio | Vetrina Creativa",
            vision_title: "La Visione Fotografica di un Viaggiatore nel Tempo",
            vision_desc: "Da oltre due decenni, la mia fotografia è guidata da un unico, potente istinto: un profondo fascino per l'atemporalità, la durata e l'atmosfera storica. Piuttosto che documentare semplicemente le strutture, il mio lavoro cerca di catturare l'anima emotiva dell'antica architettura europea, incorniciando gli spazi in un modo che sembra completamente distaccato dal mondo moderno.",
            pillars_title: "La mia firma artistica si basa su tre pilastri fondamentali:",
            pillar_one_title: "Chiaroscuro e Atmosfera: ",
            pillar_one_desc: "Sono attratto dai contrasti drammatici tra luce e ombra. Isolando i miei soggetti su sfondi profondi e malinconici o sfumature morbide, permetto alla pietra storica e al legno consumato dal tempo di splendere visivamente e raccontare la propria storia.",
            pillar_two_title: "L'Attimo Decisivo della Calma: ",
            pillar_two_desc: "Cerco attivamente momenti di assoluta tranquillità, che si tratti di percorrere sentieri forestali oscuri nell'alba gelida del giorno di Capodanno o di alzarmi prima del sole per catturare il riflesso perfetto e specchiato di un palazzo. Uso la quiete della natura per cancellare le distrazioni moderne.",
            pillar_three_title: "Geometria Strutturale e Armonia: ",
            pillar_three_desc: "Il mio occhio cerca naturalmente l'equilibrio, utilizzando prospettive a un punto, simmetria matematica e linee guida organiche per condurre lo spettatore in profondità all'interno del fotogramma.",
            vision_footer: "In definitiva, le mie foto sono un'esplorazione della permanenza. Catturo edifici che resistono da secoli, congelandoli in momenti in cui il tempo stesso sembra essersi fermato del tutto.",
            contact_title: "Contattami",
            label_name: "Nome",
            placeholder_name: "Inserisci il tuo nome...",
            label_message: "Messaggio",
            placeholder_message: "Scrivi il tuo messaggio qui...",
            btn_submit: "Invia Messaggio"
        },
        en: {
            portfolio_title: "Portfolio | Creative Showcase",
            vision_title: "The Photographic Vision of a Time Traveler",
            vision_desc: "For over two decades, my photography has been guided by a single, powerful instinct: a deep fascination with timelessness, endurance, and historical atmosphere. Rather than simply documenting structures, my work seeks to capture the emotional soul of ancient European architecture, framing spaces in a way that feels completely detached from the modern world.",
            pillars_title: "My artistic signature rests upon three foundational pillars:",
            pillar_one_title: "Chiaroscuro & Atmosphere: ",
            pillar_one_desc: "I am drawn to dramatic contrasts between light and shadow. By isolating my subjects against deep, moody backgrounds or soft gradients, I allow the historical stone and time-worn wood to visually speak and tell their own stories.",
            pillar_two_title: "The Decisive Moment of Calm: ",
            pillar_two_desc: "I actively seek out moments of absolute stillness—whether that means hiking dark forest trails in the freezing dawn of New Year's Day, or rising before the sun to capture the perfect, mirrored reflection of a palace. I use nature's quietness to wash away modern distractions.",
            pillar_three_title: "Structural Geometry & Harmony: ",
            pillar_three_desc: "My eye naturally seeks balance, using one-point perspectives, mathematical symmetry, and organic leading lines to draw the viewer deep within the frame.",
            vision_footer: "Ultimately, my photos are an exploration of permanence. I capture buildings that have stood for centuries, freezing them in moments where time itself feels like it has completely stopped.",
            contact_title: "Contact Me",
            label_name: "Name",
            placeholder_name: "Enter your name...",
            label_message: "Message",
            placeholder_message: "Write your message here...",
            btn_submit: "Send Message"
        }
    };

    // ==========================================
    // 2. SETUP APPLICATION ENVIRONMENT ARCHITECTURE
    // ==========================================
    let savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang !== 'en' && savedLang !== 'it') {
        savedLang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
    }
    let currentLang = savedLang;
    let currentIndex = 0;
    const folderPath = "img/";
    let isTransitioning = false;

    // Target UI display bindings
    const featuredImage = document.getElementById('featured-image');
    const photoTitle = document.getElementById('photo-title');
    const photoMeta = document.getElementById('photo-meta');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const preloader = document.getElementById('site-preloader');

    // Structural Target DOM Nodes
    const portfolioTitles = document.querySelectorAll('[data-lang-key="portfolio_title"]');
    const visionTitles = document.querySelectorAll('[data-lang-key="vision_title"]');
    const visionDescs = document.querySelectorAll('[data-lang-key="vision_desc"]');
    
    const pillarsTitle = document.querySelector('[data-lang-key="pillars_title"]');
    const p1Title = document.querySelector('[data-lang-key="pillar_one_title"]');
    const p1Desc = document.querySelector('[data-lang-key="pillar_one_desc"]');
    const p2Title = document.querySelector('[data-lang-key="pillar_two_title"]');
    const p2Desc = document.querySelector('[data-lang-key="pillar_two_desc"]');
    const p3Title = document.querySelector('[data-lang-key="pillar_three_title"]');
    const p3Desc = document.querySelector('[data-lang-key="pillar_three_desc"]');
    const aboutFooter = document.querySelector('[data-lang-key="vision_footer"]');

    // Contact Form Target Nodes
    const contactTitle = document.querySelector('#contact-panel h2');
    const labelName = document.querySelector('label[for="user-name"]');
    const inputName = document.getElementById('user-name');
    const labelMessage = document.querySelector('label[for="user-message"]');
    const inputMessage = document.getElementById('user-message');
    const btnSubmit = document.getElementById('btn-submit');

    function forceClearPreloader() {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }

    // Initialize core structural loader triggers
    if (featuredImage) {
        featuredImage.addEventListener('load', forceClearPreloader);
        if (featuredImage.complete && featuredImage.getAttribute('src')) forceClearPreloader();
    } else {
        forceClearPreloader();
    }

    // ==========================================
    // 3. IMAGE PRE-LOADING AND RENDERING CORE
    // ==========================================
    function updateGallery(index) {
        if (!featuredImage || isTransitioning) return;

        // Check if galleryData exists on the window layer object
        if (!window.galleryData || !window.galleryData[currentLang] || window.galleryData[currentLang].length === 0) {
            console.warn("Awaiting synchronized language definitions data arrays...");
            forceClearPreloader();
            return;
        }

        const activeData = window.galleryData[currentLang][index];
        if (!activeData) {
            forceClearPreloader();
            return;
        }

        isTransitioning = true;
        featuredImage.classList.add('switching');

        // Setup background system fetch instance to prevent flash vulnerabilities
        const imgCacheFetch = new Image();
        const absoluteTargetSource = folderPath + activeData.filename;
        imgCacheFetch.src = absoluteTargetSource;

        imgCacheFetch.onload = () => {
            featuredImage.src = absoluteTargetSource;
            if (photoTitle) photoTitle.textContent = activeData.title || "";
            if (photoMeta) photoMeta.textContent = activeData.description || "";
            
            featuredImage.classList.remove('switching');
            isTransitioning = false;
        };

        imgCacheFetch.onerror = () => {
            console.error("Asset location lookups failed for filepath: " + absoluteTargetSource);
            featuredImage.classList.remove('switching');
            isTransitioning = false;
            forceClearPreloader();
        };
    }

    // ==========================================
    // 4. LANGUAGE SWAP INTERACTION CONTROLLER
    // ==========================================
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update button visual highlight states safely
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-lang-target="${lang}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Use window data values if present, else tap structural fallback backup definitions
        const dict = (window.siteTranslations && window.siteTranslations[lang]) 
                     ? window.siteTranslations[lang] 
                     : fallbackTranslations[lang];

        if (!dict) {
            isTransitioning = false;
            updateGallery(currentIndex);
return;
}
// Map textual nodes seamlessly
portfolioTitles.forEach(el => el.textContent = dict.portfolio_title || "");
visionTitles.forEach(el => el.textContent = dict.vision_title || "");
visionDescs.forEach(el => el.textContent = dict.vision_desc || "");
if (pillarsTitle) pillarsTitle.textContent = dict.pillars_title || "";
if (p1Title) p1Title.textContent = dict.pillar_one_title || "";
if (p1Desc) p1Desc.textContent = dict.pillar_one_desc || "";
if (p2Title) p2Title.textContent = dict.pillar_two_title || "";
if (p2Desc) p2Desc.textContent = dict.pillar_two_desc || "";
if (p3Title) p3Title.textContent = dict.pillar_three_title || "";
if (p3Desc) p3Desc.textContent = dict.pillar_three_desc || "";
if (aboutFooter) aboutFooter.textContent = dict.vision_footer || "";
if (contactTitle) contactTitle.textContent = dict.contact_title || "";
if (labelName) labelName.textContent = dict.label_name || "";
if (inputName) inputName.placeholder = dict.placeholder_name || "";
if (labelMessage) labelMessage.textContent = dict.label_message || "";
if (inputMessage) inputMessage.placeholder = dict.placeholder_message || "";
if (btnSubmit) btnSubmit.textContent = dict.btn_submit || "";
isTransitioning = false;
updateGallery(currentIndex);
}
// Navigation core helpers
function navigateNext() {
if (window.galleryData && window.galleryData[currentLang]) {
const total = window.galleryData[currentLang].length;
if (total > 0) {
currentIndex = (currentIndex + 1) % total;
updateGallery(currentIndex);
}
}
}
// Navigation core helpers
function navigatePrev() {
if (window.galleryData && window.galleryData[currentLang]) {
const total = window.galleryData[currentLang].length;
if (total > 0) {
currentIndex = (currentIndex - 1 + total) % total;
updateGallery(currentIndex);
}
}
}
// ==========================================
// 5. INPUT REGISTRATION DELEGATION LOOPS
// ==========================================
if (prevBtn) prevBtn.addEventListener('click', navigatePrev);
if (nextBtn) nextBtn.addEventListener('click', navigateNext);
document.addEventListener('keydown', (e) => {
if (document.activeElement === inputName || document.activeElement === inputMessage) return;
if (e.key === 'ArrowRight') navigateNext();
else if (e.key === 'ArrowLeft') navigatePrev();
});
document.querySelectorAll('.lang-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
const targetLang = e.currentTarget.getAttribute('data-lang-target');
if (targetLang) applyLanguage(targetLang);
});
});
// Boot App configuration
applyLanguage(currentLang);
setTimeout(forceClearPreloader, 600);
});
