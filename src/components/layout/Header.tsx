'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, FileText, LayoutDashboard, Palette, BookOpen, Key, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiKey } from '@/stores';
import { ApiKeyModal } from '@/components/project';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '/new', label: '새 프로젝트', icon: FileText },
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/design', label: '디자인 추출', icon: Palette },
  { href: '/guide', label: '가이드', icon: BookOpen },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { hasApiKey } = useApiKey();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            V
          </div>
          <span className="text-xl font-bold">VibeDocs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* API Key Status */}
          <ApiKeyModal
            trigger={
              <button className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <div
                  className={`h-2 w-2 rounded-full ${
                    hasApiKey ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {hasApiKey ? 'API 연결됨' : 'API 키 없음'}
                </span>
                <Settings className="h-3 w-3 text-muted-foreground" />
              </button>
            }
          />

          {/* CTA Button */}
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/new">시작하기</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3">
              <ApiKeyModal
                trigger={
                  <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-muted transition-colors">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {hasApiKey ? 'API 연결됨' : 'API 키를 설정해주세요'}
                    </span>
                    <div
                      className={`h-2 w-2 rounded-full ml-auto ${
                        hasApiKey ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                  </button>
                }
              />
              <Button asChild className="w-full">
                <Link href="/new">시작하기</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
