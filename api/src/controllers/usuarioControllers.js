const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { nome, email } = req.body;
  try {
    const usuario = await prisma.Usuario.create({
      data: {
        nome,
        email,
      },
    });
    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const read = async (req, res) => {
  try {
    const usuarios = await prisma.Usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const readOne = async (req, res) => {
  try {
    const usuario = await prisma.Usuario.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        tarefas: true,
      },
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { nome, email } = req.body;
  try {
    const usuario = await prisma.Usuario.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        nome,
        email,
      },
    });
    return res.status(202).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await prisma.Usuario.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { create, read, readOne, update, remove };
