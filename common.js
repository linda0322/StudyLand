document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
   🫵🏻 手勢禁止 DISABLE GESTURE
   ========================================= */
    // 選取及拖動
    document.querySelectorAll('.no-touch').forEach(el => {el.addEventListener('dragstart', (e) => e.preventDefault());});
    // 多指縮放
    const preventZoom = (e) => {if (e.touches?.length > 1 || (e.type === 'wheel' && (e.ctrlKey || e.metaKey))) {if (e.cancelable) e.preventDefault();}};
    document.addEventListener('wheel', preventZoom, {passive: false});
    document.addEventListener('gesturestart', preventZoom, {passive: false});
    // 雙擊縮放
    let lastTouch = 0; 
    document.addEventListener('touchend', (e) => {const now = Date.now(); if (now - lastTouch <= 300) {e.preventDefault();}
                                                  lastTouch = now;}, false);

  /* =========================================
   📲 手機旋轉提示 ORIENTATION NOTI
   ========================================= */
    function handleOrientationChange() {
        const warning = document.getElementById('orientation-noti-portrait'); 
        if (!warning) return;
        const isLandscape = window.innerWidth > window.innerHeight; 
        const isMobileOrTablet = window.innerWidth < 1024;
        if (isLandscape && isMobileOrTablet) {
            warning.style.setProperty('display', 'flex', 'important');
        } else {
            warning.style.display = 'none';
        }
    }
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange();
});

/* =========================================
   🚘 加載遮罩 LOADING OVERLAY
   ========================================= */
window.toggleLoading = function(show, text = "載入中", emoji = "☁️") {
    let overlay = document.getElementById('loading-overlay');
    if (show) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loading-overlay';
            overlay.innerHTML = `
                <div id="loading-emoji" class="animate-bounce text-3xl mb-4"></div>
                <div id="loading-text" class="font-cubic text-white text-xl thick-border tracking-widest"></div>
            `;
            document.body.appendChild(overlay);
        }
        document.getElementById('loading-emoji').innerText = emoji;
        document.getElementById('loading-text').innerText = text;
        overlay.style.display = 'flex';
        overlay.classList.remove('fade-out');
    } else {
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => { 
                overlay.style.display = 'none'; 
            }, 500);
        }
    }
};
