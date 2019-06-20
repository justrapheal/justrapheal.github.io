//

// form.addEventlistener('submit', () => {}, false);
let form = document.forms['myform'];
form.addEventListener(
  'submit',
  e => {
    e.preventDefault();
    const bookmark = {};
    bookmark.name = form.SiteName.value;
    bookmark.url = form.SiteURL.value;

    if (localStorage.getItem('bookmarks') === null) {
      const bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    form.reset();
    fetchressult();
  },
  false
);

function deletebook(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchressult();
}

function fetchressult() {
  const result = document.getElementById('result');

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);
  result.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;
    result.innerHTML +=
      '<div style="text-align:center; margin-left:20vw;margin-right: 20vw;" >' +
      '<h3 style="background:whitesmoke;">' +
      name +
      ' ' +
      '<button>' +
      '<a target="_blank" class="visit"href="' +
      url +
      '">visit</a>' +
      '</button>' +
      ' ' +
      '<button style="background-color:darkred;">' +
      '<a onclick="deletebook(\'' +
      url +
      '\')"class="delete" href="#" style="color:white;">Delete</a>' +
      '</h3>' +
      '</button>' +
      '</div>';
  }
}
