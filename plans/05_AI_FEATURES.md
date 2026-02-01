# HRM System - AI Features Implementation Guide

## 🤖 Overview

This document provides detailed implementation guidance for AI-powered features in the HRM System, including the Resume Ranking Engine and HR Policy Chatbot.

---

## 📊 Resume Ranking Engine

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     RESUME RANKING ENGINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Upload    │───>│   Parse     │───>│  Extract    │         │
│  │   Resume    │    │   Document  │    │  Skills     │         │
│  └─────────────┘    └─────────────┘    └──────┬──────┘         │
│                                                │                │
│                                                ▼                │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Display   │<───│    Sort     │<───│   Score     │         │
│  │   Results   │    │   & Rank    │    │  Candidate  │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                ▲                │
│                                                │                │
│                                       ┌─────────────┐          │
│                                       │   Job Req   │          │
│                                       │  Matching   │          │
│                                       └─────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Document Parser

**File:** `src/lib/ai/resume-parser.ts`

```typescript
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

interface ParsedResume {
  text: string;
  metadata: {
    pages?: number;
    wordCount: number;
  };
}

export async function parseResume(fileBuffer: Buffer, mimeType: string): Promise<ParsedResume> {
  let text = '';
  
  switch (mimeType) {
    case 'application/pdf':
      const pdfData = await pdf(fileBuffer);
      text = pdfData.text;
      return {
        text,
        metadata: {
          pages: pdfData.numpages,
          wordCount: text.split(/\s+/).length
        }
      };
      
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      const docxResult = await mammoth.extractRawText({ buffer: fileBuffer });
      text = docxResult.value;
      return {
        text,
        metadata: {
          wordCount: text.split(/\s+/).length
        }
      };
      
    case 'text/plain':
      text = fileBuffer.toString('utf-8');
      return {
        text,
        metadata: {
          wordCount: text.split(/\s+/).length
        }
      };
      
    default:
      throw new Error(`Unsupported file type: ${mimeType}`);
  }
}
```

### 2. Skills Extractor

**File:** `src/lib/ai/skills-extractor.ts`

