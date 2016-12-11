var app = function() {
    var url = 'http://api.giphy.com/v1/gifs/search?q=paul+rudd&api_key=dc6zaTOxFJmzC';
    makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
}

var requestComplete = function() {
    console.log('request successful');
    if (this.status !== 200) return;

    var jsonString = this.responseText;
    var giphy = JSON.parse(jsonString);
    var ulTag = document.getElementById('rudd');
    populateList(ulTag, giphy);
}

var populateList = function(ulTag, giphy) {
    for (var i = 0; i < giphy.data.length; i++) {
        addRuddGifs(ulTag, giphy.data[i].images.original.url);
    }
}

var addRuddGifs = function(ulTag, giphy) {

    var liTag = document.createElement('li');
    var pTag = document.createElement('p');
    var imgTag = document.createElement('img');
    imgTag.src = giphy.var gifCount = 0;;
    pTag.innerText = "testing " + giphy.data;
    liTag.appendChild(imgTag);
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);
}







window.onload = app;