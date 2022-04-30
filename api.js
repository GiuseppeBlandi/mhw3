//API ergast no autorization


function onJsonPilot(json) {
    const tabella=document.querySelector("#piloti");
    const library = document.querySelector('#piloti');
    library.innerHTML = '';
    const length=json.MRData.total;
    if(length == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      tabella.appendChild(errore);
    }

    const results=json.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    for(let i=0;i<length;i++){
        const classifica=results[i];
        const pos=classifica.position;
        const name=classifica.Driver.driverId;
        const team=classifica.Constructors.constructorId;
        const wins=classifica.wins;
        const points=classifica.points;

        const position=document.createElement("span");
        position.textContent=pos+"°";

        const nome=document.createElement("span");
        nome.textContent=name;
        nome.classList.add("element");

        const punti=document.createElement("span");
        punti.textContent="Punti: "+points;
        punti.classList.add("element");

        const vittorie=document.createElement("span");
        vittorie.textContent="Vittorie: "+ wins;
        vittorie.classList.add("element");

        const row=document.createElement("div");
        row.classList.add("row");

        row.appendChild(position);
        row.appendChild(nome);
        row.appendChild(punti);
        row.appendChild(vittorie);
        tabella.appendChild(row);
    }
    
}

function onJsonTeam(json) {
    const tabella=document.querySelector("#piloti");
    const library = document.querySelector('#piloti');
    library.innerHTML = '';
    const length=json.MRData.total;

    if(length == 0)
    {
      const errore = document.createElement("h1"); 
      const messaggio = document.createTextNode("Nessun risultato!"); 
      errore.appendChild(messaggio); 
      tabella.appendChild(errore);
    }

    const results=json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    for(let i=0;i<length;i++){
        const classifica=results[i];
        const pos=classifica.position;
        const team=classifica.Constructor.constructorId;
        const wins=classifica.wins;
        const points=classifica.points;

        const position=document.createElement("span");
        position.textContent=pos+"°";

        const constructor=document.createElement("span");
        constructor.textContent=team;
        constructor.classList.add("element");

        const punti=document.createElement("span");
        punti.textContent="Punti: "+points;
        punti.classList.add("element");

        const vittorie=document.createElement("span");
        vittorie.textContent="Vittorie: "+ wins;
        vittorie.classList.add("element");

        const row=document.createElement("div");
        row.classList.add("row");

        row.appendChild(position);
        row.appendChild(constructor);
        row.appendChild(punti);
        row.appendChild(vittorie);
        tabella.appendChild(row);
    }
    
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

function searchPilot(event){
    event.preventDefault();
    const pilot=document.querySelector('#pilota');
    const tipo=document.querySelector('#tipo').value;
    console.log("ricerca tramite tipo: "+ tipo);
    const pilotValue=encodeURIComponent(pilot.value);
    console.log('eseguo ricerca: '+ pilotValue);
    if(tipo==="piloti"){
    rest_url='http://ergast.com/api/f1/' + pilotValue + '/driverstandings.json';
    console.log('URL: ' + rest_url );
    fetch(rest_url).then(onResponse).then(onJsonPilot);
    }else{
        rest_url='http://ergast.com/api/f1/' + pilotValue + '/constructorStandings.json';
        fetch(rest_url).then(onResponse).then(onJsonTeam);
        console.log('URL: ' + rest_url );
    }
}

function adattaTesto(event){
    const tipo=event.target.value;
    if(tipo==="piloti"){
        const insert=document.querySelector(".insert")
        insert.textContent="Inserisci anno (dal 1950 al corrente)"
    }else if(tipo==="costruttori"){
        const insert1=document.querySelector(".insert")
        insert1.textContent="Inserisci anno (dal 1958 al corrente)"
    }
}
const tipo1=document.querySelector('#tipo');
tipo1.addEventListener("change",adattaTesto);


const form = document.querySelector('#form');
form.addEventListener('submit', searchPilot);



//API spotify OAuth2



function onJsonF1theme(json){
    console.log(json);
    const library = document.querySelector('#musica');
    library.innerHTML = '';
    const results = json;
      const title = results.name;
      const selected_image = results.images[0].url;
      const albumContainer = document.createElement('div');
      albumContainer.classList.add('album');
      const img = document.createElement('img');
      img.src = selected_image;
      const caption = document.createElement('span');
      caption.textContent = title;
      const link=document.createElement('a');
      link.setAttribute('href', results.external_urls.spotify);
      link.textContent="Ascolta su spotify";

      albumContainer.appendChild(img);
      albumContainer.appendChild(caption);
      albumContainer.appendChild(link)

      library.appendChild(albumContainer); 
}


function onJsonMusica(json){
    console.log(json.items);
    const library = document.querySelector('#musica');
    library.innerHTML = '';

    const results = json.items;
    let num_results = results.length;

    if(num_results > 14)
      num_results = 14;

    for(let i=0; i<num_results; i++)
    {
      const album = results[i]
      const title = album.track.name;
      const selected_image = album.track.album.images[0].url;
      const albumContainer = document.createElement('div');
      albumContainer.classList.add('album');
      const img = document.createElement('img');
      img.src = selected_image;
      const caption = document.createElement('span');
      caption.textContent = title;
      const link=document.createElement('a');
      link.setAttribute('href', album.track.external_urls.spotify);
      link.textContent="Ascolta su spotify";
      albumContainer.appendChild(img);
      albumContainer.appendChild(caption);
      albumContainer.appendChild(link)
      library.appendChild(albumContainer);
    }
}


function selezionaMusica(event)
{
  const musicaSelezionata = document.querySelector('#seleziona');
  const value = encodeURIComponent(musicaSelezionata.value);
  console.log('Eseguo ricerca: ' + value);

if(value==="F1theme"){
    fetch("https://api.spotify.com/v1/albums/6vZxdK8F5VqytnXgNrjHRM" ,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonF1theme);
}
else if(value==="SkySportF1"){
  fetch("https://api.spotify.com/v1/playlists/5zIvF8RZzAKgtJcwE8JeFH/tracks" ,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonMusica);
}

}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const clientId = "bd044aa4f8a240048938036b2583fb8b";
const clientSecret = "3435c0205e0347228a87520513825317";

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const seleziona=document.querySelector('#seleziona');
seleziona.addEventListener("change",selezionaMusica);

