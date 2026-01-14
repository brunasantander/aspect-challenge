import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./database/data-source";
import examRoutes from "./routes/examRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Logging middleware (desenvolvimento)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Rotas
app.use("/api/exams", examRoutes);
app.use("/api/appointments", appointmentRoutes);

// Rota de health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    message: "API de Agendamento de Exames - Aspect Challenge",
    version: "1.0.0",
    endpoints: {
      exams: "/api/exams",
      appointments: "/api/appointments",
      health: "/api/health",
    },
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
