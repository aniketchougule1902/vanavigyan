// Load Google Analytics gtag.js
(function() {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-JV2GY2JTVW";
  document.head.appendChild(gaScript);
})();

// Initialize dataLayer and gtag function
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Configure GA
gtag('js', new Date());
gtag('config', 'G-JV2GY2JTVW');





// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing VanaVigyan Plant Research...');
    initializeApp();
});

// Global variables
let plantsData = [];
let currentSearchQuery = '';

// Initialize the application
async function initializeApp() {
    try {
        await loadPlantData();
        initializeNavigation();
        initializeSearch();
        initializeNewsTicker();
        loadFeaturedPlants();
        loadResearchPapers();
        initializeCategoryFilters();
        
        console.log('VanaVigyan Plant Research initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Load plant data from JSON
async function loadPlantData() {
    try {
        const response = await fetch('plants.json');
        if (!response.ok) {
            throw new Error('Failed to load plant data');
        }
        const data = await response.json();
        plantsData = data.plants;
        console.log(`Loaded ${plantsData.length} plants`);
    } catch (error) {
        console.error('Error loading plant data:', error);
        plantsData = getSamplePlantData();
    }
}

// Sample plant data for testing (fallback)
function getSamplePlantData() {
    return [
        {
            id: 1,
            title: "Aloe Vera",
            scientificName: "Aloe barbadensis miller",
            description: "Aloe vera is a succulent plant species of the genus Aloe. It is widely distributed, and is considered an invasive species in many world regions.",
            category: "Medicinal Plants",
            uses: ["Skin care", "Digestive health", "Wound healing", "Anti-inflammatory"],
            chemicalCompounds: ["Aloin", "Emodin", "Acemannan", "Aloe-emodin", "Anthraquinones"],
            medicinalProperties: ["Anti-inflammatory", "Antimicrobial", "Moisturizing", "Wound healing"],
            image: "assets/images/plants/aloe-vera.jpg",
            thumbnail: "assets/images/plants/aloe-vera-thumb.jpg",
            path: "plants_data/aloe-vera.html",
            author: "Dr. Sarah Chen",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Lavender",
            scientificName: "Lavandula angustifolia",
            description: "Lavender is a flowering plant in the mint family, Lamiaceae. It is native to the Old World and is found from Cape Verde and the Canary Islands.",
            category: "Aromatic Plants",
            uses: ["Aromatherapy", "Relaxation", "Skin care", "Sleep aid"],
            chemicalCompounds: ["Linalool", "Linalyl acetate", "Camphor", "Terpinen-4-ol", "Lavandulyl acetate"],
            medicinalProperties: ["Calming", "Antiseptic", "Analgesic", "Anti-anxiety"],
            image: "assets/images/plants/lavender.jpg",
            thumbnail: "assets/images/plants/lavender-thumb.jpg",
            path: "plants_data/lavender.html",
            author: "Dr. Michael Rodriguez",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "Rosemary",
            scientificName: "Salvia rosmarinus",
            description: "Rosemary is a shrub with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region.",
            category: "Culinary Herbs",
            uses: ["Cooking", "Memory enhancement", "Hair care", "Antioxidant"],
            chemicalCompounds: ["Rosmarinic acid", "Carnosic acid", "Camphor", "Cineole", "Pinene"],
            medicinalProperties: ["Antioxidant", "Anti-inflammatory", "Cognitive enhancer", "Circulatory stimulant"],
            image: "assets/images/plants/rosemary.jpg",
            thumbnail: "assets/images/plants/rosemary-thumb.jpg",
            path: "plants_data/rosemary.html",
            author: "Dr. Emily Watson",
            readTime: "6 min read"
        }
    ];
}

// Initialize navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    const dropdowns = document.querySelectorAll('.dropdown');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            body.classList.toggle('mobile-menu-open');
            console.log('Mobile menu toggled');
        });
    }

    // Close mobile menu
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
            console.log('Mobile menu closed');
        });
    }

    // Mobile dropdown toggle
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown');
            const isActive = parent.classList.contains('active');

            // Close all other dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                if (dropdown !== parent) {
                    dropdown.classList.remove('active');
                }
            });

            // Toggle current dropdown
            if (!isActive) {
                parent.classList.add('active');
            } else {
                parent.classList.remove('active');
            }
        });
    });

    // Desktop dropdown behavior
    dropdowns.forEach(dropdown => {
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('dropdown-open');
            }
        });

        // Hide dropdown when mouse leaves
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('dropdown-open');
            }
        });

        // Touch device support
        dropdown.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('dropdown-open');
            }
        });
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !this.classList.contains('mobile-dropdown-toggle')) {
                body.classList.remove('mobile-menu-open');
                
                // Close all mobile dropdowns
                document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Close desktop dropdowns
        if (!event.target.closest('.dropdown') && window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-open');
            });
        }
        
        // Close mobile menu when clicking outside
        if (!event.target.closest('.navbar') && 
            !event.target.closest('.mobile-menu-overlay') &&
            body.classList.contains('mobile-menu-open')) {
            body.classList.remove('mobile-menu-open');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            body.classList.remove('mobile-menu-open');
            hideAllSearchSuggestions();
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-open');
            });
            
            // Close all mobile dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset mobile menu state on resize to desktop
        if (window.innerWidth > 768) {
            body.classList.remove('mobile-menu-open');
            
            // Reset mobile dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Reset desktop dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('dropdown-open');
            });
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchButtons = document.querySelectorAll('.search-button');
    const searchInputs = document.querySelectorAll('.search-input');

    // Search button click handler
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const searchWrapper = this.closest('.search-wrapper');
            const searchInput = searchWrapper.querySelector('.search-input');
            if (searchInput.value.trim()) {
                performSearch(searchInput.value);
            }
        });
    });

    // Search input handlers
    searchInputs.forEach(input => {
        // Real-time search suggestions
        input.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 1) {
                showSearchSuggestions(query, this.closest('.search-wrapper'));
            } else {
                hideSearchSuggestions(this.closest('.search-wrapper'));
            }
        });

        // Search on Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                performSearch(this.value);
            }
        });
    });

    // Close search suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-wrapper')) {
            hideAllSearchSuggestions();
        }
    });

    console.log('Search functionality initialized');
}

