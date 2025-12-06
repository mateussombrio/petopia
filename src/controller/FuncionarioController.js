import {Funcionario} from "../model/Funcionario.model.js";
import bcrypt from "bcrypt";

export const mostrarFuncionario = async (_, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    return res.status(200).json(funcionarios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao informar funcionários.",
      error: err.message,
    });
  }
};

export const mostrarFuncionarioID = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionario = await Funcionario.findOne({ where: { id: id } });
    return res.status(200).json(funcionario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao informar funcionários.",
      error: err.message,
    });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const dominio = "@petopia.com.br";
    if (!email.includes(dominio)) {
      return res.status(404).send("Domínio inválido.");s
    }

    if (!nome || !email || !senha) {
      return res.status(404).send("Preencha todos os campos.");
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(senha, salt);

    const funcionario = await Funcionario.create({
      nome,
      email,
      senha: hash,
    });

    return res.status(201).send("Usuário criado com sucesso.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao criar usuário.",
      erro: err.message,
    });
  }
};

export const atualizarFuncionario= async (req, res) => {
  try {
    const idUsuarioLogado = req.userId;

    const { nome, contato, endereco } = req.body;
    if (!nome || !contato || !endereco) {
      return res.status(404).send("Preencha todos os campos.");
    }
    const funcionario = await Funcionario.update(
      { nome, contato, endereco },
      { where: { id: idUsuarioLogado } },
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

export const excluirFuncionario = async (req, res) => {
  try {
    const idUsuarioLogado = req.userId;
    const funcionario = await Funcionario.destroy({ where: { id: idUsuarioLogado } });
    return res.status(204).send("Usuário excluído com sucesso.");
  } catch (err) {
    console.error(err);
  }
};
