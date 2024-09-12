@echo off

:: Importar mysql-data
set volumeName=mysql-data
set importPath=%cd%\docker-volumes\mysql\docker-volume.tar.gz

if exist "%importPath%" (
    echo Importando %volumeName%...
    docker run --rm -v %volumeName%:/volume -v "%importPath%":/backup/docker-volume.tar.gz alpine sh -c "tar xzvf /backup/docker-volume.tar.gz -C /volume"
    echo Volumen %volumeName% importado desde %importPath%
) else (
    echo Error: No se encontró el archivo %importPath%
)

:: Importar api_mongodb-data
set volumeName2=api_mongodb-data
set importPath2=%cd%\docker-volumes\api_mongodb\docker-volume.tar.gz

if exist "%importPath2%" (
    echo Importando %volumeName2%...
    docker run --rm -v %volumeName2%:/volume -v "%importPath2%":/backup/docker-volume.tar.gz alpine sh -c "tar xzvf /backup/docker-volume.tar.gz -C /volume"
    echo Volumen %volumeName2% importado desde %importPath2%
) else (
    echo Error: No se encontró el archivo %importPath2%
)

pause

