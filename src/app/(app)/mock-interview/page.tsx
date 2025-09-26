import MockInterviewForm from '@/components/ai/mock-interview-form';

export default function MockInterviewPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mock Interview Prep</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Generate tailored interview questions to practice for your next role.
        </p>
      </header>
      <MockInterviewForm />
    </div>
  );
}
