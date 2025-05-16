const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const tarefa = await prisma.tarefa.create({
      data: req.body,
    });
    return res.status(201).json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true },
    });
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const readOne = async (req, res) => {
  try {
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: { usuario: true },
    });
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    return res.json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const tarefa = await prisma.tarefa.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.status(202).json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await prisma.tarefa.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const atualizarPrioridade = async (req, res) => {
  try {
    const tarefa = await prisma.tarefa.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        prioridade: req.body.prioridade.toUpperCase(),
      },
    });
    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const tarefa = await prisma.tarefa.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status.toUpperCase(),
      },
    });
    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
  atualizarPrioridade,
  atualizarStatus
};