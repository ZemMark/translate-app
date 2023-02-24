const refs = {
  form: document.getElementById('form'),
  inputQuery: document.getElementById('query'),
  output: document.getElementById('output'),
  matchList: document.querySelector('.match'),
};
refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { value } = refs.inputQuery;
  getTranslate(value, implementMatches);
}

function implementMatches(match) {
  console.log('matches: ', match);

  refs.matchList.innerHTML = match;
}
async function getTranslate(query, callback) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q="${query}"!&langpair=en|de`
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

// function showResult() {
// refs.output.textContent =
// }
