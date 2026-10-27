document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Language State Initializer & Safe Cache Router
    let savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang !== 'en' && savedLang !== 'it') {
        savedLang = 'en';
        localStorage.setItem('preferredLanguage', 'en');
    }
    let currentLang = savedLang;

    let currentIndex = 0;
    const folderPath = "img/";

    // 2. Target UI Display Elements
    const featuredImage = document.getElementById('featured-image');
    const photoTitle = document.getElementById('photo-title');
    const photoMeta = document.getElementById('photo-meta');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const preloader = document.getElementById('site-preloader');

    // Target ALL structural elements across both the index page and drawer views
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

    // Target Contact form Nodes
    const contactTitle = document.querySelector('#contact-panel h2');
    const labelName = document.querySelector('label[for="user-name"]');
    const inputName = document.getElementById('user-name');
    const labelMessage = document.querySelector('label[for="user-message"]');
    const inputMessage = document.getElementById('user-message');
    const btnSubmit = document.getElementById('btn-submit');
    const contactForm = document.getElementById('portfolio-contact-form');

    // 3. Image Preloader Listeners
    if (featuredImage) {
        featuredImage.addEventListener('load', () => {
            if (preloader) preloader.classList.add('fade-out');
        });
        if (featuredImage.complete) {
            if (preloader) preloader.classList.add('fade-out');
        }
    }

    // 4. Primary Image Swapper Engine (With Pre-Fade Empty Stage Fix)
    function updateGallery(index) {
        if (featuredImage) {
            // Step A: Trigger the CSS fade-out transition
            featuredImage.classList.add('switching');
            
            // Step B: Wait exactly 300ms for the image to become completely invisible
            setTimeout(() => {
                if (window.galleryData && window.galleryData[currentLang]) {
                    const activeData = window.galleryData[currentLang][index];
                    if (activeData) {
                        // CRITICAL FIX: Empty the src stream for a split millisecond!
                        // This prevents the browser from holding onto or re-painting the old image.
                        featuredImage.removeAttribute('src'); 
                        
                        // Step C: Inject the new architectural image path and translation blocks
                        featuredImage.src = folderPath + activeData.filename;
                        if (photoTitle) photoTitle.textContent = activeData.title;
                        if (photoMeta) photoMeta.textContent = activeData.description;
                    }
                }
                
                // Step D: Smoothly fade the new photo back into view
                featuredImage.classList.remove('switching');
            }, 300); // 300ms matches the 0.3s transition time in your style.css
        }
    }

    // 5. Global Language Application Logic Router
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-lang-target="${lang}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        if (lang === 'it') {
            portfolioTitles.forEach(el => el.textContent = "Portfolio | Vetrina Creativa");
            visionTitles.forEach(el => el.textContent = "La Visione Fotografica di un Viaggiatore nel Tempo");
            visionDescs.forEach(el => el.textContent = "Da oltre due decenni, la mia fotografia è guidata da un unico, potente istinto: un profondo fascino per l'atemporalità, la durata e l'atmosfera storica. Piuttosto che documentare semplicemente le strutture, il mio lavoro cerca di catturare l'anima emotiva dell'antica architettura europea, incorniciando gli spazi in un modo che sembra completamente distaccato dal mondo moderno.");
            
            if (pillarsTitle) pillarsTitle.textContent = "La mia firma artistica si basa su tre pilastri fondamentali:";
            
            if (p1Title) p1Title.textContent = "Chiaroscuro e Atmosfera: ";
            if (p1Desc) p1Desc.textContent = "Sono attratto dai contrasti drammatici tra luce e ombra. Isolando i miei soggetti su sfondi profondi e malinconici o sfumature morbide, permetto alla pietra storica e al legno consumato dal tempo di splendere visivamente e raccontare la propria storia.";
            
            if (p2Title) p2Title.textContent = "L'Attimo Decisivo della Calma: ";
            if (p2Desc) p2Desc.textContent = "Cerco attivamente momenti di assoluta tranquillità, che si tratti di percorrere sentieri forestali oscuri nell'alba gelida del giorno di Capodanno o di alzarmi prima del sole per catturare il riflesso perfetto e specchiato di un palazzo. Uso la quiete della natura per cancellare le distrazioni moderne.";
            
            if (p3Title) p3Title.textContent = "Geometria Strutturale e Armonia: ";
            if (p3Desc) p3Desc.textContent = "Il mio occhio cerca naturalmente l'equilibrio, utilizzando prospettive a un punto, simmetria matematica e linee guida organiche per condurre lo spettatore in profondità all'interno del fotogramma.";
            
            if (aboutFooter) aboutFooter.textContent = "In definitiva, le mie foto sono un'esplorazione della permanenza. Catturo edifici che resistono da secoli, congelandoli in momenti in cui il tempo stesso sembra essersi fermato del tutto.";
            
            if (contactTitle) contactTitle.textContent = "Contattami";
            if (labelName) labelName.textContent = "Nome";
            if (inputName) inputName.placeholder = "Inserisci il tuo nome...";
            if (labelMessage) labelMessage.textContent = "Messaggio";
            if (inputMessage) inputMessage.placeholder = "Scrivi il tuo messaggio qui...";
            if (btnSubmit) btnSubmit.textContent = "Invia Messaggio";
        } else {
            portfolioTitles.forEach(el => el.textContent = "Portfolio | Creative Showcase");
            visionTitles.forEach(el => el.textContent = "The Photographic Vision of a Time Traveler");
            visionDescs.forEach(el => el.textContent = "For over two decades, my photography has been guided by a single, powerful instinct: a deep fascination with timelessness, endurance, and historical atmosphere. Rather than simply documenting structures, my work seeks to capture the emotional soul of ancient European architecture, framing spaces in a way that feels completely detached from the modern world.");
            
            if (pillarsTitle) pillarsTitle.textContent = "My artistic signature relies on three core pillars:";
            
            if (p1Title) p1Title.textContent = "Chiaroscuro & Mood: ";
            if (p1Desc) p1Desc.textContent = "I am drawn to dramatic contrasts between light and shadow. By isolating my subjects against deep, moody backgrounds or soft vignettes, I allow historic stone and weathered timber to visually \"glow\" and tell their own stories.";
            
            if (p2Title) p2Title.textContent = "The Decisive Moment of Stillness: ";
            if (p2Desc) p2Desc.textContent = "I actively seek out times of absolute tranquility—whether navigating dark forest trails in the freezing dawn of New Year's Day or rising before the sun to catch a flawless, mirror-like palace reflection. I use nature's stillness to erase modern distractions.";
            
            if (p3Title) p3Title.textContent = "Structural Geometry & Harmony: ";
            if (p3Desc) p3Desc.textContent = "My eye naturally seeks balance, using one-point perspectives, mathematical symmetry, and organic leading lines to draw the viewer deep within the frame.";
            
            if (aboutFooter) aboutFooter.textContent = "Ultimately, my photos are an exploration of permanence. I capture buildings that have stood for centuries, freezing them in moments where time itself feels as though it has stopped entirely.";
            
            if (contactTitle) contactTitle.textContent = "Contact Me";
            if (labelName) labelName.textContent = "Name";
            if (inputName) inputName.placeholder = "Enter your name...";
            if (labelMessage) labelMessage.textContent = "Message";
            if (inputMessage) inputMessage.placeholder = "Type your message here...";
            if (btnSubmit) btnSubmit.textContent = "Send Message";
        }

        updateGallery(currentIndex);
    }

    // 6. Navigation Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (window.galleryData && window.galleryData[currentLang]) {
                const totalImages = window.galleryData[currentLang].length;
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateGallery(currentIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (window.galleryData && window.galleryData[currentLang]) {
                const totalImages = window.galleryData[currentLang].length;
                currentIndex = (currentIndex + 1) % totalImages;
                updateGallery(currentIndex);
            }
        });
    }

