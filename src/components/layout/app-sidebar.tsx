'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  FileText,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/resume-builder',
    label: 'Resume Builder',
    icon: FileText,
  },
  {
    href: '/course-suggester',
    label: 'Course Suggester',
    icon: BookOpen,
  },
  {
    href: '/mock-interview',
    label: 'Mock Interview',
    icon: MessageSquare,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Button variant="ghost" className="h-10 w-full justify-start px-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">ChatPulse</span>
        </Button>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: 'right' }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        {/* Placeholder for future footer items */}
      </SidebarFooter>
    </Sidebar>
  );
}
