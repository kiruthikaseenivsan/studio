import CourseSuggesterForm from '@/components/ai/course-suggester-form';

export default function CourseSuggesterPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Micro-Course Suggester</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upskill with free micro-courses tailored to your goals.
        </p>
      </header>
      <CourseSuggesterForm />
    </div>
  );
}
