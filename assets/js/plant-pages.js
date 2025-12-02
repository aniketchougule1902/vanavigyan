// Plant Pages Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize plant page functionality
    initializePlantPage();
    
    // Handle related plant navigation
    initializeRelatedPlants();
    
    // Initialize research links
    initializeResearchLinks();
    
    // Add interactive elements
    initializeInteractiveElements();
});

// Initialize plant page
function initializePlantPage() {
    // Get plant data from URL parameters or data attributes
    const plantId = getPlantIdFromURL();
    
    if (plantId) {
        loadPlantData(plantId);
    } else {
        // If no specific plant ID, try to get from current page
        const currentPlant = getCurrentPlant();
        if (currentPlant) {
            updatePlantPage(currentPlant);
        }
    }
    
    // Initialize compound cards interaction
    initializeCompoundCards();
    
    // Initialize growing info tabs
    initializeGrowingInfo();
}

// Get plant ID from URL parameters
function getPlantIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('plantId');
}

// Get current plant data from page
function getCurrentPlant() {
    // This would typically fetch from an API or use embedded JSON
    // For now, we'll use the data from the plants.json file
    const plantTitle = document.querySelector('.plant-title-section h1')?.textContent;
    if (plantTitle) {
        // In a real implementation, you would match this with your plant data
        return {
            title: plantTitle,
            scientificName: document.querySelector('.plant-scientific-name')?.textContent,
            category: document.querySelector('.plant-category-badge')?.textContent
        };
    }
    return null;
}

// Load plant data (simulated - in real implementation, fetch from API)
async function loadPlantData(plantId) {
    try {
        // Simulate API call
        const response = await fetch('/plants.json');
        const data = await response.json();
        const plant = data.plants.find(p => p.id == plantId);
        
        if (plant) {
            updatePlantPage(plant);
        } else {
            console.error('Plant not found');
        }
    } catch (error) {
        console.error('Error loading plant data:', error);
    }
}

// Update plant page with data
function updatePlantPage(plant) {
    // Update page title
    document.title = `${plant.title} - VanaVigyan Research`;
    
    // Update meta description
    updateMetaDescription(plant.description);
    
    // Update plant image (in real implementation)
    updatePlantImage(plant.image, plant.title);
    
    // Update related plants
    updateRelatedPlants(plant.category, plant.id);
    
    // Update research links
    updateResearchLinks(plant.title);
}

// Update meta description
function updateMetaDescription(description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = description.substring(0, 160);
    } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description.substring(0, 160);
        document.head.appendChild(meta);
    }
}

// Update plant image
function updatePlantImage(imageUrl, plantName) {
    const plantImage = document.querySelector('.plant-image');
    if (plantImage && imageUrl) {
        // In real implementation, you would set the background image
        // plantImage.style.backgroundImage = `url(${imageUrl})`;
        plantImage.innerHTML = getPlantEmoji(plantName);
    }
}

// Get plant emoji (fallback)
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
    
    return '🌿'; // Default plant emoji
}

// Initialize compound cards interaction
function initializeCompoundCards() {
    const compoundCards = document.querySelectorAll('.compound-card');
    
    compoundCards.forEach(card => {
        card.addEventListener('click', function() {
            const compoundName = this.querySelector('h4').textContent;
            showCompoundInfo(compoundName);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Show compound information
function showCompoundInfo(compoundName) {
    // In a real implementation, this would show a modal or detailed view
    console.log(`Showing info for: ${compoundName}`);
    
    // For now, we'll just show a simple alert
    alert(`Compound: ${compoundName}\n\nMore detailed information about this compound would be shown here in a real implementation.`);
}

// Initialize growing info tabs
function initializeGrowingInfo() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle active state
            infoCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Show more detailed information
            const infoType = this.querySelector('h4').textContent.toLowerCase();
            showDetailedGrowingInfo(infoType);
        });
    });
}

// Show detailed growing information
function showDetailedGrowingInfo(infoType) {
    const detailedInfo = {
        'growing conditions': 'Optimal temperature: 15-25°C\nSoil pH: 6.0-7.0\nWater requirements: Moderate\nSunlight: Full sun to partial shade',
        'harvesting tips': 'Best time: Morning hours\nTools: Sharp, clean scissors\nFrequency: As needed\nStorage: Cool, dry place'
    };
    
    const info = detailedInfo[infoType];
    if (info) {
        // In real implementation, show in a modal or expand the card
        console.log(`Detailed ${infoType}:\n${info}`);
    }
}

