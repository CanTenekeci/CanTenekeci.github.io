document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  const themeBtns = document.querySelectorAll('.theme-btn');
  const rootElement = document.documentElement;
  const savedTheme = localStorage.getItem('canPortfolioTheme') || 'warm';
  
  function applyTheme(themeName) {
    if (themeName === 'light') rootElement.removeAttribute('data-theme');
    else rootElement.setAttribute('data-theme', themeName);
    themeBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-set') === themeName));
    localStorage.setItem('canPortfolioTheme', themeName);
  }

  applyTheme(savedTheme);
  themeBtns.forEach(btn => btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-set'))));

  const githubUsername = 'CanTenekeci'; // Değiştirilebilir
  fetchGithubRepos(githubUsername);
});

async function fetchGithubRepos(username) {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
    if (!response.ok) return;
    const repos = await response.json();
    const validRepos = repos.filter(repo => !repo.fork && repo.name !== 'can-tenekeci-portfolio').slice(0, 4);
    let indexCount = projectsGrid.children.length;

    for (const repo of validRepos) {
      indexCount++;
      const repoNum = indexCount < 10 ? `0${indexCount}` : indexCount;
      const languageTag = repo.language ? `<span class="tag">${repo.language}</span>` : '';
      let descText = repo.description;
      if (!descText) {
        try {
          const readmeRes = await fetch(`https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/README.md`);
          if (readmeRes.ok) {
            const readmeText = await readmeRes.text();
            let cleanText = readmeText.replace(/#.*$/gm, '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/<[^>]*>/g, '').replace(/[\r\n]+/g, ' ').trim();
            descText = cleanText.length > 150 ? cleanText.substring(0, 150) + '...' : (cleanText || 'Açıklama bulunamadı.');
          } else descText = 'Açıklama girilmemiş.';
        } catch (e) { descText = 'Açıklama girilmemiş.'; }
      }

      const repoHtml = `<div class="project-card reveal revealed"><span class="project-card__number">${repoNum} (GitHub)</span><h3 class="project-card__title">${repo.name.replace(/-/g, ' ')}</h3><p class="project-card__desc">${descText}</p><div class="project-card__tags">${languageTag}<span class="tag">GitHub Repo</span></div><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-card__link">Kodu İncele <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" /></svg></a></div>`;
      projectsGrid.insertAdjacentHTML('beforeend', repoHtml);
    }
  } catch (error) { console.error(error); }
}
