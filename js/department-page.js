// department-page.js - 학과 소개 페이지 전용
import { departmentInfo } from './department.js';
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    renderProfessors();
});

function renderProfessors() {
    const grid = document.getElementById('professors-grid');
    if (!grid) return;

    grid.innerHTML = departmentInfo.professors.map((prof, index) => `
    <div class="glass-card reveal-up stagger-${index + 1}" style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: start;">
      <div style="text-align: center;">
        <img src="${prof.image}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(79,110,247,0.4); display: block;">
      </div>
      <div>
        <h3 style="font-size: 1.4rem; margin-bottom: 0.3rem;">${prof.name}</h3>
        <div style="color: var(--accent-purple); font-size: 0.9rem; font-weight: 600; margin-bottom: 0.8rem;">${prof.title}</div>
        <div style="margin-bottom: 1rem;">
          <span style="background: rgba(79,110,247,0.1); border: 1px solid rgba(79,110,247,0.3); color: #a5b4fc; padding: 0.25rem 0.8rem; border-radius: 4px; font-size: 0.8rem;">연구분야: ${prof.research}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8; font-style: italic; border-left: 3px solid rgba(124,58,237,0.4); padding-left: 1rem;">
          "${prof.description}"
        </p>
      </div>
    </div>
  `).join('');

    setTimeout(() => initScrollAnimations(), 50);
}
