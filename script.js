

function main(){
    var ID = document.getElementById('ID').value;
    var ans = document.getElementById('answer').value;
    var q1 = document.getElementById('q1').value;
    var q2 = document.getElementById('q2').value;

    // /resolve/<queryID>/<answer>/<alt_qs>/
    url = "http://127.0.0.1:5000/resolve/" + ID + '/' + ans + '/' + q1 + '|' + q2;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
    }};

    xhr.send();
}