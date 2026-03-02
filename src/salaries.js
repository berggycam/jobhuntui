import './style.css';
import { showModal } from './modal.js';

// Mock Data for Salaries
const salaries = [
  {
    id: 1,
    role: 'Software Engineer',
    entry: '$90k',
    average: '$120,500',
    senior: '$160k+',
    demand: '+14% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
  },
  {
    id: 2,
    role: 'Product Manager',
    entry: '$105k',
    average: '$135,200',
    senior: '$180k+',
    demand: '+11% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
  },
  {
    id: 3,
    role: 'Data Scientist',
    entry: '$100k',
    average: '$142,000',
    senior: '$190k+',
    demand: '+18% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>'
  },
  {
    id: 4,
    role: 'UX/UI Designer',
    entry: '$80k',
    average: '$110,000',
    senior: '$145k+',
    demand: '+8% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'
  },
  {
    id: 5,
    role: 'DevOps Engineer',
    entry: '$110k',
    average: '$145,500',
    senior: '$185k+',
    demand: '+21% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>'
  },
  {
    id: 6,
    role: 'Marketing Director',
    entry: '$115k',
    average: '$155,000',
    senior: '$210k+',
    demand: '+5% YoY',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
  }
];

function createSalaryCard(item) {
  return `
    <article class="job-card salary-card" data-id="${item.id}" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 2rem; gap: 2rem; margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 1.5rem; flex: 2;">
        <div class="role-icon" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-primary);">
          <div style="width: 24px; height: 24px;">${item.icon}</div>
        </div>
        <div>
          <h3 class="job-title" style="margin-bottom: 0.25rem;">${item.role}</h3>
          <span style="color: var(--success); font-size: 0.85rem; background: rgba(16, 185, 129, 0.1); padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); font-weight: 500;">Demand: ${item.demand}</span>
        </div>
      </div>
      
      <div style="flex: 1; text-align: center;">
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Entry Level</p>
        <p style="font-weight: 600; font-size: 1.1rem;">${item.entry}</p>
      </div>

      <div style="flex: 1; text-align: center; background: rgba(79, 70, 229, 0.1); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(79, 70, 229, 0.2);">
        <p style="color: var(--primary); font-size: 0.85rem; margin-bottom: 0.25rem; font-weight: 600;">Average</p>
        <p style="font-weight: 700; font-size: 1.3rem; color: var(--text-primary);">${item.average}</p>
      </div>

      <div style="flex: 1; text-align: center;">
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Senior Level</p>
        <p style="font-weight: 600; font-size: 1.1rem;">${item.senior}</p>
      </div>

      <div style="flex: 1; display: flex; justify-content: flex-end;">
        <button class="btn-apply btn-animate">View Jobs</button>
      </div>
    </article>
  `;
}

// Render Salaries
function renderSalaries() {
  const container = document.getElementById('salaries-container');
  if (container) {
    container.innerHTML = salaries.map(createSalaryCard).join('');
  }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderSalaries();

  // Setup modal interaction
  document.getElementById('salaries-container').addEventListener('click', (e) => {
    const viewJobsBtn = e.target.closest('.btn-apply');
    if (viewJobsBtn) {
      const card = viewJobsBtn.closest('.salary-card');
      const salaryId = parseInt(card.dataset.id);
      const sal = salaries.find(s => s.id === salaryId);
      if (sal) {
        showModal({
          title: sal.role,
          subtitle: 'Salary Data & Insights',
          icon: sal.icon,
          iconBg: 'rgba(255, 255, 255, 0.05)',
          contentHTML: `
                        <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                            <div style="flex:1; background:var(--surface); padding: 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center;">
                                <div style="font-size:0.85rem; color:var(--text-secondary);">Entry Level</div>
                                <div style="font-size:1.2rem; font-weight:700;">${sal.entry}</div>
                            </div>
                            <div style="flex:1; background:rgba(79, 70, 229, 0.15); padding: 1rem; border-radius:var(--radius-md); border:1px solid rgba(79, 70, 229, 0.3); text-align:center;">
                                <div style="font-size:0.85rem; color:var(--primary); font-weight:600;">Average</div>
                                <div style="font-size:1.3rem; font-weight:800;">${sal.average}</div>
                            </div>
                            <div style="flex:1; background:var(--surface); padding: 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); text-align:center;">
                                <div style="font-size:0.85rem; color:var(--text-secondary);">Senior Level</div>
                                <div style="font-size:1.2rem; font-weight:700;">${sal.senior}</div>
                            </div>
                        </div>
                        <h4>Market Demand</h4>
                        <p>The role of ${sal.role} has seen tremendous growth over the last quarter, with demand up <strong>${sal.demand}</strong>. New opportunities are rapidly increasing globally.</p>
                    `,
          actionText: `View Jobs (${sal.role})`,
          actionCallback: (btn, close) => {
            btn.innerHTML = 'Searching...';
            setTimeout(() => {
              window.location.href = '/';
            }, 600);
          }
        });
      }
    }
  });

  // Search button interaction
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchBtn.innerHTML = 'Searching Roles...';
      searchBtn.style.opacity = '0.8';

      setTimeout(() => {
        searchBtn.innerHTML = 'Search Roles';
        searchBtn.style.opacity = '1';
        // Mock re-rendering to simulate search
        const container = document.getElementById('salaries-container');
        container.style.opacity = '0';
        setTimeout(() => {
          container.innerHTML = [...salaries].sort(() => 0.5 - Math.random()).map(createSalaryCard).join('');
          container.style.opacity = '1';
        }, 300);
      }, 600);
    });
  }
});
