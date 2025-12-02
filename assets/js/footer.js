// footer.js - Simple footer loader
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-section">
                <h3>VanaVigyan Research</h3>
                <p>Advancing botanical science through rigorous research and analysis of medicinal plants and their chemical compounds.</p>
               
            </div>
            
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#">Plant Database</a></li>
                    <li><a href="#">Research Papers</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Categories</h4>
                <ul>
                    <li><a href="#">Medicinal Plants</a></li>
                    <li><a href="#">Aromatic Plants</a></li>
                    <li><a href="#">Culinary Herbs</a></li>
                    <li><a href="#">Chemical Analysis</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h4>Contact Info</h4>
                <p>📧 research@VanaVigyan.org</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>🏢 123 Research Park, Science City</p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 VanaVigyan Plant Research. All rights reserved.</p>
        </div><br><br><br>
    `;
    
    document.body.appendChild(footer);
});
