// contact-page.js - 비즈니스 제안 페이지
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = '✓ 제안이 전송되었습니다!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => {
            btn.innerHTML = '<i class="ri-send-plane-line"></i> 협업 제안하기';
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    });
});
