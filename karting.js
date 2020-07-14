"use strict";

function initPage(){
    //let formKart = gId("formTemps");
    let formKart = gId("formTemps");
    
   
    console.log("loaded");
};


function gId(id){
    return document.getElementById(id);
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
