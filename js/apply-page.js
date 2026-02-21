// apply-page.js - 연구원 지원 페이지
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initScrollAnimations();

    document.getElementById('apply-form-el').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.innerHTML = '✓ 지원이 완료되었습니다!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.style.color = 'white';

        // Show encouraging message
        const msg = document.createElement('div');
        msg.style.cssText = 'margin-top: 1.5rem; padding: 1.5rem; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; text-align: center; color: #6ee7b7; line-height: 1.8;';
        msg.innerHTML = '🎉 <strong style="color: white;">지원해 주셔서 감사합니다!</strong><br>연구소의 문은 언제나 열려있습니다. 조만간 연락드리겠습니다.';
        e.target.appendChild(msg);

        setTimeout(() => {
            btn.innerHTML = '<i class="ri-heart-line"></i> 용기 내어 지원하기';
            btn.style.background = '';
            btn.style.color = '';
            msg.remove();
            e.target.reset();
        }, 5000);
    });
});
