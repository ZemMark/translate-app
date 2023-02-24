const refs = {
  form: document.getElementById('form'),
  inputQuery: document.getElementById('query'),
  output: document.getElementById('output'),
  matchList: document.getElementById('match'),
};
refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { value } = refs.inputQuery;
  getTranslate(value, function (translationResult) {
    console.log(translationResult);
    const match = showMatch(translationResult);
    console.log('match: ', match);
    refs.matchList.textContent = match;
  });
}
function showMatch(match) {
  return `
    <li id="match-item">${match}</li>
  `;
}

async function getTranslate(query, callback) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q="${query}"!&langpair=en|de`
    );
    const data = res.json();
    const translate = await data;
    // console.log(translate.responseData.translatedText);
    const matches = translate.matches;
    const matchesAll = matches.map(el => console.log(el));

    refs.output.textContent = translate.responseData.translatedText;
    callback(matches);
  } catch (error) {
    console.log('error', error);
  }

  // return ;
}

// function showResult() {
// refs.output.textContent =
// }
