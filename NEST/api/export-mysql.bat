
@echo off

:: Exportar mysql-data
set volumeName=mysql-data
set exportPath=./docker-volumes/mysql/docker-volume.tar.gz

echo Exportando %volumeName%...
docker run --rm -v %volumeName%:/volume -v %cd%:/backup alpine sh -c "tar czf /backup/docker-volume.tar.gz -C /volume ."
move /Y docker-volume.tar.gz %exportPath%
echo Volumen %volumeName% exportado a %exportPath%

:: Exportar api_mongodb-data
set volumeName=api_mongodb-data
set exportPath=./docker-volumes/api_mongodb/docker-volume.tar.gz

echo Exportando %volumeName%...
docker run --rm -v %volumeName%:/volume -v %cd%:/backup alpine sh -c "tar czf /backup/docker-volume.tar.gz -C /volume ."
move /Y docker-volume.tar.gz %exportPath%
echo Volumen %volumeName% exportado a %exportPath%

pause
