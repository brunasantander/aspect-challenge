import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Exam } from "./Exam";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  patientName!: string;

  @Column({ length: 100 })
  patientEmail!: string;

  @Column({ length: 20, nullable: true })
  patientPhone?: string;

  @ManyToOne(() => Exam, (exam) => exam.appointments, { eager: true })
  @JoinColumn({ name: "exam_id" })
  exam!: Exam;

  @Column({ name: "exam_id" })
  examId!: number;

  @Column({ type: "timestamp" })
  dateTime!: Date;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status!: AppointmentStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
