CREATE PROCEDURE "DBA"."http_getCSS"( IN url CHAR (255) )
    RESULT( css LONG  VARCHAR ) 
BEGIN
	CALL sa_set_http_header('Content-Type','text/css');
    SELECT xp_read_file(getPath()||'CSS\' ||url)
END





ALTER PROCEDURE "DBA"."http_getIMG"( IN url CHAR (255) )
    RESULT( img LONG BINARY  ) 
BEGIN
	CALL sa_set_http_header('Content-Type','image/png');
    SELECT xp_read_file(getPath() || 'IMG\' || url);
END





ALTER PROCEDURE "DBA"."http_getJS"( IN url CHAR (255) )
    RESULT( js LONG  VARCHAR  )
BEGIN
	CALL  sa_set_http_header('Content-Type', 'text/javascript');
    SELECT xp_read_file(getPath()||'JS\'|| url);
END



ALTER PROCEDURE "DBA"."http_getPage"( IN  url CHAR (255) )
    RESULT( html LONG  VARCHAR  )
BEGIN
    CALL sa_set_http_header('Content-Type','text/html');
	SELECT xp_read_file(getPath()|| url || '.html'); //Renvoyer la page
END




ALTER FUNCTION "DBA"."getPath"()
RETURNS LONG VARCHAR 
deterministic
BEGIN
    DECLARE dbPath LONG VARCHAR ;
    DECLARE dbName LONG VARCHAR ;
    SET  dbPath= (SELECT  db_property('file')); -- path + nom de la db
    SET  dbName=(SELECT db_property('name'))+'.db'; -- Nom de la db
    SET dbPath= left(dbPath,length(dbPath)-length(dbName)); -- Path seul
    RETURN dbPath;
END




CREATE SERVICE "css" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call http_getCSS(:url);



CREATE SERVICE "img" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call http_getIMG(:url);



CREATE SERVICE "js" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call http_getJS(:url);



CREATE SERVICE "page" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call dba.http_getPage(:url);



CREATE SERVICE "root" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call http_getPage(:url);



CREATE SERVICE "ecart" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON AS call proc_Ecart(:lieu,:kart);



CREATE SERVICE "getCircuit" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON AS call proc_getCircuit(:piste);



CREATE SERVICE "getRecords" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON AS call proc_getRecords(:lieu,:cat);



CREATE SERVICE "insertData" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON AS call insertTemps(:name,:firstname,:naissance,:origine,:circuit,:numero,:date,:temps);
