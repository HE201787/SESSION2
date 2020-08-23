INSERT INTO circuit(idCircuit, localisation, longueur, record, idVehicule, idPilo)
VALUES
('1','belgique','7,500km','110000','1','P_1'),
('2','france','6,000km','100000','3','P_2'),
('3','angleterre','6,200km','105000','2','P_3'),
('4','hongrie','5,600km','96000','4','P_1'),
('5','autriche','4,600km','84000','3','P_2')
;


INSERT INTO pilote(idPilo, nom, prenom, nationalité, annéeNaissance)
VALUES
('P_1','Raikkonen','Kimi','finlande','1979'),
('P_2','Hamilton','Lewis','angletere','1985'),
('P_3','Alonso','Fenando','espagne','1981'),
('P_4','Hulkenberg','Nico','allemagne','1987'),
('P_5','Norris','Lando','angletere','1999'),
('P_6','Verstapen','Max','hollande','1996'),
('P_7','Leclerc','Charles','monaco','1996'),
('P_8','Gasly','Pierre','france','1997'),
('P_9','Ocon','Esteban','france','1995')
;

INSERT INTO vehicule(idVehicule, puissance, annnée, categorie, marque, motorisation)
VALUES
('1','900cv','2010','formule1','ferrari','essence'),
('2','905cv','2011','formule1','renault','essence'),
('3','900cv','2011','formule1','mercedes','hybride'),
('4','900cv','2011','formule1','mclaren','essence'),
('5','500cv','2012','formule2','ferrari','essence'),
('6','505cv','2012','formule2','mercedes','essence'),
('7','500cv','2013','formule2','mercedes','essence'),
('8','400cv','2013','formule3','renault','essence'),
('9','400cv','2013','formule3','williams','essence'),
('10','400cv','2013','formule3','haas','essence')
;

INSERT INTO temps(idTemps, idPilo, chrono, idCircuit, idVehicule)
VALUES
('T_1','P_1','110000','1','1'),
('T_2','P_2','100000','2','3'),
('T_3','P_3','105000','3','2'),
('T_4','P_1','96000','4','4'),
('T_5','P_7','184000','5','7'),
('T_6','P_8','210000','1','5'),
('T_7','P_6','180000','2','6'),
('T_8','P_4','195000','3','7'),
('T_9','P_3','156000','4','6'),
('T_10','P_5','384000','5','8'),
('T_11','P_1','310000','1','9'),
('T_12','P_2','300000','2','8'),
('T_13','P_3','305000','3','8'),
('T_14','P_1','296000','4','9'),
('T_15','P_2','284000','5','10'),
('T_16','P_8','104000','5','2')
;







