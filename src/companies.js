import './style.css';
import { showModal } from './modal.js';

// Mock Data
const companies = [
  {
    id: 1,
    name: 'Elevate Labs',
    industry: 'Technology',
    headquarters: 'Remote Workspace',
    jobsOpen: 45,
    rating: 4.8,
    description: 'Pioneering the future of remote work platforms with cutting-edge tools and a developer-first culture.',
    logoBg: 'linear-gradient(135deg, #4F46E5, #8B5CF6)',
    logoLetter: 'E'
  },
  {
    id: 2,
    name: 'CreativSpace',
    industry: 'Design Software',
    headquarters: 'New York, NY',
    jobsOpen: 12,
    rating: 4.6,
    description: 'Empowering creatives worldwide with intuitive design systems and powerful prototyping software.',
    logoBg: 'linear-gradient(135deg, #EC4899, #F43F5E)',
    logoLetter: 'C'
  },
  {
    id: 3,
    name: 'FinSync',
    industry: 'FinTech',
    headquarters: 'London, UK',
    jobsOpen: 28,
    rating: 4.5,
    description: 'Revolutionizing global secure payments with scalable Go microservices and Kubernetes infrastructure.',
    logoBg: 'linear-gradient(135deg, #10B981, #059669)',
    logoLetter: 'F'
  },
  {
    id: 4,
    name: 'Aura Analytics',
    industry: 'Data & AI',
    headquarters: 'San Francisco, CA',
    jobsOpen: 34,
    rating: 4.9,
    description: 'Unleashing the power of machine learning algorithms to give businesses real-time insights from raw data.',
    logoBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
    logoLetter: 'A'
  },
  {
    id: 5,
    name: 'CloudWorks',
    industry: 'Cloud Infrastructure',
    headquarters: 'Seattle, WA',
    jobsOpen: 76,
    rating: 4.3,
    description: 'Providing robust and highly secure continuous integration frameworks and edge computing platforms.',
    logoBg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    logoLetter: 'C'
  },
  {
    id: 6,
    name: 'NextGen',
    industry: 'SaaS Platforms',
    headquarters: 'Austin, TX',
    jobsOpen: 18,
    rating: 4.7,
    description: 'Building agile enterprise B2B strategies and digital experiences for Fortune 500 companies.',
    logoBg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    logoLetter: 'N'
  }
];

// Helper to Create Company Card HTML
function createCompanyCard(company) {
  return `
    <article class="job-card company-card" data-id="${company.id}">
      <div class="job-header">
        <div class="company-logo" style="background: ${company.logoBg}; color: white; width: 64px; height: 64px; font-size: 1.5rem;">
          ${company.logoLetter}
        </div>
        <div class="rating-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            ${company.rating}
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <h3 class="job-title" style="margin-bottom: 0.25rem;">${company.name}</h3>
        <p class="company-name">${company.industry} · ${company.headquarters}</p>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.5; margin-top: auto;">
        ${company.description}
      </p>
      <div class="job-footer" style="padding-top: 1rem;">
        <div class="job-salary" style="font-size: 0.9rem; font-weight: 500;">
          <span style="color: var(--text-primary); font-weight: 700; font-size: 1.1rem;">${company.jobsOpen}</span> open roles
        </div>
        <button class="btn-apply btn-animate">Explore Jobs</button>
      </div>
    </article>
  `;
}

// Render Companies
function renderCompanies() {
  const container = document.getElementById('companies-container');
  if (container) {
    container.innerHTML = companies.map(createCompanyCard).join('');
  }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderCompanies();

  // Setup modal interaction
  document.getElementById('companies-container').addEventListener('click', (e) => {
    const exploreBtn = e.target.closest('.btn-apply');
    if (exploreBtn) {
      const card = exploreBtn.closest('.company-card');
      const companyId = parseInt(card.dataset.id);
      const company = companies.find(c => c.id === companyId);
      if (company) {
        showModal({
          title: company.name,
          subtitle: `${company.industry} · ${company.headquarters}`,
          icon: company.logoLetter,
          iconBg: company.logoBg,
          contentHTML: `
                        <h4>Company Overview</h4>
                        <p>${company.description}</p>
                        <h4>Key Details</h4>
                        <ul>
                            <li><strong>Rating:</strong> ⭐ ${company.rating} / 5.0</li>
                            <li><strong>Open Positions:</strong> ${company.jobsOpen} active roles</li>
                            <li><strong>Industry:</strong> ${company.industry}</li>
                        </ul>
                        <p>Join ${company.name} and be part of an innovative team pushing boundaries in the ${company.industry} sector. With top-tier benefits, flexible work environments, and a vibrant culture, it's an excellent place to quickly accelerate your career.</p>
                    `,
          actionText: 'Explore Openings',
          actionCallback: (btn, close) => {
            btn.innerHTML = 'Redirecting...';
            setTimeout(() => {
              window.location.href = '/';
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
        searchBtn.innerHTML = 'Search Companies';
        searchBtn.style.opacity = '1';
        // Mock re-rendering random companies to simulate search
        const shuffled = [...companies].sort(() => 0.5 - Math.random());
        const container = document.getElementById('companies-container');
        container.style.opacity = '0';
        setTimeout(() => {
          container.innerHTML = shuffled.slice(0, 4).map(createCompanyCard).join('');
          container.style.opacity = '1';
        }, 300);
      }, 800);
    });
  }
});
