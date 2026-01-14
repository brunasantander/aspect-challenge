import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { Exam } from "../entities/Exam";

const appointmentRepository = AppDataSource.getRepository(Appointment);
const examRepository = AppDataSource.getRepository(Exam);

export class AppointmentController {
  // GET /appointments - Listar todos os agendamentos
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { status, startDate, endDate } = req.query;

      const queryBuilder = appointmentRepository
        .createQueryBuilder("appointment")
        .leftJoinAndSelect("appointment.exam", "exam")
        .orderBy("appointment.dateTime", "ASC");

      if (status) {
        queryBuilder.andWhere("appointment.status = :status", { status });
      }

      if (startDate) {
        queryBuilder.andWhere("appointment.dateTime >= :startDate", {
          startDate: new Date(startDate as string),
        });
      }

      if (endDate) {
        queryBuilder.andWhere("appointment.dateTime <= :endDate", {
          endDate: new Date(endDate as string),
        });
      }

      const appointments = await queryBuilder.getMany();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Erro ao buscar agendamentos" });
    }
  }

  // GET /appointments/:id - Buscar agendamento por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const appointment = await appointmentRepository.findOne({
        where: { id: parseInt(id, 10) },
        relations: ["exam"],
      });

      if (!appointment) {
        res.status(404).json({ error: "Agendamento não encontrado" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error fetching appointment:", error);
      res.status(500).json({ error: "Erro ao buscar agendamento" });
    }
  }

  // POST /appointments - Criar novo agendamento
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { patientName, patientEmail, patientPhone, examId, dateTime, notes } =
        req.body;

      // Validações
      if (!patientName || !patientEmail || !examId || !dateTime) {
        res.status(400).json({
          error: "Nome do paciente, email, exame e data/hora são obrigatórios",
        });
        return;
      }

      // Verificar se o exame existe
      const exam = await examRepository.findOneBy({ id: examId });
      if (!exam) {
        res.status(404).json({ error: "Exame não encontrado" });
        return;
      }

      // Verificar se a data é futura
      const appointmentDate = new Date(dateTime);
      if (appointmentDate <= new Date()) {
        res.status(400).json({ error: "A data do agendamento deve ser futura" });
        return;
      }

      // Verificar conflito de horário (mesmo exame, mesma hora)
      const existingAppointment = await appointmentRepository.findOne({
        where: {
          examId,
          dateTime: appointmentDate,
          status: AppointmentStatus.SCHEDULED,
        },
      });

      if (existingAppointment) {
        res.status(409).json({
          error: "Já existe um agendamento para este exame neste horário",
        });
        return;
      }

      const appointment = appointmentRepository.create({
        patientName,
        patientEmail,
        patientPhone,
        examId,
        dateTime: appointmentDate,
        notes,
        status: AppointmentStatus.SCHEDULED,
      });

      const savedAppointment = await appointmentRepository.save(appointment);

      // Recarregar com a relação do exame
      const fullAppointment = await appointmentRepository.findOne({
        where: { id: savedAppointment.id },
        relations: ["exam"],
      });

      res.status(201).json(fullAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Erro ao criar agendamento" });
    }
  }

  // PUT /appointments/:id - Atualizar agendamento
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { patientName, patientEmail, patientPhone, examId, dateTime, notes, status } =
        req.body;

      const appointment = await appointmentRepository.findOne({
        where: { id: parseInt(id, 10) },
        relations: ["exam"],
      });

      if (!appointment) {
        res.status(404).json({ error: "Agendamento não encontrado" });
        return;
      }

      // Se mudar o exame, verificar se existe
      if (examId && examId !== appointment.examId) {
        const exam = await examRepository.findOneBy({ id: examId });
        if (!exam) {
          res.status(404).json({ error: "Exame não encontrado" });
          return;
        }
        appointment.examId = examId;
      }

      // Atualizar campos
      appointment.patientName = patientName ?? appointment.patientName;
      appointment.patientEmail = patientEmail ?? appointment.patientEmail;
      appointment.patientPhone = patientPhone ?? appointment.patientPhone;
      appointment.dateTime = dateTime ? new Date(dateTime) : appointment.dateTime;
      appointment.notes = notes ?? appointment.notes;
      appointment.status = status ?? appointment.status;

      const updatedAppointment = await appointmentRepository.save(appointment);

      // Recarregar com a relação do exame
      const fullAppointment = await appointmentRepository.findOne({
        where: { id: updatedAppointment.id },
        relations: ["exam"],
      });

      res.json(fullAppointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ error: "Erro ao atualizar agendamento" });
    }
  }

  // PATCH /appointments/:id/status - Atualizar status do agendamento
  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { status } = req.body;

      if (!Object.values(AppointmentStatus).includes(status)) {
        res.status(400).json({ error: "Status inválido" });
        return;
      }

      const appointment = await appointmentRepository.findOne({
        where: { id: parseInt(id, 10) },
        relations: ["exam"],
      });

      if (!appointment) {
        res.status(404).json({ error: "Agendamento não encontrado" });
        return;
      }

      appointment.status = status;
      const updatedAppointment = await appointmentRepository.save(appointment);

      res.json(updatedAppointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ error: "Erro ao atualizar status do agendamento" });
    }
  }

  // DELETE /appointments/:id - Deletar agendamento
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const appointment = await appointmentRepository.findOneBy({
        id: parseInt(id, 10),
      });

      if (!appointment) {
        res.status(404).json({ error: "Agendamento não encontrado" });
        return;
      }

      await appointmentRepository.remove(appointment);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ error: "Erro ao deletar agendamento" });
    }
  }
}
