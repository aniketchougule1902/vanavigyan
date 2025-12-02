(function() {
    'use strict';

    // Create styles
    const styles = `
        .back-to-top-container {
            position: fixed;
            bottom: 8px;
            right: 8px;
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
        }

        .back-to-top-container.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
        }

        .back-to-top-button {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.25) 0%, 
                rgba(255, 255, 255, 0.1) 50%, 
                rgba(255, 255, 255, 0.05) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1.5px solid rgba(255, 255, 255, 0.3);
            box-shadow: 
                0 8px 32px 0 rgba(0, 0, 0, 0.2),
                0 4px 16px 0 rgba(255, 255, 255, 0.1) inset,
                0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
        }

        .back-to-top-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                #667eea 0%, 
                #764ba2 25%, 
                #f093fb 50%, 
                #f5576c 75%, 
                #4facfe 100%);
            opacity: 0.9;
            z-index: -1;
            transition: opacity 0.4s ease;
        }

        .back-to-top-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.4), 
                transparent);
            transition: left 0.6s ease;
        }

        .back-to-top-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 
                0 16px 40px 0 rgba(0, 0, 0, 0.3),
                0 8px 20px 0 rgba(255, 255, 255, 0.15) inset,
                0 0 0 1px rgba(255, 255, 255, 0.2) inset;
            border-color: rgba(255, 255, 255, 0.5);
        }

        .back-to-top-button:hover::before {
            opacity: 1;
        }

        .back-to-top-button:hover::after {
            left: 100%;
        }

        .back-to-top-button:active {
            transform: translateY(-1px) scale(1.02);
            transition: all 0.1s ease;
        }

        .progress-ring {
            position: absolute;
            top: -3px;
            left: -3px;
            width: 50px;
            height: 50px;
            transform: rotate(-90deg);
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
        }

        .progress-ring-circle {
            fill: none;
            stroke: url(#glassyGradient);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-dasharray: 141.4;
            stroke-dashoffset: 141.4;
            transition: stroke-dashoffset 0.3s ease;
        }

        .button-icon {
            width: 20px;
            height: 20px;
            fill: white;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            transition: all 0.4s ease;
            position: relative;
            z-index: 1;
        }

        .back-to-top-button:hover .button-icon {
            transform: translateY(-2px);
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
        }

        /* Pulse animation */
        @keyframes pulseGlow {
            0% {
                box-shadow: 
                    0 8px 32px 0 rgba(0, 0, 0, 0.2),
                    0 4px 16px 0 rgba(255, 255, 255, 0.1) inset,
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            }
            50% {
                box-shadow: 
                    0 8px 32px 0 rgba(102, 126, 234, 0.4),
                    0 4px 16px 0 rgba(255, 255, 255, 0.2) inset,
                    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
            }
            100% {
                box-shadow: 
                    0 8px 32px 0 rgba(0, 0, 0, 0.2),
                    0 4px 16px 0 rgba(255, 255, 255, 0.1) inset,
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            }
        }

        .back-to-top-container.visible .back-to-top-button {
            animation: pulseGlow 3s ease-in-out infinite;
        }

        .back-to-top-container.visible .back-to-top-button:hover {
            animation: none;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .back-to-top-container {
                bottom: 6px;
                right: 6px;
            }
            
            .back-to-top-button {
                width: 42px;
                height: 42px;
                border-radius: 10px;
            }
            
            .progress-ring {
                width: 48px;
                height: 48px;
                top: -3px;
                left: -3px;
            }
            
            .button-icon {
                width: 18px;
                height: 18px;
            }
        }

        @media (max-width: 480px) {
            .back-to-top-container {
                bottom: 5px;
                right: 5px;
            }
            
            .back-to-top-button {
                width: 40px;
                height: 40px;
                border-radius: 8px;
            }
            
            .progress-ring {
                width: 46px;
                height: 46px;
            }
        }
    `;

    // Create SVG gradient definition
    const svgGradient = `
        <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
            <defs>
                <linearGradient id="glassyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFD89B" />
                    <stop offset="25%" stop-color="#FF6B95" />
                    <stop offset="50%" stop-color="#A166AB" />
                    <stop offset="75%" stop-color="#5073B8" />
                    <stop offset="100%" stop-color="#1098AD" />
                </linearGradient>
            </defs>
        </svg>
    `;

    // Create HTML structure
    const createWidgetHTML = () => {
        return `
            <div class="back-to-top-container">
                <div class="back-to-top-button" role="button" aria-label="Back to top" title="Back to top">
                    <svg class="progress-ring">
                        <circle class="progress-ring-circle" cx="25" cy="25" r="22.5"></circle>
                    </svg>
                    <svg class="button-icon" viewBox="0 0 24 24">
                        <path d="M12 4l-8 8h6v8h4v-8h6z"/>
                    </svg>
                </div>
            </div>
        `;
    };

    // Inject styles and HTML
    const injectElements = () => {
        // Add styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        // Add SVG gradient definitions
        document.body.insertAdjacentHTML('beforeend', svgGradient);

        // Add widget HTML
        document.body.insertAdjacentHTML('beforeend', createWidgetHTML());
    };

    // Calculate scroll progress
    const getScrollProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
    };

    // Update progress ring
    const updateProgressRing = (progress) => {
        const circle = document.querySelector('.progress-ring-circle');
        if (circle) {
            const circumference = 141.4; // 2 * π * 22.5
            const offset = circumference - (progress * circumference);
            circle.style.strokeDashoffset = offset;
        }
    };

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Toggle widget visibility
    const toggleVisibility = () => {
        const container = document.querySelector('.back-to-top-container');
        const progress = getScrollProgress();
        
        if (progress > 0.1) { // Show after 10% scroll
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }
        
        updateProgressRing(progress);
    };

    // Throttle function for performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Initialize the widget
    const init = () => {
        injectElements();

        // Add event listeners
        const button = document.querySelector('.back-to-top-button');
        button.addEventListener('click', scrollToTop);

        const throttledScroll = throttle(toggleVisibility, 16); // ~60fps
        window.addEventListener('scroll', throttledScroll);

        // Initial check
        toggleVisibility();

        // Add keyboard support
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();