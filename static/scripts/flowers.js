window.onload = () => {
    setTimeout(() => {
        document.body.classList.remove("not-loaded");
        console.log("Animation started: 'not-loaded' class removed.");
    }, 1000); // Delay to ensure all assets are loaded
};