var email_accept = false;


function divert_click(){
  if(!(email_accept)){
    send();
  }
}

function run_email_process(msg2){
  var buttonemail = document.getElementById('send')
  document.getElementById("1").value = "";
  n = buttonemail.addEventListener("click", function(){
    const msg = document.getElementById("1").value;
    if (msg == "" || msg == " "){
      return false
    }
    const template = document.createElement('li');
    template.setAttribute('class', 'mar-btm');
    template.setAttribute('id', '434');
    document.getElementById("0").appendChild(template);
    const av = document.createElement('div');
    av.setAttribute('class', 'media-right');
    av.setAttribute('style', 'float: right;');
    const img = document.createElement('img');
    img.setAttribute('src', "https://bootdey.com/img/Content/avatar/avatar2.png");
    img.setAttribute('class', "img-circle img-sm");
    img.setAttribute('alt', "Profile Picture");
    av.appendChild(img);
    document.getElementById('434').appendChild(av);
    const bod = document.createElement('div');
    bod.setAttribute('class', 'media-body pad-hor speech-right');
    bod.setAttribute('id', '787');
    document.getElementById('434').appendChild(bod);
    const speech = document.createElement('div');
    speech.setAttribute('class', 'speech');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'media-heading');
    a.innerHTML = "You";
    speech.appendChild(a);
    const p = document.createElement('p');
    p.innerHTML = msg;
    speech.appendChild(p);
    document.getElementById('787').appendChild(speech);
    document.getElementById('434').setAttribute('id', '');
    document.getElementById('787').setAttribute('id', '');
    url = "http://127.0.0.1:5000/send_email/" + msg + '/' + msg2
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
    }};
    xhr.send();
    reply("Query logged. You will get an email when the question is answered")
    setTimeout(function(){
      location = window.location
      location.reload()
    }, 1000)
    return true;
  });
}

function process(query, msg2){
  if(query["code"] == 200){
    reply(query['reply'])
  }
  else{
  email_accept = true;
  reply("Forwarding query to experts. Please enter your email for further notification")
  x = run_email_process(msg2);
  }
}

function reply(msg){
  if (msg == "" || msg == " "){
    return false
  }
  const template = document.createElement('li');
  template.setAttribute('class', 'mar-btm');
  template.setAttribute('id', '434');
  document.getElementById("0").appendChild(template);
  const av = document.createElement('div');
  av.setAttribute('class', 'media-left')
  av.setAttribute('style', 'float: left;')
  const img = document.createElement('img')
  img.setAttribute('src', "https://bootdey.com/img/Content/avatar/avatar1.png")
  img.setAttribute('class', "img-circle img-sm")
  img.setAttribute('alt', "Profile Picture")
  av.appendChild(img)
  document.getElementById('434').appendChild(av)
  const bod = document.createElement('div')
  bod.setAttribute('class', 'media-body pad-hor speech-left')
  bod.setAttribute('id', '787')
  document.getElementById('434').appendChild(bod)
  const speech = document.createElement('div')
  speech.setAttribute('class', 'speech')
  const a = document.createElement('a')
  a.setAttribute('href', '#')
  a.setAttribute('class', 'media-heading')
  a.innerHTML = "LogFix Assistant"
  speech.appendChild(a)
  const p = document.createElement('p')
  p.innerHTML = msg
  speech.appendChild(p)
  document.getElementById('787').appendChild(speech)
  document.getElementById('434').setAttribute('id', '')
  document.getElementById('787').setAttribute('id', '')
}
function send(){
  if(email_accept == false){
    var msg = document.getElementById("1").value;
    document.getElementById("1").value = "";
    if (msg == "" || msg == " "){
      return false
    }
    const template = document.createElement('li')
    template.setAttribute('class', 'mar-btm')
    template.setAttribute('id', '434')
    document.getElementById("0").appendChild(template)
    const av = document.createElement('div')
    av.setAttribute('class', 'media-right')
    av.setAttribute('style', 'float: right;')
    const img = document.createElement('img')
    img.setAttribute('src', "https://bootdey.com/img/Content/avatar/avatar2.png")
    img.setAttribute('class', "img-circle img-sm")
    img.setAttribute('alt', "Profile Picture")
    av.appendChild(img)
    document.getElementById('434').appendChild(av)
    const bod = document.createElement('div')
    bod.setAttribute('class', 'media-body pad-hor speech-right')
    bod.setAttribute('id', '787')
    document.getElementById('434').appendChild(bod)
    const speech = document.createElement('div')
    speech.setAttribute('class', 'speech')
    const a = document.createElement('a')
    a.setAttribute('href', '#')
    a.setAttribute('class', 'media-heading')
    a.innerHTML = "You"
    speech.appendChild(a)
    const p = document.createElement('p')
    p.innerHTML = msg
    speech.appendChild(p)
    document.getElementById('787').appendChild(speech)
    document.getElementById('434').setAttribute('id', '')
    document.getElementById('787').setAttribute('id', '')

    url = "http://127.0.0.1:5000/main/" + msg + '/'
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      process(JSON.parse(xhr.responseText), JSON.parse(xhr.responseText)['query'].toString());
    }};

    xhr.send();



  }

}

var input = document.getElementById("1");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send").click();
  }
});
