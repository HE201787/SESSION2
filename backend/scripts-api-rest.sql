
CREATE PROCEDURE "DBA"."insertTemps"(
IN "name" char(15),
IN firstname char(15),
IN naissance integer,
IN origine varchar(15),
IN circuit varchar(15),
IN numero integer,
IN "date" DATE,
IN temps INTEGER 
)
BEGIN
CALL sa_set_http_header('Access-Control-Allow-Origin', '*');
CALL sa_set_http_header('Content-Type','text/json');

IF (SELECT count(*) FROM pilote WHERE nom= "name" AND prenom = firstname)>0
THEN 
insert into temps (idTemps, idPilo,chrono, idCircuit, idVehicule)
VALUES  ((select getIdTemps()), (select idPilo from pilote where nom="name" and prenom = firstname)  ,temps, circuit, numero);

ELSE 
insert into pilote ( idPilo, nom, prenom, nationalité, annéeNaissance)
VALUES ((select idPilote()), "name", firstname, origine, naissance);

insert into temps (idTemps, idPilo,chrono, idCircuit, idVehicule)
VALUES ((select getIdTemps()), (select idPilo from pilote where nom="name" and prenom = firstname)  ,temps, circuit, numero);
   ENDIF;
END





CREATE PROCEDURE "DBA"."proc_getRecords" (in lieu char(15), in cat varchar(10))
RESULT (chrono integer, localisation char(15), categorie varchar(15), marque varchar(10), motorisation varchar(20), recordman char(50))
BEGIN 
    call sa_set_http_header('Content-Type', 'application/json');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');

    SELECT TOP(1)T.chrono,
             C.localisation,
             V.categorie,
             V.marque,
             V.motorisation, 
            (select P.nom||' '|| P.prenom as recordman)
    from temps AS T 
    join circuit as C on C.idCircuit = T.idCircuit
    join vehicule as V on T.idVehicule = V.idVehicule 
    join pilote as P on T.idPilo = P.idPilo
    
    group BY T.chrono, C.localisation, V.categorie, V.marque, V.motorisation, P.nom, P.prenom
    
    HAVING localisation = lieu and V.categorie = cat   
    
    ORDER BY T.chrono ASC ;
END





CREATE PROCEDURE "DBA"."proc_getCircuit" (in piste char(15))
RESULT (idCircuit integer, localisation char(15), longueur varchar(15),record INTEGER, marque varchar(10), recordman varchar(50))
BEGIN 
    call sa_set_http_header('Content-Type', 'application/json');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');

    SELECT C.idCircuit, C.localisation, C.longueur, C.record, V.marque, (select P.nom||' '|| P.prenom as recordman)
    from circuit AS C 
    join vehicule as V on C.idVehicule = V.idVehicule 
    join pilote as P on C.idPilo = P.idPilo
    where C.localisation = piste;
END






CREATE PROCEDURE "DBA"."proc_Ecart" (in lieu INTEGER , in kart INTEGER )
RESULT (meilleur INTEGER )
BEGIN 
    call sa_set_http_header('Content-Type', 'application/json');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');

select meilleurT(lieu, kart);

END






CREATE FUNCTION "DBA"."meilleurT"(lieu INTEGER , kart INTEGER  )
RETURNS int

BEGIN
	
  DECLARE meilleur INTEGER;
  set meilleur = (select min(chrono)         
     FROM temps as T 
     join vehicule as V ON T.idVehicule = V.idVehicule 
     join circuit as C on T.idCircuit = C.idCircuit
     
    WHERE V.idVehicule = kart and C.idCircuit = lieu );
	return meilleur;
END
