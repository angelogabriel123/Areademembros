// App State
let currentUser = null;
let currentTab = 'principal';
let currentModule = null;

// Video data for each module
const moduleVideos = {
    1: [
        'dQw4w9WgXcQ', // Example YouTube video IDs
        'ScMzIvxBSi4',
        'ZZ5LpwO-An4',
        'JGwWNGJdvx8',
        'eBGIQ7ZuuiU'
    ],
    2: [
        'Ui300Lv1SPA', // Videos de como fazer o bolo
        'FlwTkfUAXv0',
        '73HYobQxkJ0',
        'IPuqM0Srr2Q'
    ]
};

// Module titles
const moduleTitles = {
    1: '10 Bolos sem Glúten',
    2: 'Videos de como fazer o bolo'
};

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const logoutBtn = document.getElementById('logoutBtn');

// Navigation elements
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Module elements
const moduleCards = document.querySelectorAll('.module-card');
const videoGallery = document.getElementById('videoGallery');
const videoGrid = document.getElementById('videoGrid');
const backToModulesBtn = document.getElementById('backToModules');
const galleryTitle = document.getElementById('galleryTitle');

// Upsell elements
const upsellCards = document.querySelectorAll('.upsell-card');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Skip login and go directly to app
    currentUser = { email: 'guest' };
    showApp();
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });
    
    // Module cards
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            const moduleType = this.getAttribute('data-type');
            
            if (moduleType === 'pdf') {
                downloadPDF(moduleId);
            } else {
                showModuleVideos(moduleId);
            }
        });
    });
    
    // Back to modules button
    backToModulesBtn.addEventListener('click', function() {
        hideVideoGallery();
    });
    
    // Upsell cards
    upsellCards.forEach(card => {
        card.addEventListener('click', function() {
            const checkoutUrl = this.getAttribute('data-checkout');
            window.open(checkoutUrl, '_blank');
        });
    });
}







function showApp() {
    loginScreen.classList.add('hidden');
    appContainer.classList.remove('hidden');
}

function switchTab(tabName) {
    // Update navigation buttons
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
    
    // Hide video gallery when switching tabs
    if (tabName !== 'principal') {
        hideVideoGallery();
    }
    
    currentTab = tabName;
}

function showModuleVideos(moduleId) {
    currentModule = moduleId;
    const videos = moduleVideos[moduleId];
    const title = moduleTitles[moduleId];
    
    // Update gallery title
    galleryTitle.textContent = title;
    
    // Clear video grid
    videoGrid.innerHTML = '';
    
    // Add videos to grid
    videos.forEach((videoId, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        
        videoItem.appendChild(iframe);
        videoGrid.appendChild(videoItem);
    });
    
    // Show video gallery
    document.querySelector('.modules-carousel').style.display = 'none';
    videoGallery.classList.remove('hidden');
}

function hideVideoGallery() {
    videoGallery.classList.add('hidden');
    document.querySelector('.modules-carousel').style.display = 'flex';
    currentModule = null;
}

function downloadPDF(moduleId) {
    // PDF download functionality
    if (moduleId === '1') {
        // Create download link for Module 1 PDF
        const link = document.createElement('a');
        link.href = '10-bolos-sem-gluten.pdf';
        link.download = '10-Bolos-sem-Gluten.pdf';
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Track user action
        trackUserAction('pdf_download', { module: moduleId, title: moduleTitles[moduleId] });
        
        // Show success message
        showDownloadMessage('PDF baixado com sucesso! Verifique sua pasta de downloads.');
    }
}

function showDownloadMessage(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #F78FB3;
        color: #1E1B2E;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(247, 143, 179, 0.4);
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(function() {
    // Recalculate layouts if needed
    if (currentModule) {
        // Refresh video layout
        showModuleVideos(currentModule);
    }
}, 250));

// Prevent zoom on mobile inputs
document.addEventListener('touchstart', function() {}, {passive: true});

// Add smooth scrolling behavior
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Service Worker Registration (if needed for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Could register service worker here for offline functionality
        console.log('App loaded successfully');
    });
}

// Error handling for video loading
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IFRAME') {
        console.error('Video failed to load:', e.target.src);
        // Could show error message or retry logic here
    }
}, true);

// Analytics or tracking functions could be added here
function trackUserAction(action, details = {}) {
    // Implementation for tracking user interactions
    console.log('User action:', action, details);
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation
    if (e.key === 'Escape') {
        if (currentModule) {
            hideVideoGallery();
        }
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Monitor app performance
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('App load time:', loadTime + 'ms');
    }
});

// Unlock module function
window.unlockModule = function(moduleId) {
    const emailInput = document.querySelector(`[data-module="${moduleId}"] .unlock-email`);
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@') || !email.includes('.')) {
        alert('Por favor, digite um email válido.');
        return;
    }
    
    // Simulate email verification (accepts any valid email format)
    const moduleElement = document.querySelector(`[data-module="${moduleId}"]`);
    moduleElement.classList.add('unlocked');
    
    // Show success message
    alert(`✅ Módulo desbloqueado com sucesso!\nAgora você tem acesso ao conteúdo premium.`);
    
    // Add unlocked content
    setTimeout(() => {
        const moduleContent = moduleElement.querySelector('.module-content');
        
        // Check if unlocked content already exists
        if (!moduleContent.querySelector('.unlocked-content')) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'unlocked-content';
            contentDiv.innerHTML = `
                <div style="padding: 1.5rem; background: #1E1B2E; border-radius: 12px; margin-top: 1rem;">
                    <h4 style="color: #F78FB3; margin-bottom: 0.5rem; margin-top: 0;">🎉 Conteúdo Desbloqueado!</h4>
                    <p style="color: #C8C4D8; margin: 0; font-size: 0.9rem;">Este módulo premium agora está disponível. Em breve você terá acesso ao conteúdo completo.</p>
                </div>
            `;
            moduleContent.appendChild(contentDiv);
        }
    }, 500);
    
    // Clear the email input
    emailInput.value = '';
};
