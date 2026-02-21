// members-page.js - 연구원 페이지 전용
import { members } from './members.js';
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();
    renderMembers();
});

function renderMembers() {
    const grid = document.getElementById('members-grid');
    grid.innerHTML = '';

    members.forEach((member, index) => {
        const delayClass = `stagger-${(index % 4) + 1}`;

        const card = document.createElement('div');
        card.className = `flip-card reveal-up ${delayClass}`;
        card.style.height = '370px';

        card.innerHTML = `
      <div class="flip-card-inner">
        <!-- Front -->
        <div class="flip-card-front glass-card" style="padding: 0; display: flex; flex-direction: column;">
          <div style="height: 60%; overflow: hidden;">
            <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(10%);">
          </div>
          <div style="padding: 1.5rem; text-align: left;">
            <div style="color: var(--accent-blue); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.3rem;">${member.role}</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 0.3rem;">${member.name}</h3>
            <div style="color: var(--text-secondary); font-size: 0.9rem;">${member.major}</div>
            <div style="margin-top: 0.8rem; color: rgba(255,255,255,0.3); font-size: 0.75rem; letter-spacing: 0.05em;">hover to see more</div>
          </div>
        </div>

        <!-- Back -->
        <div class="flip-card-back">
          <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin-bottom: 1rem; border: 2px solid var(--accent-blue);">
            <img src="${member.image}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.2rem; color: var(--accent-blue);">${member.name}</h3>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">${member.major}</div>
          <div style="width: 40px; height: 2px; background: var(--accent-purple); margin-bottom: 1.2rem;"></div>
          <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem; line-height: 1.7; text-align: center;">
            "${member.description}"
          </p>
        </div>
      </div>
    `;

        grid.appendChild(card);
    });

    setTimeout(() => initScrollAnimations(), 50);
}
