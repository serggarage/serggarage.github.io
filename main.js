document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Fully unified portfolio data matrix array
    const galleryData = [
		 {
            filename: "marktbreit.jpg",
            title: "The Mirror of Marktbreit",
            description: "Marktbreit am Main, Germany. A serene vertical composition capturing the timeless harmony of the historic waterfront under soft, diffused skies, utilizing deep, moody contrast to enhance its fairytale atmosphere."
        },
        {
            filename: "schloss-seehof.jpg",
            title: "The Weight of Centuries",
            description: "Schloss Seehof, near Bamberg, Germany. A tight, low-angle study of a stone Atlant straining against the palace facade, stripping away the static nature of Baroque architectural stonework."
        },
        {
            filename: "lichtenstein.jpg",
            title: "Das Erwachen der Märchen",
            description: "Schloss Lichtenstein, Baden-Württemberg, Germany. An editorial view of the fortified round towers framed by deep autumn foliage under a dramatic evening sky, celebrating classic dark romanticism."
        },
        {
            filename: "rothenburg.jpg",
            title: "The Fortified Framing",
            description: "Rothenburg ob der Tauber, Germany. An architectural study in medieval density, isolating the unique structural integration of the historic Johanniterturm built directly atop heavy fortification walls."
        },
        {
            filename: "marienberg.jpg",
            title: "Wege zur Festung",
            description: "Festung Marienberg, Würzburg, Germany. A dark pathway study framed by strong, diagonal stone bastions guiding the eye towards the historic castle keep."
        },
        {
            filename: "ronneburg.jpg",
            title: "The Golden Citadel",
            description: "Burg Ronneburg, Hesse, Germany. A dramatic, painterly study of the medieval fortress emerging from a dense sea of autumn foliage, balancing deep teal skies with glowing terracotta and rust tones."
        },
        {
            filename: "esslingen.jpg",
            title: "The Shrouded Social",
            description: "Esslingen am Neckar, Germany. A visual exploration of community life in Klein-Venedig, enveloped in a heavy morning mist that beautifully softens the sharp timber architecture and distant church towers."
        },
        {
            filename: "sigmaringen.jpg",
            title: "Sigmaringen Castle",
            description: "Baden-Württemberg, Germany. A crisp, golden winter atmosphere warming up the historic stone towers over the Danube river."
        },
        {
            filename: "pfalzgrafenstein.jpg",
            title: "Pfalzgrafenstein Castle",
            description: "Rhineland-Palatinate, Germany. A soft, organic daylight study capturing the unique stone vessel layout standing mid-stream inside the Rhine river gorge."
        },
        {
            filename: "ramholz.jpg",
            title: "Schloss Ramholz Study",
            description: "Hesse, Germany. An intense, moody autumn aesthetic highlighting creeping ivy vines transforming into deep crimson reds along the castle paths."
        },
        {
            filename: "wuerzburg.jpg",
            title: "The Court Garden Balustrade",
            description: "Würzburg, Germany. A moody, antique time-traveler study highlighting the weathered baroque stone masonry and classical sculpture contours."
        },
        {
            filename: "bamberg.jpg",
            title: "Regnitz Riverside Houses",
            description: "Bamberg, Germany. A believable fine-art twilight study capturing historic riverfront architecture, warm window lantern flows, and the softly illuminated Don Bosco ferry landing."
        },
        {
            filename: "nuremberg.jpg",
            title: "The Henkersteg & Wasserturm",
            description: "Nuremberg, Germany. A fine-art black and white study highlighting historical geometry and timeless textures enveloped in a soft, misty atmosphere."
        }
    ];

    let currentIndex = 0;
    const folderPath = "img/";

    // Target View Layout Elements
    const featuredImage = document.getElementById('featured-image');
    const photoTitle = document.getElementById('photo-title');
    const photoMeta = document.getElementById('photo-meta');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Target Menu Triggers
    const workNav = document.getElementById('nav-work');
    const aboutNav = document.getElementById('nav-about');
    const contactNav = document.getElementById('nav-contact');

    // Target Panels & Loading Canvas
    const preloader = document.getElementById('site-preloader');
    const aboutPanel = document.getElementById('about-panel');
    const closeAboutBtn = document.getElementById('close-about');
    const contactPanel = document.getElementById('contact-panel');
    const closeContactBtn = document.getElementById('close-contact');

    // 2. NEW: Bulletproof Preloader Listener Logic
    // Hides the loading spinner layer smoothly only after an image completely populates
    featuredImage.addEventListener('load', () => {
        preloader.classList.add('fade-out');
    });

    // Handle initial asset load safety check if cached instantly
    if (featuredImage.complete) {
        preloader.classList.add('fade-out');
    }

    // Gallery Swap Engine Wrapper
    function updateGallery(index) {
        // Drop the curtain before swapping the source to hide loading artifacts
        preloader.classList.remove('fade-out');
        
        featuredImage.src = folderPath + galleryData[index].filename;
        photoTitle.textContent = galleryData[index].title;
        photoMeta.textContent = galleryData[index].description;
    }

    // Navigation Controls
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateGallery(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateGallery(currentIndex);
    });

    // Keyboard Accessibility Hotkeys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateGallery(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateGallery(currentIndex);
        }
    });

    function resetNavLinks() {
        workNav.classList.remove('active');
        aboutNav.classList.remove('active');
        contactNav.classList.remove('active');
    }

    // Drawer Interface Triggers
    aboutNav.addEventListener('click', (e) => {
        e.preventDefault();
        contactPanel.classList.remove('open');
        aboutPanel.classList.add('open');
        resetNavLinks();
        aboutNav.classList.add('active');
    });

    closeAboutBtn.addEventListener('click', () => {
        aboutPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });

    contactNav.addEventListener('click', (e) => {
        e.preventDefault();
        aboutPanel.classList.remove('open');
        contactPanel.classList.open = false;
        contactPanel.classList.add('open');
        resetNavLinks();
        contactNav.classList.add('active');
    });

    closeContactBtn.addEventListener('click', () => {
        contactPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });

    workNav.addEventListener('click', () => {
        aboutPanel.classList.remove('open');
        contactPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });
    
    console.log("Interactive ecosystem load sequence complete. Preloader synchronized.");
});