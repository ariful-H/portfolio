// Project Data
const projects = [
    {
        title: "Plant Disease Detection",
        description: "Advanced plant disease detection system using neural networks and pre-trained models for accurate diagnosis and treatment recommendations.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["Python", "TensorFlow", "Neural Networks", "OpenCV"],
        category: "AI",
        link: "#"
    },
    {
        title: "Quantum Gaze",
        description: "Gesture controlled video streaming platform with face detection for hands-free navigation.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["Python", "Flask", "OpenCV", "MediaPipe"],
        category: "AI",
        link: "https://geststreamg-8vtj794q.manus.space"
    },
    {
        title: "Restaurant Menu System",
        description: "Responsive restaurant website with dynamic menus and real-time reservation system.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
        category: "Web App",
        link: "https://v0-new-project-kc6mfhwt4da.vercel.app/"
    },
    {
        title: "To-Do List Application",
        description: "Interactive task management application with front-end development focus.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["JavaScript", "HTML", "CSS"],
        category: "Web App",
        link: "https://tasktopia-glow.lovable.app/"
    },
    {
        title: "Password Generator",
        description: "Secure password generation tool with customizable criteria and enhanced security.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["Python", "Tkinter"],
        category: "Security"
    },
    {
        title: "SQL Injection Scanner",
        description: "Advanced web vulnerability scanner focused on detecting and preventing SQL injection attacks.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["Python", "SQLAlchemy", "Web Security"],
        category: "Security"
    },
    {
        title: "MediVision App",
        description: "Next.js-powered platform using neural networks and ML models for disease diagnostics.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        tags: ["Next.js", "TensorFlow", "Machine Learning", "React"],
        category: "Healthcare"
    }
];

// Text Animation for Title
const titles = [
    "Software Developer",
    "Python Developer",
    "Full Stack Developer"
];

function initTypewriterEffect() {
    const titleElement = document.querySelector('.title');
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseDuration = 1500;

    function type() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            // Deleting text
            titleElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Typing text
            titleElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        // Add blinking cursor effect
        titleElement.style.borderRight = '0.1em solid var(--primary-color)';

        if (!isDeleting && currentCharIndex === currentTitle.length) {
            // Finished typing
            typingSpeed = pauseDuration;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            // Finished deleting
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typingSpeed = 200;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Smooth Scroll Polyfill
const smoothScroll = (target, duration) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Enhanced Theme Toggle with Animation
let isDark = true;

const toggleTheme = () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Update icon
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Add transition effect to body
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => document.body.style.transition = '', 500);

    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    isDark = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

themeToggle.addEventListener('click', toggleTheme);

// Enhanced Project Card Rendering with Stagger Effect
function renderProjects() {
    projectsGrid.innerHTML = projects.map((project, index) => `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-card-link" style="text-decoration: none;">
            <div class="project-card" style="animation: fadeInUp 0.5s ease forwards ${index * 0.1}s; opacity: 0;">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </a>
    `).join('');
}

// Enhanced Navigation with Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            smoothScroll(target, 1000);
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Space Background Animation
function initSpaceBackground() {
    const spaceBackground = document.querySelector('.space-background');
    
    // Add stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`;
        spaceBackground.appendChild(star);
    }

    // Add shooting stars periodically
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 100}%`;
        spaceBackground.appendChild(shootingStar);
        
        // Remove shooting star after animation
        setTimeout(() => shootingStar.remove(), 2000);
    }, 5000);
}

// Enhanced Scroll Indicator
scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#about');
    smoothScroll(nextSection, 1000);
});

// Enhanced Form Submission with Email
contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Animation for button
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send email using EmailJS
        await emailjs.send(
            'service_9q3cut6',
            'template_giizlzc',
            {
                to_name: 'Ariful',
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message
            }
        );
        
        // Success animation
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.backgroundColor = '#10B981';
        
        // Show success message with animation
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = 'Thank you for your message! I will get back to you soon.';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            animation: slideIn 0.5s ease forwards;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        document.body.appendChild(message);
        
        // Reset form
        contactForm.reset();
        
        // Reset button and remove message after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            message.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        }, 3000);
        
    } catch (error) {
        // Error animation
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.style.backgroundColor = '#EF4444';
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = 'Sorry, there was an error sending your message. Please try again.';
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #EF4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            animation: slideIn 0.5s ease forwards;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        document.body.appendChild(errorMessage);
        
        // Reset button and remove error message after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            errorMessage.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => errorMessage.remove(), 500);
        }, 3000);
    }
});

// Enhanced Scroll Reveal Animation
function revealOnScroll() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add extra animations based on element type
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                } else if (entry.target.classList.contains('skills')) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        item.style.animation = `slideInRight 0.5s ease forwards ${index * 0.1}s`;
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skills, .about-content, .contact-grid').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Cursor Animation
function initCursorAnimation() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', e => {
        cursor.style.cssText = cursorDot.style.cssText = `
            left: ${e.clientX}px;
            top: ${e.clientY}px;
        `;
    });
}

// Function to animate education cards on scroll
function initEducationAnimation() {
    const educationCards = document.querySelectorAll('.education-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    educationCards.forEach(card => observer.observe(card));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    revealOnScroll();
    initCursorAnimation();
    initTypewriterEffect();
    initSpaceBackground();
    initEducationAnimation();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            transition: transform 0.2s ease;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }
        .cursor-dot {
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            transition: all 0.1s ease;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }
        .title {
            border-right: 0.1em solid transparent;
            animation: blink-caret 0.75s step-end infinite;
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: 0.15em;
        }
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--primary-color); }
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 
