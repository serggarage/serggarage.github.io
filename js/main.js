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

    // Navigation lock flag to handle high-speed transitions smoothly
    let isTransitioning = false;

    // Helper function to safely force clear the preloader loader 
    function forceClearPreloader() {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }

    // 3. Initial Image Preloader Configuration Setup
    if (featuredImage) {
        featuredImage.addEventListener('load', () => {
            if (featuredImage.getAttribute('src')) {
                forceClearPreloader();
            }
        });
        
        if (featuredImage.complete && featuredImage.getAttribute('src')) {
            forceClearPreloader();
        }
    } else {
        forceClearPreloader();
    }

    // 4. Primary Image Swapper Engine (Anti-Flash Memory Preload Fix)
    function updateGallery(index) {
        if (!featuredImage || isTransitioning) return;

        // Fallback protection loops if window data hasn't fully registered yet
        if (!window.galleryData || !window.galleryData[currentLang]) {
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

        // Create background element cache instance
        const imgPreloader = new Image();
        
        // GITHUB PAGES FIX: Enforces clean local pathing syntax regardless of domain nesting levels
        const targetedSourcePath = folderPath + activeData.filename;
        imgPreloader.src = targetedSourcePath;

        imgPreloader.onload = () => {
            // Swap asset paths exclusively when opacity is entirely blacked out
            featuredImage.src = targetedSourcePath;
            
            if (photoTitle) photoTitle.textContent = activeData.title;
            if (photoMeta) photoMeta.textContent = activeData.description;
            
            featuredImage.classList.remove('switching');
            isTransitioning = false;
        };

        imgPreloader.onerror = () => {
            console.error("Failed to load asset binary file at path: " + targetedSourcePath);
            featuredImage.classList.remove('switching');
            isTransitioning = false;
            forceClearPreloader();
        };
    }

    // 5. Global Language Application Logic Router
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-lang-target="${lang}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        const dict = window.siteTranslations ? window.siteTranslations[lang] : null;
        if (!dict) {
            updateGallery(currentIndex);
            return;
        }

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

    // Navigation Pointer Directives
    function navigateNext() {
        if (window.galleryData && window.galleryData[currentLang]) {
            const totalImages = window.galleryData[currentLang].length;
            if (totalImages > 0) {
                currentIndex = (currentIndex + 1) % totalImages;
                updateGallery(currentIndex);
            }
        }
    }

    // Navigation Pointer Directives
    function navigatePrev() {
        if (window.galleryData && window.galleryData[currentLang]) {
            const totalImages = window.galleryData[currentLang].length;
            if (totalImages > 0) {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateGallery(currentIndex);
            }
        }
    }

    // 6. On-Screen Arrow Button Click Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', navigatePrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', navigateNext);
    }

    // Physical Keyboard Arrow Keys Navigation Listener
    document.addEventListener('keydown', (e) => {
        if (document.activeElement === inputName || document.activeElement === inputMessage) {
            return; 
        }

        if (e.key === 'ArrowRight') {
            navigateNext();
        } else if (e.key === 'ArrowLeft') {
            navigatePrev();
        }
    });

    // Language selector buttons configuration mapper loops
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetLang = e.currentTarget.getAttribute('data-lang-target');
            if (targetLang) applyLanguage(targetLang);
        });
    });

    // 7. Core Application Initialization Boot
    applyLanguage(currentLang);
    
    // Emergency Backup: Forces spinner removal even if cross-domain assets lag
    setTimeout(forceClearPreloader, 600);
});
