import './style.css';
import { showModal } from './modal.js';

// Mock Data
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Elevate Labs',
    location: 'Remote, US',
    salary: '$140k - $160k',
    tags: ['React', 'TypeScript', 'Tailwind'],
    logoBg: 'linear-gradient(135deg, #4F46E5, #8B5CF6)',
    logoLetter: 'E'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    company: 'CreativSpace',
    location: 'New York, NY',
    salary: '$110k - $130k',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    logoBg: 'linear-gradient(135deg, #EC4899, #F43F5E)',
    logoLetter: 'C'
  },
  {
    id: 3,
    title: 'Backend Developer (Go)',
    company: 'FinSync',
    location: 'London, UK / Hybrid',
    salary: '$130k - $150k',
    tags: ['Go', 'Kubernetes', 'Microservices'],
    logoBg: 'linear-gradient(135deg, #10B981, #059669)',
    logoLetter: 'F'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Aura Analytics',
    location: 'San Francisco, CA',
    salary: '$150k - $180k',
    tags: ['Python', 'Machine Learning', 'SQL'],
    logoBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
    logoLetter: 'A'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudWorks',
    location: 'Remote, Global',
    salary: '$120k - $145k',
    tags: ['AWS', 'Terraform', 'CI/CD'],
    logoBg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    logoLetter: 'C'
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'NextGen',
    location: 'Austin, TX / Hybrid',
    salary: '$135k - $155k',
    tags: ['Agile', 'Strategy', 'B2B'],
    logoBg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    logoLetter: 'N'
  }
];

// Helper to Create Job Card HTML
function createJobCard(job) {
  return `
    <article class="job-card" data-id="${job.id}">
      <div class="job-header">
        <div class="company-logo" style="background: ${job.logoBg}; color: white;">
          ${job.logoLetter}
        </div>
        <button class="bookmark-btn" aria-label="Save Job">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      <div>
        <h3 class="job-title">${job.title}</h3>
        <p class="company-name">${job.company} · ${job.location}</p>
      </div>
      <div class="job-tags">
        ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="job-footer">
        <div class="job-salary">
          ${job.salary} <span>/yr</span>
        </div>
        <button class="btn-apply btn-animate">Apply Now</button>
      </div>
    </article>
  `;
}

// Render Jobs
function renderJobs() {
  const container = document.getElementById('jobs-container');
  if (container) {
    container.innerHTML = jobs.map(createJobCard).join('');
  }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderJobs();

  // Salary Slider Value Update
  const slider = document.getElementById('salary-slider');
  const salaryValue = document.getElementById('salary-value');

  if (slider && salaryValue) {
    slider.addEventListener('input', (e) => {
      salaryValue.textContent = `$${e.target.value}k+`;
    });
  }

  // Bookmarks & Apply interaction
  document.getElementById('jobs-container').addEventListener('click', (e) => {
    const bookmarkBtn = e.target.closest('.bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.classList.toggle('active');
      const svg = bookmarkBtn.querySelector('svg');
      if (bookmarkBtn.classList.contains('active')) {
        svg.setAttribute('fill', 'currentColor');
      } else {
        svg.setAttribute('fill', 'none');
      }
      return;
    }

    const applyBtn = e.target.closest('.btn-apply');
    if (applyBtn) {
      const card = applyBtn.closest('.job-card');
      const jobId = parseInt(card.dataset.id);
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        showModal({
          title: job.title,
          subtitle: `${job.company} · ${job.location}`,
          icon: job.logoLetter,
          iconBg: job.logoBg,
          contentHTML: `
            <div class="modal-tags">
              ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <h4>Compensation</h4>
            <p>${job.salary} /yr</p>
            <h4>About the Role</h4>
            <p>We are looking for a talented ${job.title} to join our growing team. You will have the opportunity to work on highly impactful projects with cutting-edge technologies.</p>
            <ul>
              <li>Lead design and development of critical systems.</li>
              <li>Work cross-functionally with product and engineering teams.</li>
              <li>Contribute to the culture and technical direction of the company.</li>
            </ul>
          `,
          actionText: 'Apply Now',
          actionCallback: (btn, close) => {
            btn.innerHTML = 'Applying...';
            btn.style.opacity = '0.8';
            setTimeout(() => {
              btn.innerHTML = 'Applied!';
              btn.style.opacity = '1';
              btn.style.background = 'var(--success)';
              btn.style.pointerEvents = 'none';

              applyBtn.innerHTML = 'Applied';
              applyBtn.style.color = 'var(--success)';
              applyBtn.style.borderColor = 'var(--success)';

              setTimeout(close, 1000);
            }, 800);
          }
        });
      }
    }
  });

  // Search button interaction
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchBtn.innerHTML = 'Searching...';
      searchBtn.style.opacity = '0.8';

      setTimeout(() => {
        searchBtn.innerHTML = 'Search Jobs';
        searchBtn.style.opacity = '1';
        // Mock re-rendering random jobs to simulate search
        const shuffled = [...jobs].sort(() => 0.5 - Math.random());
        const container = document.getElementById('jobs-container');
        container.style.opacity = '0';
        setTimeout(() => {
          container.innerHTML = shuffled.slice(0, 4).map(createJobCard).join('');
          container.style.opacity = '1';
        }, 300);
      }, 800);
    });
  }
});
