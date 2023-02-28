export default function themeSwitch() {
  const rootEl = document.documentElement;
  let dataTheme = rootEl.getAttribute('data-theme'),
    newTheme;
  newTheme = dataTheme === 'light' ? 'dark' : 'light';
  console.log(dataTheme);
  rootEl.setAttribute('data-theme', newTheme);
}
document
  .querySelector('.theme-switcher')
  .addEventListener('click', themeSwitch);
