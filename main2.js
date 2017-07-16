//Listen for Form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
window.addEventListener('load', getBookmarks);

function saveBookmark(e){
  //Geting Values from Input Fields
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;
  let bookmark = {
    name: siteName,
    url: siteUrl
    //add an id here so you can dlete from local storage easiily
  }

  //check if bookmarks is null or not
  if(localStorage.getItem('bookmarks') === null){
    //Create array
    let bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //Save to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Fetch from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //adding to it
    bookmarks.push(bookmark);
    //re-setting
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Update dom
  getBookmarks();

    e.preventDefault(); //Prevent Submitting
}





function deleteBookmark(url){
 //retrieve current bookmarks
 let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 //looping on all
 for (let b in bookmarks){
 if(bookmarks[b].url === url){
   //removing it
   bookmarks.splice(b,1);
   break;
 }
}
//Updating in array
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

//Update dom
getBookmarks();
};



//Displaying

function getBookmarks(){
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Output
   let bookmarksResults = document.getElementById('bookmarksResults');
   //Build Output
   bookmarksResults.innerHTML = "";
     for (let a in bookmarks){
     let name = bookmarks[a].name;
     let url =  bookmarks[a].url;
     bookmarksResults.innerHTML += `<div class="well"> <h3> ${name} <a class="btn btn-default"
     target="_blank" href=${url} >Visit</a>  <a onclick='deleteBookmark("${url}")' class="btn btn-danger"
     >Delete</a></h3></div>`
   }
 };