// 7. Attach Language Control Triggers
document.querySelectorAll('.lang-btn').forEach(button => {
button.addEventListener('click', (e) => {
e.stopPropagation();
const selectedLang = e.currentTarget.getAttribute('data-lang-target');
applyLanguage(selectedLang);
});
});
// 8. Run Initialization Setup
applyLanguage(currentLang);
if (featuredImage) {
if (featuredImage.complete) {
setTimeout(() => {
if (preloader) preloader.classList.add('fade-out');
}, 100);
} else {
featuredImage.addEventListener('load', () => {
if (preloader) preloader.classList.add('fade-out');
});
setTimeout(() => {
if (preloader && !preloader.classList.contains('fade-out')) {
preloader.classList.add('fade-out');
}
}, 400);
}
} else {
if (preloader) preloader.classList.add('fade-out');
}
// 9. Interactive Keyboard Navigation Matrix
    document.addEventListener('keydown', (e) => {
        // Safe check: If a user is typing inside the contact form, don't trigger the carousel!
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return; 
        }

        if (window.galleryData && window.galleryData[currentLang]) {
            const totalImages = window.galleryData[currentLang].length;

            if (e.key === 'ArrowLeft') {
                // Trigger Previous Image Vector
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateGallery(currentIndex);
            } else if (e.key === 'ArrowRight') {
                // Trigger Next Image Vector
                currentIndex = (currentIndex + 1) % totalImages;
                updateGallery(currentIndex);
            }
        }
    });
});