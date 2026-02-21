// main.js - index.html 메인 랜딩 페이지 전용
import { initNavigation, initParticles, initScrollAnimations } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
});

// Typing Effect for Hero Section
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = [
        "우리는 데이터로 더 나은 세상을 만듭니다.",
        "직관을 넘어선 수학적 분석과 추론.",
        "주변의 작은 문제에서 시작되는 거대한 혁신.",
        "모두를 위한 데이터 사이언스 연구소."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    setTimeout(type, 1000);
}
