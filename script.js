// Update current year in footer + interactions
document.addEventListener('DOMContentLoaded', () => {
  // 1) Footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2) Navbar: transparent -> solid on scroll
  const nav = document.getElementById('navbar');
  const setNavSolid = () => {
    if (!nav) return;
    if (window.scrollY > 600) nav.classList.add('nav-solid');
    else nav.classList.remove('nav-solid');
  };
  setNavSolid(); // initial state
  window.addEventListener('scroll', setNavSolid);

  // 3) Smooth scrolling with fixed header offset + auto-collapse on mobile
  document.querySelectorAll('nav a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      const headerH = nav?.offsetHeight || 0;
      const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH;

      window.scrollTo({ top: targetY, behavior: 'smooth' });

      // Collapse mobile menu after click
      const collapseEl = document.getElementById('navbarsExample09');
      if (collapseEl?.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // 4) Portfolio filtering
  const filterItems = document.querySelectorAll('.filter-item');
  const portfolioItems = document.querySelectorAll('.single-portfolio');

  filterItems.forEach(filter => {
    filter.addEventListener('click', () => {
      // Active class
      filterItems.forEach(item => item.classList.remove('active'));
      filter.classList.add('active');

      const filterValue = filter.getAttribute('data-filter');
      portfolioItems.forEach(portItem => {
        if (filterValue === '*' || portItem.classList.contains(filterValue.slice(1))) {
          portItem.style.display = '';
        } else {
          portItem.style.display = 'none';
        }
      });
    });
  });

  // 5) Portfolio item -> open corresponding modal
  const modals = ['#modal1','#modal2','#modal3','#modal4','#modal5','#modal6','#modal7','#modal8','#modal9'];
  portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const targetSelector = modals[index];
      const targetModalEl = document.querySelector(targetSelector);
      if (targetModalEl) {
        const modalInstance = new bootstrap.Modal(targetModalEl);
        modalInstance.show();
      }
    });
  });
});
