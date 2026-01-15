# MedAgenda - Sistema de Agendamento de Exames

Sistema completo para agendamento de exames médicos, desenvolvido como desafio técnico para a Aspect.

## Tecnologias Utilizadas

### Backend

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional

### Frontend

- **React** + **TypeScript**
- **Context API** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **CSS3** - Estilização responsiva

### DevOps

- **Docker** + **Docker Compose**

## Funcionalidades

- Listagem de exames disponíveis por especialidade
- Agendamento de exames com validação de dados
- Visualização de agendamentos
- Gerenciamento de status (Agendado, Confirmado, Cancelado, Concluído)
- Exclusão de agendamentos
- Interface responsiva

## Pré-requisitos

- Node.js 18+
- PostgreSQL 15+ (ou Docker)
- npm ou yarn

## Como Executar

### Opção 1: Com Docker (Recomendado)

```bash
# Subir todos os serviços
docker-compose up -d

# Acessar:
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
```

### Opção 2: Manualmente

#### 1. Banco de Dados

Crie o banco PostgreSQL:

```sql
CREATE DATABASE aspect_db;
```

#### 2. Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Rodar em desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

#### 3. Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar em desenvolvimento
npm start
```

O frontend estará disponível em `http://localhost:3000`

## Variáveis de Ambiente

### Backend (.env)

```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=aspect_db
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Endpoints da API

### Exames

| Método | Endpoint         | Descrição              |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/exams`     | Listar todos os exames |
| GET    | `/api/exams/:id` | Buscar exame por ID    |
| POST   | `/api/exams`     | Criar novo exame       |
| PUT    | `/api/exams/:id` | Atualizar exame        |
| DELETE | `/api/exams/:id` | Deletar exame          |

### Agendamentos

| Método | Endpoint                       | Descrição                 |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/appointments`            | Listar agendamentos       |
| GET    | `/api/appointments/:id`        | Buscar agendamento por ID |
| POST   | `/api/appointments`            | Criar agendamento         |
| PUT    | `/api/appointments/:id`        | Atualizar agendamento     |
| PATCH  | `/api/appointments/:id/status` | Atualizar status          |
| DELETE | `/api/appointments/:id`        | Deletar agendamento       |

### Exemplos de Requisições

**Criar Agendamento:**

```json
POST /api/appointments
{
  "patientName": "João Silva",
  "patientEmail": "joao@email.com",
  "patientPhone": "(11) 99999-9999",
  "examId": 1,
  "dateTime": "2025-02-01T10:00:00",
  "notes": "Paciente em jejum"
}
```

**Atualizar Status:**

```json
PATCH /api/appointments/1/status
{
  "status": "confirmed"
}
```

## Estrutura do Projeto

```
aspect-challenge/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── AppointmentController.ts
│   │   │   └── ExamController.ts
│   │   ├── database/
│   │   │   └── data-source.ts
│   │   ├── entities/
│   │   │   ├── Appointment.ts
│   │   │   └── Exam.ts
│   │   ├── routes/
│   │   │   ├── appointmentRoutes.ts
│   │   │   └── examRoutes.ts
│   │   └── index.ts
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentForm.tsx
│   │   │   ├── AppointmentList.tsx
│   │   │   ├── ExamList.tsx
│   │   │   └── Header.tsx
│   │   ├── context/
│   │   │   └── AppointmentContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Scripts Disponíveis

### Backend

```bash
npm run dev      # Rodar em desenvolvimento com hot-reload
npm run build    # Compilar TypeScript
npm start        # Rodar build de produção
```

### Frontend

```bash
npm start        # Rodar em desenvolvimento
npm run build    # Gerar build de produção
npm test         # Rodar testes
```

## Autor

Desenvolvido para o desafio técnico da Aspect.