// Show search suggestions
function showSearchSuggestions(query, searchWrapper) {
    const results = searchPlants(query, 5);
    const resultsContainer = searchWrapper.querySelector('.search-results');
    
    if (results.length > 0 && resultsContainer) {
        resultsContainer.innerHTML = '';
        results.forEach(plant => {
            const resultItem = document.createElement('a');
            resultItem.className = 'search-result-item';
            resultItem.href = plant.path || '#';
            if (plant.path) {
                resultItem.target = '_blank';
            }
            resultItem.innerHTML = `
                <div class="search-result-title">${plant.title}</div>
                <div class="search-result-scientific">${plant.scientificName}</div>
                <div class="search-result-category">${plant.category}</div>
            `;
            
            resultItem.addEventListener('click', function(e) {
                if (!plant.path) {
                    e.preventDefault();
                    showPlantDetails(plant);
                }
            });
            
            resultsContainer.appendChild(resultItem);
        });
        resultsContainer.classList.add('active');
    } else {
        hideSearchSuggestions(searchWrapper);
    }
}

// Hide search suggestions
function hideSearchSuggestions(searchWrapper) {
    const resultsContainer = searchWrapper.querySelector('.search-results');
    if (resultsContainer) {
        resultsContainer.classList.remove('active');
    }
}

// Hide all search suggestions
function hideAllSearchSuggestions() {
    document.querySelectorAll('.search-results').forEach(container => {
        container.classList.remove('active');
    });
}

// Search plants function
function searchPlants(query, limit = null) {
    if (!query || !plantsData.length) return [];
    
    const lowercaseQuery = query.toLowerCase();
    const results = plantsData.filter(plant => {
        return (
            plant.title.toLowerCase().includes(lowercaseQuery) ||
            plant.scientificName.toLowerCase().includes(lowercaseQuery) ||
            plant.description.toLowerCase().includes(lowercaseQuery) ||
            plant.category.toLowerCase().includes(lowercaseQuery) ||
            (plant.chemicalCompounds && plant.chemicalCompounds.some(compound => 
                compound.toLowerCase().includes(lowercaseQuery))) ||
            (plant.medicinalProperties && plant.medicinalProperties.some(property => 
                property.toLowerCase().includes(lowercaseQuery))) ||
            (plant.uses && plant.uses.some(use => use.toLowerCase().includes(lowercaseQuery)))
        );
    });
    
    return limit ? results.slice(0, limit) : results;
}

// Perform search and display results
function performSearch(query) {
    if (!query.trim()) return;
    
    currentSearchQuery = query;
    const results = searchPlants(query);
    displaySearchResults(results, query);
    hideAllSearchSuggestions();
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        document.body.classList.remove('mobile-menu-open');
    }
    
    // Clear search inputs
    document.querySelectorAll('.search-input').forEach(input => {
        input.value = '';
    });
}

