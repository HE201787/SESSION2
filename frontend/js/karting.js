"use strict";

function initPage(){
	let formRecherche = document.getElementById('formRecherche');
	let formtemps = document.getElementById('formTemps');
    formRecherche.addEventListener('submit', soumettreRequete);
    formTemps.addEventListener('submit', ecartRequete);
	dateMax();
    console.log("loaded");
};

//fonctions utiles

function gId(id){
    return document.getElementById(id);
};

function dateMax(){                                                 //fixe la date maximum sur le formulaire;
	let currentDate = new Date();                               // création de la variable contenant la date actuelle;
	gId("date").max = new Date().toISOString().split("T")[0];   // changement du paramètre ".max" du formulaire;
};


function getTime(){                      //fonction qui récupère le temps insérées dans le formulaire pour le convertir en format milli-secondes;
	let minToMs = gId("minutes").value*60000;        //récupère le champ "minutes" et le multiplie par 60000 pour le convertir en m-s;
	let secToMs = gId("secondes").value*1000;        //récupère le champ "secondes" et le multiplie par 1000 pour le convertir en m-s;
	let ms = gId("ms").value;                        //récupère le champ "ms";
	let tempsMs = minToMs + secToMs + Number(ms);    // addition des 3 valeurs en m-s;
	                            
	return tempsMs;                                  //retourne le resultat;
};

function name(){
	let name= "'"+ gId("formTemps").name.value +"'";
	return name;
};

function myFunction(){            // Soumission du formulaire

	getTime();                                         
	event.preventDefault();                                

	    let xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://localhost/insertData?name='                      // appel au webservice
	        + gId("formTemps").name.value                                       // récupération des valeurs entrées dans le formulaire
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
	    gId("zoneTexte").innerHTML = message;                //le message s'affiche 
	                                                         //les valeurs ont été introduites dans la base de données
	};

	xhr.send();

	console.log("fait aussi");
	let message = "<p>votre record a bien été enregistré</p>";         // création d'un message de confimation dès que la requête est correctement exécutée
};




function soumettreRequete(event){
    event.preventDefault();   
    envoyerRequete(gId("formRecherche").circuit.value, gId("formRecherche").categorie.value);
};

function envoyerRequete(circuit, categorie){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/getRecords?lieu=' + circuit + '&cat=' + categorie, true);
    xhr.onload = function traiterReponse(){
    	let obj = JSON.parse(xhr.responseText);
        affichage(obj);
        console.table(obj);
    };

    xhr.send();
};

function affichage(data){                                       
    let str = "<table id='tableauRecords'>";
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

};



function ecartRequete(event){
   
    calculEcart(gId("formTemps").circuit.value, gId("formTemps").kart.value);
}

function calculEcart(circuit, kart){
	let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/ecart?lieu=' + circuit + '&kart=' + kart, true);
     xhr.onload = function traiterReponse(){
    	let object = JSON.parse(xhr.responseText);
        calcul(object);
        console.log(object);
        
    }
 	xhr.send();
};

function calcul(data){

	let ecart =	((getTime()) - data[0].meilleur) 
	gId("ecartTexte").innerHTML ="<p>l'écart avec le record du tour pour cette categorie est de :  " + ecart + " milli-secondes</p>";
	console.log(ecart);
	console.log(data[0].meilleur);

	
	
}
