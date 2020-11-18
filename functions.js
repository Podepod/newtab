window.onload = function(){
    var title = document.getElementsByName('titleContent')[0].getAttribute('content');
    document.getElementById('pageTitle').innerHTML = title;
    document.title = title;
}