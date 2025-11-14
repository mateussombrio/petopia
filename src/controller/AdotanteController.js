import Adotante from "../model/Adotante.model.js";

export const mostrarAdotantes = async (_, res) => {
  try {
    const adotantes = await Adotante.findAll();
    return res.status(200).json(adotantes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao informar adotantes.",
      error: err.message,
    });
  }
};

export const mostrarAdotanteID = async (req, res) => {
  try {
    const { id } = req.params;
    const adotante = await Adotante.findOne({ where: { id: id } });
    return res.status(200).json(adotante);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao informar adotante.",
      error: err.message,
    });
  }
};

export const criarAdotante = async (req, res) => {
  try {
    const { nome, contato, endereco, senha } = req.body;
    if (!nome || !contato || !endereco) {
      return res.status(404).send("Preencha todos os campos.");
    }
    const adotante = await Adotante.create({ nome, contato, email, endereco, senha });
    return res.status(201).send("Usuário criado com sucesso.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao criar usuário.",
      erro: err.message,
    });
  }
};

export const atualizarAdotante = async (req, res) => {
  try {
    const idUsuarioLogado = req.userId
    const { nome, contato, endereco } = req.body;
    if (!nome || !contato || !endereco) {
      return res.status(404).send("Preencha todos os campos.");
    }
    const adotante = await Adotante.update(
      { nome, contato, endereco },
      { where: {id: idUsuarioLogado} }
    );
    return res.status(200).send("Usuário atualizado com sucesso.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao atualizar usuário.",
      erro: err.message,
    });
  }
};

export const excluirAdotante = async (req, res) => {
  try {
    const idUsuarioLogado = req.userId;
    const adotante = await Adotante.destroy({ where: {id: idUsuarioLogado} });
    return res.status(204).send("Usuário excluído com sucesso.");
  } catch (err) {
    console.error(err);
  }
};
