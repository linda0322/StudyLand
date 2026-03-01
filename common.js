document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
   🫵🏻 手勢禁止 NO GESTURE
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
