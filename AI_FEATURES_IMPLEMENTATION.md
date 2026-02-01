# AI Features Implementation Guide

## 🤖 Resume Ranking Engine

### What Needs to Be Coded

#### 1. **Core Components**

| Component | Description | Files to Create |
|-----------|-------------|-----------------|
| **Resume Parser** | Extract text from PDF/DOCX resumes | `src/lib/ai/resume-parser.ts` |
| **Skills Extractor** | Identify skills using NLP/regex | `src/lib/ai/skills-extractor.ts` |
| **Scoring Algorithm** | Calculate match score vs job requirements | `src/lib/ai/resume-scorer.ts` |
| **Ranking Service** | Sort candidates by score | `src/lib/ai/ranking-service.ts` |
| **API Routes** | Upload, parse, score, rank endpoints | `src/app/api/hiring/...` |
| **UI Components** | Upload interface, ranking dashboard | `src/app/hr/hiring/...` |

#### 2. **Data Models (Prisma)**

```prisma
// Add to schema.prisma
model Candidate {
  id          String   @id @default(uuid())
  name        String
  email       String
  phone       String?
  resumeUrl   String
  resumeText  String?  @db.Text
  skills      String[]
  experience  Int      // Years
  education   Json?
  score       Float?
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Job {
  id           String      @id @default(uuid())
  title        String
  description  String      @db.Text
  requirements String[]    // Required skills
  experienceMin Int
  experienceMax Int
  candidates   Candidate[]
  status       String      // OPEN, CLOSED
}
```

#### 3. **Key Algorithms**

**Skills Matching Score:**
```typescript
// src/lib/ai/resume-scorer.ts
function calculateSkillScore(
  candidateSkills: string[],
  requiredSkills: string[]
): number {
  const matched = candidateSkills.filter(skill => 
    requiredSkills.some(req => 
      skill.toLowerCase().includes(req.toLowerCase()) ||
      req.toLowerCase().includes(skill.toLowerCase())
    )
  );
  return (matched.length / requiredSkills.length) * 100;
}
```

**Overall Ranking Formula:**
```typescript
interface ScoreWeights {
  skills: 0.5;      // 50% - Most important
  experience: 0.25; // 25% - Years of experience
  education: 0.15;  // 15% - Degree relevance
  keywords: 0.10;   // 10% - Job description keywords
}

function calculateOverallScore(
  candidate: Candidate,
  job: Job,
  weights: ScoreWeights
): number {
  const skillScore = calculateSkillScore(candidate.skills, job.requirements);
  const expScore = calculateExperienceScore(candidate.experience, job);
  const eduScore = calculateEducationScore(candidate.education, job);
  const keywordScore = calculateKeywordScore(candidate.resumeText, job.description);
  
  return (
    skillScore * weights.skills +
    expScore * weights.experience +
    eduScore * weights.education +
    keywordScore * weights.keywords
  );
}
```

#### 4. **API Routes to Implement**

```typescript
// src/app/api/hiring/jobs/route.ts
// POST - Create job with requirements
// GET - List all jobs

// src/app/api/hiring/candidates/route.ts
// POST - Upload resume, parse, extract skills
// GET - List candidates for a job

// src/app/api/hiring/rank/route.ts
// POST - Calculate and return ranked candidates
// Body: { jobId: string }

// src/app/api/hiring/parse-resume/route.ts
// POST - Parse PDF/DOCX and return extracted data
// Body: FormData with file
```

#### 5. **UI Screens to Build**

| Screen | Path | Features |
|--------|------|----------|
| Job Listings | `/hr/hiring/jobs` | Create, edit, close jobs |
| Job Detail | `/hr/hiring/jobs/[id]` | View requirements, candidate count |
| Upload Resume | `/hr/hiring/upload` | Drag-drop upload, batch processing |
| Candidate Ranking | `/hr/hiring/rank/[jobId]` | Sorted list, filters, export |
| Candidate Profile | `/hr/hiring/candidates/[id]` | Full resume, score breakdown |

