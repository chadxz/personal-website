/**
 * Theme Toggle Script
 * Manages dark/light/system theme preference with localStorage persistence
 */

const STORAGE_KEY = 'theme-preference';
const LIGHT = 'light';
const DARK = 'dark';
const SYSTEM = 'system';

let mediaQueryListener = null;

// Get the user's theme preference from localStorage or system preference
function getThemePreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === LIGHT || stored === DARK || stored === SYSTEM) {
      return stored;
    }
  } catch {}
  return SYSTEM;
}

// Determine the actual theme to apply (resolving 'system' to 'light' or 'dark')
function getEffectiveTheme(preference) {
  if (preference === SYSTEM) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }
  return preference;
}

// Apply the theme to the document
function applyTheme(preference) {
  const effectiveTheme = getEffectiveTheme(preference);

  if (effectiveTheme === DARK) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Update system preference listener based on current preference
  updateSystemListener(preference);
}

// Manage the system preference change listener
function updateSystemListener(preference) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Remove existing listener if any
  if (mediaQueryListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener);
    mediaQueryListener = null;
  }

  // Only listen for system changes when preference is 'system'
  if (preference === SYSTEM) {
    mediaQueryListener = () => {
      applyTheme(SYSTEM);
      dispatchThemeChanged(SYSTEM);
    };
    mediaQuery.addEventListener('change', mediaQueryListener);
  }
}

// Dispatch theme changed event
function dispatchThemeChanged(theme) {
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
}

// Set theme preference
function setTheme(theme) {
  if (theme !== LIGHT && theme !== DARK && theme !== SYSTEM) {
    theme = SYSTEM;
  }

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}

  applyTheme(theme);
  dispatchThemeChanged(theme);
}

// Initialize theme on page load
function initTheme() {
  const preference = getThemePreference();
  applyTheme(preference);
}

// Get the current theme preference
function getTheme() {
  return getThemePreference();
}

const THEME_LABELS = {
  [SYSTEM]: 'System theme',
  [LIGHT]: 'Light theme',
  [DARK]: 'Dark theme',
};

const THEME_ICONS = {
  [SYSTEM]: `
    <svg class="theme-toggle-icon theme-toggle-icon-system" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 17.4598C17.8179 17.9944 16.5058 18.292 15.1241 18.292C9.92376 18.292 5.70804 14.0762 5.70804 8.87588C5.70804 7.49422 6.00562 6.18206 6.5402 5C3.27319 6.47747 1 9.76523 1 13.5839C1 18.7843 5.21572 23 10.4161 23C14.2348 23 17.5225 20.7268 19 17.4598Z" />
      <path d="M19.4888 4.61889L18.1877 5.91996M12.9834 3.7265L12.9834 1.8865M20.3809 11.124L22.2209 11.124M9.73068 7.87158C11.5271 6.07516 14.4397 6.07516 16.2361 7.87158C18.0325 9.66799 18.0325 12.5805 16.2361 14.377" />
    </svg>
  `,
  [LIGHT]: `
    <svg class="theme-toggle-icon theme-toggle-icon-light" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5"/>
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
    </svg>
  `,
  [DARK]: `
    <svg class="theme-toggle-icon theme-toggle-icon-dark" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  `,
};

// Export for use in templates
window.themeToggle = {
  init: initTheme,
  setTheme: setTheme,
  getTheme: getTheme,
  getEffective: (pref) => getEffectiveTheme(pref || getThemePreference()),
};

function initThemeToggleButtons() {
  const menu = document.querySelector('.theme-toggle-menu');
  const trigger = document.querySelector('#theme-toggle-trigger');
  const options = document.querySelector('#theme-toggle-options');
  const toggleButtons = document.querySelectorAll('.theme-toggle-option');
  if (!menu || !trigger || !options || !toggleButtons.length) return;

  function closeMenu() {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    options.hidden = true;
  }

  function openMenu({ focusOption = false } = {}) {
    menu.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    options.hidden = false;
    if (focusOption) {
      options.querySelector('.theme-toggle-option.active')?.focus();
    }
  }

  function toggleMenu() {
    if (options.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function updateActiveButton() {
    const currentTheme = getThemePreference();
    const currentLabel = THEME_LABELS[currentTheme] || THEME_LABELS[SYSTEM];
    trigger.title = currentLabel;
    trigger.setAttribute('aria-label', currentLabel);
    trigger.innerHTML = THEME_ICONS[currentTheme] || THEME_ICONS[SYSTEM];

    toggleButtons.forEach((btn) => {
      const theme = btn.getAttribute('data-theme');
      const isActive = theme === currentTheme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', String(isActive));
    });
  }

  trigger.addEventListener('click', toggleMenu);

  trigger.addEventListener('keydown', (event) => {
    if (!['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;

    event.preventDefault();
    openMenu({ focusOption: true });
  });

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      updateActiveButton();
      closeMenu();
      trigger.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      trigger.focus();
      return;
    }

    if (options.hidden || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
      return;
    }

    event.preventDefault();
    const items = [...toggleButtons];
    const currentIndex = items.indexOf(document.activeElement);
    const offset = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (currentIndex + offset + items.length) % items.length;
    items[nextIndex].focus();
  });

  updateActiveButton();
  window.addEventListener('theme-changed', updateActiveButton);
}

// Apply theme immediately to minimize FOUC.
initTheme();

// Initialize button behavior when DOM is ready.
if (document.readyState !== 'loading') {
  initThemeToggleButtons();
} else {
  document.addEventListener('DOMContentLoaded', initThemeToggleButtons);
}
