import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.getElementById('form'),
  inputQuery: document.getElementById('query'),
  output: document.getElementById('output'),
  matchList: document.querySelector('.match'),
  optionsLangFrom: document.getElementById('langFrom'),
  optionsLangTo: document.getElementById('langTo'),
  controlsList: document.querySelector('.controls'),
};
refs.form.addEventListener('submit', onSubmit);
refs.controlsList.addEventListener('click', onIconCLick);

function onSubmit(e) {
  e.preventDefault();
  const { value } = refs.inputQuery;
  const fromLang = refs.optionsLangFrom.value;
  const langTo = refs.optionsLangTo.value;
  getTranslate(value, implementMatches, fromLang, langTo);
}

function implementMatches(match) {
  console.log('matches: ', match);

  refs.matchList.innerHTML = match;
}
async function getTranslate(query, callback, fromLang, langTo) {
  console.log('langs :', fromLang, langTo);
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q="${query}"!&langpair=${fromLang}|${langTo}`
    );
    const data = res.json();
    const translate = await data;
    console.log(translate);
    // const matches = translate.matches.map(match => match.segment);
    const matches = translate.matches
      .map(el => {
        return `
        <li><p>${el.segment}</p></li>
      `;
      })
      .join('');
    console.log(matches);

    refs.output.textContent = translate.responseData.translatedText;
    callback(matches);
  } catch (error) {
    console.dir(error);
  }

  // return ;
}
function onIconCLick(e) {
  // console.log(e.target);

  if (e.target.getAttribute('data-action') === 'speeck') {
    if (e.target.id === 'from') {
      console.log('on sound click (from)');
      playSound(refs.inputQuery.value, refs.optionsLangFrom.value);
      console.log(refs.inputQuery.value, refs.optionsLangFrom.value);

      return;
    }
    console.log('on sound click (to)');
    playSound(refs.output.value, refs.optionsLangTo.value);
    console.log(refs.inputQuery.value, refs.optionsLangTo.value);
  }
  if (e.target.getAttribute('data-action') === 'copy') {
    if (e.target.id === 'from') {
      console.log('on copy click (from)');
      copyText(refs.inputQuery.value);
      seccussesCopy();
      return;
    }
    copyText(refs.output.value);
    console.log('on copy click(to)');
    seccussesCopy();
  }
  if (e.target.getAttribute('data-action') === 'reverse') {
    console.log('reverse languages');
  }
}
function playSound(value, lang) {
  let utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = lang;
  console.log('plaing');
  speechSynthesis.speak(utterance);
}
function copyText(value) {
  navigator.clipboard.writeText(value);
}
function seccussesCopy() {
  Notify.success('text copied');
}
function reverseQuerys() {}
// function showResult() {
// refs.output.textContent =
// }
