var loadUrl = function(){
  var url = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=dc6zaTOxFJmzC";
  makeRequest(url, requestComplete);
  return url;
}

window.onload = function(){
  // var url = loadUrl();
  var nextImageBtn = document.querySelector("#next-gif");
  var lastImageBtn = document.querySelector("#last-gif");
  buttonOff("last-gif");
  buttonOff("next-gif");
  nextImageBtn.onclick = goForward;
  lastImageBtn.onclick = goBack;
}

// used in 3 different places because it kept saying can't find it within fucntions...
var userInput = "";
var imageArray = [];
var currentGifIndex = 0;

window.onkeyup = function(event){
  enterKey(event);
}

var getUrlLink = function(){
  console.log( 'imageArray:', imageArray);
  // link / imagearray not working. Links to savegif hash
  var link = imageArray[currentGifIndex];
  // console.log(imageArray);
  return link;
}

var makeRequest = function(url, callback){
  console.log("Request Succesful");
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var images = JSON.parse(jsonString);
  var title = "Get what you GIF";
  saveGif(images);
  displayGif();
  console.log(images);
  buttonOff("last-gif");
  buttonOn("next-gif");
}

var searchBar = function(){
  // when doing a new search need page to reset otherwise no new search can be performed
  var imageArray = [];
  var currentGifIndex = 0;
  clearDocument();
  var search = document.querySelector("#search").value;
  userInput = search;
  var url = loadUrl();
  makeRequest(url, requestComplete);
  console.log("the search query was for:", search);
}

var newImage = function(url){
  var img = document.querySelector("#gif-image");
  img.setAttribute('src', url);
}

var displayGif = function(){
  newImage(getUrlLink());
}

var saveGif = function(images){
  for(var i = 0; i < images.data.length; i++){
    imageArray.push( images.data[i].images.original.url );
  }
  console.log("saved " + imageArray.length + " images" );
}

var clearDocument = function(){
  imageArray = [];
  currentGifIndex = 0;
  var img = document.querySelector("#gif-image");
  // element.setAttribute(attributename,attributevalue)
  img.setAttribute("src", "");
}

var enterKey = function(event){
  if(event.keyCode == 13){
    searchBar();
  }
}

// exmple -- document.getElementById("mySelect").disabled = true;
// The disabled property sets or return that a disabled element is unusable and un-clickable.
var buttonOn = function(buttonName){
  document.getElementById(buttonName).disabled = false;
}

var buttonOff = function(buttonName){
  document.getElementById(buttonName).disabled = true;
}

var goForward = function(){
  // start at 0
  if(currentGifIndex === imageArray.length - 1){
    log( "turning next button off");
    buttonOff("next-gif");
  } else {
    buttonOn("last-gif");
    currentGifIndex++;
    displayGif();
    console.log("called next image:", currentGifIndex);
  }
}

var goBack = function(){
  if(currentGifIndex === 0){
    buttonOn("next-gif");
    gifCount--;
    displayGif();
    console.log("called last image:", currentGifIndex);
  }
}