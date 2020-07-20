"use strict";

function initPage(){
	 let formRecherche = document.getElementById('formRecherche');
     formRecherche.addEventListener('submit', soumettreRequete);

	 dateMax();
    console.log("loaded");
};



function gId(id){
    return document.getElementById(id);
};

function dateMax(){
   let currentDate = new Date();

gId("date").max = new Date().toISOString().split("T")[0];
//    let formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
  //  gId("date").min = String(formattedDate);

};


function getTime(){

	let minToMs = gId("minutes").value*60000;
	let secToMs = gId("secondes").value*1000;
	let ms = gId("ms").value;
	let tempsMs = minToMs + secToMs + Number(ms);
console.log(tempsMs);
return tempsMs;
}

function name(){

	let name= "'"+ gId("formTemps").name.value +"'";
	return name;
}

function myFunction(){

getTime();
event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/insertData?name='
        + gId("formTemps").name.value 
        + '&firstname='
        + gId("formTemps").firstname.value
        + '&naissance='
        + gId("formTemps").age.value
        + '&origine='
        + gId("formTemps").nationalité.value
        + '&circuit='
        + gId("formTemps").circuit.value
        + '&numero='
        + gId("formTemps").kart.value
        + '&date='
        + gId("formTemps").date.value
        + '&temps='
        + getTime(),
        true);

 xhr.onload = function check() {

        gId("zoneTexte").innerHTML = message;

        console.log("ok");
    }
 xhr.send();
    console.log("fait aussi");
    let message = "<p>votre record a bien été enregistré</p>";
}



function soumettreRequete(event){
    event.preventDefault();
   // let form = gId("formRecherche");
    envoyerRequete(gId("formRecherche").circuit.value, gId("formRecherche").categorie.value);
}

function envoyerRequete(circuit, categorie){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/getRecords?lieu=' + circuit + '&cat=' + categorie, true);
    xhr.onload = function traiterReponse(){
    	let obj = JSON.parse(xhr.responseText);
        affichage(obj);

        console.table(obj);
    };
    xhr.send();
}

function affichage(data){
    let str = "<table id='tableauRecords'>";
   // let keys = Object.keys(data[0]);
    str += "<tr>";
    str += "<th><i>localisation</i></th>";
    str += "<th><i>categorie</i></th>";
    str += "<th><i>marque</i></th>";
    str += "<th><i>motorisation</i></th>";
    str += "<th><i>record</i></th>";
    str += "<th><i>recordman</i></th>";
    str += "</tr>";
	    
	        str += "<tr>";

	        str += "<td>" + data[0].localisation  + "</td>";
	        str += "<td>" + data[0].categorie + "</td>";
	        str += "<td>" + data[0].marque + "</td>";
	        str += "<td>" + data[0].motorisation + "</td>";
	        str += "<td>" + data[0].chrono + "(ms)" + "</td>";
	        str += "<td>" + data[0].recordman + "</td>";
	        str += "</tr>";
	        str += "</section>";
	    
    str += "</table>";
    gId("affichage").innerHTML = str;
}


