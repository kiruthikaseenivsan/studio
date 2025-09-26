import ResumeBuilderForm from '@/components/ai/resume-builder-form';

export default function ResumeBuilderPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Resume Builder</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let our AI assistant help you craft the perfect resume.
        </p>
      </header>
      <ResumeBuilderForm />
    </div>
  );
}
