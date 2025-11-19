(function() {
  const searchParams = new URLSearchParams(window.location.search);
  const keywords = (searchParams.get('search') || '').trim();
  const searchInput = document.getElementById('search-input');
  const resultContainer = document.getElementById('search-result');
  const emptyResult = document.getElementById('search-result-empty');

  if (keywords) {
    searchInput.value = keywords;
    search(keywords);
  } else {
    return;
  }

  const fuseOptions = {
    ignoreLocation: true,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: searchOptions.minMatchCharLength,
    threshold: searchOptions.threshold,
    keys: [
      {name: "title", weight: 0.8},
      {name: "content", weight: 0.5},
      {name: "tags", weight: 0.2},
      {name: "categories", weight: 0.2},
      {name: "type", weight: 0.1},
      {name: "parent.title", weight: 0.1},
    ],
  };

  function search(keywords) {
    fetch('./index.json').then(response => response.json()).then(data => {
      const fuse = new Fuse(data, fuseOptions);
      const result = fuse.search(keywords);
      if (result.length > 0) {
        showResult(keywords, result);
        emptyResult.classList.add('hidden');
      } else {
        resultContainer.innerHTML = '';
        emptyResult.classList.remove('hidden');
      }
    });
  }

  const resultTemplate = `
  <article class="flex flex-col gap-y-3 p-6 mt-6 mx-2 md:mx-0 rounded-lg shadow-md bg-white dark:bg-gray-700" id="result-{{= it.index }}">
    <h2 class="text-4xl font-semibold text-slate-800 dark:text-slate-200">
      <a href="{{= it.permalink }}">{{! it.title }}</a>
    </h2>
    <div class="text-sm text-slate-600 dark:text-slate-300">
      <span class="mr-2 px-2 py-1 rounded border border-violet-800 bg-violet-700 text-slate-50">
        {{? it.type === 'subpesquisa' }}{{= it.i18n.type_sub }}{{??}}{{= it.i18n.type_pesquisa }}{{?}}
      </span>
      {{? it.parent && it.parent.title }}
        <span>
          {{= it.i18n.of }} <a class="underline" href="{{= it.parent.permalink }}">{{! it.parent.title }}</a>
        </span>
      {{?}}
    </div>
    <h3 class="my-4 text-large text-slate-600 dark:text-slate-300">
      {{! it.snippet }}
    </h3>
    <ul class="flex flex-row flex-wrap text-slate-500 dark:text-slate-300">
      {{~ it.categories :v }}
      <li>
        <a href="{{! v.RelPermalink }}"
          class="text-sm mr-2 px-2 py-1 rounded border border-emerald-800 bg-emerald-800 text-slate-50">
          {{! v.LinkTitle }}
        </a>
      </li>
      {{~}}
      {{~ it.tags :v }}
      <li>
        <a href="{{! v.RelPermalink }}"
          class="flex flex-row text-sm mr-2 py-1">
          {{= it.tagIcon }}
          <span class="ml-0">{{! v.LinkTitle }}</span>
        </a>
      </li>
      {{~}}
    </ul>
  </article>
  `;

  function showResult(keywords, result) {
    const templateFn = doT.template(resultTemplate);
    const tagIcon = document.getElementById('tag-icon').innerHTML;
    resultContainer.innerHTML = '';
    const i18n = {
      type_pesquisa: '{{ T "search.type_pesquisa" }}',
      type_sub: '{{ T "search.type_sub" }}',
      of: '{{ T "search.of" }}',
    };
    for (const [index, entry] of result.entries()) {
      const item = entry.item;
      const content = entry.item.content;
      item.snippet = content.substring(0, searchOptions.summaryInclude * 2) + '&hellip;';
      item.tagIcon = tagIcon;
      item.index = index;
      item.i18n = i18n;
      resultContainer.innerHTML += templateFn(item);
    }
    const instance = new Mark(resultContainer);
    instance.mark(keywords);
  }
})();