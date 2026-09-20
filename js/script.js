const header = document.querySelector('header');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const navLinks = document.querySelectorAll('[data-section]');
const sectionLinks = document.querySelectorAll('[data-section-link]');
const pages = document.querySelectorAll('[data-page]');

const setActivePage = (pageName, updateUrl = true) => {
    const validPage = document.querySelector(`[data-page="${pageName}"]`) ? pageName : 'inicio';

    pages.forEach((page) => page.classList.toggle('active', page.dataset.page === validPage));
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.section === validPage));

    if (updateUrl) {
        history.pushState({ page: validPage }, '', `#${validPage}`);
    }

    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    header.classList.add('active');
};

const handleNavigation = (event) => {
    event.preventDefault();
    const target = event.currentTarget.dataset.section || event.currentTarget.dataset.sectionLink;
    setActivePage(target);
};

navLinks.forEach((link) => link.addEventListener('click', handleNavigation));
sectionLinks.forEach((link) => link.addEventListener('click', handleNavigation));

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

window.addEventListener('popstate', () => {
    setActivePage(window.location.hash.slice(1), false);
});

setActivePage(window.location.hash.slice(1) || 'inicio', false);
