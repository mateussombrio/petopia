import Animal from "../model/Animal.model.js";

// Pegar todos os Animais
export const mostrarAnimais = async (_, res) => {
  try {
    const animal = await Animal.findAll();
    return res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao buscar os animais",
      error: err.message,
    });
  }
};

// Buscar por ID
export const mostrarAnimalID = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findOne({ where: { id: id } });
    return res.status(200).json(animal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao buscar os animais",
      error: err.message,
    });
  }
};

// Cadastrar animal
export const cadastrarAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, idade, status_saude } = req.body;
    if (!nome || !especie || !raca || !idade || !status_saude) {
      return res.status(404).send("Preencha todos os campos.");
    }
    const animal = await Animal.create({
      nome,
      especie,
      raca,
      idade,
      status_saude,
    });
    return res.status(201).json({
      mensagem: "Animal cadastrado com sucesso",
      animal: animal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao cadastrar o animal",
      error: err.message,
    });
  }
};

// Atualizar o animal
export const atualizarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, idade, status_saude } = req.body;
    if (!nome || !especie || !raca || !idade || !status_saude) {
      return res.status(404).send("Preencha todos os campos.");
    }
    const animal = await Animal.update(
      { nome, especie, raca, idade, status_saude },
      { where: { id } }
    );
    return res.status(200).send("Informações atualizadas com sucesso.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao atualizar informações.",
      error: err.message,
    });
  }
};

// Excluir animal
export const excluirAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.destroy({ where: { id } });
    return res.status(204).send("Animal deletado com sucesso.");
  } catch {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao deletar animal",
      error: err.message,
    });
  }
};
