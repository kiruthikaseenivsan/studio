'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateResume, type GenerateResumeInput } from '@/ai/flows/resume-assistant';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  skills: z.string().min(10, 'Please list some relevant skills'),
  experience: z.string().min(50, 'Please describe your experience in more detail'),
});

export default function ResumeBuilderForm() {
  const [resume, setResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      skills: '',
      experience: '',
    },
  });

  async function onSubmit(values: GenerateResumeInput) {
    setIsLoading(true);
    setResume('');
    try {
      const result = await generateResume(values);
      setResume(result.resume);
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer" {...field} />
                    </FormControl>
                    <FormDescription>The role you are applying for.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, TypeScript, Node.js" {...field} />
                    </FormControl>
                    <FormDescription>A comma-separated list of your skills.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your past roles and projects..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your professional experience, highlighting achievements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Generating...' : 'Generate Resume'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {resume && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Generated Resume</h3>
            <pre className="whitespace-pre-wrap rounded-md bg-secondary p-4 text-sm font-code">
              {resume}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
