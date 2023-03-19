import { Notify } from 'notiflix/build/notiflix-notify-aio';
import themeSwitcher from './js/theme-switcher';
Notify.init({
  position: 'center-top',
  opacity: 0.6,
  success: {
    background: 'var(--buttons)',
  },
  info: {
    background: 'var(--buttons)',
  },
});

const refs = {
  form: document.getElementById('form'),
  inputQuery: document.getElementById('query'),
  output: document.getElementById('output'),
  matchList: document.querySelector('.match'),
  optionsLangFrom: document.getElementById('langFrom'),
  optionsLangTo: document.getElementById('langTo'),
  controlsList: document.querySelectorAll('.controls'),
  copyBtnsRef: document.querySelectorAll('li'),
  reverseLanguage: document.querySelector('.reverse-button'),
};
console.log(refs.copyBtnsRef);
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
console.log(refs.controlsList);
refs.form.addEventListener('submit', onSubmit);
refs.controlsList[0].addEventListener('click', onIconCLick);
refs.controlsList[1].addEventListener('click', onIconCLick);
refs.reverseLanguage.addEventListener('click', reverseLang);
window.addEventListener('keydown', onEnterPress);

function onSubmit(e) {
  e.preventDefault();
  const value = refs.inputQuery.value.trim();
  const fromLang = refs.optionsLangFrom.value;
  const langTo = refs.optionsLangTo.value;
  returnWhiteColorAfterClickCopy();
  if (!value) {
    return;
  }
  getTranslate(value, fromLang, langTo);
}

async function getTranslate(query, fromLang, langTo) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q="${query}"!&langpair=${fromLang}|${langTo}`
    );
    if (!res.ok) {
      throw new Error('failed fatch!');
    }
    const data = res.json();
    const translate = await data;

    refs.output.textContent = translate.responseData.translatedText;
  } catch (error) {
    console.dir(error);
  }
}
function onIconCLick(e) {
  if (e.target.getAttribute('data-action') === 'speeck') {
    if (e.target.id === 'from') {
      console.log('on sound click (from)');
      playSound(refs.inputQuery.value, refs.optionsLangFrom.value);
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
        copyText(refs.inputQuery.value);
        seccussesCopy();
        return;
      }
      copyText(refs.output.value);
    }
    seccussesCopy();
  }
  if (e.target.getAttribute('data-action') === 'reverse') {
    console.log('reverse languages');
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
// function reverseLang() {
//   let temporaryText = refs.inputQuery.value,
//     temporaryLang = refs.optionsLangFrom.value;
//   refs.inputQuery.value = refs.output.value;
//   refs.output.value = temporaryText;
//   refs.optionsLangFrom.value = refs.optionsLangTo.value;
//   refs.optionsLangTo.value = temporaryLang;

//   refs.optionsLangTo.value = temporaryLang;
//   console.log(
//     'from:',
//     refs.optionsLangFrom.value,
//     'to:',
//     refs.optionsLangTo.value
//   );
// }
function reverseLang() {
  let temporaryText = refs.inputQuery.value,
    temporaryLang = refs.optionsLangFrom.value;
  refs.inputQuery.value = refs.output.textContent;
  refs.output.textContent = temporaryText;
  refs.optionsLangFrom.value = refs.optionsLangTo.value;
  refs.optionsLangTo.value = temporaryLang;
  console.log('temporaryLang', temporaryLang, refs.optionsLangTo);

  const value = refs.output.textContent.trim();
  const fromLang = refs.optionsLangFrom.value;
  const langTo = refs.optionsLangTo.value;
  if (!value) {
    return;
  }
  getTranslate(value, fromLang, langTo);

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
function changeColorAfterClickandSeccusses() {
  refs.copyBtnsRef.forEach(el =>
    el.addEventListener('click', () => {
      el.classList.add('copied');
      console.log('copied from: ', el);
    })
  );
}
function returnWhiteColorAfterClickCopy() {
  refs.copyBtnsRef.forEach(el => {
    if (el.classList.contains('copied')) {
      el.classList.remove('copied');
    }
  });
}
