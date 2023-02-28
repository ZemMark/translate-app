import { Notify } from 'notiflix/build/notiflix-notify-aio';
import themeSwitcher from './js/theme-switcher';
const refs = {
  form: document.getElementById('form'),
  inputQuery: document.getElementById('query'),
  output: document.getElementById('output'),
  matchList: document.querySelector('.match'),
  optionsLangFrom: document.getElementById('langFrom'),
  optionsLangTo: document.getElementById('langTo'),
  controlsList: document.querySelectorAll('.controls'),
};
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
console.log(refs.controlsList);
refs.form.addEventListener('submit', onSubmit);
refs.controlsList[0].addEventListener('click', onIconCLick);
refs.controlsList[1].addEventListener('click', onIconCLick);
window.addEventListener('keydown', onEnterPress);

function onSubmit(e) {
  e.preventDefault();
  const value = refs.inputQuery.value.trim();
  const fromLang = refs.optionsLangFrom.value;
  const langTo = refs.optionsLangTo.value;
  if (!value) {
    return;
  }
  // getTranslate(value, implementMatches, fromLang, langTo);
  getTranslate(value, fromLang, langTo);
}

// function implementMatches(match) {
//   // console.log('matches: ', match);

//   refs.matchList.innerHTML = match;
// }
// async function getTranslate(query, callback, fromLang, langTo) {
async function getTranslate(query, fromLang, langTo) {
  // console.log('langs :', fromLang, langTo);
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q="${query}"!&langpair=${fromLang}|${langTo}`
    );
    if (!res.ok) {
      throw new Error('failed fatch!');
    }
    const data = res.json();
    const translate = await data;
    // console.log(translate);
    // const matches = translate.matches.map(match => match.segment);
    // const matches = translate.matches
    //   .map(el => {
    //     return `
    //     <li><p>${el.segment}</p></li>
    //   `;
    //   })
    //   .join('');
    // console.log(matches);

    refs.output.textContent = translate.responseData.translatedText;
    // callback(matches);
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
      // console.log(refs.inputQuery.value, refs.optionsLangFrom.value);
      plaingIsProcessing();

      return;
    }
    console.log('on sound click (to)');
    playSound(refs.output.value, refs.optionsLangTo.value);
    console.log(refs.inputQuery.value, refs.optionsLangTo.value);
    plaingIsProcessing();
  }
  if (e.target.getAttribute('data-action') === 'copy') {
    if (e.target.getAttribute('data-action') === 'copy') {
      if (e.target.id === 'from') {
        // console.log('on copy click (from)');
        copyText(refs.inputQuery.value);
        seccussesCopy();
        changeColorAfterClickandSeccusses(e);
        return;
      }
      copyText(refs.output.value);
    }
    // console.log('on copy click(to)');
    seccussesCopy();
    changeColorAfterClickandSeccusses(e);
  }
  if (e.target.getAttribute('data-action') === 'reverse') {
    console.log('reverse languages');
    reverseLang();
  }
}
function playSound(value, lang) {
  let utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}
function copyText(value) {
  navigator.clipboard.writeText(value);
}
function reverseLang() {
  let temporaryText = refs.inputQuery.value,
    temporaryLang = refs.optionsLangFrom.value;
  refs.optionsLangFrom.value = refs.optionsLangTo.value;
  refs.optionsLangTo.value = temporaryLang;
  console.log(
    'from:',
    refs.optionsLangFrom.value,
    'to:',
    refs.optionsLangTo.value
  );
}
function seccussesCopy() {
  if (!isMobile) {
    Notify.success('text copied');
  }
}
function plaingIsProcessing() {
  if (!isMobile) {
    Notify.info('processing sound');
  }
}
function onEnterPress(e) {
  if (e.code === 'Enter') {
    onSubmit(e);
  }
}
function changeColorAfterClickandSeccusses(e) {
  e.target.style.color = 'green';
}
// function showResult() {
// refs.output.textContent =
// }
