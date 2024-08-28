:: Script: import-docker-volume.bat
@echo off
set volumeName=mysql-data
set importPath=./docker-volumes/mysql/docker-volume.tar.gz

:: Crear el volumen Docker si no existe
docker volume create %volumeName%

:: Importar el volumen Docker desde el archivo
docker run --rm -v %volumeName%:/volume -v %cd%:/backup alpine sh -c "tar xzf /backup/%importPath% -C /volume"

echo Volumen %volumeName% importado desde %importPath%
