// footer.js - Simple footer loader
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    footer.innerHTML = ` <script src="/vanavigyan/assets/js/share.js"></script>
        <div class="footer-container">
            <div class="footer-section">
                <h3>VanaVigyan Research</h3>
                <p>Advancing botanical science through rigorous research and analysis of medicinal plants and their chemical compounds.</p>
               
            </div>
            
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/vanavigyan/index.html">Home</a></li>
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
                <p>📧 aniketvc.work@gmail.com</p>
                <p>📞 +91 9370936714</p>
                <p>🏢Pimpri Chinchwad College Of Engineering ,Nigdi ,Pune</p>
              <hr><div class="footer-bottom">
            <p>&copy; 2025 VanaVigyan Plant Research. All rights reserved.</p>
        </div><hr>
            </div>
        </div>
        
       
    `;
    
    document.body.appendChild(footer);
});
