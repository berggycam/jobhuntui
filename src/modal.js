export function showModal(options) {
    // options: { title, subtitle, icon, iconBg, contentHTML, actionText, actionCallback }
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="modal-header">
        ${options.icon ? `<div class="modal-header-icon" style="background: ${options.iconBg || 'var(--primary)'}">${options.icon}</div>` : ''}
        <div>
          <h2 class="modal-title">${options.title}</h2>
          <div class="modal-subtitle">${options.subtitle}</div>
        </div>
      </div>
      <div class="modal-body">
        ${options.contentHTML}
      </div>
      <div class="modal-footer">
        <button class="modal-btn-secondary btn-cancel">Close</button>
        <button class="btn btn-primary btn-action">${options.actionText || 'Confirm'}</button>
      </div>
    </div>
  `;

    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => overlay.classList.add('active'), 10);

    const closeBtn = overlay.querySelector('.modal-close');
    const cancelBtn = overlay.querySelector('.btn-cancel');
    const actionBtn = overlay.querySelector('.btn-action');

    const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 400); // Wait for transition
    };

    closeBtn.addEventListener('click', close);
    cancelBtn.addEventListener('click', close);

    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            if (options.actionCallback) {
                options.actionCallback(actionBtn, close);
            } else {
                close();
            }
        });
    }

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
}