```typescript
// Comprehensive skills database
const SKILLS_DATABASE = {
  technical: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust',
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt',
    'node.js', 'express', 'nestjs', 'fastify',
    'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch',
    'git', 'jenkins', 'github actions', 'gitlab ci', 'circleci'
  ],
  soft: [
    'leadership', 'communication', 'teamwork', 'problem solving',
    'critical thinking', 'time management', 'adaptability', 'creativity'
  ],
  domain: [
    'hr management', 'recruitment', 'payroll', 'performance management',
    'project management', 'agile', 'scrum', 'kanban',
    'finance', 'accounting', 'marketing', 'sales'
  ]
};

interface ExtractedSkills {
  technical: string[];
  soft: string[];
  domain: string[];
  all: string[];
  experience: number; // Years
  education: {
    level: 'high_school' | 'bachelor' | 'master' | 'phd';
    field?: string;
  }[];
}

export function extractSkills(resumeText: string): ExtractedSkills {
  const text = resumeText.toLowerCase();
  const skills: ExtractedSkills = {
    technical: [],
    soft: [],
    domain: [],
    all: [],
    experience: extractExperience(text),
    education: extractEducation(text)
  };
  
  // Extract technical skills
  SKILLS_DATABASE.technical.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      skills.technical.push(skill);
      skills.all.push(skill);
    }
  });
  
  // Extract soft skills
  SKILLS_DATABASE.soft.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      skills.soft.push(skill);
      skills.all.push(skill);
    }
  });
  
  // Extract domain skills
  SKILLS_DATABASE.domain.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      skills.domain.push(skill);
      skills.all.push(skill);
    }
  });
  
  return skills;
}

function extractExperience(text: string): number {
  // Look for patterns like "5 years of experience" or "2018-2023"
  const patterns = [
    /(\d+)\+?\s*years?\s*of\s*experience/i,
    /(\d+)\+?\s*years?\s*experience/i,
    /experience[\s:]*(\d+)\+?\s*years?/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1]);
    }
  }
  
  // Try to calculate from date ranges
  const yearPattern = /(20\d{2})\s*[-–]\s*(20\d{2}|present|current)/gi;
  const matches = [...text.matchAll(yearPattern)];
  
  if (matches.length > 0) {
    const currentYear = new Date().getFullYear();
    let totalYears = 0;
    
    matches.forEach(match => {
      const start = parseInt(match[1]);
      const end = match[2] === 'present' || match[2] === 'current' 
        ? currentYear 
        : parseInt(match[2]);
      totalYears += end - start;
    });
    
    return Math.round(totalYears);
  }
  
  return 0;
}

function extractEducation(text: string): ExtractedSkills['education'] {
  const education: ExtractedSkills['education'] = [];
  
  const patterns = [
    { level: 'phd', regex: /(ph\.?d\.?|doctorate|doctoral)/i },
    { level: 'master', regex: /(master|m\.?s\.?|m\.?a\.?|mba)/i },
    { level: 'bachelor', regex: /(bachelor|b\.?s\.?|b\.?a\.?|b\.?tech|b\.?e\.?)/i },
    { level: 'high_school', regex: /(high school|secondary|diploma)/i }
  ];
  
  patterns.forEach(({ level, regex }) => {
    if (regex.test(text)) {
      // Try to extract field of study
      const fieldMatch = text.match(new RegExp(`${level}[^.]*?(?:in|of)[^.]*?([a-z\s]+)`, 'i'));
      education.push({
        level: level as any,
        field: fieldMatch ? fieldMatch[1].trim() : undefined
      });
    }
  });
  
  return education;
}
```

### 3. Scoring Algorithm

**File:** `src/lib/ai/resume-scorer.ts`