// Display search results on the page
function displaySearchResults(results, query) {
    const searchResultsPage = document.getElementById('searchResultsPage');
    const defaultContent = document.getElementById('defaultContent');
    const plantsGrid = document.getElementById('plantsGrid');
    const searchQueryDisplay = document.getElementById('searchQueryDisplay');
    const resultsCount = document.getElementById('resultsCount');

    // Update search query display
    if (searchQueryDisplay) {
        searchQueryDisplay.textContent = `"${query}"`;
    }
    if (resultsCount) {
        resultsCount.textContent = results.length;
    }
    
    // Clear previous results and show loading state
    if (plantsGrid) {
        plantsGrid.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Searching plants...</p>
            </div>
        `;
    }
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        if (plantsGrid) {
            plantsGrid.innerHTML = '';
            
            if (results.length > 0) {
                // Display results
                results.forEach(plant => {
                    const plantCard = createPlantCard(plant);
                    plantsGrid.appendChild(plantCard);
                });
            } else {
                // No results found
                plantsGrid.innerHTML = `
                    <div class="no-results">
                        <h3>No plants found</h3>
                        <p>Try searching with different keywords or browse our plant categories.</p>
                        <button class="btn btn-primary" onclick="hideSearchResults()">
                            Browse All Plants
                        </button>
                    </div>
                `;
            }
        }
        
        // Show search results page and hide default content
        if (searchResultsPage && defaultContent) {
            searchResultsPage.classList.add('active');
            defaultContent.classList.add('hidden');
        }
        
        // Scroll to top of results
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 500);
}

// Hide search results and show main content
function hideSearchResults() {
    const searchResultsPage = document.getElementById('searchResultsPage');
    const defaultContent = document.getElementById('defaultContent');
    
    if (searchResultsPage && defaultContent) {
        searchResultsPage.classList.remove('active');
        defaultContent.classList.remove('hidden');
    }
    
    // Clear search inputs
    document.querySelectorAll('.search-input').forEach(input => {
        input.value = '';
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Create plant card element with images
function createPlantCard(plant) {
    const plantCard = document.createElement('div');
    plantCard.className = 'plant-card';
    
    // If plant has a path, make the entire card clickable
    if (plant.path) {
        plantCard.style.cursor = 'pointer';
        plantCard.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey || e.button === 1) return;
            e.preventDefault();
            navigateToPlantPage(plant);
        });
        
        plantCard.addEventListener('auxclick', function(e) {
            if (e.button === 1) {
                navigateToPlantPage(plant);
            }
        });
    }
    
    // Use thumbnail if available, otherwise use main image
    const imageSrc = plant.thumbnail || plant.image;
    
    plantCard.innerHTML = `
        <div class="plant-image">
            ${createPlantImageElement(imageSrc, plant.title, '120px')}
        </div>
        <h3>${plant.title}</h3>
        <div class="plant-scientific">${plant.scientificName}</div>
        <div class="plant-category">${plant.category}</div>
        <p class="plant-description">${plant.description.substring(0, 150)}...</p>
        <div class="plant-uses">
            <h4>Primary Uses:</h4>
            <ul class="uses-list">
                ${plant.uses.slice(0, 3).map(use => `<li class="use-tag">${use}</li>`).join('')}
            </ul>
        </div>
        ${plant.path ? '<div class="view-details-link">View Details ↗</div>' : ''}
    `;
    
    return plantCard;
}

// Create plant image element with error handling
function createPlantImageElement(src, alt, height = '100%') {
    const fallbackEmoji = getPlantEmoji(alt);
    
    return `
        <img 
            src="${src}" 
            alt="${alt}"
            loading="lazy"
            onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUEyQTZDIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+${fallbackEmoji}</dGV4dD4KPC9zdmc+'; this.alt='${alt} - Image not available'"
            style="width: 100%; height: ${height}; object-fit: cover;"
        >
    `;
}

// Navigate to plant page
function navigateToPlantPage(plant) {
    if (plant.path) {
        console.log(`Opening in new tab: ${plant.path}`);
        window.open(plant.path, '_blank', 'noopener,noreferrer');
    } else {
        console.warn('No path found for plant:', plant.title);
        showPlantDetails(plant);
    }
}

// Show plant details (fallback when pages don't exist)
function showPlantDetails(plant) {
    const details = `
        ${plant.title} (${plant.scientificName})
        
        Category: ${plant.category}
        
        ${plant.description}
        
        Medicinal Properties: ${plant.medicinalProperties.join(', ')}
        
        Common Uses: ${plant.uses.join(', ')}
        
        Chemical Compounds: ${plant.chemicalCompounds.join(', ')}
    `;
    
    alert(details);
}

// Initialize news ticker
function initializeNewsTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;

    const spans = tickerContent.querySelectorAll('span');
    let delay = 0;
    
    spans.forEach((span, index) => {
        span.style.animationDelay = `${delay}s`;
        delay += 6.66;
    });
    
    console.log('News ticker initialized with', spans.length, 'items');
}

// Load featured plants with images
function loadFeaturedPlants() {
    const featuredPlantsGrid = document.getElementById('featuredPlantsGrid');
    if (!featuredPlantsGrid) return;

    if (plantsData.length === 0) {
        featuredPlantsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: var(--text-light);">Loading featured plants...</p>
            </div>
        `;
        return;
    }

    // Use first 3 plants as featured
    const featuredPlants = plantsData.slice(0, 3);
    
    featuredPlantsGrid.innerHTML = '';
    featuredPlants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'featured-plant-card';
        
        // Make card clickable if path exists
        if (plant.path) {
            plantCard.style.cursor = 'pointer';
            plantCard.addEventListener('click', function(e) {
                if (e.ctrlKey || e.metaKey || e.button === 1) return;
                e.preventDefault();
                navigateToPlantPage(plant);
            });
            
            plantCard.addEventListener('auxclick', function(e) {
                if (e.button === 1) {
                    navigateToPlantPage(plant);
                }
            });
        }
        
        // Use thumbnail if available, otherwise use main image
        const imageSrc = plant.thumbnail || plant.image;
        
        plantCard.innerHTML = `
            <div class="plant-card-image">
                ${createPlantImageElement(imageSrc, plant.title, '200px')}
            </div>
            <div class="plant-card-content">
                <div class="plant-card-header">
                    <div>
                        <h3 class="plant-card-title">${plant.title}</h3>
                        <div class="plant-card-scientific">${plant.scientificName}</div>
                    </div>
                    <div class="plant-card-category">${plant.category}</div>
                </div>
                <p class="plant-card-description">${plant.description}</p>
                <div class="plant-card-meta">
                    <span>${plant.readTime}</span>
                    <span>By ${plant.author}</span>
                </div>
                ${plant.path ? '<div class="view-more-link">Click to view details ↗</div>' : ''}
            </div>
        `;
        
        featuredPlantsGrid.appendChild(plantCard);
    });
}

