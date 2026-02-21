// projects-page.js - 프로젝트 페이지 전용
import { projects } from './projects.js';
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    renderProjects('all');
    initProjectFilters();
    initModal();
});

function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);

    filtered.forEach((project, index) => {
        const delayClass = `stagger-${(index % 4) + 1}`;
        let statusColor, statusText;
        if (project.status === 'ongoing') { statusColor = '#3b82f6'; statusText = '진행중'; }
        else if (project.status === 'completed') { statusColor = '#10b981'; statusText = '완료'; }
        else { statusColor = '#8b5cf6'; statusText = '예정'; }

        const card = document.createElement('div');
        card.className = `glass-card reveal-up ${delayClass}`;
        card.style.cssText = 'padding: 0; overflow: hidden; cursor: pointer; display: flex; flex-direction: column;';

        card.innerHTML = `
      <div style="height: 220px; overflow: hidden; position: relative;">
        <img src="${project.thumbnail}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" class="card-img">
        <div style="position: absolute; top: 1rem; right: 1rem; background: ${statusColor}; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${statusText}</div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,11,20,0.5), transparent);"></div>
      </div>
      <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
        <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${project.category}</div>
        <h3 style="font-size: 1.2rem; margin-bottom: 0.8rem; line-height: 1.4;">${project.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1; line-height: 1.7;">${project.summary}</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${project.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
        </div>
        <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600;">자세히 보기 →</div>
      </div>
    `;

        card.addEventListener('mouseenter', () => card.querySelector('.card-img').style.transform = 'scale(1.06)');
        card.addEventListener('mouseleave', () => card.querySelector('.card-img').style.transform = 'scale(1)');
        card.addEventListener('click', () => openProjectModal(project, statusColor, statusText));

        grid.appendChild(card);
    });

    setTimeout(() => initScrollAnimations(), 50);
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('#project-filters button');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('active-filter');
                b.style.borderColor = 'var(--border-light)';
                b.style.background = 'transparent';
            });
            const target = e.target;
            target.classList.add('active-filter');
            target.style.borderColor = 'var(--accent-blue)';
            target.style.background = 'rgba(79, 110, 247, 0.1)';

            const filter = target.getAttribute('data-filter');
            const grid = document.getElementById('projects-grid');
            grid.style.opacity = '0';
            grid.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                renderProjects(filter);
                grid.style.opacity = '1';
            }, 300);
        });
    });
}

function initModal() {
    document.getElementById('close-modal').addEventListener('click', closeProjectModal);
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') closeProjectModal();
    });
}

function openProjectModal(project, statusColor, statusText) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalContentArea = document.getElementById('modal-content-area');

    modalBody.innerHTML = `
    <div style="width: 100%; height: 300px; border-radius: 12px; overflow: hidden; margin-bottom: 2rem;">
      <img src="${project.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <span style="background: ${statusColor}; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${statusText}</span>
      <span style="color: var(--text-secondary);">${project.date}</span>
      <span style="background: rgba(79,110,247,0.1); color: var(--accent-blue); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem;">${project.category}</span>
    </div>
    <h2 style="font-size: 1.8rem; margin-bottom: 1.5rem;">${project.title}</h2>
    <div style="color: rgba(255,255,255,0.9); line-height: 1.9; font-size: 1rem; margin-bottom: 2rem;">${project.description.replace(/\n/g, '<br>')}</div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      ${project.tags.map(tag => `<span style="background: rgba(79, 110, 247, 0.1); border: 1px solid var(--accent-blue); color: #a5b4fc; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.9rem;">#${tag}</span>`).join('')}
    </div>
  `;

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modalContentArea.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContentArea = document.getElementById('modal-content-area');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modalContentArea.style.transform = 'translateY(20px)';
    document.body.style.overflow = 'auto';
}
