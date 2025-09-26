// src/ai/flows/micro-course-suggestor.ts
'use server';
/**
 * @fileOverview Provides AI-powered micro-course suggestions based on user goals.
 *
 * - suggestMicroCourses - A function that suggests micro-courses based on user input.
 * - MicroCourseSuggestorInput - The input type for the suggestMicroCourses function.
 * - MicroCourseSuggestorOutput - The return type for the suggestMicroCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MicroCourseSuggestorInputSchema = z.object({
  userGoals: z
    .string()
    .describe('The user goals and areas they want to improve.'),
});
export type MicroCourseSuggestorInput = z.infer<typeof MicroCourseSuggestorInputSchema>;

const MicroCourseSuggestorOutputSchema = z.object({
  suggestedCourses: z.array(
    z.object({
      courseName: z.string().describe('The name of the suggested micro-course.'),
      courseLink: z.string().describe('The link to the micro-course.'),
      reason: z.string().describe('Why this course is suitable for the user goals.'),
    })
  ).describe('An array of suggested micro-courses with reasons.'),
});
export type MicroCourseSuggestorOutput = z.infer<typeof MicroCourseSuggestorOutputSchema>;

export async function suggestMicroCourses(input: MicroCourseSuggestorInput): Promise<MicroCourseSuggestorOutput> {
  return suggestMicroCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'microCourseSuggestorPrompt',
  input: {schema: MicroCourseSuggestorInputSchema},
  output: {schema: MicroCourseSuggestorOutputSchema},
  prompt: `You are an AI assistant that suggests free online micro-courses based on user goals. Provide a list of relevant courses with their names, links, and reasons why they are suitable for the user.

User Goals: {{{userGoals}}}

Here are some suggested micro-courses in JSON format:
`,
});

const suggestMicroCoursesFlow = ai.defineFlow(
  {
    name: 'suggestMicroCoursesFlow',
    inputSchema: MicroCourseSuggestorInputSchema,
    outputSchema: MicroCourseSuggestorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
