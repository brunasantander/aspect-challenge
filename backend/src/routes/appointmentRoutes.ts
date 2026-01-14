import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";

const router = Router();

// GET /appointments - Listar todos os agendamentos
router.get("/", AppointmentController.getAll);

// GET /appointments/:id - Buscar agendamento por ID
router.get("/:id", AppointmentController.getById);

// POST /appointments - Criar novo agendamento
router.post("/", AppointmentController.create);

// PUT /appointments/:id - Atualizar agendamento
router.put("/:id", AppointmentController.update);

// PATCH /appointments/:id/status - Atualizar apenas o status
router.patch("/:id/status", AppointmentController.updateStatus);

// DELETE /appointments/:id - Deletar agendamento
router.delete("/:id", AppointmentController.delete);

export default router;
