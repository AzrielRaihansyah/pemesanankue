document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰ Menu';
    document.querySelector('header').prepend(mobileMenuBtn);
    
    const nav = document.querySelector('nav');
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Update active link based on current page
    const currentPage = location.pathname.split('/').pop();
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Form submission handler for contact page
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            this.reset();
        });
    }
    
    // Product order buttons
    const orderButtons = document.querySelectorAll('.btn');
    orderButtons.forEach(button => {
        if (button.textContent === 'Pesan Sekarang') {
            button.addEventListener('click', function() {
                const productName = this.closest('.product').querySelector('h3, h4').textContent;
                alert(`Anda akan memesan: ${productName}\nSilakan hubungi kami untuk melanjutkan pemesanan.`);
            });
        }
    });
});

// Back to top button
const backToTopButton = document.createElement('a');
backToTopButton.href = '#';
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading spinner simulation
const loadingSpinner = document.createElement('div');
loadingSpinner.className = 'loading-spinner';
loadingSpinner.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(loadingSpinner);

// Simulate loading for demonstration
setTimeout(() => {
    loadingSpinner.style.display = 'none';
}, 1500);

// Cookie consent
const cookieConsent = document.createElement('div');
cookieConsent.className = 'cookie-consent';
cookieConsent.innerHTML = `
    <p>Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan menggunakan situs kami, Anda menyetujui penggunaan cookie.</p>
    <button id="accept-cookies">Setuju</button>
`;
document.body.appendChild(cookieConsent);

document.getElementById('accept-cookies')?.addEventListener('click', function() {
    cookieConsent.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
});

// Check if cookies were already accepted
if (localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'none';
}

// Product gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.innerHTML = `
            <img src="${imgSrc}" style="max-width: 90%; max-height: 90%;">
            <button style="position: absolute; top: 20px; right: 20px; background: #e74c3c; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5em;">×</button>
        `;
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('button').addEventListener('click', function() {
            lightbox.remove();
        });
    });
});

// Form validation for contact page
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading spinner
        loadingSpinner.style.display = 'flex';
        
        // Simulate form submission
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            this.reset();
        }, 2000);
    });
}

// Special countdown timer
const specialOffersSection = document.querySelector('.special-offers');
if (specialOffersSection) {
    const countdownElement = document.createElement('div');
    countdownElement.style.margin = '20px 0';
    countdownElement.style.fontSize = '1.2em';
    countdownElement.style.fontWeight = 'bold';
    countdownElement.style.color = '#fff';
    specialOffersSection.insertBefore(countdownElement, specialOffersSection.firstChild);
    
    // Set the countdown time (24 hours from now)
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 24);
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `Penawaran khusus berakhir dalam: ${Math.floor(hours)}h ${minutes}m ${seconds}s`;
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "Penawaran khusus telah berakhir";
        }
    };
    
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
}