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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { suggestMicroCourses, type MicroCourseSuggestorInput, type MicroCourseSuggestorOutput } from '@/ai/flows/micro-course-suggestor';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  userGoals: z.string().min(10, 'Please describe your goals in more detail.'),
});

export default function CourseSuggesterForm() {
  const [suggestions, setSuggestions] = useState<MicroCourseSuggestorOutput['suggestedCourses']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userGoals: '',
    },
  });

  async function onSubmit(values: MicroCourseSuggestorInput) {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestMicroCourses(values);
      setSuggestions(result.suggestedCourses);
    } catch (error) {
      console.error('Error suggesting courses:', error);
      toast({
        title: 'Error',
        description: 'Failed to suggest courses. Please try again.',
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
                name="userGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I want to learn web development to build a side project, or I want to improve my data analysis skills for a career change."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what you want to learn or achieve.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Finding Courses...' : 'Get Suggestions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {suggestions.length > 0 && (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Suggested Micro-Courses</h3>
            {suggestions.map((course, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader>
                        <CardTitle>{course.courseName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{course.reason}</p>
                        <Button asChild variant="outline" className="group">
                            <Link href={course.courseLink} target="_blank" rel="noopener noreferrer">
                                Go to course
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
}
