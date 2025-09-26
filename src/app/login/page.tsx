import Link from 'next/link';
import { Bot } from 'lucide-react';
import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-block rounded-lg bg-primary p-3 text-primary-foreground">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            Welcome to ChatPulse Insights
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access your dashboard.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="#"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