---

## 💬 HR Policy Chatbot

### What Needs to Be Coded

#### 1. **Core Components**

| Component | Description | Files to Create |
|-----------|-------------|-----------------|
| **Document Parser** | Parse policy PDFs/HTML | `src/lib/ai/policy-parser.ts` |
| **Vector Store** | Store policy embeddings | `src/lib/ai/vector-store.ts` |
| **Embedding Service** | Generate text embeddings | `src/lib/ai/embeddings.ts` |
| **Chat Service** | Query and respond | `src/lib/ai/chat-service.ts` |
| **Chat API** | WebSocket/HTTP endpoints | `src/app/api/chat/...` |
| **Chat UI** | Chat interface component | `src/components/chat/...` |

#### 2. **Data Models (Prisma)**

```prisma
// Add to schema.prisma
model PolicyDocument {
  id          String   @id @default(uuid())
  title       String
  category    String   // LEAVE, PAYROLL, CONDUCT, etc.
  content     String   @db.Text
  embedding   Bytes?   // Vector embedding
  metadata    Json?    // { department: "all", effectiveDate: "..." }
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ChatSession {
  id          String    @id @default(uuid())
  userId      String
  messages    ChatMessage[]
  createdAt   DateTime  @default(now())
}

model ChatMessage {
  id          String   @id @default(uuid())
  sessionId   String
  session     ChatSession @relation(fields: [sessionId], references: [id])
  role        String   // user, assistant
  content     String   @db.Text
  sources     Json?    // Referenced policies
  createdAt   DateTime @default(now())
}
```

#### 3. **Key Algorithms**

**Similarity Search:**
```typescript
// src/lib/ai/vector-store.ts
async function findRelevantPolicies(
  query: string,
  topK: number = 3
): Promise<PolicyDocument[]> {
  const queryEmbedding = await generateEmbedding(query);
  
  // Cosine similarity search
  const policies = await prisma.$queryRaw<PolicyDocument[]>`
    SELECT *, 
      (embedding <=> ${queryEmbedding}::vector) as similarity
    FROM "PolicyDocument"
    ORDER BY similarity ASC
    LIMIT ${topK}
  `;
  
  return policies;
}
```

**RAG (Retrieval Augmented Generation):**
```typescript
// src/lib/ai/chat-service.ts
async function generateResponse(
  userQuery: string,
  chatHistory: ChatMessage[]
): Promise<string> {
  // 1. Retrieve relevant policies
  const relevantPolicies = await findRelevantPolicies(userQuery);
  
  // 2. Build context
  const context = relevantPolicies.map(p => 
    `Policy: ${p.title}\n${p.content}`
  ).join('\n\n');
  
  // 3. Generate response using AI SDK
  const prompt = `
    You are an HR assistant. Answer based on the following policies:
    ${context}
    
    User question: ${userQuery}
    
    Provide a clear, concise answer. If the answer isn't in the policies, say so.
  `;
  
  const response = await aiSdk.generate(prompt);
  return response.text;
}
```

#### 4. **API Routes to Implement**

```typescript
// src/app/api/chat/policies/route.ts
// POST - Upload and index policy document
// GET - List all policies

// src/app/api/chat/session/route.ts
// POST - Create new chat session
// GET - Get session history

// src/app/api/chat/message/route.ts
// POST - Send message, get AI response
// Body: { sessionId: string, message: string }

// WebSocket for real-time chat
// src/app/api/chat/ws/route.ts
```

#### 5. **UI Screens to Build**

| Screen | Path | Features |
|--------|------|----------|
| Chat Interface | `/employee/helpdesk/chat` | Chat window, history, suggestions |
| Policy Management | `/admin/policies` | Upload, edit, categorize policies |
| Chat Analytics | `/admin/chat-analytics` | Common queries, satisfaction |

