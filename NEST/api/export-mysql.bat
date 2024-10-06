
:: Script: export-docker-volume.bat
@echo off
set volumeName=mysql-data
set exportPath=./docker-volumes/mysql/docker-volume.tar.gz

:: Exportar el volumen Docker
docker run --rm -v %volumeName%:/volume -v %cd%:/backup alpine sh -c "tar czf /backup/docker-volume.tar.gz -C /volume ."

:: Mover el archivo exportado al destino deseado
move docker-volume.tar.gz %exportPath%

echo Volumen %volumeName% exportado a %exportPath%