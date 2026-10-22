document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lowercase-safe collection array mapped to your artist statement elements
    const galleryData = [
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
            filename: "nuremberg.jpg",
            title: "The Henkersteg & Wasserturm",
            description: "Nuremberg, Germany. A fine-art black and white study highlighting historical geometry and timeless textures enveloped in a soft, misty atmosphere."
        }
    ];

    let currentIndex = 0;
    const folderPath = "img/";

    // Target View Elements
    const featuredImage = document.getElementById('featured-image');
    const photoTitle = document.getElementById('photo-title');
    const photoMeta = document.getElementById('photo-meta');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Target Navbar Link Triggers
    const workNav = document.getElementById('nav-work');
    const aboutNav = document.getElementById('nav-about');
    const contactNav = document.getElementById('nav-contact');

    // Target Side Drawer Containers
    const aboutPanel = document.getElementById('about-panel');
    const closeAboutBtn = document.getElementById('close-about');
    const contactPanel = document.getElementById('contact-panel');
    const closeContactBtn = document.getElementById('close-contact');

    // Gallery Content Updater
    function updateGallery(index) {
        featuredImage.src = folderPath + galleryData[index].filename;
        photoTitle.textContent = galleryData[index].title;
        photoMeta.textContent = galleryData[index].description;
    }

    // Arrow Button Interactive Handlers
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateGallery(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateGallery(currentIndex);
    });

    // 2. Keyboard Arrow Key Listeners
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateGallery(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateGallery(currentIndex);
        }
    });

    // Helper layout visual focus sync utility
    function resetNavLinks() {
        workNav.classList.remove('active');
        aboutNav.classList.remove('active');
        contactNav.classList.remove('active');
    }

    // 3. ABOUT Drawer Dynamic Triggers (Right Panel)
    aboutNav.addEventListener('click', (e) => {
        e.preventDefault();
        contactPanel.classList.remove('open'); // Close opposite panel to avoid collision
        aboutPanel.classList.add('open');
        resetNavLinks();
        aboutNav.classList.add('active');
    });

    closeAboutBtn.addEventListener('click', () => {
        aboutPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });

    // 4. CONTACT Drawer Dynamic Triggers (Left Panel)
    contactNav.addEventListener('click', (e) => {
        e.preventDefault();
        aboutPanel.classList.remove('open'); // Close opposite panel to avoid collision
        contactPanel.classList.add('open');
        resetNavLinks();
        contactNav.classList.add('active');
    });

    closeContactBtn.addEventListener('click', () => {
        contactPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });

    // Clicking 'Work' closes all open side panels cleanly
    workNav.addEventListener('click', () => {
        aboutPanel.classList.remove('open');
        contactPanel.classList.remove('open');
        resetNavLinks();
        workNav.classList.add('active');
    });
    
    console.log("Portfolio engine fully integrated. Image cycle arrows, keyboard controls, and dual side panels functional.");
});