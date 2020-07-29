 "use strict";


function gId(id){
    return document.getElementById(id);
};

let form = gId('simulation');

const PRIXTOURS = 22;

function simulation(){

	let circuit = gId("circuit").value;	
	let nbTours = gId("tours").value;	
	let voiture = gId("selectVoiture").value;	
	let prixToursTot = (nbTours*PRIXTOURS);
	let total = Number(prixToursTot) + Number(voiture) + Number(circuit);
	console.log(total);
	array();

	gId("affichageTarifs").innerHTML = "<p id='prixAff'>Prix estimé : " + total + "euros</p>" ;
};

function array(){

	let reservation = [];
	let nbTours = gId("tours").value;
	let prixToursTot;

	if(nbTours<5){
		prixToursTot = (PRIXTOURS*nbTours).toFixed(2);
		console.log(prixToursTot);
	}


	else if (nbTours>=5 && nbTours<10){
		prixToursTot = ((PRIXTOURS*nbTours)*0.95).toFixed(2);
		console.log(prixToursTot);
	}

	else if (nbTours>=10 && nbTours<20){
		prixToursTot = ((PRIXTOURS*nbTours)*0.90).toFixed(2);
		console.log(prixToursTot);
	}

	else if (nbTours>=20 && nbTours<30){
		prixToursTot = ((PRIXTOURS*nbTours)*0.85).toFixed(2);
		console.log(prixToursTot);
	}

	else if (nbTours>=30 && nbTours<51){
		prixToursTot = ((PRIXTOURS*nbTours)*0.80).toFixed(2);
		console.log(prixToursTot);
	}

	else{
		let str = "le nombre de tours est limité à 50";
		gId("affichageTable").innerHTML = str;
		return;
	}

	reservation.push(gId("selectVoiture").value);
	reservation.push(prixToursTot);
	reservation.push(gId("circuit").value);
	console.log(reservation);

	let str = "<table id='tableauRecords'>";
    str += "<tr>";
    str += "<th><i>prix de la voiture</i></th>";
    str += "<th><i>prix pour le nombre de tours</i></th>";
    str += "<th><i>prix du circuit</i></th>";
    str += "</tr>";
	str += "<tr>";
	str += "<td>" + reservation[0]  + "</td>";
	str += "<td>" + reservation[1] + "</td>";
	str += "<td>" + reservation[2] + "</td>";       
	str += "</tr> </table><br><br>";

	gId("affichageTable").innerHTML = str;

	
};