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

// Export for use in templates
window.themeToggle = {
  init: initTheme,
  setTheme: setTheme,
  getTheme: getTheme,
  getEffective: (pref) => getEffectiveTheme(pref || getThemePreference()),
};

function initThemeToggleButtons() {
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  if (!toggleButtons.length) return;

  function updateActiveButton() {
    const currentTheme = getThemePreference();
    toggleButtons.forEach((btn) => {
      const theme = btn.getAttribute('data-theme');
      const isActive = theme === currentTheme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
      updateActiveButton();
    });
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
