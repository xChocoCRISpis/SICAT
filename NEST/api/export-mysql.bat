@echo off

:: Exportar mysql-data
set volumeName=mysql-data
set exportPath=./docker-volumes/mysql/docker-volume.tar.gz

echo Exportando %volumeName%...
docker run --rm -v %volumeName%:/source -v %cd%:/backup alpine sh -c "cd /source && tar czf /backup/%exportPath% ."
move /Y docker-volume.tar.gz %exportPath%
echo Volumen %volumeName% exportado a %exportPath%

:: Exportar api_mongodb-data
set volumeName=api_mongodb-data
set exportPath2=./docker-volumes/api_mongodb/docker-volume.tar.gz

echo Exportando %volumeName%...
docker run --rm -v %volumeName%:/source -v %cd%:/backup alpine sh -c "cd /source && tar czf /backup/%exportPath2% ."
move /Y docker-volume.tar.gz %exportPath2%
echo Volumen %volumeName% exportado a %exportPath2%

pause

