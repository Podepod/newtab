window.onload = async function(){
    var config = await getData('config.json');

    if (config.title != ""){
        var title = config.title;
    } else{
        var title = document.getElementsByName('titleContent')[0].getAttribute('content');
    }

    document.getElementById('pageTitle').innerHTML = title;
    document.title = title;

    var pageLinkjesConfig = document.getElementsByName('linkjes')[0].getAttribute('content');
    if (pageLinkjesConfig == "all"){
        var linkjes = await getData(config.linkjes.link_file);

        alleLinkjes(config.linkjes.links_per_row, linkjes);
    } else if(pageLinkjesConfig == "row" && config.linkjes.enabled){
        var linkjes = await getData(config.linkjes.link_file);

        eenRijLinkjes(config.linkjes.links_per_row, linkjes);
    }
}

async function getData(file){
    var result = await readJson(file);
    return result;
}

function readJson (file) {
    return fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        this.users = json;
        return this.users;
    })
    .catch(function () {
        this.dataError = true;
    })
 }

function alleLinkjes(nbrLinks, linkList){
    var i = 0, j = 0;
    var newRow = false; 
  
    while (i < linkList.length){
        var linkBar = document.createElement('div');
        linkBar.className = "linkbar";
    
        document.getElementById('linkBarHolder').appendChild(linkBar);

        newRow = false;

        currentLinkBar = document.getElementsByClassName("linkbar")[j];

        while (!newRow){
            data = linkList[i];

            var link = document.createElement('a');
            var linkText = document.createTextNode(data.letter);
            link.appendChild(linkText);
            link.href = data.link;
            link.title = data.title;

            currentLinkBar.appendChild(link);

            i += 1;

            if (i % nbrLinks == 0){
                newRow = true;
                j += 1;
            }
        }
    }
}

function eenRijLinkjes(nbrLinks, linkList){
    var i = 0;
    
    var linkBar = document.createElement('div');
    linkBar.className = "linkbar";
    
    document.getElementById('linkBarHolder').appendChild(linkBar);

    var currentLinkBar = document.getElementsByClassName("linkbar")[0];

    while (i < linkList.length && i < nbrLinks){
        data = linkList[i];

        var link = document.createElement('a');
        var linkText = document.createTextNode(data.letter);
        link.appendChild(linkText);
        link.href = data.link;
        link.title = data.title;
        
        currentLinkBar.appendChild(link);
        
        i += 1;
    }
}