(function() {
    // Configuration
    const config = {
        cookieName: 'cookieConsent',
        expiryDays: 7,
        popupId: 'glassy-cookie-consent',
        style: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            #glassy-cookie-consent {
                position: fixed;
                bottom: 24px;
                left: 24px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                padding: 0;
                border-radius: 20px;
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.15),
                    0 8px 25px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
                z-index: 10000;
                max-width: 420px;
                width: calc(100vw - 48px);
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                color: #1a1a1a;
                transform: translateY(120px) scale(0.95);
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                border: 1px solid rgba(255, 255, 255, 0.4);
                overflow: hidden;
            }
            
            #glassy-cookie-consent::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.8), 
                    transparent
                );
            }
            
            #glassy-cookie-consent.show {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            
            #glassy-cookie-consent.hide {
                transform: translateY(120px) scale(0.95);
                opacity: 0;
            }
            
            #glassy-cookie-consent .cookie-container {
                padding: 28px;
                position: relative;
            }
            
            #glassy-cookie-consent .cookie-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(
                    circle at 20% 80%,
                    rgba(120, 119, 198, 0.08) 0%,
                    transparent 60%
                );
                pointer-events: none;
            }
            
            #glassy-cookie-consent .cookie-header {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                margin-bottom: 18px;
            }
            
            #glassy-cookie-consent .cookie-icon {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                flex-shrink: 0;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
            }
            
            #glassy-cookie-consent .cookie-title {
                font-size: 18px;
                font-weight: 700;
                margin: 0 0 6px 0;
                line-height: 1.3;
                letter-spacing: -0.01em;
                background: linear-gradient(135deg, #2D3748 0%, #4A5568 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            #glassy-cookie-consent .cookie-text {
                margin: 0;
                line-height: 1.5;
                font-size: 14px;
                color: #4A5568;
                font-weight: 400;
            }
            
            #glassy-cookie-consent .cookie-buttons {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }
            
            #glassy-cookie-consent .cookie-btn {
                padding: 14px 24px;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 14px;
                flex: 1;
                position: relative;
                overflow: hidden;
                letter-spacing: -0.01em;
            }
            
            #glassy-cookie-consent .cookie-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.6s ease;
            }
            
            #glassy-cookie-consent .cookie-btn:hover::before {
                left: 100%;
            }
            
            /* Primary Accept Button - Highlighted */
            #glassy-cookie-consent .cookie-btn.accept {
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                color: white;
                border: none;
                box-shadow: 
                    0 4px 15px rgba(16, 185, 129, 0.4),
                    0 2px 4px rgba(16, 185, 129, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3);
            }
            
            #glassy-cookie-consent .cookie-btn.accept:hover {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                transform: translateY(-2px);
                box-shadow: 
                    0 8px 25px rgba(16, 185, 129, 0.5),
                    0 4px 8px rgba(16, 185, 129, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }
            
            #glassy-cookie-consent .cookie-btn.accept:active {
                transform: translateY(0);
                box-shadow: 
                    0 2px 8px rgba(16, 185, 129, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
            
            /* Secondary Reject Button */
            #glassy-cookie-consent .cookie-btn.reject {
                background: rgba(255, 255, 255, 0.7);
                color: #4A5568;
                border: 1.5px solid #E2E8F0;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            #glassy-cookie-consent .cookie-btn.reject:hover {
                background: rgba(255, 255, 255, 0.9);
                border-color: #CBD5E0;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }
            
            #glassy-cookie-consent .cookie-btn.reject:active {
                transform: translateY(0);
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                #glassy-cookie-consent {
                    left: 16px;
                    right: 16px;
                    bottom: 16px;
                    width: calc(100vw - 32px);
                    max-width: none;
                    border-radius: 18px;
                }
                
                #glassy-cookie-consent .cookie-container {
                    padding: 24px;
                }
                
                #glassy-cookie-consent .cookie-header {
                    gap: 14px;
                }
                
                #glassy-cookie-consent .cookie-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 18px;
                }
                
                #glassy-cookie-consent .cookie-title {
                    font-size: 17px;
                }
                
                #glassy-cookie-consent .cookie-buttons {
                    flex-direction: column;
                    gap: 10px;
                }
                
                #glassy-cookie-consent .cookie-btn {
                    padding: 16px 20px;
                }
            }
            
            @media (max-width: 480px) {
                #glassy-cookie-consent {
                    left: 12px;
                    right: 12px;
                    bottom: 12px;
                    border-radius: 16px;
                }
                
                #glassy-cookie-consent .cookie-container {
                    padding: 20px;
                }
                
                #glassy-cookie-consent .cookie-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 12px;
                }
                
                #glassy-cookie-consent .cookie-icon {
                    align-self: center;
                }
                
                #glassy-cookie-consent .cookie-title {
                    font-size: 16px;
                }
                
                #glassy-cookie-consent .cookie-text {
                    font-size: 13px;
                    text-align: center;
                }
            }
            
            /* Micro-interactions */
            @keyframes gentleBounce {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-2px) rotate(5deg); }
                75% { transform: translateY(-1px) rotate(-5deg); }
            }
            
            #glassy-cookie-consent .cookie-icon {
                animation: gentleBounce 4s ease-in-out infinite;
            }
            
            @keyframes shimmerAccept {
                0% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
                50% { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.6); }
                100% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
            }
            
            #glassy-cookie-consent .cookie-btn.accept {
                animation: shimmerAccept 3s ease-in-out infinite;
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                #glassy-cookie-consent {
                    transition: opacity 0.3s ease;
                }
                
                .cookie-btn:hover {
                    transform: none !important;
                }
                
                .cookie-icon,
                .cookie-btn.accept {
                    animation: none;
                }
            }
        `
    };

    // Check if consent already given
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Set consent cookie
    function setConsent(value) {
        const date = new Date();
        date.setTime(date.getTime() + (config.expiryDays * 24 * 60 * 60 * 1000));
        document.cookie = `${config.cookieName}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    }

    // Create and inject styles
    function injectStyles() {
        if (document.getElementById('cookie-consent-styles')) return;
        
        const styleSheet = document.createElement("style");
        styleSheet.id = 'cookie-consent-styles';
        styleSheet.textContent = config.style;
        document.head.appendChild(styleSheet);
    }

    // Create popup HTML
    function createPopup() {
        // Remove existing popup if any
        const existingPopup = document.getElementById(config.popupId);
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement('div');
        popup.id = config.popupId;
        
        popup.innerHTML = `
            <div class="cookie-backdrop"></div>
            <div class="cookie-container">
                <div class="cookie-header">
                    <div class="cookie-icon">🍪</div>
                    <div>
                        <h3 class="cookie-title">We Use Cookies</h3>
                        <p class="cookie-text">
                            We use cookies to enhance your browsing experience and analyze our traffic. 
                            By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>
                </div>
                
                <div class="cookie-buttons">
                    <button class="cookie-btn accept" aria-label="Accept all cookies">
                        Accept All
                    </button>
                    <button class="cookie-btn reject" aria-label="Reject non-essential cookies">
                        Reject All
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Add event listeners
        const acceptBtn = popup.querySelector('.cookie-btn.accept');
        const rejectBtn = popup.querySelector('.cookie-btn.reject');

        const handleAccept = () => {
            setConsent('accepted');
            hidePopup();
            if (window.onCookieAccept) {
                window.onCookieAccept();
            }
        };

        const handleReject = () => {
            setConsent('rejected');
            hidePopup();
            if (window.onCookieReject) {
                window.onCookieReject();
            }
        };

        // Add ripple effect to buttons
        const createRipple = (event, color) => {
            const button = event.currentTarget;
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.style.backgroundColor = color;
            circle.classList.add("ripple");

            const ripple = button.getElementsByClassName("ripple")[0];
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);
        };

        acceptBtn.addEventListener('click', (e) => {
            createRipple(e, 'rgba(255, 255, 255, 0.6)');
            setTimeout(handleAccept, 300);
        });

        rejectBtn.addEventListener('click', (e) => {
            createRipple(e, 'rgba(102, 126, 234, 0.2)');
            setTimeout(handleReject, 300);
        });

        // Show popup with smooth animation
        requestAnimationFrame(() => {
            popup.classList.add('show');
        });
    }

    // Hide popup with smooth animation
    function hidePopup() {
        const popup = document.getElementById(config.popupId);
        if (popup) {
            popup.classList.add('hide');
            popup.classList.remove('show');
            
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.remove();
                }
            }, 800);
        }
    }

    // Enhanced scroll handler
    function initScrollHandler() {
        if (getCookie(config.cookieName)) return;

        let scrollTimeout;
        let hasScrolled = false;

        const showOnScroll = () => {
            if (!hasScrolled) {
                hasScrolled = true;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    createPopup();
                    window.removeEventListener('scroll', showOnScroll);
                }, 600);
            }
        };

        window.addEventListener('scroll', showOnScroll, { passive: true });

        // Fallback: show after 3 seconds
        setTimeout(() => {
            if (!hasScrolled && !getCookie(config.cookieName)) {
                createPopup();
                window.removeEventListener('scroll', showOnScroll);
            }
        }, 3000);
    }

    // Initialize
    function init() {
        injectStyles();
        
        if (!getCookie(config.cookieName)) {
            setTimeout(initScrollHandler, 100);
        }
    }

    // Global functions for manual control
    window.showCookieConsent = createPopup;
    window.resetCookieConsent = function() {
        document.cookie = `${config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setTimeout(createPopup, 100);
    };

    // Add ripple effect styles
    const rippleStyles = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;

    // Inject ripple styles
    const rippleStyleSheet = document.createElement("style");
    rippleStyleSheet.textContent = rippleStyles;
    document.head.appendChild(rippleStyleSheet);

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();