// Load research papers
function loadResearchPapers() {
    const researchGrid = document.getElementById('researchGrid');
    if (!researchGrid) return;

    // Sample research data
    const researchPapers = [
        {
            title: "Anti-inflammatory Effects of Rosemary Compounds",
            description: "Comprehensive analysis of rosmarinic acid and its therapeutic potential in inflammatory conditions.",
            author: "Dr. Emily Watson",
            date: "2024-01-10"
        },
        {
            title: "Lavender Essential Oil in Anxiety Management",
            description: "Clinical study demonstrating the efficacy of lavender oil in reducing anxiety symptoms.",
            author: "Dr. Michael Rodriguez",
            date: "2024-01-08"
        },
        {
            title: "Aloe Vera Wound Healing Mechanisms",
            description: "Molecular analysis of acemannan and its role in tissue regeneration and wound repair.",
            author: "Dr. Sarah Chen",
            date: "2024-01-05"
        }
    ];

    researchGrid.innerHTML = '';
    researchPapers.forEach(paper => {
        const researchCard = document.createElement('div');
        researchCard.className = 'research-card';
        researchCard.innerHTML = `
            <h3>${paper.title}</h3>
            <p>${paper.description}</p>
            <div class="research-meta">
                <span>${paper.author}</span>
                <span>${formatDate(paper.date)}</span>
            </div>
        `;
        
        researchGrid.appendChild(researchCard);
    });
}

// Initialize category filters
function initializeCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
}

// Filter plants by category
function filterByCategory(category) {
    const filteredPlants = plantsData.filter(plant => 
        plant.category.toLowerCase().includes(category.toLowerCase())
    );
    
    if (filteredPlants.length > 0) {
        displaySearchResults(filteredPlants, category);
    } else {
        displaySearchResults([], category);
    }
}

// Utility functions
function getPlantEmoji(plantName) {
    const emojiMap = {
        'aloe': '🌵',
        'lavender': '🌸',
        'rosemary': '🌿',
        'peppermint': '🌱',
        'basil': '🍃',
        'chamomile': '🌼',
        'thyme': '🧄',
        'sage': '🌾'
    };
    
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (plantName.toLowerCase().includes(key)) {
            return emoji;
        }
    }
    
    return '🌿';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Global functions for HTML onclick attributes
window.performSearch = performSearch;
window.hideSearchResults = hideSearchResults;

window.scrollToFeatured = function() {
    const featuredSection = document.getElementById('featuredPlants');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
};
