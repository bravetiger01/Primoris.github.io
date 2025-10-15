// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupLectureCards();
    setupAddButton();
    setupScrollEffects();
    setupAccessibility();
    loadLectureData();
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation based on index
            handleNavigation(index);
        });
        
        // Add keyboard navigation support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Handle navigation actions
function handleNavigation(index) {
    const mainContent = document.querySelector('.main-content');
    
    switch(index) {
        case 0: // Home
            showHomeView();
            break;
        case 1: // Documents/Notes
            showDocumentsView();
            break;
        case 2: // Calendar/Schedule
            showCalendarView();
            break;
        default:
            showHomeView();
    }
}

// Show home view (lecture cards)
function showHomeView() {
    const lectureContainer = document.querySelector('.lecture-cards-container');
    if (lectureContainer) {
        lectureContainer.style.display = 'flex';
    }
    
    // Update greeting based on time
    updateGreeting();
}

// Show documents view
function showDocumentsView() {
    const lectureContainer = document.querySelector('.lecture-cards-container');
    if (lectureContainer) {
        lectureContainer.style.display = 'none';
    }
    
    // Create documents view (placeholder)
    createDocumentsView();
}

// Show calendar view
function showCalendarView() {
    const lectureContainer = document.querySelector('.lecture-cards-container');
    if (lectureContainer) {
        lectureContainer.style.display = 'none';
    }
    
    // Create calendar view (placeholder)
    createCalendarView();
}

// Create documents view
function createDocumentsView() {
    const mainContent = document.querySelector('.main-content');
    let documentsView = document.querySelector('.documents-view');
    
    if (!documentsView) {
        documentsView = document.createElement('div');
        documentsView.className = 'documents-view';
        documentsView.innerHTML = `
            <div class="view-header">
                <h2>Documents</h2>
            </div>
            <div class="documents-list">
                <div class="document-item">
                    <h3>DS Notes</h3>
                    <p>Data Structures lecture notes</p>
                </div>
                <div class="document-item">
                    <h3>PS Assignment</h3>
                    <p>Problem Solving assignment</p>
                </div>
            </div>
        `;
        mainContent.appendChild(documentsView);
    }
    
    documentsView.style.display = 'block';
}

// Create calendar view
function createCalendarView() {
    const mainContent = document.querySelector('.main-content');
    let calendarView = document.querySelector('.calendar-view');
    
    if (!calendarView) {
        calendarView = document.createElement('div');
        calendarView.className = 'calendar-view';
        calendarView.innerHTML = `
            <div class="view-header">
                <h2>Schedule</h2>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day">
                    <h3>Today</h3>
                    <p>DS Lecture - 9:00 AM</p>
                    <p>PS Lab - 2:00 PM</p>
                </div>
            </div>
        `;
        mainContent.appendChild(calendarView);
    }
    
    calendarView.style.display = 'block';
}

