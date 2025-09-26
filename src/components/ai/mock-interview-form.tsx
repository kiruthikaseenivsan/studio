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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { generateMockInterviewQuestions, type MockInterviewQuestionGeneratorInput } from '@/ai/flows/mock-interview-question-generator';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  role: z.string().min(2, 'Role is required'),
  field: z.string().min(2, 'Field is required'),
  experienceLevel: z.string({ required_error: 'Please select an experience level.' }),
});

export default function MockInterviewForm() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      field: '',
    },
  });

  async function onSubmit(values: MockInterviewQuestionGeneratorInput) {
    setIsLoading(true);
    setQuestions([]);
    try {
      const result = await generateMockInterviewQuestions({ ...values, numQuestions: 5 });
      setQuestions(result.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate questions. Please try again.',
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Product Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field / Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., FinTech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entry-level">Entry-level</SelectItem>
                        <SelectItem value="mid-level">Mid-level</SelectItem>
                        <SelectItem value="senior-level">Senior-level</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div>
            <h3 className="text-xl font-semibold text-center mb-4">Your Mock Interview Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                {questions.map((question, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>Question {index + 1}</AccordionTrigger>
                        <AccordionContent className="text-base">
                        {question}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      )}
    </div>
  );
}
