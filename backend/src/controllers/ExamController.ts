import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Exam } from "../entities/Exam";

const examRepository = AppDataSource.getRepository(Exam);

export class ExamController {
  // GET /exams - Listar todos os exames
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const exams = await examRepository.find({
        order: { specialty: "ASC", name: "ASC" },
      });
      res.json(exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
      res.status(500).json({ error: "Erro ao buscar exames" });
    }
  }

  // GET /exams/:id - Buscar exame por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const exam = await examRepository.findOneBy({ id: parseInt(id, 10) });

      if (!exam) {
        res.status(404).json({ error: "Exame não encontrado" });
        return;
      }

      res.json(exam);
    } catch (error) {
      console.error("Error fetching exam:", error);
      res.status(500).json({ error: "Erro ao buscar exame" });
    }
  }

  // GET /exams/specialty/:specialty - Buscar exames por especialidade
  static async getBySpecialty(req: Request, res: Response): Promise<void> {
    try {
      const specialty = req.params.specialty as string;
      const exams = await examRepository.find({
        where: { specialty },
        order: { name: "ASC" },
      });
      res.json(exams);
    } catch (error) {
      console.error("Error fetching exams by specialty:", error);
      res.status(500).json({ error: "Erro ao buscar exames por especialidade" });
    }
  }

  // POST /exams - Criar novo exame
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, specialty, description, price } = req.body;

      if (!name || !specialty) {
        res.status(400).json({ error: "Nome e especialidade são obrigatórios" });
        return;
      }

      const exam = examRepository.create({
        name,
        specialty,
        description,
        price,
      });

      const savedExam = await examRepository.save(exam);
      res.status(201).json(savedExam);
    } catch (error) {
      console.error("Error creating exam:", error);
      res.status(500).json({ error: "Erro ao criar exame" });
    }
  }

  // PUT /exams/:id - Atualizar exame
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { name, specialty, description, price } = req.body;

      const exam = await examRepository.findOneBy({ id: parseInt(id, 10) });

      if (!exam) {
        res.status(404).json({ error: "Exame não encontrado" });
        return;
      }

      exam.name = name ?? exam.name;
      exam.specialty = specialty ?? exam.specialty;
      exam.description = description ?? exam.description;
      exam.price = price ?? exam.price;

      const updatedExam = await examRepository.save(exam);
      res.json(updatedExam);
    } catch (error) {
      console.error("Error updating exam:", error);
      res.status(500).json({ error: "Erro ao atualizar exame" });
    }
  }

  // DELETE /exams/:id - Deletar exame
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const exam = await examRepository.findOneBy({ id: parseInt(id, 10) });

      if (!exam) {
        res.status(404).json({ error: "Exame não encontrado" });
        return;
      }

      await examRepository.remove(exam);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting exam:", error);
      res.status(500).json({ error: "Erro ao deletar exame" });
    }
  }
}
