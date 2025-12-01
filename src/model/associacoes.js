import { Animal } from "./model/Animal.model.js"; // Ajuste o caminho conforme sua pasta
import Adotante from "./model/Adotante.model.js"; // Ajuste o caminho

// Define que um Adotante pode ter vários animais
Adotante.hasMany(Animal, { 
    foreignKey: 'adotanteId', // Nome da coluna que será criada na tabela Animal
    as: 'animais' // Apelido para usar nas consultas (ex: include: 'animais')
});

// Define que um Animal pertence a um Adotante
Animal.belongsTo(Adotante, { 
    foreignKey: 'adotanteId',
    as: 'adotante'
});

export { Animal, Adotante };