// Setup lecture cards functionality
function setupLectureCards() {
    const lectureCards = document.querySelectorAll('.lecture-card');
    
    lectureCards.forEach(card => {
        card.addEventListener('click', function() {
            const subjectName = this.querySelector('.subject-name').textContent;
            showLectureDetails(subjectName);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Show lecture details
function showLectureDetails(subjectName) {
    // Create modal or navigate to details page
    const modal = document.createElement('div');
    modal.className = 'lecture-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${subjectName} Details</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Attendance Statistics</h3>
                    <p>Total Lectures: 16</p>
                    <p>Attended: 12</p>
                    <p>Attendance Rate: 75%</p>
                </div>
                <div class="detail-section">
                    <h3>Recent Activity</h3>
                    <p>Last attended: 2 days ago</p>
                    <p>Next lecture: Tomorrow</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Setup add button functionality
function setupAddButton() {
    const addButton = document.querySelector('.add-button');
    
    addButton.addEventListener('click', function() {
        showAddLectureModal();
    });
    
    addButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Show add lecture modal
function showAddLectureModal() {
    const modal = document.createElement('div');
    modal.className = 'add-lecture-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Lecture</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="add-lecture-form">
                    <div class="form-group">
                        <label for="subject-name">Subject Name</label>
                        <input type="text" id="subject-name" name="subjectName" required>
                    </div>
                    <div class="form-group">
                        <label for="total-lectures">Total Lectures</label>
                        <input type="number" id="total-lectures" name="totalLectures" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="attended-lectures">Attended Lectures</label>
                        <input type="number" id="attended-lectures" name="attendedLectures" min="0" required>
                    </div>
                    <button type="submit" class="submit-btn">Add Lecture</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Form submission
    const form = modal.querySelector('.add-lecture-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        addNewLecture(formData);
        document.body.removeChild(modal);
    });
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add new lecture
function addNewLecture(formData) {
    const subjectName = formData.get('subjectName');
    const totalLectures = parseInt(formData.get('totalLectures'));
    const attendedLectures = parseInt(formData.get('attendedLectures'));
    const attendancePercentage = Math.round((attendedLectures / totalLectures) * 100);
    
    const lectureContainer = document.querySelector('.lecture-cards-container');
    const newCard = document.createElement('div');
    newCard.className = 'lecture-card';
    newCard.innerHTML = `
        <div class="card-header">
            <h3 class="subject-name">${subjectName}</h3>
            <span class="attendance-percentage">${attendancePercentage}%</span>
        </div>
        <div class="card-stats">
            <div class="stat-item">
                <span class="stat-number">${attendedLectures}</span>
                <span class="stat-label">Lectures Attended</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalLectures}</span>
                <span class="stat-label">Done</span>
            </div>
        </div>
    `;
    
    // Add event listeners to new card
    setupLectureCardEvents(newCard);
    
    lectureContainer.appendChild(newCard);
    
    // Animate the new card
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newCard.style.transition = 'all 0.3s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
}

// Setup events for individual lecture card
function setupLectureCardEvents(card) {
    card.addEventListener('click', function() {
        const subjectName = this.querySelector('.subject-name').textContent;
        showLectureDetails(subjectName);
    });
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Setup scroll effects
function setupScrollEffects() {
    const mainContent = document.querySelector('.main-content');
    
    mainContent.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        const headerSection = document.querySelector('.header-section');
        
        // Add parallax effect to header
        if (headerSection) {
            headerSection.style.transform = `translateY(${scrollTop * 0.1}px)`;
        }
    });
}

// Setup accessibility features
function setupAccessibility() {
    // Add ARIA labels
    const addButton = document.querySelector('.add-button');
    addButton.setAttribute('aria-label', 'Add new lecture');
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Navigate to ${item.querySelector('.nav-label').textContent}`);
    });
    
    const lectureCards = document.querySelectorAll('.lecture-card');
    lectureCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        const subjectName = card.querySelector('.subject-name').textContent;
        card.setAttribute('aria-label', `View details for ${subjectName}`);
    });
    
    // Add focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.lecture-modal, .add-lecture-modal');
            modals.forEach(modal => {
                document.body.removeChild(modal);
            });
        }
    });
}

// Update greeting based on time
function updateGreeting() {
    const greeting = document.querySelector('.greeting');
    const hour = new Date().getHours();
    
    let timeGreeting;
    if (hour < 12) {
        timeGreeting = 'Good Morning';
    } else if (hour < 17) {
        timeGreeting = 'Good Afternoon';
    } else {
        timeGreeting = 'Good Evening';
    }
    
    greeting.textContent = timeGreeting;
}

// Load lecture data (placeholder for future API integration)
function loadLectureData() {
    // This would typically fetch data from an API
    console.log('Loading lecture data...');
    
    // Simulate loading animation
    const cards = document.querySelectorAll('.lecture-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility functions
function formatPercentage(value) {
    return Math.round(value) + '%';
}

function calculateAttendance(attended, total) {
    return total > 0 ? (attended / total) * 100 : 0;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateAttendance,
        formatPercentage,
        updateGreeting
    };
}
