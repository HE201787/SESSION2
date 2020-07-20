 "use strict";

function initPage(){

 let formCircuit= document.getElementById('formCircuit');
 formCircuit.addEventListener('submit', soumettreCircuit);

    console.log("loaded");

}

function gId(id){
    return document.getElementById(id);
};


function soumettreCircuit(event){
    event.preventDefault();
    envoyerCircuit(gId("formCircuit").circuit.value);
}

function envoyerCircuit(circuit){
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost/getCircuit?piste=' + circuit , true);
    xhr.onload = function traiterReponse(){
    	let circ = JSON.parse(xhr.responseText);
        afficher(circ);

        console.table(circ);
        console.log(circ);
    };
    xhr.send();
}

function afficher(data){
    let str = "<table id='tableauCircuit'>";
    str += "<tr>";
    str += "<th><i>idCircuit</i></th>";
    str += "<th><i>localisation</i></th>";
    str += "<th><i>longueur</i></th>";
    str += "<th><i>record</i></th>";
    str += "<th><i>marque</i></th>";
    str += "<th><i>recordman</i></th>";
    str += "</tr>";
	    
	        str += "<tr>";

	        str += "<td>" + data[0].idCircuit  + "</td>";
	        str += "<td>" + data[0].localisation + "</td>";
	        str += "<td>" + data[0].longueur + "</td>";
	        str += "<td>" + data[0].record +"(ms)"+ "</td>";
	        str += "<td>" + data[0].marque + "</td>";
	        str += "<td>" + data[0].recordman + "</td>";
	        str += "</tr>";
	        
	    
    str += "</table>";
    gId("affichageCircuit").innerHTML = str;
}