```typescript
interface JobRequirements {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceMin: number;
  experienceMax?: number;
  educationLevel?: 'high_school' | 'bachelor' | 'master' | 'phd';
  description: string;
}

interface CandidateScore {
  overall: number;
  skills: number;
  experience: number;
  education: number;
  keywords: number;
  breakdown: {
    matchedRequired: string[];
    matchedPreferred: string[];
    missingRequired: string[];
  };
}

interface ScoreWeights {
  skills: number;
  experience: number;
  education: number;
  keywords: number;
}

const DEFAULT_WEIGHTS: ScoreWeights = {
  skills: 0.50,      // 50% - Most important
  experience: 0.25,  // 25% - Years of experience
  education: 0.15,   // 15% - Degree relevance
  keywords: 0.10     // 10% - Job description keywords
};

export function calculateCandidateScore(
  candidateSkills: ExtractedSkills,
  job: JobRequirements,
  resumeText: string,
  weights: ScoreWeights = DEFAULT_WEIGHTS
): CandidateScore {
  // Skills Score (0-100)
  const skillsScore = calculateSkillsScore(
    candidateSkills.all,
    job.requiredSkills,
    job.preferredSkills
  );
  
  // Experience Score (0-100)
  const experienceScore = calculateExperienceScore(
    candidateSkills.experience,
    job.experienceMin,
    job.experienceMax
  );
  
  // Education Score (0-100)
  const educationScore = calculateEducationScore(
    candidateSkills.education,
    job.educationLevel
  );
  
  // Keywords Score (0-100)
  const keywordsScore = calculateKeywordsScore(
    resumeText,
    job.description
  );
  
  // Overall Score (weighted)
  const overall = Math.round(
    skillsScore * weights.skills +
    experienceScore * weights.experience +
    educationScore * weights.education +
    keywordsScore * weights.keywords
  );
  
  return {
    overall,
    skills: skillsScore,
    experience: experienceScore,
    education: educationScore,
    keywords: keywordsScore,
    breakdown: {
      matchedRequired: job.requiredSkills.filter(skill =>
        candidateSkills.all.some(s => 
          s.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(s.toLowerCase())
        )
      ),
      matchedPreferred: job.preferredSkills.filter(skill =>
        candidateSkills.all.some(s => 
          s.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(s.toLowerCase())
        )
      ),
      missingRequired: job.requiredSkills.filter(skill =>
        !candidateSkills.all.some(s => 
          s.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(s.toLowerCase())
        )
      )
    }
  };
}

function calculateSkillsScore(
  candidateSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[]
): number {
  if (requiredSkills.length === 0) return 100;
  
  // Required skills matching
  const requiredMatches = requiredSkills.filter(reqSkill =>
    candidateSkills.some(skill => 
      skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
      reqSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  const requiredScore = (requiredMatches.length / requiredSkills.length) * 70;
  
  // Preferred skills matching (bonus)
  const preferredMatches = preferredSkills.filter(prefSkill =>
    candidateSkills.some(skill => 
      skill.toLowerCase().includes(prefSkill.toLowerCase()) ||
      prefSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  const preferredScore = preferredSkills.length > 0
    ? (preferredMatches.length / preferredSkills.length) * 30
    : 30;
  
  return Math.min(100, Math.round(requiredScore + preferredScore));
}

function calculateExperienceScore(
  candidateYears: number,
  requiredMin: number,
  requiredMax?: number
): number {
  if (candidateYears < requiredMin) {
    // Partial credit for close matches
    const ratio = candidateYears / requiredMin;
    return Math.round(ratio * 60); // Max 60 if below minimum
  }
  
  if (requiredMax && candidateYears > requiredMax) {
    // Slight penalty for overqualified (might leave soon)
    return 90;
  }
  
  // Sweet spot
  return 100;
}

function calculateEducationScore(
  candidateEducation: ExtractedSkills['education'],
  requiredLevel?: string
): number {
  if (!requiredLevel || candidateEducation.length === 0) {
    return 100; // No requirement or no data
  }
  
  const levels = ['high_school', 'bachelor', 'master', 'phd'];
  const requiredIndex = levels.indexOf(requiredLevel);
  const highestCandidate = candidateEducation.reduce((highest, edu) => {
    const currentIndex = levels.indexOf(edu.level);
    return currentIndex > levels.indexOf(highest) ? edu.level : highest;
  }, 'high_school');
  
  const candidateIndex = levels.indexOf(highestCandidate);
  
  if (candidateIndex >= requiredIndex) {
    return 100;
  }
  
  // Partial credit
  const diff = requiredIndex - candidateIndex;
  return Math.max(0, 100 - diff * 30);
}

function calculateKeywordsScore(
  resumeText: string,
  jobDescription: string
): number {
  // Extract important keywords from job description
  const jobWords = jobDescription
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  // Get unique keywords
  const keywords = [...new Set(jobWords)];
  
  // Count matches in resume
  const resumeLower = resumeText.toLowerCase();
  const matches = keywords.filter(keyword => 
    resumeLower.includes(keyword)
  );
  
  return Math.round((matches.length / Math.min(keywords.length, 20)) * 100);
}
```

### 4. API Implementation

