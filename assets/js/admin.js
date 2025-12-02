class PlantAdmin {
    constructor() {
        this.articles = JSON.parse(localStorage.getItem('plantArticles')) || [];
        this.currentArticle = null;
        this.uploadedImages = [];
        this.descriptionEditor = null;
        this.articleEditor = null;
        
        this.initializeEventListeners();
        this.initializeEditors();
        this.loadArticles();
    }

    initializeEditors() {
        // Initialize Quill editor for description
        this.descriptionEditor = new Quill('#descriptionEditor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'header': [1, 2, 3, false] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'blockquote'],
                    [{ 'align': [] }],
                    ['clean']
                ]
            },
            placeholder: 'Write a detailed description of the plant...'
        });

        // Initialize Quill editor for full article content
        this.articleEditor = new Quill('#articleContentEditor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video', 'blockquote', 'code-block'],
                    ['clean']
                ]
            },
            placeholder: 'Write your complete article content here...'
        });
    }

    initializeEventListeners() {
        // Modal controls
        document.getElementById('addArticleBtn').addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        
        // Form submission
        document.getElementById('articleForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Image upload
        document.getElementById('imageUpload').addEventListener('change', (e) => this.handleImageUpload(e));
        
        // Slug generation
        document.getElementById('plantName').addEventListener('blur', () => this.generateSlug());
        
        // Save draft
        document.getElementById('saveDraftBtn').addEventListener('click', () => this.saveDraft());
        
        // Generate JSON only
        document.getElementById('generateJSONBtn').addEventListener('click', () => this.generateJSONOnly());
        
        // Publish article
        document.getElementById('publishBtn').addEventListener('click', () => this.publishArticle());
        
        // Editor toggle
        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleEditor(e.target));
        });
        
        // Dynamic form elements
        document.getElementById('addPreparationMethod').addEventListener('click', () => this.addPreparationMethod());
        document.getElementById('addRelatedResearch').addEventListener('click', () => this.addRelatedResearch());
        document.getElementById('addLocalName').addEventListener('click', () => this.addLocalName());
        
        // Add event delegation for remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove')) {
                e.target.closest('.dynamic-item').remove();
            }
        });
    }

    toggleEditor(button) {
        const target = button.getAttribute('data-target');
        
        // Update button states
        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show/hide content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(target).classList.add('active');
    }

    addPreparationMethod() {
        const container = document.getElementById('preparationMethodsContainer');
        const count = container.children.length + 1;
        
        const methodHtml = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Method #${count}</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="prep-method-title" placeholder="Method Title (e.g., Topical Gel)" value="">
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="prep-method-description" placeholder="Method description..."></textarea>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', methodHtml);
    }

    addRelatedResearch() {
        const container = document.getElementById('relatedResearchContainer');
        const count = container.children.length + 1;
        
        const researchHtml = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Research #${count}</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-group">
                    <input type="text" class="research-title" placeholder="Research Title" value="">
                </div>
                <div class="form-group">
                    <textarea class="research-description" placeholder="Research description..."></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="research-author" placeholder="Author Name" value="">
                    </div>
                    <div class="form-group">
                        <input type="text" class="research-year" placeholder="Year" value="">
                    </div>
                </div>
                <!-- NEW: Research Paper Link Field -->
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="research-link" placeholder="Research Paper Link (URL)" value="">
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', researchHtml);
    }

    addLocalName() {
        const container = document.getElementById('localNamesContainer');
        const count = container.children.length + 1;
        
        const localNameHtml = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Local Name #${count}</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="local-name-locality" placeholder="Locality (e.g., India, Tamil Nadu)" value="">
                    </div>
                    <div class="form-group">
                        <input type="text" class="local-name-name" placeholder="Local Name (e.g., Aloe Vera)" value="">
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', localNameHtml);
    }

    openModal(article = null) {
        this.currentArticle = article;
        const modal = document.getElementById('articleModal');
        const title = document.getElementById('modalTitle');
        
        if (article) {
            title.textContent = 'Edit Plant Article';
            this.populateForm(article);
        } else {
            title.textContent = 'Add New Plant Article';
            this.resetForm();
        }
        
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('articleModal').style.display = 'none';
        this.currentArticle = null;
        this.uploadedImages = [];
        this.resetForm();
    }

    resetForm() {
        document.getElementById('articleForm').reset();
        this.descriptionEditor.root.innerHTML = '';
        this.articleEditor.root.innerHTML = '';
        
        // Reset dynamic forms
        document.getElementById('preparationMethodsContainer').innerHTML = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Method #1</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="prep-method-title" placeholder="Method Title (e.g., Topical Gel)">
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="prep-method-description" placeholder="Method description..."></textarea>
                </div>
            </div>
        `;
        
        document.getElementById('relatedResearchContainer').innerHTML = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Research #1</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-group">
                    <input type="text" class="research-title" placeholder="Research Title">
                </div>
                <div class="form-group">
                    <textarea class="research-description" placeholder="Research description..."></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="research-author" placeholder="Author Name">
                    </div>
                    <div class="form-group">
                        <input type="text" class="research-year" placeholder="Year">
                    </div>
                </div>
                <!-- NEW: Research Paper Link Field -->
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="research-link" placeholder="Research Paper Link (URL)">
                    </div>
                </div>
            </div>
        `;
        
        // Reset local names
        document.getElementById('localNamesContainer').innerHTML = `
            <div class="dynamic-item">
                <div class="dynamic-item-header">
                    <span>Local Name #1</span>
                    <button type="button" class="btn-remove">Remove</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="local-name-locality" placeholder="Locality (e.g., India, Tamil Nadu)">
                    </div>
                    <div class="form-group">
                        <input type="text" class="local-name-name" placeholder="Local Name (e.g., Aloe Vera)">
                    </div>
                </div>
            </div>
        `;
        
        // Reset image preview
        this.uploadedImages = [];
        this.updateImagePreview();
        
        // Reset editor toggle
        document.querySelectorAll('.btn-toggle').forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
        });
        document.querySelectorAll('.content-section').forEach((section, index) => {
            section.classList.toggle('active', index === 0);
        });
    }

    populateForm(article) {
        // Basic information
        document.getElementById('plantName').value = article.plantName || '';
        document.getElementById('scientificName').value = article.scientificName || '';
        document.getElementById('category').value = article.category || '';
        document.getElementById('slug').value = article.slug || '';
        document.getElementById('authorName').value = article.authorName || '';
        document.getElementById('publishDate').value = article.publishDate || '';
        document.getElementById('readTime').value = article.readTime || '';
        document.getElementById('location').value = article.location || '';
        document.getElementById('metaDescription').value = article.metaDescription || '';
        
        // Editor content
        this.descriptionEditor.root.innerHTML = article.description || '';
        this.articleEditor.root.innerHTML = article.articleContent || '';
        
        // Basic form fields
        document.getElementById('medicinalProperties').value = article.medicinalProperties?.join(', ') || '';
        document.getElementById('commonUses').value = article.commonUses?.join('\n') || '';
        document.getElementById('growingConditions').value = article.growingConditions || '';
        document.getElementById('waterRequirements').value = article.waterRequirements || '';
        document.getElementById('temperatureRange').value = article.temperatureRange || '';
        document.getElementById('harvestingTips').value = article.harvestingTips || '';
        document.getElementById('chemicalCompounds').value = article.chemicalCompounds?.join(', ') || '';
        
        // Dynamic forms
        this.populateDynamicForms(article);
        
        // Images
        this.uploadedImages = article.images || [];
        this.updateImagePreview();
        
        // Set editor mode
        if (article.articleContent) {
            document.querySelector('[data-target="richTextContent"]').click();
        }
    }

    populateDynamicForms(article) {
        // Preparation Methods
        const prepContainer = document.getElementById('preparationMethodsContainer');
        prepContainer.innerHTML = '';
        
        if (article.preparationMethods && article.preparationMethods.length > 0) {
            article.preparationMethods.forEach((method, index) => {
                const methodHtml = `
                    <div class="dynamic-item">
                        <div class="dynamic-item-header">
                            <span>Method #${index + 1}</span>
                            <button type="button" class="btn-remove">Remove</button>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" class="prep-method-title" placeholder="Method Title" value="${method.title || ''}">
                            </div>
                        </div>
                        <div class="form-group">
                            <textarea class="prep-method-description" placeholder="Method description...">${method.description || ''}</textarea>
                        </div>
                    </div>
                `;
                prepContainer.insertAdjacentHTML('beforeend', methodHtml);
            });
        } else {
            this.addPreparationMethod();
        }
        
        // Related Research
        const researchContainer = document.getElementById('relatedResearchContainer');
        researchContainer.innerHTML = '';
        
        if (article.relatedResearch && article.relatedResearch.length > 0) {
            article.relatedResearch.forEach((research, index) => {
                const researchHtml = `
                    <div class="dynamic-item">
                        <div class="dynamic-item-header">
                            <span>Research #${index + 1}</span>
                            <button type="button" class="btn-remove">Remove</button>
                        </div>
                        <div class="form-group">
                            <input type="text" class="research-title" placeholder="Research Title" value="${research.title || ''}">
                        </div>
                        <div class="form-group">
                            <textarea class="research-description" placeholder="Research description...">${research.description || ''}</textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" class="research-author" placeholder="Author Name" value="${research.author || ''}">
                            </div>
                            <div class="form-group">
                                <input type="text" class="research-year" placeholder="Year" value="${research.year || ''}">
                            </div>
                        </div>
                        <!-- NEW: Research Paper Link Field -->
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" class="research-link" placeholder="Research Paper Link (URL)" value="${research.link || ''}">
                            </div>
                        </div>
                    </div>
                `;
                researchContainer.insertAdjacentHTML('beforeend', researchHtml);
            });
        } else {
            this.addRelatedResearch();
        }
        
        // Local Names
        const localNamesContainer = document.getElementById('localNamesContainer');
        localNamesContainer.innerHTML = '';
        
        if (article.localNames && article.localNames.length > 0) {
            article.localNames.forEach((localName, index) => {
                const localNameHtml = `
                    <div class="dynamic-item">
                        <div class="dynamic-item-header">
                            <span>Local Name #${index + 1}</span>
                            <button type="button" class="btn-remove">Remove</button>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" class="local-name-locality" placeholder="Locality (e.g., India, Tamil Nadu)" value="${localName.locality || ''}">
                            </div>
                            <div class="form-group">
                                <input type="text" class="local-name-name" placeholder="Local Name (e.g., Aloe Vera)" value="${localName.name || ''}">
                            </div>
                        </div>
                    </div>
                `;
                localNamesContainer.insertAdjacentHTML('beforeend', localNameHtml);
            });
        } else {
            this.addLocalName();
        }
    }

    async handleImageUpload(event) {
        const files = event.target.files;
        const remainingSlots = 4 - this.uploadedImages.length;
        
        if (files.length > remainingSlots) {
            this.showNotification(`You can only upload ${remainingSlots} more images`, 'error');
            return;
        }
        
        // Show loading indicator
        this.showNotification('Compressing images...', 'info');
        
        for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                try {
                    const compressedImage = await this.compressImage(file);
                    this.uploadedImages.push({
                        url: compressedImage.dataUrl,
                        name: file.name,
                        file: compressedImage.file,
                        originalSize: this.formatFileSize(file.size),
                        compressedSize: this.formatFileSize(compressedImage.file.size)
                    });
                    this.updateImagePreview();
                } catch (error) {
                    console.error('Error compressing image:', error);
                    // Fallback to original file if compression fails
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.uploadedImages.push({
                            url: e.target.result,
                            name: file.name,
                            file: file
                        });
                        this.updateImagePreview();
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
        
        // Reset file input
        event.target.value = '';
        
        // Show compression results
        if (files.length > 0) {
            this.showNotification('Images compressed successfully!', 'success');
        }
    }

    compressImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            img.onload = () => {
                // Calculate new dimensions while maintaining aspect ratio
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;
                let { width, height } = img;
                
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw image with high quality settings
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress with progressive quality reduction
                this.compressWithQuality(canvas, file.type, 0.8, 100 * 1024) // Start with 80% quality, target 100KB
                    .then(compressedFile => {
                        const dataUrl = canvas.toDataURL(file.type, 0.8);
                        resolve({
                            dataUrl: dataUrl,
                            file: compressedFile
                        });
                    })
                    .catch(reject);
            };
            
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    compressWithQuality(canvas, mimeType, initialQuality, targetSize) {
        return new Promise((resolve, reject) => {
            let quality = initialQuality;
            let attempts = 0;
            const maxAttempts = 6; // Prevent infinite loops
            
            const attemptCompression = () => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Failed to create blob'));
                            return;
                        }
                        
                        attempts++;
                        
                        // If blob is within target size or we've tried enough times, resolve
                        if (blob.size <= targetSize || attempts >= maxAttempts || quality <= 0.3) {
                            resolve(blob);
                        } else {
                            // Reduce quality and try again
                            quality -= 0.1;
                            attemptCompression();
                        }
                    },
                    mimeType,
                    quality
                );
            };
            
            attemptCompression();
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateImagePreview() {
        const container = document.getElementById('imagePreviewGrid');
        container.innerHTML = '';
        
        // Add uploaded images
        this.uploadedImages.forEach((image, index) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            
            let sizeInfo = '';
            if (image.originalSize && image.compressedSize) {
                sizeInfo = `<div class="image-size-info">${image.compressedSize} (from ${image.originalSize})</div>`;
            }
            
            preview.innerHTML = `
                <img src="${image.url}" alt="Preview ${index + 1}">
                <button type="button" class="remove-image" data-index="${index}">&times;</button>
                ${sizeInfo}
            `;
            container.appendChild(preview);
        });
        
        // Add upload box if there's space
        if (this.uploadedImages.length < 4) {
            const uploadBox = document.createElement('div');
            uploadBox.className = 'image-upload-box';
            uploadBox.id = 'imageUploadBox';
            uploadBox.innerHTML = `
                <input type="file" id="imageUpload" accept="image/*" multiple style="display: none;">
                <label for="imageUpload" class="upload-label">
                    <span class="upload-icon">+</span>
                    <span>Add Images</span>
                </label>
            `;
            container.appendChild(uploadBox);
            
            // Re-attach event listener
            document.getElementById('imageUpload').addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-image').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                this.removeImage(index);
            });
        });
    }

    removeImage(index) {
        this.uploadedImages.splice(index, 1);
        this.updateImagePreview();
    }

    collectFormData() {
        const isRichTextMode = document.getElementById('richTextContent').classList.contains('active');
        
        const data = {
            id: this.currentArticle?.id || Date.now().toString(),
            plantName: document.getElementById('plantName').value,
            scientificName: document.getElementById('scientificName').value,
            category: document.getElementById('category').value,
            slug: document.getElementById('slug').value,
            authorName: document.getElementById('authorName').value,
            publishDate: document.getElementById('publishDate').value,
            readTime: document.getElementById('readTime').value,
            location: document.getElementById('location').value,
            metaDescription: document.getElementById('metaDescription').value,
            description: this.descriptionEditor.root.innerHTML,
            medicinalProperties: document.getElementById('medicinalProperties').value.split(',').map(s => s.trim()).filter(s => s),
            commonUses: document.getElementById('commonUses').value.split('\n').filter(s => s.trim()),
            growingConditions: document.getElementById('growingConditions').value,
            waterRequirements: document.getElementById('waterRequirements').value,
            temperatureRange: document.getElementById('temperatureRange').value,
            harvestingTips: document.getElementById('harvestingTips').value,
            preparationMethods: this.collectPreparationMethods(),
            chemicalCompounds: document.getElementById('chemicalCompounds').value.split(',').map(s => s.trim()).filter(s => s),
            relatedResearch: this.collectRelatedResearch(),
            localNames: this.collectLocalNames(),
            images: this.uploadedImages,
            createdAt: this.currentArticle?.createdAt || new Date().toISOString(),
            // Rich text content
            articleContent: isRichTextMode ? this.articleEditor.root.innerHTML : '',
            usesRichText: isRichTextMode
        };
        
        return data;
    }

    collectPreparationMethods() {
        const methods = [];
        const containers = document.querySelectorAll('#preparationMethodsContainer .dynamic-item');
        
        containers.forEach(container => {
            const title = container.querySelector('.prep-method-title').value;
            const description = container.querySelector('.prep-method-description').value;
            
            if (title || description) {
                methods.push({
                    title: title,
                    description: description
                });
            }
        });
        
        return methods;
    }

    collectRelatedResearch() {
        const research = [];
        const containers = document.querySelectorAll('#relatedResearchContainer .dynamic-item');
        
        containers.forEach(container => {
            const title = container.querySelector('.research-title').value;
            const description = container.querySelector('.research-description').value;
            const author = container.querySelector('.research-author').value;
            const year = container.querySelector('.research-year').value;
            const link = container.querySelector('.research-link').value; // NEW: Get link value
            
            if (title || description) {
                research.push({
                    title: title,
                    description: description,
                    author: author,
                    year: year,
                    link: link // NEW: Include link in research data
                });
            }
        });
        
        return research;
    }

    collectLocalNames() {
        const localNames = [];
        const containers = document.querySelectorAll('#localNamesContainer .dynamic-item');
        
        containers.forEach(container => {
            const locality = container.querySelector('.local-name-locality').value;
            const name = container.querySelector('.local-name-name').value;
            
            if (locality || name) {
                localNames.push({
                    locality: locality,
                    name: name
                });
            }
        });
        
        return localNames;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.publishArticle();
    }

    saveDraft() {
        const articleData = this.collectFormData();
        articleData.status = 'draft';
        this.saveArticle(articleData);
        this.showNotification('Article saved as draft', 'success');
    }

    publishArticle() {
        const articleData = this.collectFormData();
        articleData.status = 'published';
        articleData.lastUpdated = new Date().toISOString().split('T')[0];
        
        this.saveArticle(articleData);
        this.generateHTMLFile(articleData);
        this.generateIndividualJSON(articleData);
        this.updatePlantsJSON(articleData);
        this.showNotification('Article published successfully! HTML and JSON files downloaded.', 'success');
        this.closeModal();
    }

    saveArticle(articleData) {
        if (this.currentArticle) {
            const index = this.articles.findIndex(a => a.id === this.currentArticle.id);
            if (index !== -1) {
                this.articles[index] = { ...this.articles[index], ...articleData };
            }
        } else {
            this.articles.unshift(articleData);
        }
        
        localStorage.setItem('plantArticles', JSON.stringify(this.articles));
        this.loadArticles();
    }

    loadArticles() {
        const container = document.getElementById('articlesList');
        
        if (this.articles.length === 0) {
            container.innerHTML = `
                <div class="no-articles">
                    <p>No articles yet. Click "Add New Plant Article" to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.articles.map(article => `
            <div class="article-card">
                <div class="article-card-header">
                    <div>
                        <h3 class="article-title">${article.plantName}</h3>
                        <div class="article-meta">
                            <span>${article.scientificName}</span>
                            <span>•</span>
                            <span>${article.category}</span>
                            <span>•</span>
                            <span>${article.publishDate}</span>
                        </div>
                    </div>
                    <div class="article-actions">
                        <span class="status-badge ${article.status === 'published' ? 'status-published' : 'status-draft'}">
                            ${article.status}
                        </span>
                        <button class="btn-edit" onclick="admin.editArticle('${article.id}')">Edit</button>
                        <button class="btn-preview" onclick="admin.previewArticle('${article.id}')">Preview</button>
                        <button class="btn-delete" onclick="admin.deleteArticle('${article.id}')">Delete</button>
                    </div>
                </div>
                <p>${article.metaDescription}</p>
            </div>
        `).join('');
    }

    editArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (article) {
            this.openModal(article);
        }
    }

    deleteArticle(id) {
        if (confirm('Are you sure you want to delete this article?')) {
            this.articles = this.articles.filter(a => a.id !== id);
            localStorage.setItem('plantArticles', JSON.stringify(this.articles));
            this.loadArticles();
            this.showNotification('Article deleted successfully', 'success');
        }
    }

    previewArticle(id) {
        const article = this.articles.find(a => a.id === id);
        if (article) {
            // Open article in new tab for preview
            const htmlContent = this.generateHTMLContent(article);
            const previewWindow = window.open();
            previewWindow.document.write(htmlContent);
            previewWindow.document.close();
        }
    }

    generateSlug() {
        const plantName = document.getElementById('plantName').value;
        if (plantName && !document.getElementById('slug').value) {
            const slug = plantName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            document.getElementById('slug').value = slug;
        }
    }

    generateJSONOnly() {
        const articleData = this.collectFormData();
        this.generateIndividualJSON(articleData);
    }

    generateHTMLFile(articleData) {
        const htmlContent = this.generateHTMLContent(articleData);
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${articleData.slug}.html`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    generateIndividualJSON(articleData) {
        // Create clean article data without file objects
        const articleJSON = {
            ...articleData,
            images: articleData.images.map(img => ({
                url: img.url,
                name: img.name,
                originalSize: img.originalSize,
                compressedSize: img.compressedSize
            }))
        };
        
        const jsonBlob = new Blob([JSON.stringify(articleJSON, null, 2)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        
        const a = document.createElement('a');
        a.href = jsonUrl;
        a.download = `${articleData.slug}.json`;
        a.click();
        
        URL.revokeObjectURL(jsonUrl);
        
        this.showNotification(`${articleData.slug}.json generated and downloaded!`, 'success');
    }

    generateHTMLContent(article) {
        const usesRichText = article.usesRichText && article.articleContent;
        
        if (usesRichText) {
            return this.generateRichTextHTML(article);
        } else {
            return this.generateBasicHTML(article);
        }
    }

    generateBasicHTML(article) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.plantName} - VanaVigyan Plant Research</title>
    <meta name="description" content="${article.metaDescription}">
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="/assets/css/plant-pages.css">
    <style>
        .local-names-table-container {
            overflow-x: auto;
            margin: 1rem 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .local-names-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            font-size: 0.95rem;
        }
        
        .local-names-table th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: 600;
            padding: 12px 16px;
            text-align: left;
        }
        
        .local-names-table td {
            padding: 10px 16px;
            border-bottom: 1px solid #eef2f7;
        }
        
        .local-names-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        
        .local-names-table tr:hover {
            background-color: #f1f5f9;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        }
        
        .local-names-table tr:last-child td {
            border-bottom: none;
        }
        
        .locality-cell {
            font-weight: 600;
            color: #2d3748;
        }
        
        .name-cell {
            color: #4a5568;
        }
        
        .research-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .research-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .research-link-indicator {
            color: #667eea;
            font-size: 0.85em;
            margin-left: 10px;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .local-names-table-container {
                margin: 0.5rem 0;
                border-radius: 6px;
            }
            
            .local-names-table {
                font-size: 0.85rem;
            }
            
            .local-names-table th,
            .local-names-table td {
                padding: 8px 12px;
            }
            
            .local-names-table th {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .local-names-table {
                font-size: 0.8rem;
            }
            
            .local-names-table th,
            .local-names-table td {
                padding: 6px 8px;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-container">
            <a href="/index.html" class="brand">Chem<span class="brand-accent">Lab</span></a>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li><a href="/index.html" class="nav-link">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Research</a>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-link">Plant Database</a>
                            <a href="#" class="dropdown-link">Chemical Analysis</a>
                            <a href="#" class="dropdown-link">Research Papers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Categories</a>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-link">Medicinal Plants</a>
                            <a href="#" class="dropdown-link">Aromatic Plants</a>
                            <a href="#" class="dropdown-link">Culinary Herbs</a>
                        </div>
                    </li>
                    <li><a href="#" class="nav-link">About Us</a></li>
                    <li><a href="#" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="content-area">
        <main class="main-content">
            <div class="content-container">
                <!-- Breadcrumb -->
                <div class="breadcrumb">
                    <a href="/index.html">Home</a> 
                    <span>/</span>
                    <a href="#">${article.category}</a>
                    <span>/</span>
                    <span>${article.plantName}</span>
                </div>

                <!-- Plant Header -->
                <div class="plant-detail-header fade-in">
                    <h1>${article.plantName}</h1>
                    <p class="scientific-name">${article.scientificName}</p>
                    <span class="plant-category">${article.category}</span>
                </div>

                <!-- Plant Content -->
                <div class="plant-detail-content">
                    <!-- Left Column - Image and Meta -->
                    <div class="plant-image-section slide-in-left">
                        <!-- Main Plant Image -->
                        <div class="plant-main-image">
                            <img src="${article.images[0]?.url || '/assets/images/plants/placeholder.jpg'}" alt="${article.plantName}">
                        </div>
                        
                        ${article.images.length > 1 ? `
                        <div class="plant-image-gallery">
                            ${article.images.map((img, index) => `
                            <div class="gallery-thumb ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img.url}', this)">
                                <img src="${img.url}" alt="${article.plantName} ${index + 1}">
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        <!-- Plant Meta Information -->
                        <div class="plant-meta">
                            <div class="meta-item">
                                <span class="meta-label">Author:</span>
                                <span class="meta-value">${article.authorName}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Published:</span>
                                <span class="meta-value">${new Date(article.publishDate).toLocaleDateString()}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Read Time:</span>
                                <span class="meta-value">${article.readTime}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Category:</span>
                                <span class="meta-value">${article.category}</span>
                            </div>
                            ${article.location ? `
                            <div class="meta-item">
                                <span class="meta-label">Location:</span>
                                <span class="meta-value">${article.location}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Right Column - Plant Information -->
                    <div class="plant-info-section slide-in-right">
                        <!-- Description -->
                        <section class="info-section">
                            <h2>Description</h2>
                            <div class="description-text">${article.description}</div>
                        </section>

                        ${article.medicinalProperties.length > 0 ? `
                        <section class="info-section">
                            <h2>Medicinal Properties</h2>
                            <div class="properties-grid">
                                ${article.medicinalProperties.map(prop => `
                                <span class="property-tag">${prop}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}

                        ${article.commonUses.length > 0 ? `
                        <section class="info-section">
                            <h2>Common Uses</h2>
                            <ul class="uses-list">
                                ${article.commonUses.map(use => `
                                <li>${use}</li>
                                `).join('')}
                            </ul>
                        </section>
                        ` : ''}

                        ${article.localNames && article.localNames.length > 0 ? `
                        <section class="info-section">
                            <h2>Local Names</h2>
                            <div class="local-names-table-container">
                                <table class="local-names-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 40%;">Locality</th>
                                            <th style="width: 60%;">Local Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${article.localNames.map(localName => `
                                        <tr>
                                            <td class="locality-cell">${localName.locality}</td>
                                            <td class="name-cell">${localName.name}</td>
                                        </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        ` : ''}

                        ${article.growingConditions || article.waterRequirements || article.temperatureRange || article.harvestingTips ? `
                        <section class="info-section">
                            <h2>Growing Information</h2>
                            <div class="growing-info">
                                ${article.growingConditions ? `
                                <div class="info-card">
                                    <h3>🌱 Growing Conditions</h3>
                                    <p>${article.growingConditions}</p>
                                </div>
                                ` : ''}
                                ${article.waterRequirements ? `
                                <div class="info-card">
                                    <h3>💧 Water Requirements</h3>
                                    <p>${article.waterRequirements}</p>
                                </div>
                                ` : ''}
                                ${article.temperatureRange ? `
                                <div class="info-card">
                                    <h3>🌡️ Temperature Range</h3>
                                    <p>${article.temperatureRange}</p>
                                </div>
                                ` : ''}
                                ${article.harvestingTips ? `
                                <div class="info-card">
                                    <h3>✂️ Harvesting Tips</h3>
                                    <p>${article.harvestingTips}</p>
                                </div>
                                ` : ''}
                            </div>
                        </section>
                        ` : ''}

                        ${article.preparationMethods.length > 0 ? `
                        <section class="info-section">
                            <h2>Preparation Methods</h2>
                            <div class="preparation-methods">
                                ${article.preparationMethods.map(method => `
                                <div class="method-item">
                                    <h4>${method.title}</h4>
                                    <p>${method.description}</p>
                                </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}

                        ${article.chemicalCompounds.length > 0 ? `
                        <section class="info-section">
                            <h2>Chemical Compounds</h2>
                            <div class="compounds-list">
                                ${article.chemicalCompounds.map(compound => `
                                <span class="compound-tag">${compound}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                </div>

                ${article.relatedResearch.length > 0 ? `
                <section class="research-section">
                    <h2>Related Research</h2>
                    <div class="research-grid">
                        ${article.relatedResearch.map(research => `
                        <div class="research-card" ${research.link ? `onclick="window.open('${research.link}', '_blank')" style="cursor: pointer;"` : ''}>
                            <h3>${research.title}</h3>
                            <p>${research.description}</p>
                            <div class="research-meta">
                                <span>${research.author}</span>
                                <span>${research.year}</span>
                                ${research.link ? '<span class="research-link-indicator">🔗 Click to view paper</span>' : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Back to Search -->
                <div class="back-to-search">
                    <button class="btn btn-secondary" onclick="window.history.back()">
                        ← Back to Search Results
                    </button>
                </div>
            </div>
        </main>
    </div>

   <footer class="footer"> <script src="/assets/js/footer.js"></script></footer>

    <script>
        function changeMainImage(src, thumbElement) {
            const mainImage = document.querySelector('.plant-main-image img');
            const allThumbs = document.querySelectorAll('.gallery-thumb');
            mainImage.src = src;
            allThumbs.forEach(thumb => thumb.classList.remove('active'));
            thumbElement.classList.add('active');
        }
    </script>
    <script src="/assets/js/script.js"></script>
</body>
</html>`;
    }

    generateRichTextHTML(article) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.plantName} - VanaVigyan Plant Research</title>
    <meta name="description" content="${article.metaDescription}">
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="/assets/css/plant-pages.css">
    <style>
        .local-names-table-container {
            overflow-x: auto;
            margin: 1rem 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .local-names-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            font-size: 0.95rem;
        }
        
        .local-names-table th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: 600;
            padding: 12px 16px;
            text-align: left;
        }
        
        .local-names-table td {
            padding: 10px 16px;
            border-bottom: 1px solid #eef2f7;
        }
        
        .local-names-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        
        .local-names-table tr:hover {
            background-color: #f1f5f9;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        }
        
        .local-names-table tr:last-child td {
            border-bottom: none;
        }
        
        .locality-cell {
            font-weight: 600;
            color: #2d3748;
        }
        
        .name-cell {
            color: #4a5568;
        }
        
        .research-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .research-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .research-link-indicator {
            color: #667eea;
            font-size: 0.85em;
            margin-left: 10px;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .local-names-table-container {
                margin: 0.5rem 0;
                border-radius: 6px;
            }
            
            .local-names-table {
                font-size: 0.85rem;
            }
            
            .local-names-table th,
            .local-names-table td {
                padding: 8px 12px;
            }
            
            .local-names-table th {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .local-names-table {
                font-size: 0.8rem;
            }
            
            .local-names-table th,
            .local-names-table td {
                padding: 6px 8px;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-container">
            <a href="/index.html" class="brand">Chem<span class="brand-accent">Lab</span></a>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li><a href="/index.html" class="nav-link">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Research</a>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-link">Plant Database</a>
                            <a href="#" class="dropdown-link">Chemical Analysis</a>
                            <a href="#" class="dropdown-link">Research Papers</a>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="nav-link dropdown-toggle">Categories</a>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-link">Medicinal Plants</a>
                            <a href="#" class="dropdown-link">Aromatic Plants</a>
                            <a href="#" class="dropdown-link">Culinary Herbs</a>
                        </div>
                    </li>
                    <li><a href="#" class="nav-link">About Us</a></li>
                    <li><a href="#" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="content-area">
        <main class="main-content">
            <div class="content-container">
                <!-- Breadcrumb -->
                <div class="breadcrumb">
                    <a href="/index.html">Home</a> 
                    <span>/</span>
                    <a href="#">${article.category}</a>
                    <span>/</span>
                    <span>${article.plantName}</span>
                </div>

                <!-- Plant Header -->
                <div class="plant-detail-header fade-in">
                    <h1>${article.plantName}</h1>
                    <p class="scientific-name">${article.scientificName}</p>
                    <span class="plant-category">${article.category}</span>
                </div>

                <!-- Plant Content -->
                <div class="plant-detail-content">
                    <!-- Left Column - Image and Meta -->
                    <div class="plant-image-section slide-in-left">
                        <!-- Main Plant Image -->
                        <div class="plant-main-image">
                            <img src="${article.images[0]?.url || '/assets/images/plants/placeholder.jpg'}" alt="${article.plantName}">
                        </div>
                        
                        ${article.images.length > 1 ? `
                        <div class="plant-image-gallery">
                            ${article.images.map((img, index) => `
                            <div class="gallery-thumb ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img.url}', this)">
                                <img src="${img.url}" alt="${article.plantName} ${index + 1}">
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        <!-- Plant Meta Information -->
                        <div class="plant-meta">
                            <div class="meta-item">
                                <span class="meta-label">Author:</span>
                                <span class="meta-value">${article.authorName}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Published:</span>
                                <span class="meta-value">${new Date(article.publishDate).toLocaleDateString()}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Read Time:</span>
                                <span class="meta-value">${article.readTime}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Category:</span>
                                <span class="meta-value">${article.category}</span>
                            </div>
                            ${article.location ? `
                            <div class="meta-item">
                                <span class="meta-label">Location:</span>
                                <span class="meta-value">${article.location}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Right Column - Plant Information -->
                    <div class="plant-info-section slide-in-right">
                        <!-- Article Content -->
                        <section class="info-section">
                            <div class="article-content">
                                ${article.articleContent}
                            </div>
                        </section>

                        ${article.localNames && article.localNames.length > 0 ? `
                        <section class="info-section">
                            <h2>Local Names</h2>
                            <div class="local-names-table-container">
                                <table class="local-names-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 40%;">Locality</th>
                                            <th style="width: 60%;">Local Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${article.localNames.map(localName => `
                                        <tr>
                                            <td class="locality-cell">${localName.locality}</td>
                                            <td class="name-cell">${localName.name}</td>
                                        </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        ` : ''}
                    </div>
                </div>

                ${article.relatedResearch.length > 0 ? `
                <section class="research-section">
                    <h2>Related Research</h2>
                    <div class="research-grid">
                        ${article.relatedResearch.map(research => `
                        <div class="research-card" ${research.link ? `onclick="window.open('${research.link}', '_blank')" style="cursor: pointer;"` : ''}>
                            <h3>${research.title}</h3>
                            <p>${research.description}</p>
                            <div class="research-meta">
                                <span>${research.author}</span>
                                <span>${research.year}</span>
                                ${research.link ? '<span class="research-link-indicator">🔗 Click to view paper</span>' : ''}
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Back to Search -->
                <div class="back-to-search">
                    <button class="btn btn-secondary" onclick="window.history.back()">
                        ← Back to Search Results
                    </button>
                </div>
            </div>
        </main>
    </div>

    <footer class="footer"> <script src="/assets/js/footer.js"></script></footer>

    <script>
        function changeMainImage(src, thumbElement) {
            const mainImage = document.querySelector('.plant-main-image img');
            const allThumbs = document.querySelectorAll('.gallery-thumb');
            mainImage.src = src;
            allThumbs.forEach(thumb => thumb.classList.remove('active'));
            thumbElement.classList.add('active');
        }
    </script>
    <script src="/assets/js/script.js"></script>
</body>
</html>`;
    }

    updatePlantsJSON(articleData) {
        const plantsData = JSON.parse(localStorage.getItem('plantsJSON')) || [];
        
        const plantEntry = {
            id: articleData.id,
            name: articleData.plantName,
            scientificName: articleData.scientificName,
            category: articleData.category,
            slug: articleData.slug,
            description: articleData.metaDescription,
            image: articleData.images[0]?.url || '/assets/images/plants/placeholder.jpg',
            published: articleData.publishDate,
            author: articleData.authorName,
            readTime: articleData.readTime,
            location: articleData.location
        };
        
        const existingIndex = plantsData.findIndex(p => p.id === articleData.id);
        if (existingIndex !== -1) {
            plantsData[existingIndex] = plantEntry;
        } else {
            plantsData.push(plantEntry);
        }
        
        localStorage.setItem('plantsJSON', JSON.stringify(plantsData));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize admin when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new PlantAdmin();
});