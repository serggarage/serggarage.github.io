document.addEventListener('DOMContentLoaded', () => {
    // Select the interactive drawer trigger layers
    const navAbout = document.getElementById('nav-about');
    const navContact = document.getElementById('nav-contact');
    
    // Select the panels
    const aboutPanel = document.getElementById('about-panel');
    const contactPanel = document.getElementById('contact-panel');
    
    // Select close triggers inside the panels
    const closeAbout = document.getElementById('close-about');
    const closeContact = document.getElementById('close-contact');
    const portfolioShowcase = document.querySelector('.portfolio-showcase');

    // --- Opening Actions ---
    if (navAbout && aboutPanel) {
        navAbout.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactPanel) contactPanel.classList.remove('open'); // Close other panel if open
            aboutPanel.classList.add('open');
        });
    }

    if (navContact && contactPanel) {
        navContact.addEventListener('click', (e) => {
            e.preventDefault();
            if (aboutPanel) aboutPanel.classList.remove('open'); // Close other panel if open
            contactPanel.classList.add('open');
        });
    }

    // --- Closing Actions ---
    function closeAllPanels() {
        if (aboutPanel) aboutPanel.classList.remove('open');
        if (contactPanel) contactPanel.classList.remove('open');
    }

    if (closeAbout) closeAbout.addEventListener('click', closeAllPanels);
    if (closeContact) closeContact.addEventListener('click', closeAllPanels);

    // Dismiss layer: Clicking back onto the main screen background image closes everything
    if (portfolioShowcase) {
        portfolioShowcase.addEventListener('click', closeAllPanels);
    }
});