**File:** `src/app/api/hiring/rank/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseResume } from '@/lib/ai/resume-parser';
import { extractSkills } from '@/lib/ai/skills-extractor';
import { calculateCandidateScore } from '@/lib/ai/resume-scorer';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Verify HR/Admin access
    const session = await auth();
    if (!session || !['HR', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }
    
    const { jobId, candidateIds } = await req.json();
    
    // Fetch job requirements
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    
    if (!job) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Job not found' } },
        { status: 404 }
      );
    }
    
    // Fetch candidates
    const candidates = await prisma.candidate.findMany({
      where: {
        id: { in: candidateIds },
        jobId
      }
    });
    
    // Score each candidate
    const rankings = await Promise.all(
      candidates.map(async (candidate) => {
        // Download and parse resume
        const resumeBuffer = await downloadResume(candidate.resumeUrl);
        const parsed = await parseResume(resumeBuffer, 'application/pdf');
        const skills = extractSkills(parsed.text);
        
        // Calculate score
        const score = calculateCandidateScore(
          skills,
          {
            title: job.title,
            requiredSkills: job.requirements,
            preferredSkills: [], // Can be extended
            experienceMin: job.experienceMin,
            experienceMax: job.experienceMax || undefined,
            description: job.description
          },
          parsed.text
        );
        
        // Update candidate score in database
        await prisma.candidate.update({
          where: { id: candidate.id },
          data: {
            score: score.overall,
            resumeText: parsed.text,
            skills: skills.all
          }
        });
        
        return {
          candidateId: candidate.id,
          name: candidate.name,
          email: candidate.email,
          score: score.overall,
          breakdown: {
            skills: score.skills,
            experience: score.experience,
            education: score.education,
            keywords: score.keywords
          },
          matchedSkills: score.breakdown.matchedRequired,
          missingSkills: score.breakdown.missingRequired
        };
      })
    );
    
    // Sort by score (descending)
    rankings.sort((a, b) => b.score - a.score);
    
    // Add rank
    const rankedResults = rankings.map((r, index) => ({
      ...r,
      rank: index + 1
    }));
    
    return NextResponse.json({
      success: true,
      data: {
        jobId,
        jobTitle: job.title,
        totalCandidates: candidates.length,
        rankings: rankedResults
      }
    });
    
  } catch (error) {
    console.error('Ranking error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to rank candidates' } },
      { status: 500 }
    );
  }
}

async function downloadResume(url: string): Promise<Buffer> {
  // Implementation depends on storage (S3, local, etc.)
  // Return buffer of file content
}
```

### 5. UI Components