---

## 📚 Open Source Repositories to Reference

### Resume Ranking / ATS

| Repository | Stars | Language | Features |
|------------|-------|----------|----------|
| **Resume-Matcher** | 5k+ | Python | AI-powered resume-job matching |
| **Open-ATS** | 2k+ | Python/JS | Open source ATS with ranking |
| **Resume-Parser** | 1.5k+ | Python | PDF parsing, skill extraction |
| **PyResume** | 800+ | Python | Resume parsing and analysis |

**Best for Reference:**
- [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) - Uses spaCy for NLP, has good scoring algorithm
- [Open-ATS](https://github.com/Open-ATS) - Full ATS implementation

### Chatbot / RAG Systems

| Repository | Stars | Language | Features |
|------------|-------|----------|----------|
| **LangChain** | 90k+ | Python/JS | LLM chains, RAG, embeddings |
| **LlamaIndex** | 35k+ | Python | Document indexing, querying |
| **ChatGPT-Clone** | 10k+ | JS/TS | Chat UI, streaming responses |
| **RAGFlow** | 15k+ | Python | End-to-end RAG system |

**Best for Reference:**
- [LangChain](https://github.com/langchain-ai/langchain) - Industry standard for RAG
- [LlamaIndex](https://github.com/run-llama/llama_index) - Best for document Q&A

### Vector Databases

| Database | Best For | Integration |
|----------|----------|-------------|
| **Pinecone** | Production, scale | Easy API |
| **Weaviate** | Open source, self-host | GraphQL interface |
| **ChromaDB** | Local dev, small scale | Python/JS SDK |
| **pgvector** | PostgreSQL extension | SQL queries |

---

## 🛠 Implementation Steps

### Phase 1: Resume Ranking (Week 1-2)

1. **Setup**
   ```bash
   npm install pdf-parse mammoth natural
   npm install @xenova/transformers  # For embeddings
   ```

2. **Create Parser**
   - PDF text extraction
   - DOCX text extraction
   - Skills keyword matching

3. **Build Scoring**
   - Skills matching algorithm
   - Experience calculation
   - Overall ranking

4. **API & UI**
   - Upload endpoint
   - Ranking dashboard
   - Candidate list view

### Phase 2: Chatbot (Week 3-4)

1. **Setup**
   ```bash
   npm install @xenova/transformers  # Embeddings
   npm install pgvector  # If using PostgreSQL
   ```

2. **Document Processing**
   - Policy upload
   - Text chunking
   - Embedding generation

3. **Vector Store**
   - Store embeddings
   - Similarity search
   - Context retrieval

4. **Chat Interface**
   - Chat UI component
   - Message history
   - Source citations

---

## 💡 Architecture Recommendations

### Resume Ranking Flow
```
Upload Resume → Parse Text → Extract Skills → 
Calculate Score → Store Result → Display Ranking
```

### Chatbot Flow
```
User Query → Generate Embedding → Search Vector DB → 
Retrieve Context → Generate Response → Return Answer
```

### Tech Stack for AI Features

| Component | Recommendation |
|-----------|----------------|
| **Embeddings** | `@xenova/transformers` (local) or OpenAI API |
| **Vector DB** | `pgvector` (already using Prisma + SQLite) |
| **PDF Parsing** | `pdf-parse` |
| **DOCX Parsing** | `mammoth` |
| **NLP** | `natural` or `compromise` |
| **AI SDK** | Your existing `z-ai-web-dev-sdk` |

---

## 📊 Expected Outcomes

### Resume Ranking
- Upload resumes via drag-drop
- Automatic skill extraction
- Match score 0-100 for each candidate
- Sortable ranking table
- Export to CSV

### HR Chatbot
- Natural language policy queries
- Instant answers with source citations
- Chat history per user
- Admin panel for policy management
- Usage analytics

---

*Document Version: 1.0*
*Last Updated: February 2026*
