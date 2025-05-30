// AgroTrace Platform JavaScript - Fixed Version

class AgroTraceApp {
    constructor() {
        this.walletConnected = false;
        this.currentPage = 'home';
        this.userData = {
            farmers: [
                {
                    id: "F001",
                    name: "Rajesh Kumar",
                    location: "Punjab, India",
                    crops: ["Wheat", "Rice", "Cotton"],
                    farmSize: "5 hectares",
                    registrationDate: "2024-10-15",
                    totalProducts: 45,
                    revenue: "₹2,50,000"
                },
                {
                    id: "F002", 
                    name: "Priya Sharma",
                    location: "Maharashtra, India",
                    crops: ["Tomatoes", "Onions", "Sugarcane"],
                    farmSize: "3 hectares",
                    registrationDate: "2024-09-20",
                    totalProducts: 32,
                    revenue: "₹1,80,000"
                }
            ],
            products: [
                {
                    id: "P001",
                    name: "Organic Basmati Rice",
                    farmer: "Rajesh Kumar",
                    harvestDate: "2024-11-15",
                    location: "Punjab",
                    certifications: ["Organic", "Fair Trade"],
                    currentStatus: "In Transit",
                    qrCode: "QR001ABC",
                    price: "₹80/kg"
                },
                {
                    id: "P002",
                    name: "Fresh Tomatoes",
                    farmer: "Priya Sharma", 
                    harvestDate: "2024-11-20",
                    location: "Maharashtra",
                    certifications: ["Pesticide Free"],
                    currentStatus: "Available",
                    qrCode: "QR002DEF",
                    price: "₹40/kg"
                }
            ],
            metrics: {
                totalFarmers: 2847,
                totalProducts: 15623,
                totalTransactions: 45231,
                revenueGenerated: "₹15.6 Crores",
                wasteReduction: "23%",
                farmerIncomeIncrease: "35%"
            }
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing AgroTrace App...');
        this.setupEventListeners();
        this.updateStatsDisplay();
        this.animateNumbers();
        
        // Initialize charts after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupCharts();
        }, 100);