**File:** `src/app/hr/hiring/rank/[jobId]/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface RankingResult {
  candidateId: string;
  name: string;
  email: string;
  score: number;
  rank: number;
  breakdown: {
    skills: number;
    experience: number;
    education: number;
    keywords: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
}

export default function RankCandidatesPage() {
  const { jobId } = useParams();
  const [rankings, setRankings] = useState<RankingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobTitle, setJobTitle] = useState('');
  
  useEffect(() => {
    fetchRankings();
  }, [jobId]);
  
  const fetchRankings = async () => {
    try {
      const response = await fetch(`/api/hiring/rank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId })
      });
      
      const data = await response.json();
      if (data.success) {
        setRankings(data.data.rankings);
        setJobTitle(data.data.jobTitle);
      }
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Candidate Rankings</h1>
          <p className="text-muted-foreground">{jobTitle}</p>
        </div>
        <Button onClick={fetchRankings}>Refresh Rankings</Button>
      </div>
      
      <div className="space-y-4">
        {rankings.map((candidate) => (
          <Card key={candidate.candidateId}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-muted-foreground">
                      #{candidate.rank}
                    </span>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold">{candidate.score}%</div>
                  <p className="text-sm text-muted-foreground">Match Score</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Skills</p>
                  <Progress value={candidate.breakdown.skills} className="mt-1" />
                  <p className="text-xs mt-1">{candidate.breakdown.skills}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <Progress value={candidate.breakdown.experience} className="mt-1" />
                  <p className="text-xs mt-1">{candidate.breakdown.experience}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <Progress value={candidate.breakdown.education} className="mt-1" />
                  <p className="text-xs mt-1">{candidate.breakdown.education}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Keywords</p>
                  <Progress value={candidate.breakdown.keywords} className="mt-1" />
                  <p className="text-xs mt-1">{candidate.breakdown.keywords}%</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">Matched Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.matchedSkills.map(skill => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {candidate.missingSkills.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Missing Required Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {candidate.missingSkills.map(skill => (
                      <Badge key={skill} variant="destructive">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

---

## 💬 HR Policy Chatbot

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      HR POLICY CHATBOT                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Upload    │───>│   Parse     │───>│  Generate   │         │
│  │   Policy    │    │   Document  │    │  Embeddings │         │
│  │   Document  │    │             │    │             │         │
│  └─────────────┘    └─────────────┘    └──────┬──────┘         │
│                                                │                │
│                                                ▼                │
│                                       ┌─────────────┐          │
│                                       │   Vector    │          │
│                                       │    Store    │          │
│                                       │  (pgvector) │          │
│                                       └──────┬──────┘          │
│                                                │                │
│  ┌─────────────┐    ┌─────────────┐    ┌──────┴──────┐         │
│  │   Display   │<───│  Generate   │<───│   Search    │         │
│  │   Answer    │    │   Response  │    │   Context   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                          ▲                                      │
│                          │                                      │
│                   ┌──────┴──────┐                               │
│                   │  User Query │                               │
│                   │  + History  │                               │
│                   └─────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Document Processing

**File:** `src/lib/ai/policy-parser.ts`

```typescript
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

interface PolicyDocument {
  title: string;
  category: string;
  content: string;
  chunks: PolicyChunk[];
}

interface PolicyChunk {
  id: string;
  content: string;
  section: string;
  embedding?: number[];
}

export async function parsePolicyDocument(
  fileBuffer: Buffer,
  mimeType: string,
  metadata: { title: string; category: string }
): Promise<PolicyDocument> {
  // Extract text based on file type
  let text = '';
  
  switch (mimeType) {
    case 'application/pdf':
      const pdfData = await pdf(fileBuffer);
      text = pdfData.text;
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      const docxResult = await mammoth.extractRawText({ buffer: fileBuffer });
      text = docxResult.value;
      break;
    case 'text/plain':
      text = fileBuffer.toString('utf-8');
      break;
    default:
      throw new Error(`Unsupported file type: ${mimeType}`);
  }
  
  // Chunk the document
  const chunks = chunkDocument(text);
  
  return {
    title: metadata.title,
    category: metadata.category,
    content: text,
    chunks
  };
}

function chunkDocument(text: string, maxChunkSize: number = 1000): PolicyChunk[] {
  const chunks: PolicyChunk[] = [];
  const sections = text.split(/\n#{1,3}\s+/); // Split by headers
  
  sections.forEach((section, index) => {
    if (!section.trim()) return;
    
    // Extract section title
    const lines = section.split('\n');
    const sectionTitle = lines[0].trim();
    const sectionContent = lines.slice(1).join('\n').trim();
    
    // Further chunk if too large
    if (sectionContent.length > maxChunkSize) {
      const subChunks = splitIntoChunks(sectionContent, maxChunkSize);
      subChunks.forEach((subChunk, subIndex) => {
        chunks.push({
          id: `chunk-${index}-${subIndex}`,
          content: subChunk,
          section: sectionTitle
        });
      });
    } else {
      chunks.push({
        id: `chunk-${index}`,
        content: sectionContent,
        section: sectionTitle
      });
    }
  });
  
  return chunks;
}

function splitIntoChunks(text: string, maxSize: number): string[] {
  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  let currentChunk = '';
  sentences.forEach(sentence => {
    if ((currentChunk + sentence).length > maxSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  });
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}
```

### 2. Embedding Generation

**File:** `src/lib/ai/embeddings.ts`

```typescript
import { pipeline } from '@xenova/transformers';

let embeddingModel: any = null;

async function getEmbeddingModel() {
  if (!embeddingModel) {
    embeddingModel = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }
  return embeddingModel;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await getEmbeddingModel();
  const output = await model(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const model = await getEmbeddingModel();
  const embeddings = [];
  
  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    embeddings.push(embedding);
  }
  
  return embeddings;
}
```

### 3. Vector Store

**File:** `src/lib/ai/vector-store.ts`

```typescript
import { prisma } from '@/lib/prisma';
import { generateEmbedding } from './embeddings';

export async function storePolicyChunks(
  documentId: string,
  chunks: { id: string; content: string; section: string }[]
): Promise<void> {
  // Generate embeddings for all chunks
  const embeddings = await Promise.all(
    chunks.map(chunk => generateEmbedding(chunk.content))
  );
  
  // Store in database with pgvector
  for (let i = 0; i < chunks.length; i++) {
    await prisma.$executeRaw`
      INSERT INTO "PolicyChunk" (id, document_id, content, section, embedding)
      VALUES (
        ${chunks[i].id},
        ${documentId},
        ${chunks[i].content},
        ${chunks[i].section},
        ${embeddings[i]}::vector
      )
    `;
  }
}

export async function searchRelevantChunks(
  query: string,
  topK: number = 5
): Promise<Array<{ content: string; section: string; similarity: number }>> {
  const queryEmbedding = await generateEmbedding(query);
  
  // Cosine similarity search using pgvector
  const results = await prisma.$queryRaw<Array<{
    content: string;
    section: string;
    similarity: number;
  }>>`
    SELECT 
      content,
      section,
      1 - (embedding <=> ${queryEmbedding}::vector) as similarity
    FROM "PolicyChunk"
    ORDER BY embedding <=> ${queryEmbedding}::vector
    LIMIT ${topK}
  `;
  
  return results;
}
```

### 4. Chat Service

**File:** `src/lib/ai/chat-service.ts`

```typescript
import { searchRelevantChunks } from './vector-store';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ policy: string; section: string }>;
}

interface ChatContext {
  sessionId: string;
  history: ChatMessage[];
}

export async function generateChatResponse(
  query: string,
  context: ChatContext
): Promise<ChatMessage> {
  // 1. Retrieve relevant policy chunks
  const relevantChunks = await searchRelevantChunks(query, 5);
  
  // 2. Build context from retrieved chunks
  const policyContext = relevantChunks
    .map(chunk => `Section: ${chunk.section}\n${chunk.content}`)
    .join('\n\n---\n\n');
  
  // 3. Build conversation history
  const recentHistory = context.history.slice(-5);
  const conversationContext = recentHistory
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');
  
  // 4. Generate prompt for AI
  const prompt = `
You are an HR assistant for a company. Answer the user's question based ONLY on the following company policies:

${policyContext}

Conversation History:
${conversationContext}

User Question: ${query}

Instructions:
1. Answer based ONLY on the provided policies
2. If the answer is not in the policies, say "I don't have information about that in our policies"
3. Be concise and professional
4. Cite the specific policy section in your answer
5. Suggest 2-3 related follow-up questions at the end

Response:`;

  // 5. Call AI SDK
  const aiResponse = await callAISDK(prompt);
  
  // 6. Extract sources
  const sources = relevantChunks.map(chunk => ({
    policy: chunk.section.split(':')[0] || 'Company Policy',
    section: chunk.section
  }));
  
  return {
    role: 'assistant',
    content: aiResponse,
    sources: sources.slice(0, 3) // Top 3 sources
  };
}

async function callAISDK(prompt: string): Promise<string> {
  // Use your existing z-ai-web-dev-sdk
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  
  const data = await response.json();
  return data.text;
}

export function generateSuggestions(query: string): string[] {
  // Generate contextual suggestions based on query
  const commonQuestions = [
    'How many leaves do I have?',
    'What is the leave approval process?',
    'How do I apply for reimbursement?',
    'What are the working hours?',
    'How is performance evaluated?'
  ];
  
  // Return 3 random suggestions (can be made smarter)
  return commonQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}
```

### 5. API Routes

**File:** `src/app/api/chat/policies/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parsePolicyDocument } from '@/lib/ai/policy-parser';
import { storePolicyChunks } from '@/lib/ai/vector-store';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      );
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    
    if (!file || !title || !category) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } },
        { status: 400 }
      );
    }
    
    // Parse document
    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await parsePolicyDocument(buffer, file.type, { title, category });
    
    // Create policy document record
    const document = await prisma.policyDocument.create({
      data: {
        title,
        category,
        content: parsed.content
      }
    });
    
    // Store chunks with embeddings
    await storePolicyChunks(document.id, parsed.chunks);
    
    return NextResponse.json({
      success: true,
      data: {
        documentId: document.id,
        title,
        category,
        chunksCount: parsed.chunks.length
      },
      message: 'Policy document uploaded and indexed successfully'
    });
    
  } catch (error) {
    console.error('Policy upload error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to process policy' } },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const documents = await prisma.policyDocument.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      data: documents
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch policies' } },
      { status: 500 }
    );
  }
}
```

**File:** `src/app/api/chat/message/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateChatResponse, generateSuggestions } from '@/lib/ai/chat-service';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Please login' } },
        { status: 401 }
      );
    }
    
    const { sessionId, message } = await req.json();
    
    // Get or create chat session
    let chatSession = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: 'asc' } } }
    });
    
    if (!chatSession) {
      chatSession = await prisma.chatSession.create({
        data: {
          id: sessionId,
          userId: session.user.id
        },
        include: { messages: true }
      });
    }
    
    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message
      }
    });
    
    // Generate response
    const history = chatSession.messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    }));
    
    const response = await generateChatResponse(message, {
      sessionId,
      history
    });
    
    // Save assistant message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: response.content,
        sources: response.sources
      }
    });
    
    // Generate suggestions
    const suggestions = generateSuggestions(message);
    
    return NextResponse.json({
      success: true,
      data: {
        message: response.content,
        sources: response.sources,
        suggestions
      }
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to generate response' } },
      { status: 500 }
    );
  }
}
```

### 6. Chat UI Component

**File:** `src/components/chat/chat-interface.tsx`

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, BookOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ policy: string; section: string }>;
}

export function ChatInterface() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your HR assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: content })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.message,
          sources: data.data.sources
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setSuggestions(data.data.suggestions);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          HR Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`space-y-2 max-w-[80%] ${
                  message.role === 'user' ? 'items-end' : ''
                }`}>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      <span>Sources: {message.sources.map(s => s.section).join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about company policies..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
# Resume parsing
npm install pdf-parse mammoth

# Embeddings (local, no API key needed)
npm install @xenova/transformers

# Vector database extension for PostgreSQL
# Add to schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   previewFeatures = ["postgresqlExtensions"]
# }
#
# datasource db {
#   provider = "postgresql"
#   url      = env("DATABASE_URL")
#   extensions = [pgvector(map: "vector")]
# }
```

### 2. Database Migration

```sql
-- Add pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create policy chunks table
CREATE TABLE "PolicyChunk" (
  id TEXT PRIMARY KEY,
  document_id TEXT REFERENCES "PolicyDocument"(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  section TEXT NOT NULL,
  embedding vector(384)
);

-- Create index for similarity search
CREATE INDEX ON "PolicyChunk" USING ivfflat (embedding vector_cosine_ops);
```

### 3. Environment Variables

```bash
# .env
# AI Configuration
AI_MODEL_PATH=/path/to/local/model
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2

# Vector DB (if using separate service)
VECTOR_DB_URL=postgresql://...
```

---

## 🎯 Usage Examples

### Resume Ranking

```typescript
// Upload and rank candidates
const rankCandidates = async (jobId: string, candidateIds: string[]) => {
  const response = await fetch('/api/hiring/rank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, candidateIds })
  });
  
  const data = await response.json();
  return data.data.rankings;
};
```

### Policy Chatbot

```typescript
// Upload policy document
const uploadPolicy = async (file: File, title: string, category: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('category', category);
  
  const response = await fetch('/api/chat/policies', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
};

// Send chat message
const sendMessage = async (sessionId: string, message: string) => {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message })
  });
  
  return response.json();
};
```

---

## 📚 Open Source References

| Feature | Repository | Stars | Notes |
|---------|------------|-------|-------|
| Resume Parsing | [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) | 5k+ | Complete ATS with ranking |
| Resume Parser | [resume-parser](https://github.com/gazben/resume-parser) | 800+ | PDF/DOCX parsing |
| RAG System | [LangChain](https://github.com/langchain-ai/langchain) | 90k+ | Industry standard |
| Vector DB | [pgvector](https://github.com/pgvector/pgvector) | 10k+ | Postgres extension |
| Embeddings | [transformers.js](https://github.com/xenova/transformers.js) | 10k+ | Browser/node embeddings |

---

*Document Version: 1.0*
*Last Updated: February 2026*
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, BookOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ policy: string; section: string }>;
}

export function ChatInterface() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your HR assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: content })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.message,
          sources: data.data.sources
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setSuggestions(data.data.suggestions);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          HR Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`space-y-2 max-w-[80%] ${
                  message.role === 'user' ? 'items-end' : ''
                }`}>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      <span>Sources: {message.sources.map(s => s.section).join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {suggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about company policies..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
# Resume parsing
npm install pdf-parse mammoth

# Embeddings (local, no API key needed)
npm install @xenova/transformers

# Vector database extension for PostgreSQL
# Add to schema.prisma:
# generator client {
#   provider = "prisma-client-js"
#   previewFeatures = ["postgresqlExtensions"]
# }
#
# datasource db {
#   provider = "postgresql"
#   url      = env("DATABASE_URL")
#   extensions = [pgvector(map: "vector")]
# }
```

