const t={form:document.getElementById("form"),inputQuery:document.getElementById("query"),output:document.getElementById("output"),matchList:document.getElementById("match")};t.form.addEventListener("submit",(function(e){e.preventDefault();const{value:n}=t.inputQuery;!async function(e,n){try{const o=(await fetch(`https://api.mymemory.translated.net/get?q="${e}"!&langpair=en|de`)).json(),c=await o,a=c.matches;a.map((t=>console.log(t)));t.output.textContent=c.responseData.translatedText,n(a)}catch(t){console.log("error",t)}}(n,(function(e){console.log(e);const n=function(t){return`\n    <li id="match-item">${t}</li>\n  `}(e);console.log("match: ",n),t.matchList.textContent=n}))}));
//# sourceMappingURL=index.2a018907.js.map
