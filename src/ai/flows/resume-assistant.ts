'use server';

/**
 * @fileOverview An AI-powered resume assistant for career-gap users.
 *
 * - generateResume - A function that generates a resume based on user skills and experience.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GenerateResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of skills.'),
  experience: z
    .string()
    .describe('A description of the user experience.'),
  jobTitle: z.string().describe('The job title the user is applying for.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

const GenerateResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume in markdown format.'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {schema: GenerateResumeInputSchema},
  output: {schema: GenerateResumeOutputSchema},
  prompt: `You are a professional resume writer. Create a resume for the user based on their skills, experience and the job they are applying for.

Skills: {{{skills}}}
Experience: {{{experience}}}
Job Title: {{{jobTitle}}}

Resume:`, 
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
