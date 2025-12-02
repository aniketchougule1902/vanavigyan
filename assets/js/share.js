// Share Widget - Pure JavaScript Implementation
(function() {
    'use strict';

    // Configuration
    const config = {
        widgetId: 'shareWidgetContainer',
        shareButtons: [
            {
                platform: 'whatsapp',
                title: 'Share on WhatsApp',
                icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884',
                color: '#25D366',
                url: 'https://api.whatsapp.com/send?text='
            },
            {
                platform: 'telegram',
                title: 'Share on Telegram',
                icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.9 6.8-.06.67-.36.9-.9.9-.66 0-1.03-.45-1.6-.88-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-2.01 1.28-5.67 3.76-.53.35-1.01.52-1.54.52-.54 0-1.58-.3-2.36-.54-.94-.3-1.69-.46-1.63-.98.03-.27.4-.55 1.1-.85 4.46-1.98 7.45-3.29 8.95-3.93 2.16-.94 2.61-1.1 2.9-1.1.27 0 .7.14.7.67.0 .33-.08.75-.22 1.2z',
                color: '#0088CC',
                url: 'https://t.me/share/url?url='
            },
            {
                platform: 'facebook',
                title: 'Share on Facebook',
                icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z',
                color: '#1877F2',
                url: 'https://www.facebook.com/sharer/sharer.php?u='
            },
            {
                platform: 'x',
                title: 'Share on X',
                icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                color: '#000000',
                url: 'https://twitter.com/intent/tweet?url='
            },
            {
                platform: 'copy',
                title: 'Copy Link',
                icon: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
                color: '#6B7280',
                action: 'copy'
            }
        ]
    };

    // Create styles
    const styles = `
        #shareWidgetContainer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: calc(100% - 60px);
            z-index: 999;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(255, 255, 255, 0.85) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 -8px 32px 0 rgba(0, 0, 0, 0.1),
                0 4px 16px 0 rgba(255, 255, 255, 0.2) inset;
            padding: 12px 16px;
            border-radius: 20px 20px 0 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: translateY(100%);
        }

        #shareWidgetContainer.visible {
            transform: translateY(0);
        }

        #shareWidgetContainer.hidden {
            transform: translateY(100%);
            opacity: 0;
        }

        #shareWidget {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
        }

        .share-label {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-right: 8px;
            white-space: nowrap;
        }

        .share-button {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(255, 255, 255, 0.7) 100%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1.5px solid rgba(255, 255, 255, 0.4);
            box-shadow: 
                0 4px 12px 0 rgba(0, 0, 0, 0.08),
                0 2px 6px 0 rgba(255, 255, 255, 0.3) inset;
        }

        .share-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 11px;
            padding: 2px;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.2) 100%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
        }

        .share-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 
                0 8px 20px 0 rgba(0, 0, 0, 0.15),
                0 4px 10px 0 rgba(255, 255, 255, 0.4) inset;
        }

        .share-button:active {
            transform: translateY(0) scale(1);
        }

        .share-button.whatsapp:hover { background: linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(37, 211, 102, 0.05)); }
        .share-button.telegram:hover { background: linear-gradient(135deg, rgba(0, 136, 204, 0.15), rgba(0, 136, 204, 0.05)); }
        .share-button.facebook:hover { background: linear-gradient(135deg, rgba(24, 119, 242, 0.15), rgba(24, 119, 242, 0.05)); }
        .share-button.x:hover { background: linear-gradient(135deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05)); }
        .share-button.copy:hover { background: linear-gradient(135deg, rgba(107, 114, 128, 0.15), rgba(107, 114, 128, 0.05)); }

        .share-icon {
            width: 24px;
            height: 24px;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }

        .share-button:hover .share-icon {
            transform: scale(1.1);
        }

        .share-button.whatsapp .share-icon { fill: #25D366; }
        .share-button.telegram .share-icon { fill: #0088CC; }
        .share-button.facebook .share-icon { fill: #1877F2; }
        .share-button.x .share-icon { fill: #000000; }
        .share-button.copy .share-icon { fill: #6B7280; }

        .share-button:hover .share-icon {
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Tooltip */
        .share-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-8px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .share-button:hover .share-tooltip {
            opacity: 1;
            transform: translateX(-50%) translateY(-12px);
        }

        /* Copy feedback */
        .copy-feedback {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .copy-feedback.show {
            opacity: 1;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            #shareWidgetContainer {
                width: calc(100% - 40px);
                padding: 10px 12px;
                border-radius: 16px 16px 0 0;
            }

            #shareWidget {
                gap: 12px;
            }

            .share-button {
                width: 44px;
                height: 44px;
                border-radius: 10px;
            }

            .share-icon {
                width: 22px;
                height: 22px;
            }

            .share-label {
                font-size: 13px;
                margin-right: 6px;
            }
        }

        @media (max-width: 480px) {
            #shareWidgetContainer {
                width: calc(100% - 30px);
                padding: 8px 10px;
            }

            #shareWidget {
                gap: 10px;
            }

            .share-button {
                width: 40px;
                height: 40px;
                border-radius: 8px;
            }

            .share-icon {
                width: 20px;
                height: 20px;
            }

            .share-label {
                font-size: 12px;
                margin-right: 4px;
            }
        }
    `;

    // Create HTML structure
    const createWidgetHTML = () => {
        const shareButtonsHTML = config.shareButtons.map(button => `
            <div class="share-button ${button.platform}" title="${button.title}">
                <svg class="share-icon" viewBox="0 0 24 24">
                    <path d="${button.icon}"/>
                </svg>
                <div class="share-tooltip">${button.title}</div>
            </div>
        `).join('');

        return `
            <div id="${config.widgetId}">
                <div id="shareWidget">
                    <div class="share-label">Share on</div>
                    ${shareButtonsHTML}
                </div>
            </div>
            <div class="copy-feedback">Link copied to clipboard!</div>
        `;
    };

    // Share functionality
    const shareOnPlatform = (platform, url) => {
        const currentUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        const shareUrls = {
            whatsapp: `https://api.whatsapp.com/send?text=${title}%20${currentUrl}`,
            telegram: `https://t.me/share/url?url=${currentUrl}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
            x: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    // Copy link functionality
    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showCopyFeedback();
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyFeedback();
        });
    };

    const showCopyFeedback = () => {
        const feedback = document.querySelector('.copy-feedback');
        feedback.classList.add('show');
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    };

    // Check if footer is in viewport
    const isFooterInViewport = () => {
        const footer = document.querySelector('.footer');
        if (!footer) return false;

        const rect = footer.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    };

    // Toggle widget visibility based on scroll and footer position
    const toggleWidgetVisibility = () => {
        const widget = document.getElementById(config.widgetId);
        if (!widget) return;

        if (isFooterInViewport()) {
            widget.classList.remove('visible');
            widget.classList.add('hidden');
        } else {
            widget.classList.remove('hidden');
            widget.classList.add('visible');
        }
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

    // Initialize event listeners
    const initEventListeners = () => {
        // Share button clicks
        config.shareButtons.forEach(button => {
            const element = document.querySelector(`.share-button.${button.platform}`);
            if (element) {
                if (button.action === 'copy') {
                    element.addEventListener('click', copyToClipboard);
                } else {
                    element.addEventListener('click', () => shareOnPlatform(button.platform));
                }
            }
        });

        // Scroll listener with throttle
        const throttledScroll = throttle(toggleWidgetVisibility, 16);
        window.addEventListener('scroll', throttledScroll);

        // Initial visibility check
        toggleWidgetVisibility();
    };

    // Inject styles and HTML
    const injectElements = () => {
        // Remove existing widget if present
        const existingWidget = document.getElementById(config.widgetId);
        if (existingWidget) {
            existingWidget.remove();
        }

        // Add styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        // Add widget HTML
        document.body.insertAdjacentHTML('beforeend', createWidgetHTML());
    };

    // Initialize the widget
    const init = () => {
        injectElements();
        initEventListeners();

        // Show widget after a short delay
        setTimeout(() => {
            const widget = document.getElementById(config.widgetId);
            if (widget) {
                widget.classList.add('visible');
            }
        }, 500);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();