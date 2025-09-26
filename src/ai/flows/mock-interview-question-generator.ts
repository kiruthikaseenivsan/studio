'use server';
/**
 * @fileOverview Mock Interview Question Generator.
 *
 * - generateMockInterviewQuestions - A function that generates mock interview questions.
 * - MockInterviewQuestionGeneratorInput - The input type for the generateMockInterviewQuestions function.
 * - MockInterviewQuestionGeneratorOutput - The return type for the generateMockInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MockInterviewQuestionGeneratorInputSchema = z.object({
  role: z.string().describe('The role the user is interviewing for.'),
  field: z.string().describe('The field the user is interviewing in.'),
  experienceLevel: z.string().describe('The experience level of the user (e.g., entry-level, mid-level, senior-level).'),
  numQuestions: z.number().default(5).describe('The number of mock interview questions to generate.'),
});
export type MockInterviewQuestionGeneratorInput = z.infer<typeof MockInterviewQuestionGeneratorInputSchema>;

const MockInterviewQuestionGeneratorOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of mock interview questions.'),
});
export type MockInterviewQuestionGeneratorOutput = z.infer<typeof MockInterviewQuestionGeneratorOutputSchema>;

export async function generateMockInterviewQuestions(input: MockInterviewQuestionGeneratorInput): Promise<MockInterviewQuestionGeneratorOutput> {
  return mockInterviewQuestionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mockInterviewQuestionGeneratorPrompt',
  input: {schema: MockInterviewQuestionGeneratorInputSchema},
  output: {schema: MockInterviewQuestionGeneratorOutputSchema},
  prompt: `You are an expert career coach specializing in helping candidates prepare for job interviews.

You will generate a list of mock interview questions for the user based on their role, field, and experience level.

Role: {{{role}}}
Field: {{{field}}}
Experience Level: {{{experienceLevel}}}
Number of Questions: {{{numQuestions}}}

Questions:`, // Ensure the output is just the questions without extra preamble.
});

const mockInterviewQuestionGeneratorFlow = ai.defineFlow(
  {
    name: 'mockInterviewQuestionGeneratorFlow',
    inputSchema: MockInterviewQuestionGeneratorInputSchema,
    outputSchema: MockInterviewQuestionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
