// ===== PIEBALD ISRAEL - JavaScript =====

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все открытые FAQ
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Переключаем текущий FAQ
        item.classList.toggle('active');
    });
});

// ===== Modals =====
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Открытие модалов по клику на карточки
document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = 'modal-' + trigger.getAttribute('data-modal');
        openModal(modalId);
    });
});

// Закрытие модалов
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const modal = overlay.closest('.modal');
        closeModal(modal);
    });
});

// Закрытие модала по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal);
        });
    }
});

// ===== LANGUAGE SWITCHER С АНИМАЦИЕЙ =====
const translations = {
    ru: {
        nav: {
            home: 'Главная',
            about: 'О питомнике',
            dogs: 'Наши собаки',
            breed: 'О пайболд',
            articles: 'Блог',
            puppies: 'Щенки',
            faq: 'FAQ',
            contact: 'Контакты'
        },
        hero: {
            title1: 'Раскрашены природой.',
            title2: 'Выведены с любовью.',
            subtitle: 'Единственный заводчик пайболд-такс в Израиле и на Ближнем Востоке. Более 20 лет опыта с таксами, разведение пайболд с 2021 года.',
            btn1: 'Наши щенки',
            btn2: 'Связаться'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            dogs: 'Our Dogs',
            breed: 'About Piebald',
            articles: 'Blog',
            puppies: 'Puppies',
            faq: 'FAQ',
            contact: 'Contacts'
        },
        hero: {
            title1: 'Painted by nature.',
            title2: 'Bred with love.',
            subtitle: 'The only piebald dachshund breeder in Israel and the Middle East. Over 20 years of experience with dachshunds, piebald breeding since 2021.',
            btn1: 'Our Puppies',
            btn2: 'Contact Us'
        }
    },
    he: {
        nav: {
            home: 'בית',
            about: 'אודות',
            dogs: 'הכלבים שלנו',
            breed: 'על פייבולד',
            articles: 'בלוג',
            puppies: 'גורים',
            faq: 'שאלות',
            contact: 'יצירת קשר'
        },
        hero: {
            title1: '.צבועים על ידי הטבע',
            title2: '.גדלו באהבה',
            subtitle: 'מגדל הדקסהונדים הפייבולד היחיד בישראל ובמזרח התיכון. למעלה מ-20 שנות ניסיון עם דקסהונדים, גידול פייבולד מאז 2021.',
            btn1: 'הגורים שלנו',
            btn2: 'צור קשר'
        }
    }
};

let currentLang = 'ru';

function switchLanguage(lang) {
    if (lang === currentLang) return;
    
    document.body.classList.add('language-switching');
    
    setTimeout(() => {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        
        document.querySelectorAll('.lang-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            }
        });
        
        const t = translations[lang];
        const navLinksElements = document.querySelectorAll('.nav-link');
        navLinksElements[0].textContent = t.nav.home;
        navLinksElements[1].textContent = t.nav.about;
        navLinksElements[2].textContent = t.nav.dogs;
        navLinksElements[3].textContent = t.nav.breed;
        navLinksElements[4].textContent = t.nav.articles;
        navLinksElements[5].textContent = t.nav.puppies;
        navLinksElements[6].textContent = t.nav.faq;
        navLinksElements[7].textContent = t.nav.contact;
        
        document.querySelector('.hero-title-orange').textContent = t.hero.title1;
        document.querySelector('.hero-title-black').textContent = t.hero.title2;
        document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
        
        const heroButtons = document.querySelectorAll('.hero-content .btn');
        if (heroButtons.length >= 2) {
            heroButtons[0].textContent = t.hero.btn1;
            heroButtons[1].textContent = t.hero.btn2;
        }
        
        localStorage.setItem('preferredLanguage', lang);
        
        setTimeout(() => {
            document.body.classList.remove('language-switching');
        }, 100);
    }, 300);
}

document.querySelectorAll('.lang-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'ru') {
        switchLanguage(savedLang);
    }
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

console.log('🐾 Piebald Israel website loaded successfully!');