### 2. Database Migration

```sql
-- Add pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create policy chunks table
CREATE TABLE "PolicyChunk" (
  id TEXT PRIMARY KEY,
  document_id TEXT REFERENCES "PolicyDocument"(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  section TEXT NOT NULL,
  embedding vector(384)
);

-- Create index for similarity search
CREATE INDEX ON "PolicyChunk" USING ivfflat (embedding vector_cosine_ops);
```

### 3. Environment Variables

```bash
# .env
# AI Configuration
AI_MODEL_PATH=/path/to/local/model
EMBEDDING_MODEL=Xenova/all-MiniLM-L6-v2

# Vector DB (if using separate service)
VECTOR_DB_URL=postgresql://...
```

---

## 🎯 Usage Examples

### Resume Ranking

```typescript
// Upload and rank candidates
const rankCandidates = async (jobId: string, candidateIds: string[]) => {
  const response = await fetch('/api/hiring/rank', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, candidateIds })
  });
  
  const data = await response.json();
  return data.data.rankings;
};
```

### Policy Chatbot

```typescript
// Upload policy document
const uploadPolicy = async (file: File, title: string, category: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('category', category);
  
  const response = await fetch('/api/chat/policies', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
};

// Send chat message
const sendMessage = async (sessionId: string, message: string) => {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message })
  });
  
  return response.json();
};
```

---

## 📚 Open Source References

| Feature | Repository | Stars | Notes |
|---------|------------|-------|-------|
| Resume Parsing | [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) | 5k+ | Complete ATS with ranking |
| Resume Parser | [resume-parser](https://github.com/gazben/resume-parser) | 800+ | PDF/DOCX parsing |
| RAG System | [LangChain](https://github.com/langchain-ai/langchain) | 90k+ | Industry standard |
| Vector DB | [pgvector](https://github.com/pgvector/pgvector) | 10k+ | Postgres extension |
| Embeddings | [transformers.js](https://github.com/xenova/transformers.js) | 10k+ | Browser/node embeddings |

---

*Document Version: 1.0*
*Last Updated: February 2026*

