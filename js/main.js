// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    /// Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    //Check if site name or site url is empty
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    //Create bookmark JSON object
    var bookmark = {
        "name": siteName,
        "url": siteUrl
    }

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        //Init array
        var bookmarks=[];
        //Add to array
        bookmarks.push(bookmark);
        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //JSON parse will turn a string to JSON object
        //Add bookmarks to array
        if(alreadyBookmarked(siteName, bookmarks)){
            alert('Site already saved in bookmarks')
        }else{
            bookmarks.push(bookmark);
        }
                
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))  
    }   
    // Re-fetch bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    e.preventDefault(); // to keep the form from submitting
}

//Delete Bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks(){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    //Build output
    var output = '';
    bookmarks.forEach(function(bookmark) {
        output +=   '<div class="well">' +
                    '<h3>' + bookmark.name +
                    '<a class="btn btn-default" target="_blank" href="' + bookmark.url + '">Visit</a>' +
                    '<a onclick="deleteBookmark(\''+ bookmark.url +'\')" class="btn btn-danger" href="#">Delete</a>' +
                    //'<a onclick="deleteBookmarks()" class="btn btn-danger" href="#">Delete</a>' +
                    '</h3>' +
                    '</div>';
    });
    bookmarksResults.innerHTML = output;
}

// Validate Form
function validateForm(siteName, siteUrl){
    //Check if form is not empty
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
    //Create regular expression for emails
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    //Check Siteurl is of type url
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
    return true;
}

function alreadyBookmarked(site, bookmarks){
    for(var i =0;i < bookmarks.length;i++){
        if(bookmarks[i].name == site){
        // Remove from array
        return true;
        }
    }
    return false;
}