        // Show welcome message
        setTimeout(() => {
            this.showToast('Welcome to AgroTrace! Select a role to explore the platform.', 'info');
        }, 1500);
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - Main sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        console.log('Found nav items:', navItems.length);
        navItems.forEach((item, index) => {
            const target = item.getAttribute('data-target');
            console.log(`Setting up nav item ${index}: ${target}`);
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Nav item clicked:', target);
                this.navigateToPage(target);
            });
        });

        // Role selection buttons on home page
        const roleButtons = document.querySelectorAll('.role-btn');
        console.log('Found role buttons:', roleButtons.length);
        roleButtons.forEach((btn, index) => {
            const target = btn.getAttribute('data-target');
            console.log(`Setting up role button ${index}: ${target}`);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Role button clicked:', target);
                this.navigateToPage(target);
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Menu toggle clicked');
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('active');
            });
        }

        // Wallet connection
        const connectWalletBtn = document.getElementById('connectWalletBtn');
        if (connectWalletBtn) {
            connectWalletBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Connect wallet clicked');
                this.connectWallet();
            });
        }

        // Product registration
        const registerProductBtn = document.getElementById('registerProductBtn');
        if (registerProductBtn) {
            registerProductBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Register product clicked');
                this.registerProduct();
            });
        }

        // QR code generation
        const productBtns = document.querySelectorAll('.product-btn');
        productBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.getAttribute('data-id');
                console.log('QR button clicked for product:', productId);
                this.showQRCode(productId);
            });
        });

        // Product tracking
        const trackBtns = document.querySelectorAll('.track-btn');
        trackBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.getAttribute('data-id');
                console.log('Track button clicked for product:', productId);
                this.trackProduct(productId);
            });
        });

        // QR Scanner
        const scanQrBtn = document.getElementById('scanQrBtn');
        if (scanQrBtn) {
            scanQrBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('QR Scanner clicked');
                this.showQRScanner();
            });
        }

        const simulateScanBtn = document.getElementById('simulateScanBtn');
        if (simulateScanBtn) {
            simulateScanBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Simulate scan clicked');
                this.simulateQRScan();
            });
        }

        // Product search
        const searchProductBtn = document.getElementById('searchProductBtn');
        if (searchProductBtn) {
            searchProductBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Search products clicked');
                this.searchProducts();
            });
        }

        // Hero action buttons
        const exploreBtn = document.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Explore button clicked');
                this.navigateToPage('farmer-dashboard');
            });
        }

        const learnBtn = document.querySelector('.learn-btn');
        if (learnBtn) {
            learnBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Learn more clicked');
                this.showToast('Learn more section would contain detailed documentation', 'info');
            });
        }

        // Modal handling
        const closeModalBtns = document.querySelectorAll('.close-modal');
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Close modal clicked');
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Export buttons
        const exportBtns = document.querySelectorAll('.export-btn');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = e.currentTarget.textContent.trim();
                console.log('Export clicked:', type);
                this.exportData(type);
            });
        });

        // Language toggle
        const langBtns = document.querySelectorAll('[data-lang]');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.currentTarget.getAttribute('data-lang');
                console.log('Language toggle clicked:', lang);
                this.toggleLanguage(lang);
            });
        });

        // Toast close
        const toastClose = document.querySelector('.toast-close');
        if (toastClose) {
            toastClose.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Toast close clicked');
                this.hideToast();
            });
        }

        // View all buttons
        const viewAllBtns = document.querySelectorAll('.view-all-btn');
        viewAllBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('View all clicked');
                this.showToast('Feature not implemented in demo', 'info');
            });
        });

        // Blockchain view transaction buttons
        const viewTxBtns = document.querySelectorAll('.view-tx-btn');
        viewTxBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('View transaction clicked');
                window.open('https://etherscan.io/tx/0x7Ef9c5A3B29a8D29BfAc21d1A0EdF57c7De1EA59', '_blank');
            });
        });

        // Generate QR buttons
        const generateQrBtns = document.querySelectorAll('.generate-qr-btn');
        generateQrBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Generate QR clicked');
                this.closeAllModals();
                this.showQRCode('P001');
            });
        });

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                console.log('Clicked outside modal');
                this.closeModal(e.target);
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                console.log('Escape key pressed');
                this.closeAllModals();
            }
            
            // Keyboard shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.navigateToPage('home');
                        break;
                    case '2':
                        e.preventDefault();
                        this.navigateToPage('farmer-dashboard');
                        break;
                    case '3':
                        e.preventDefault();
                        this.navigateToPage('consumer-dashboard');
                        break;
                    case '4':
                        e.preventDefault();
                        this.navigateToPage('supply-chain');
                        break;
                    case '5':
                        e.preventDefault();
                        this.navigateToPage('admin-panel');
                        break;
                }
            }
        });

        console.log('Event listeners setup complete');
    }

    navigateToPage(pageId) {
        console.log('Navigating to page:', pageId);
        
        // Hide all pages
        const allPages = document.querySelectorAll('.page');
        allPages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            console.log('Page activated:', pageId);
        } else {
            console.error('Page not found:', pageId);
            return;
        }

        // Update navigation
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-target="${pageId}"]`);
        if (activeNavItem && activeNavItem.classList.contains('nav-item')) {
            activeNavItem.classList.add('active');
        }

        // Update page title
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            const titles = {
                'home': 'Dashboard',
                'farmer-dashboard': 'Farmer Dashboard',
                'consumer-dashboard': 'Consumer Dashboard',
                'supply-chain': 'Supply Chain Tracking',
                'admin-panel': 'Admin Panel'
            };
            pageTitle.textContent = titles[pageId] || 'Dashboard';
        }

        // Close mobile menu
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }

        // Show relevant toast
        if (pageId !== 'home') {
            this.showToast(`Switched to ${this.getPageDisplayName(pageId)}`, 'success');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    getPageDisplayName(pageId) {
        const names = {
            'farmer-dashboard': 'Farmer Dashboard',
            'consumer-dashboard': 'Consumer Dashboard',
            'supply-chain': 'Supply Chain Tracking',
            'admin-panel': 'Admin Panel'
        };
        return names[pageId] || pageId;
    }

    async connectWallet() {
        const walletBtn = document.getElementById('connectWalletBtn');
        const walletStatus = document.querySelector('.wallet-status span');
        const walletIndicator = document.querySelector('.wallet-indicator');

        if (this.walletConnected) {
            this.disconnectWallet();
            return;
        }

        // Show connecting state
        walletBtn.textContent = 'Connecting...';
        walletBtn.disabled = true;

        // Simulate connection delay
        await this.delay(2000);

        // Update UI for connected state
        this.walletConnected = true;
        walletStatus.textContent = 'Wallet: 0x7Ef9...EA59';
        walletIndicator.classList.remove('disconnected');
        walletIndicator.classList.add('connected');
        walletBtn.textContent = 'Disconnect';
        walletBtn.disabled = false;

        this.showToast('Wallet connected successfully!', 'success');
    }

    disconnectWallet() {
        const walletBtn = document.getElementById('connectWalletBtn');
        const walletStatus = document.querySelector('.wallet-status span');
        const walletIndicator = document.querySelector('.wallet-indicator');

        this.walletConnected = false;
        walletStatus.textContent = 'Wallet: Disconnected';
        walletIndicator.classList.remove('connected');
        walletIndicator.classList.add('disconnected');
        walletBtn.textContent = 'Connect Wallet';
        walletBtn.disabled = false;

        this.showToast('Wallet disconnected', 'info');
    }

    async registerProduct() {
        if (!this.walletConnected) {
            this.showToast('Please connect your wallet first', 'warning');
            return;
        }

        const productName = document.getElementById('productName')?.value;
        const harvestDate = document.getElementById('harvestDate')?.value;
        const quantity = document.getElementById('productQuantity')?.value;
        const price = document.getElementById('productPrice')?.value;

        if (!productName || !harvestDate || !quantity || !price) {
            this.showToast('Please fill all required fields', 'warning');
            return;
        }

        // Show transaction modal
        this.showTransactionModal();

        // Simulate blockchain transaction
        await this.simulateBlockchainTransaction();

        // Close transaction modal and show success
        this.closeAllModals();
        this.showProductRegisteredModal(productName);

        // Clear form
        const form = document.getElementById('productRegistrationForm');
        if (form) {
            form.reset();
        }
    }

    async simulateBlockchainTransaction() {
        const steps = document.querySelectorAll('.transaction-step');
        
        // Step 1: Prepare data (already completed)
        await this.delay(1000);
        
        // Step 2: Submit to blockchain
        if (steps[1]) {
            steps[1].classList.add('completed');
            steps[1].classList.remove('active');
        }
        if (steps[2]) {
            steps[2].classList.add('active');
        }
        await this.delay(2000);
        
        // Step 3: Await confirmation
        if (steps[2]) {
            steps[2].classList.add('completed');
            steps[2].classList.remove('active');
        }
        if (steps[3]) {
            steps[3].classList.add('active');
        }
        await this.delay(1500);
        
        // Step 4: Complete
        if (steps[3]) {
            steps[3].classList.add('completed');
            steps[3].classList.remove('active');
        }
        
        await this.delay(500);
    }

    showTransactionModal() {
        const modal = document.getElementById('transactionModal');
        if (modal) {
            modal.classList.add('active');
            
            // Reset transaction steps
            const steps = document.querySelectorAll('.transaction-step');
            steps.forEach((step, index) => {
                step.classList.remove('completed', 'active');
                if (index === 0) step.classList.add('completed');
                if (index === 1) step.classList.add('active');
            });

            // Generate random transaction hash
            const txHashElement = document.getElementById('txHash');
            if (txHashElement) {
                const txHash = '0x' + Math.random().toString(16).substr(2, 40);
                txHashElement.textContent = txHash;
            }
            
            const gasFeeElement = document.getElementById('gasFee');
            if (gasFeeElement) {
                const gasFee = (Math.random() * 0.01 + 0.001).toFixed(4);
                gasFeeElement.textContent = gasFee + ' ETH';
            }
        }
    }

    showProductRegisteredModal(productName) {
        const modal = document.getElementById('productRegisteredModal');
        if (modal) {
            const regProductName = document.getElementById('regProductName');
            if (regProductName) {
                regProductName.textContent = productName;
            }
            
            const regTxHash = document.getElementById('regTxHash');
            if (regTxHash) {
                const txHash = '0x' + Math.random().toString(16).substr(2, 40);
                regTxHash.textContent = txHash;
            }
            
            const regProductId = document.getElementById('regProductId');
            if (regProductId) {
                const productId = 'P' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
                regProductId.textContent = productId;
            }
            
            modal.classList.add('active');
        }
    }

    showQRCode(productId) {
        const modal = document.getElementById('qrCodeModal');
        if (modal) {
            modal.classList.add('active');
        }
        this.showToast('QR Code generated for product ' + productId, 'success');
    }

    showQRScanner() {
        const modal = document.getElementById('qrScannerModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    simulateQRScan() {
        // Simulate scanning delay
        setTimeout(() => {
            this.closeAllModals();
            this.navigateToPage('supply-chain');
            this.showToast('QR Code scanned successfully! Showing product details.', 'success');
        }, 1500);
    }

    trackProduct(productId) {
        this.navigateToPage('supply-chain');
        this.showToast(`Tracking product ${productId}`, 'info');
    }

    searchProducts() {
        const searchInput = document.getElementById('productSearchInput');
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (!query) {
            this.showToast('Please enter a search term', 'warning');
            return;
        }
        
        this.showToast(`Searching for "${query}"...`, 'info');
        
        // In a real app, this would filter the products
        setTimeout(() => {
            this.showToast(`Found products matching "${query}"`, 'success');
        }, 1000);
    }

    exportData(type) {
        this.showToast(`Exporting data as ${type}...`, 'info');
        
        // Simulate export delay
        setTimeout(() => {
            this.showToast(`${type} export completed successfully!`, 'success');
        }, 2000);
    }

    toggleLanguage(lang) {
        const labels = {
            'en': {
                'Home': 'Home',
                'Farmer': 'Farmer',
                'Consumer': 'Consumer', 
                'Supply Chain': 'Supply Chain',
                'Admin': 'Admin'
            },
            'hi': {
                'Home': 'होम',
                'Farmer': 'किसान',
                'Consumer': 'उपभोक्ता',
                'Supply Chain': 'आपूर्ति श्रृंखला',
                'Admin': 'एडमिन'
            }
        };

        // Update navigation labels
        const navItems = document.querySelectorAll('.nav-item span');
        navItems.forEach((span, index) => {
            const keys = Object.keys(labels['en']);
            if (keys[index]) {
                span.textContent = labels[lang][keys[index]];
            }
        });

        // Update active button
        const langBtns = document.querySelectorAll('[data-lang]');
        langBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        const activeLangBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeLangBtn) {
            activeLangBtn.classList.add('active');
        }

        this.showToast(`Language switched to ${lang === 'hi' ? 'Hindi' : 'English'}`, 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;

        const toastIcon = toast.querySelector('.toast-icon i');
        const toastMessage = toast.querySelector('.toast-message');

        // Set message
        if (toastMessage) {
            toastMessage.textContent = message;
        }

        // Set icon based on type
        const icons = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        };

        if (toastIcon) {
            toastIcon.className = icons[type] || icons.info;
        }

        // Set border color
        const colors = {
            'success': 'var(--color-success)',
            'error': 'var(--color-error)',
            'warning': 'var(--color-warning)',
            'info': 'var(--color-primary)'
        };

        toast.style.borderLeftColor = colors[type] || colors.info;

        // Show toast
        toast.classList.add('active');

        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    }

    hideToast() {
        const toast = document.getElementById('toastNotification');
        if (toast) {
            toast.classList.remove('active');
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }

    updateStatsDisplay() {
        // Update platform stats
        const elements = {
            'farmerCount': this.userData.metrics.totalFarmers,
            'productCount': this.userData.metrics.totalProducts,
            'transactionCount': this.userData.metrics.totalTransactions,
            'revenueGenerated': this.userData.metrics.revenueGenerated,
            'totalFarmers': this.userData.metrics.totalFarmers,
            'totalProducts': this.userData.metrics.totalProducts,
            'totalTransactions': this.userData.metrics.totalTransactions,
            'revenueTotal': this.userData.metrics.revenueGenerated,
            'farmerName': this.userData.farmers[0].name,
            'farmerLocation': this.userData.farmers[0].location
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (typeof elements[id] === 'number') {
                    element.textContent = this.formatNumber(elements[id]);
                } else {
                    element.textContent = elements[id];
                }
            }
        });
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-card h3');
        
        numbers.forEach(num => {
            const finalValue = num.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            if (!isNaN(numericValue) && numericValue > 0) {
                let currentValue = 0;
                const increment = numericValue / 30;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    // Preserve original format
                    if (finalValue.includes('₹')) {
                        if (finalValue.includes('Cr')) {
                            num.textContent = '₹' + (currentValue / 10000000).toFixed(1) + ' Cr';
                        } else if (finalValue.includes(',')) {
                            num.textContent = '₹' + this.formatNumber(Math.floor(currentValue));
                        } else {
                            num.textContent = '₹' + Math.floor(currentValue);
                        }
                    } else if (finalValue.includes(',')) {
                        num.textContent = this.formatNumber(Math.floor(currentValue));
                    } else {
                        num.textContent = Math.floor(currentValue);
                    }
                }, 100);
            }
        });
    }

    setupCharts() {
        console.log('Setting up charts...');
        
        // Farmer Sales Chart
        this.setupFarmerSalesChart();
        
        // System Performance Chart
        this.setupSystemPerformanceChart();
        
        // Regional Distribution Chart
        this.setupRegionalDistributionChart();
        
        // Certification Chart
        this.setupCertificationChart();
    }

    setupFarmerSalesChart() {
        const ctx = document.getElementById('farmerSalesChart');
        if (!ctx) return;

        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue (₹)',
                        data: [25000, 32000, 28000, 45000, 38000, 42000],
                        borderColor: '#32b8c6',
                        backgroundColor: 'rgba(50, 184, 198, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + (value / 1000) + 'K';
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.log('Chart.js not available, skipping farmer sales chart');
        }
    }

    setupSystemPerformanceChart() {
        const ctx = document.getElementById('systemPerformanceChart');
        if (!ctx) return;

        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    datasets: [
                        {
                            label: 'Transactions',
                            data: [120, 89, 234, 567, 423, 378, 256],
                            borderColor: '#32b8c6',
                            backgroundColor: 'rgba(50, 184, 198, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Active Users',
                            data: [45, 23, 67, 123, 98, 87, 54],
                            borderColor: '#6edb95',
                            backgroundColor: 'rgba(110, 219, 149, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.log('Chart.js not available, skipping system performance chart');
        }
    }

    setupRegionalDistributionChart() {
        const ctx = document.getElementById('regionDistributionChart');
        if (!ctx) return;

        try {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Punjab', 'Maharashtra', 'UP', 'Gujarat', 'Others'],
                    datasets: [{
                        data: [25, 20, 18, 15, 22],
                        backgroundColor: [
                            '#1FB8CD',
                            '#FFC185', 
                            '#B4413C',
                            '#ECEBD5',
                            '#5D878F'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        } catch (error) {
            console.log('Chart.js not available, skipping regional distribution chart');
        }
    }

    setupCertificationChart() {
        const ctx = document.getElementById('certificationChart');
        if (!ctx) return;

        try {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Organic', 'Fair Trade', 'Pesticide Free', 'Non-GMO'],
                    datasets: [{
                        label: 'Certifications',
                        data: [1250, 890, 1450, 670],
                        backgroundColor: [
                            '#1FB8CD',
                            '#FFC185',
                            '#B4413C',
                            '#ECEBD5'
                        ],
                        borderRadius: 4,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.log('Chart.js not available, skipping certification chart');
        }
    }

    formatNumber(num) {
        return num.toLocaleString('en-IN');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
let agroTraceApp;

// Ensure we initialize only once
if (!window.agroTraceApp) {
    console.log('Creating AgroTrace instance...');
    agroTraceApp = new AgroTraceApp();
    window.agroTraceApp = agroTraceApp;
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

console.log(`
🌱 AgroTrace Blockchain Platform
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to the AgroTrace demo!

Keyboard shortcuts:
• Ctrl/Cmd + 1-5: Navigate between sections
• Escape: Close modals

Features demonstrated:
✓ Blockchain integration simulation
✓ Real-time IoT sensor data
✓ Supply chain tracking
✓ Smart contracts for agriculture
✓ Multi-language support (EN/हिंदी)
✓ Mobile-responsive design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built for 24-hour Web3 Hackathon in India
`);