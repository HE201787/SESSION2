
CREATE TABLE "DBA"."circuit" (
	"idCircuit" INTEGER NOT NULL,
	"localisation" CHAR(15) NULL,
	"longueur" VARCHAR(15) NULL,
	"record" INTEGER NULL,
	"idVehicule" INTEGER NOT NULL,
	"idPilo" VARCHAR(8) NULL,
	PRIMARY KEY ( "idCircuit" ASC )
) IN "system";

CREATE TABLE "DBA"."pilote" (
	"idPilo" VARCHAR(8) NOT NULL,
	"nom" CHAR(15) NULL,
	"prenom" CHAR(15) NULL,
	"nationalité" VARCHAR(15) NULL,
	"annéeNaissance" INTEGER NULL,
	PRIMARY KEY ( "idPilo" ASC )
) IN "system";


CREATE TABLE "DBA"."temps" (
	"idTemps" CHAR(8) NOT NULL,
	"idPilo" VARCHAR(8) NOT NULL,
	"chrono" INTEGER NOT NULL,
	"idCircuit" INTEGER NOT NULL,
	"idVehicule" INTEGER NOT NULL,
	PRIMARY KEY ( "idTemps" ASC ),
    CONSTRAINT FOREIGN KEY idCircuit REFERENCES circuit(idCircuit),
    CONSTRAINT FOREIGN KEY idVehicule REFERENCES vehicule(idVehicule),
    CONSTRAINT FOREIGN KEY idPilo REFERENCES pilote(idPilo)
) IN "system";



CREATE TABLE "DBA"."vehicule" (
	"idVehicule" INTEGER NOT NULL,
	"puissance" VARCHAR(10) NULL,
	"annnée" INTEGER NULL,
	"categorie" VARCHAR(10) NULL,
	"marque" VARCHAR(10) NULL,
	"motorisation" VARCHAR(10) NULL,
	PRIMARY KEY ( "idVehicule" ASC )
) IN "system";

