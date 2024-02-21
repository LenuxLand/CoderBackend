const fs = require('fs');

const FileSystemManager = {
    // Funciones para leer y escribir archivos
    readDataFromFile: (filePath) => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer datos del archivo:', error);
            return [];
        }
    },
    writeDataToFile: (filePath, data) => {
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log('Datos escritos en el archivo:', filePath);
        } catch (error) {
            console.error('Error al escribir datos en el archivo:', error);
        }
    },
    // Otras funciones relacionadas con el sistema de archivos
};

module.exports = FileSystemManager;
