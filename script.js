function openCV() {
  window.open('Sazzad.pdf', '_blank', 'noopener,noreferrer');
  return false; // This prevents any default behavior
}
// Cursor Logic
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, isMoving = false;

const updateCursor = () => {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(updateCursor);
};

const createRipple = (x, y) => {
  const ripple = document.createElement('div');
  ripple.className = 'cursor-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!isMoving) {
    isMoving = true;
    setTimeout(() => isMoving = false, 50);
    createRipple(e.clientX, e.clientY);
  }
});

updateCursor();

// Smooth scroll for sidebar links
document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px' });

// PDF Download Handler
document.getElementById('cvDownload').addEventListener('click', function(e) {
  // First try programmatic download
  try {
    const link = document.createElement('a');
    link.href = 'Sazzad.pdf';
    link.download = 'MD_Sazzad_Hossain_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // If not successful, open in new tab
    setTimeout(() => {
      if (!document.querySelector('embed[type="application/pdf"]')) {
        window.open('Sazzad.pdf', '_blank');
      }
    }, 1000);
    
  } catch (error) {
    window.open('Sazzad.pdf', '_blank');
  }
  
  e.preventDefault();
});

