import { Router } from "express";
import { ExamController } from "../controllers/ExamController";

const router = Router();

// GET /exams - Listar todos os exames
router.get("/", ExamController.getAll);

// GET /exams/:id - Buscar exame por ID
router.get("/:id", ExamController.getById);

// GET /exams/specialty/:specialty - Buscar exames por especialidade
router.get("/specialty/:specialty", ExamController.getBySpecialty);

// POST /exams - Criar novo exame
router.post("/", ExamController.create);

// PUT /exams/:id - Atualizar exame
router.put("/:id", ExamController.update);

// DELETE /exams/:id - Deletar exame
router.delete("/:id", ExamController.delete);

export default router;