// Initialize related plants
function initializeRelatedPlants() {
    const relatedPlants = document.querySelectorAll('.related-plant');
    
    relatedPlants.forEach(plant => {
        plant.addEventListener('click', function(e) {
            e.preventDefault();
            const plantName = this.querySelector('h4').textContent;
            navigateToPlant(plantName);
        });
    });
}

// Navigate to plant page
function navigateToPlant(plantName) {
    // Convert plant name to URL-friendly format
    const plantSlug = plantName.toLowerCase().replace(/\s+/g, '-');
    const plantUrl = `plants_data/${plantSlug}.html`;
    
    // Navigate to plant page
    window.location.href = plantUrl;
}

// Initialize research links
function initializeResearchLinks() {
    const researchLinks = document.querySelectorAll('.research-link');
    
    researchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const researchType = this.querySelector('.research-link-text').textContent;
            openResearch(researchType);
        });
    });
}

// Open research (simulated)
function openResearch(researchType) {
    const researchUrls = {
        'Clinical Studies': '#',
        'Chemical Analysis': '#',
        'Traditional Uses': '#',
        'Modern Applications': '#'
    };
    
    const url = researchUrls[researchType];
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        // Show message for demo
        alert(`This would open ${researchType} research page in a real implementation.`);
    }
}

// Update related plants
function updateRelatedPlants(category, currentPlantId) {
    // In real implementation, fetch related plants from API
    // For now, we'll simulate with static data
    const relatedPlantsContainer = document.querySelector('.related-plants-list');
    if (!relatedPlantsContainer) return;
    
    // Clear existing content
    relatedPlantsContainer.innerHTML = '';
    
    // Add related plants (simulated)
    const relatedPlants = getRelatedPlants(category, currentPlantId);
    
    relatedPlants.forEach(plant => {
        const plantElement = document.createElement('a');
        plantElement.className = 'related-plant';
        plantElement.href = plant.path;
        plantElement.innerHTML = `
            <div class="related-plant-image">${getPlantEmoji(plant.title)}</div>
            <div class="related-plant-info">
                <h4>${plant.title}</h4>
                <span>${plant.category}</span>
            </div>
        `;
        
        relatedPlantsContainer.appendChild(plantElement);
    });
}

// Get related plants (simulated)
function getRelatedPlants(category, currentPlantId) {
    // This would typically come from an API
    // For demo, we'll return some example plants
    return [
        {
            title: 'Lavender',
            category: 'Aromatic Plants',
            path: 'plants_data/lavender.html'
        },
        {
            title: 'Rosemary',
            category: 'Culinary Herbs',
            path: 'plants_data/rosemary.html'
        },
        {
            title: 'Chamomile',
            category: 'Medicinal Plants',
            path: 'plants_data/chamomile.html'
        }
    ].filter(plant => plant.category === category).slice(0, 3);
}

// Update research links
function updateResearchLinks(plantName) {
    const researchLinksContainer = document.querySelector('.research-links-list');
    if (!researchLinksContainer) return;
    
    // Clear existing content
    researchLinksContainer.innerHTML = '';
    
    const researchTypes = [
        { name: 'Clinical Studies', icon: '📊' },
        { name: 'Chemical Analysis', icon: '🧪' },
        { name: 'Traditional Uses', icon: '📜' },
        { name: 'Modern Applications', icon: '💡' }
    ];
    
    researchTypes.forEach(type => {
        const linkElement = document.createElement('a');
        linkElement.className = 'research-link';
        linkElement.href = '#';
        linkElement.innerHTML = `
            <div class="research-link-icon">${type.icon}</div>
            <span class="research-link-text">${type.name}</span>
        `;
        
        researchLinksContainer.appendChild(linkElement);
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add scroll animations
    initializeScrollAnimations();
    
    // Add copy to clipboard for scientific names
    initializeCopyToClipboard();
    
    // Add social sharing
    initializeSocialSharing();
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize copy to clipboard
function initializeCopyToClipboard() {
    const scientificName = document.querySelector('.plant-scientific-name');
    if (scientificName) {
        scientificName.style.cursor = 'pointer';
        scientificName.title = 'Click to copy scientific name';
        
        scientificName.addEventListener('click', function() {
            const textToCopy = this.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show copy confirmation
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = 'var(--secondary)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }
}

// Initialize social sharing
function initializeSocialSharing() {
    // This would be implemented with actual social sharing APIs
    console.log('Social sharing initialized');
}

// Export functions for use in other modules
window.PlantPages = {
    initializePlantPage,
    loadPlantData,
    showCompoundInfo,
    navigateToPlant
};