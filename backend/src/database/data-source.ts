import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exam } from "../entities/Exam";
import { Appointment } from "../entities/Appointment";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "aspect_db",
  synchronize: true, // Em produção, usar migrations
  logging: process.env.NODE_ENV === "development",
  entities: [Exam, Appointment],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    // Seed inicial de exames se a tabela estiver vazia
    const examRepository = AppDataSource.getRepository(Exam);
    const examCount = await examRepository.count();

    if (examCount === 0) {
      console.log("Seeding initial exams...");
      const initialExams = [
        {
          name: "Hemograma Completo",
          specialty: "Hematologia",
          description: "Análise completa das células sanguíneas",
          price: 45.0,
        },
        {
          name: "Raio-X Tórax",
          specialty: "Radiologia",
          description: "Imagem radiográfica da região torácica",
          price: 80.0,
        },
        {
          name: "Eletrocardiograma",
          specialty: "Cardiologia",
          description: "Registro da atividade elétrica do coração",
          price: 120.0,
        },
        {
          name: "Ultrassom Abdominal",
          specialty: "Radiologia",
          description: "Exame de imagem do abdômen por ultrassonografia",
          price: 150.0,
        },
        {
          name: "Ressonância Magnética",
          specialty: "Radiologia",
          description: "Exame de imagem por ressonância magnética",
          price: 450.0,
        },
        {
          name: "Glicemia em Jejum",
          specialty: "Bioquímica",
          description: "Medição dos níveis de glicose no sangue",
          price: 25.0,
        },
        {
          name: "Colesterol Total e Frações",
          specialty: "Bioquímica",
          description: "Análise do perfil lipídico",
          price: 55.0,
        },
        {
          name: "TSH e T4 Livre",
          specialty: "Endocrinologia",
          description: "Avaliação da função tireoidiana",
          price: 85.0,
        },
      ];

      await examRepository.save(initialExams);
      console.log("Initial exams seeded successfully!");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
