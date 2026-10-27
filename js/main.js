    if (prevBtn) {
        prevBtn.addEventListener('click', navigatePrev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', navigateNext);
    }

    // NEW: Physical Keyboard Arrow Keys Listener
    document.addEventListener('keydown', (e) => {
        // Ignore key actions if the user is typing inside the contact form text fields
        if (document.activeElement === inputName || document.activeElement === inputMessage) {
            return; 
        }

        if (e.key === 'ArrowRight') {
            navigateNext();
        } else if (e.key === 'ArrowLeft') {
            navigatePrev();
        }
    });

    // Language selector buttons listener logic loop
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetLang = e.currentTarget.getAttribute('data-lang-target');
            if (targetLang) applyLanguage(targetLang);
        });
    });

    // 7. Core Application Initialization Boot
    applyLanguage(currentLang);
    
    setTimeout(forceClearPreloader, 400);
});
