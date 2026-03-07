'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Menu,
  LogOut,
  Home,
  Info,
  Zap,
  Clock,
  Users,
  MessageSquare,
  HelpCircle,
  Settings,
  Sliders,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { TableName } from '@/lib/admin-config';

const tables = [
  { name: 'about', label: 'About', icon: Info },
  { name: 'feature', label: 'Features', icon: Zap },
  { name: 'history', label: 'History', icon: Clock },
  { name: 'trusted', label: 'Trusted', icon: Users },
  { name: 'comment', label: 'Comments', icon: MessageSquare },
  { name: 'faq', label: 'FAQ', icon: HelpCircle },
  { name: 'info', label: 'Info', icon: Settings },
  { name: 'slider', label: 'Slider', icon: Sliders },
] as const;

interface AdminSidebarProps {
  selectedTable: TableName;
  onTableSelect: (table: TableName) => void;
}

export function AdminSidebar({ selectedTable, onTableSelect }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500">Manage Content</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="mb-4">
          <p className="px-3 text-xs font-semibold uppercase text-gray-500">Tables</p>
        </div>

        {tables.map((table) => {
          const Icon = table.icon;
          const isActive = selectedTable === table.name;
          return (
            <button
              key={table.name}
              onClick={() => {
                onTableSelect(table.name);
                setIsOpen(false);
              }}
              className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span>{table.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 border-t px-4 py-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Site
          </Link>
        </Button>
        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
