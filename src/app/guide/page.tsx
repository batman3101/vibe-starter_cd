'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Code2,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Rocket,
  Lightbulb,
  Target,
  MessageSquare,
  FolderOpen,
  Settings,
  List,
  Wand2,
  AlertCircle,
  Check,
  ArrowRight,
  Download,
  Terminal,
  Monitor,
  Keyboard,
  MousePointer,
  Search,
  Package,
  Puzzle,
  Play,
  Square,
  CircleDot,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  emoji: string;
  description: string;
  content: React.ReactNode;
}

export default function GuidePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('intro');

  const sections: GuideSection[] = [
    {
      id: 'intro',
      title: '바이브 코딩이란?',
      icon: <Sparkles className="h-5 w-5" />,
      emoji: '✨',
      description: 'AI와 함께하는 새로운 개발 방식',
      content: <IntroSection />,
    },
    {
      id: 'documents',
      title: '문서 활용 가이드',
      icon: <FileText className="h-5 w-5" />,
      emoji: '📄',
      description: 'VibeDocs 문서 사용법',
      content: <DocumentsSection />,
    },
    {
      id: 'vscode',
      title: 'VS Code 설치',
      icon: <Code2 className="h-5 w-5" />,
      emoji: '💻',
      description: '개발 환경 준비하기',
      content: <VSCodeSection />,
    },
    {
      id: 'claudecode',
      title: 'Claude Code 사용법',
      icon: <Terminal className="h-5 w-5" />,
      emoji: '🤖',
      description: 'VS Code에서 Claude Code 활용',
      content: <ClaudeCodeSection />,
    },
    {
      id: 'codex',
      title: 'OpenAI Codex 사용법',
      icon: <Zap className="h-5 w-5" />,
      emoji: '⚡',
      description: 'VS Code에서 Codex CLI 활용',
      content: <CodexSection />,
    },
    {
      id: 'cursor',
      title: 'Cursor 사용법',
      icon: <MousePointer className="h-5 w-5" />,
      emoji: '🖱️',
      description: 'AI 내장 에디터 활용하기',
      content: <CursorSection />,
    },
    {
      id: 'tips',
      title: '효과적인 프롬프트',
      icon: <CheckCircle2 className="h-5 w-5" />,
      emoji: '💡',
      description: 'AI와 소통하는 팁',
      content: <TipsSection />,
    },
  ];

  const activeContent = sections.find((s) => s.id === activeSection);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">📚 사용 가이드</h1>
            <p className="text-muted-foreground mt-1">
              VibeDocs와 AI 코딩 도구 사용법을 쉽게 알아보세요
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2 sticky top-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]'
                    : 'hover:bg-muted hover:scale-[1.01]'
                }`}
              >
                <span className="text-xl">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{section.title}</p>
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      activeSection === section.id
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    activeSection === section.id ? 'translate-x-1' : ''
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeContent && (
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                    {activeContent.emoji}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{activeContent.title}</CardTitle>
                    <CardDescription className="mt-1">{activeContent.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">{activeContent.content}</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="space-y-8">
      {/* 바이브 코딩 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          바이브 코딩(Vibe Coding)이란?
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          바이브 코딩은 <strong className="text-foreground">AI와 대화하며 코드를 작성</strong>하는
          새로운 개발 방식입니다. 복잡한 프로그래밍 지식 없이도 아이디어를 실제 애플리케이션으로 만들 수 있어요!
        </p>
      </div>

      {/* 왜 바이브 코딩인가요? */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          왜 바이브 코딩인가요?
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
            <div className="text-2xl">🚀</div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400">낮은 진입 장벽</p>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1 leading-relaxed">
                프로그래밍 경험 없이도 바로 시작할 수 있어요
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            <div className="text-2xl">⚡</div>
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-400">빠른 프로토타이핑</p>
              <p className="text-sm text-blue-600 dark:text-blue-500 mt-1 leading-relaxed">
                아이디어를 몇 시간 내에 구현할 수 있어요
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
            <div className="text-2xl">📚</div>
            <div>
              <p className="font-semibold text-purple-700 dark:text-purple-400">학습과 개발 동시에</p>
              <p className="text-sm text-purple-600 dark:text-purple-500 mt-1 leading-relaxed">
                AI가 코드를 설명해주며 자연스럽게 배워요
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
            <div className="text-2xl">🔄</div>
            <div>
              <p className="font-semibold text-orange-700 dark:text-orange-400">반복적 개선</p>
              <p className="text-sm text-orange-600 dark:text-orange-500 mt-1 leading-relaxed">
                대화를 통해 점진적으로 완성도를 높여요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VibeDocs의 역할 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          VibeDocs가 해주는 일
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          VibeDocs는 바이브 코딩을 시작할 때 필요한 <strong className="text-foreground">모든 문서를 자동으로 생성</strong>해줍니다.
          아이디어만 입력하면 다음 문서들이 자동으로 만들어져요:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { emoji: '💡', name: 'IDEA_BRIEF.md', desc: '아이디어 개요서' },
            { emoji: '👥', name: 'USER_STORIES.md', desc: '사용자 스토리' },
            { emoji: '🗺️', name: 'SCREEN_FLOW.md', desc: '화면 흐름도' },
            { emoji: '🛠️', name: 'TECH_STACK.md', desc: '기술 스택' },
            { emoji: '🗄️', name: 'DATA_MODEL.md', desc: '데이터 모델' },
            { emoji: '🔌', name: 'API_SPEC.md', desc: 'API 명세서' },
            { emoji: '✅', name: 'TODO_MASTER.md', desc: '개발 태스크 목록' },
            { emoji: '📦', name: '+ 3개 문서', desc: 'PRD, 테스트, 프롬프트' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="text-xl">{doc.emoji}</span>
              <div>
                <p className="font-mono text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 시작하기 */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-primary" />
          🎯 시작하기 4단계
        </h4>
        <div className="space-y-4">
          {[
            { step: 1, icon: '📝', title: 'VibeDocs에서 새 프로젝트 생성', desc: '아이디어를 입력하면 10개 문서가 자동 생성!' },
            { step: 2, icon: '📤', title: '생성된 문서를 AI 도구에 전달', desc: 'Claude Code, Codex, Cursor 중 선택하여 문서 전달' },
            { step: 3, icon: '🔨', title: 'TODO를 하나씩 완료하며 개발', desc: '대시보드에서 진행도를 확인하며 개발' },
            { step: 4, icon: '🚀', title: '완성된 앱 배포', desc: 'Vercel, Netlify 등으로 손쉽게 배포' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {item.step}
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          VibeDocs 문서 활용법
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          VibeDocs가 생성하는 <strong className="text-foreground">10개의 문서</strong>는
          AI 코딩 도구와 함께 사용할 때 최대 효과를 발휘해요.
          각 문서의 목적과 사용법을 알아볼까요?
        </p>
      </div>

      {/* 권장 순서 */}
      <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-900">
        <h4 className="font-semibold flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-400">
          <List className="h-5 w-5" />
          📋 권장 문서 사용 순서
        </h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { step: '1단계', icon: '📖', text: 'IDEA_BRIEF로 AI에게 프로젝트 맥락 전달' },
            { step: '2단계', icon: '✅', text: 'TODO_MASTER에서 구현할 작업 선택' },
            { step: '3단계', icon: '📎', text: '작업에 필요한 관련 문서 함께 제공' },
            { step: '4단계', icon: '🤖', text: 'AI에게 구현 요청 후 결과 검토' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-background rounded-lg">
              <span className="text-xl">{item.icon}</span>
              <div>
                <Badge variant="secondary" className="text-xs">{item.step}</Badge>
                <p className="text-sm mt-1 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 문서 5개 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">📄 핵심 문서 5개</h4>

        {[
          {
            emoji: '💡',
            name: 'IDEA_BRIEF.md',
            title: '아이디어 개요서',
            desc: 'AI와 첫 대화 시 가장 먼저 전달하세요. 프로젝트의 목적, 대상 사용자, 핵심 기능을 AI가 이해해요.',
          },
          {
            emoji: '🛠️',
            name: 'TECH_STACK.md',
            title: '기술 스택',
            desc: '프로젝트 초기 설정 시 사용해요. AI가 어떤 기술로 코드를 작성해야 하는지 알 수 있어요.',
          },
          {
            emoji: '🗄️',
            name: 'DATA_MODEL.md',
            title: '데이터 모델',
            desc: 'TypeScript 타입 정의 시 사용해요. 타입 에러를 줄이고 일관된 데이터 구조를 유지해요.',
          },
          {
            emoji: '🔌',
            name: 'API_SPEC.md',
            title: 'API 명세서',
            desc: 'API 구현 시 사용해요. 프론트엔드와 백엔드가 동일한 인터페이스로 개발할 수 있어요.',
          },
          {
            emoji: '✅',
            name: 'TODO_MASTER.md',
            title: '개발 태스크',
            desc: '다음 작업을 선택할 때 사용해요. Phase별로 순서대로 완료하면 앱이 완성돼요!',
          },
        ].map((doc, i) => (
          <div key={i} className="flex items-start gap-4 p-4 border rounded-xl hover:shadow-md transition-shadow">
            <span className="text-3xl">{doc.emoji}</span>
            <div>
              <p className="font-mono font-semibold">{doc.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{doc.title}</p>
              <p className="text-sm mt-2 leading-relaxed">{doc.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 실전 예시 */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-2xl border border-amber-200 dark:border-amber-900">
        <h4 className="font-semibold flex items-center gap-2 mb-4 text-amber-700 dark:text-amber-400">
          <Lightbulb className="h-5 w-5" />
          💡 실전 예시: 로그인 기능 구현하기
        </h4>
        <div className="space-y-3">
          {[
            { step: '1단계', icon: '📖', text: 'IDEA_BRIEF.md 전달 → AI가 프로젝트 맥락 이해' },
            { step: '2단계', icon: '✅', text: 'TODO_MASTER.md에서 "로그인 기능 구현" 선택' },
            { step: '3단계', icon: '📎', text: 'DATA_MODEL.md (User 타입) + API_SPEC.md (로그인 API) 함께 전달' },
            { step: '4단계', icon: '🤖', text: '"위 문서들을 참고하여 로그인 기능을 구현해주세요"' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-background rounded-lg">
              <span className="text-xl">{item.icon}</span>
              <div>
                <Badge className="mb-1 bg-amber-500">{item.step}</Badge>
                <p className="text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VSCodeSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          VS Code란?
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          VS Code(Visual Studio Code)는 Microsoft에서 만든 <strong className="text-foreground">무료 코드 편집기</strong>에요.
          전 세계 개발자들이 가장 많이 사용하는 도구이며, 다양한 확장 기능으로 AI 코딩 도구를 사용할 수 있어요!
        </p>
      </div>

      {/* 왜 VS Code인가? */}
      <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-400">
          <Lightbulb className="h-5 w-5" />
          💡 왜 VS Code를 사용하나요?
        </h4>
        <ul className="space-y-2">
          {[
            '✅ 완전 무료! 기업/개인 모두 무료로 사용 가능',
            '✅ Claude Code, OpenAI Codex 등 AI 도구 연동 가능',
            '✅ 수천 개의 확장 기능으로 기능 확장',
            '✅ Windows, Mac, Linux 모두 지원',
          ].map((item, i) => (
            <li key={i} className="text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>

      {/* 설치 단계 */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          📥 VS Code 설치하기 (처음부터 차근차근!)
        </h4>

        {/* Step 1 */}
        <div className="border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
            <div>
              <p className="font-semibold">VS Code 다운로드 페이지 접속</p>
              <p className="text-sm text-muted-foreground">공식 홈페이지에서 다운로드해요</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <p className="text-sm leading-relaxed">
              🌐 웹 브라우저(Chrome, Edge 등)를 열고 주소창에 입력하세요:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm flex items-center justify-between">
              <span>https://code.visualstudio.com</span>
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                바로가기 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
            <div>
              <p className="font-semibold">운영체제에 맞는 버전 다운로드</p>
              <p className="text-sm text-muted-foreground">자동으로 운영체제를 인식해요</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <p className="text-sm leading-relaxed">
              페이지에 접속하면 <strong>&quot;Download for Windows&quot;</strong> 또는 <strong>&quot;Download for Mac&quot;</strong> 버튼이 보여요.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-background rounded-lg border">
                <span className="text-2xl">🪟</span>
                <span className="text-sm">Windows: .exe 파일 다운로드</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-background rounded-lg border">
                <span className="text-2xl">🍎</span>
                <span className="text-sm">Mac: .dmg 파일 다운로드</span>
              </div>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              💡 큰 파란색 버튼을 클릭하면 자동으로 다운로드가 시작돼요!
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
            <div>
              <p className="font-semibold">설치 파일 실행</p>
              <p className="text-sm text-muted-foreground">다운로드한 파일을 실행해요</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">🪟 Windows:</p>
              <ol className="text-sm space-y-1 ml-4 list-decimal list-inside leading-relaxed">
                <li>다운로드 폴더에서 <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">VSCodeUserSetup-xxx.exe</code> 더블클릭</li>
                <li>&quot;다음&quot; 버튼을 계속 클릭 (기본 설정 그대로 OK!)</li>
                <li>&quot;설치&quot; 클릭 후 완료될 때까지 기다리기</li>
              </ol>
            </div>
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium">🍎 Mac:</p>
              <ol className="text-sm space-y-1 ml-4 list-decimal list-inside leading-relaxed">
                <li>다운로드 폴더에서 <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">VSCode-darwin.dmg</code> 더블클릭</li>
                <li>열린 창에서 VS Code 아이콘을 Applications 폴더로 드래그</li>
                <li>Launchpad에서 Visual Studio Code 실행</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</div>
            <div>
              <p className="font-semibold">VS Code 첫 실행</p>
              <p className="text-sm text-muted-foreground">설치 완료! 이제 시작해볼까요?</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <p className="text-sm leading-relaxed">
              🎉 VS Code가 실행되면 &quot;Welcome&quot; 탭이 나타나요.
            </p>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900">
              <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                ✅ 이제 VS Code 설치가 완료되었어요! 다음 단계에서 Claude Code나 OpenAI Codex를 설치해볼까요?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 한글 설정 */}
      <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200 dark:border-amber-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
          <Settings className="h-5 w-5" />
          🇰🇷 VS Code 한글로 바꾸기 (선택사항)
        </h4>
        <ol className="space-y-2 text-sm leading-relaxed">
          <li>1. VS Code 왼쪽에서 <strong>확장(Extensions)</strong> 아이콘 클릭 (네모 4개 모양)</li>
          <li>2. 검색창에 <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Korean</code> 입력</li>
          <li>3. &quot;Korean Language Pack for VS Code&quot; 찾아서 <strong>Install</strong> 클릭</li>
          <li>4. VS Code 재시작하면 한글로 바뀌어요!</li>
        </ol>
      </div>
    </div>
  );
}

function ClaudeCodeSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          Claude Code란?
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          Claude Code는 Anthropic에서 만든 <strong className="text-foreground">AI 코딩 어시스턴트</strong>에요.
          터미널(명령어 창)에서 실행되며, VS Code와 함께 사용하면 강력한 AI 코딩 환경을 만들 수 있어요!
        </p>
      </div>

      {/* 특징 */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { emoji: '🧠', title: '뛰어난 코드 이해력', desc: '프로젝트 전체 맥락을 이해해요' },
          { emoji: '💬', title: '자연스러운 대화', desc: '한국어로 편하게 대화할 수 있어요' },
          { emoji: '🔧', title: '코드 직접 수정', desc: '파일을 직접 생성/수정해줘요' },
          { emoji: '🔍', title: '코드 검색', desc: '프로젝트에서 필요한 코드를 찾아줘요' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/50">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 사전 준비 */}
      <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200 dark:border-amber-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
          <AlertCircle className="h-5 w-5" />
          ⚠️ 시작하기 전 확인사항
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>VS Code가 설치되어 있어야 해요 (이전 단계 참고)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>Node.js가 필요해요 (아래에서 설치 방법 설명)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>Anthropic API 키가 필요해요 (무료 체험 가능)</span>
          </li>
        </ul>
      </div>

      {/* Node.js 설치 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Package className="h-5 w-5 text-green-500" />
          📦 Step 1: Node.js 설치하기
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Node.js는 JavaScript를 실행하는 프로그램이에요. Claude Code를 설치하려면 필요해요!
        </p>

        <div className="border rounded-xl p-5 space-y-4">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">1</span>
              <div className="space-y-2">
                <p className="font-medium">Node.js 공식 사이트 접속</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm flex items-center justify-between">
                  <span>https://nodejs.org</span>
                  <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                    바로가기 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">2</span>
              <div>
                <p className="font-medium">LTS 버전 다운로드 (왼쪽 버튼)</p>
                <p className="text-sm text-muted-foreground mt-1">LTS = Long Term Support, 안정적인 버전이에요</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">3</span>
              <div>
                <p className="font-medium">설치 파일 실행 → &quot;다음&quot; 계속 클릭</p>
                <p className="text-sm text-muted-foreground mt-1">기본 설정 그대로 설치하면 돼요</p>
              </div>
            </li>
          </ol>
        </div>

        {/* 설치 확인 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">✅ 설치 확인하기</p>
          <p className="text-sm text-muted-foreground mb-2">VS Code에서 터미널을 열고 (Ctrl + `) 다음 명령어를 입력해요:</p>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
            node --version
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            v18.x.x 또는 v20.x.x 같은 버전이 나오면 성공!
          </p>
        </div>
      </div>

      {/* Claude Code 설치 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          🤖 Step 2: Claude Code 설치하기
        </h4>

        <div className="border rounded-xl p-5 space-y-4">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">VS Code에서 터미널 열기</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Keyboard className="h-4 w-4" />
                  <span>단축키: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Ctrl + `</code> (백틱, 숫자 1 왼쪽 키)</span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">Claude Code 설치 명령어 입력</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
                  npm install -g @anthropic-ai/claude-code
                </div>
                <p className="text-xs text-muted-foreground">잠시 기다리면 설치가 완료돼요</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">API 키 설정</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm space-y-1">
                  <p className="text-green-400"># Windows</p>
                  <p>set ANTHROPIC_API_KEY=your-api-key-here</p>
                  <p className="text-green-400 mt-2"># Mac/Linux</p>
                  <p>export ANTHROPIC_API_KEY=your-api-key-here</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  API 키는 <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">console.anthropic.com</a>에서 발급받을 수 있어요
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* 사용법 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          💬 Step 3: Claude Code 사용하기
        </h4>

        <div className="space-y-4">
          {/* 시작하기 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium flex items-center gap-2">
              <Play className="h-5 w-5 text-green-500" />
              Claude Code 시작하기
            </p>
            <p className="text-sm text-muted-foreground">프로젝트 폴더에서 터미널을 열고:</p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
              claude
            </div>
            <p className="text-sm text-muted-foreground">
              이제 AI와 대화하며 코딩을 시작할 수 있어요!
            </p>
          </div>

          {/* 예시 대화 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium">📝 예시: VibeDocs 문서로 개발 시작하기</p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm leading-loose space-y-3">
              <p className="text-gray-400"># Claude Code에서 이렇게 말해보세요:</p>
              <p className="text-green-400">&gt; 안녕하세요! 다음 프로젝트를 개발하려고 합니다.</p>
              <p className="text-green-400">&gt; IDEA_BRIEF.md 파일을 읽고 프로젝트 구조를 잡아주세요.</p>
              <p className="text-gray-400 mt-4"># Claude가 파일을 읽고 프로젝트 구조를 제안해줘요!</p>
            </div>
          </div>

          {/* 유용한 명령어 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium">⌨️ 유용한 명령어</p>
            <div className="grid gap-2">
              {[
                { cmd: '/help', desc: '도움말 보기' },
                { cmd: '/clear', desc: '대화 내용 지우기' },
                { cmd: '/cost', desc: '사용한 토큰/비용 확인' },
                { cmd: 'Ctrl + C', desc: 'Claude Code 종료' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono">{item.cmd}</code>
                  <span className="text-sm">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 팁 */}
      <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-2xl border border-green-200 dark:border-green-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-400">
          <Lightbulb className="h-5 w-5" />
          💡 Claude Code 활용 팁
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>✅ VibeDocs 문서를 프로젝트 폴더에 저장하고 &quot;IDEA_BRIEF.md를 읽어줘&quot;라고 요청하세요</li>
          <li>✅ TODO_MASTER.md에서 한 번에 하나의 TODO만 요청하세요</li>
          <li>✅ 에러가 나면 에러 메시지를 그대로 붙여넣고 &quot;이 에러를 해결해줘&quot;라고 요청하세요</li>
          <li>✅ 코드가 마음에 안 들면 &quot;다르게 해줘&quot; 또는 &quot;더 간단하게 해줘&quot;라고 말하세요</li>
        </ul>
      </div>
    </div>
  );
}

function CodexSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          OpenAI Codex CLI란?
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          OpenAI Codex CLI는 OpenAI에서 만든 <strong className="text-foreground">터미널 기반 AI 코딩 도구</strong>에요.
          GPT-4 모델을 사용하여 코드를 생성하고, VS Code와 함께 사용할 수 있어요!
        </p>
      </div>

      {/* 특징 */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { emoji: '🚀', title: 'GPT-4 기반', desc: '최신 AI 모델로 정확한 코드 생성' },
          { emoji: '🔄', title: '자동 수정', desc: '코드를 직접 파일에 적용해줘요' },
          { emoji: '🛡️', title: '안전 모드', desc: '위험한 명령어 실행 전 확인' },
          { emoji: '📁', title: '프로젝트 이해', desc: '전체 코드베이스를 분석해요' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/50">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 사전 준비 */}
      <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200 dark:border-amber-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
          <AlertCircle className="h-5 w-5" />
          ⚠️ 시작하기 전 확인사항
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>VS Code가 설치되어 있어야 해요</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>Node.js v22 이상이 필요해요</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span>OpenAI API 키가 필요해요</span>
          </li>
        </ul>
      </div>

      {/* 설치 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          📥 OpenAI Codex CLI 설치하기
        </h4>

        <div className="border rounded-xl p-5 space-y-4">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">VS Code 터미널 열기</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Keyboard className="h-4 w-4" />
                  <span>단축키: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">Ctrl + `</code></span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">Codex CLI 설치</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
                  npm install -g @openai/codex
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</span>
              <div className="space-y-2 flex-1">
                <p className="font-medium">API 키 설정</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm space-y-1">
                  <p className="text-green-400"># Windows</p>
                  <p>set OPENAI_API_KEY=your-api-key-here</p>
                  <p className="text-green-400 mt-2"># Mac/Linux</p>
                  <p>export OPENAI_API_KEY=your-api-key-here</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  API 키는 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a>에서 발급받을 수 있어요
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* 사용법 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          💬 Codex CLI 사용하기
        </h4>

        <div className="space-y-4">
          {/* 시작하기 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium flex items-center gap-2">
              <Play className="h-5 w-5 text-green-500" />
              Codex 시작하기
            </p>
            <p className="text-sm text-muted-foreground">프로젝트 폴더에서:</p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
              codex
            </div>
            <p className="text-sm text-muted-foreground">
              또는 바로 질문하기:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
              codex &quot;로그인 폼 컴포넌트를 만들어줘&quot;
            </div>
          </div>

          {/* 실행 모드 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium">🔒 실행 모드 설명</p>
            <div className="grid gap-3">
              {[
                { mode: 'suggest', emoji: '💡', desc: '코드 제안만 해요 (가장 안전)' },
                { mode: 'auto-edit', emoji: '✏️', desc: '파일 수정을 자동으로 해요' },
                { mode: 'full-auto', emoji: '🚀', desc: '명령어까지 자동 실행 (주의!)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <code className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-sm">--{item.mode}</code>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm">
              codex --approval-mode suggest &quot;React 컴포넌트 만들어줘&quot;
            </div>
          </div>

          {/* VibeDocs 활용 */}
          <div className="border rounded-xl p-5 space-y-3">
            <p className="font-medium">📄 VibeDocs 문서와 함께 사용하기</p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm leading-loose space-y-2">
              <p className="text-gray-400"># 프로젝트 맥락 전달</p>
              <p className="text-green-400">codex &quot;IDEA_BRIEF.md를 읽고 프로젝트 구조를 잡아줘&quot;</p>
              <p className="text-gray-400 mt-3"># TODO 구현 요청</p>
              <p className="text-green-400">codex &quot;TODO_MASTER.md의 첫 번째 태스크를 구현해줘&quot;</p>
              <p className="text-gray-400 mt-3"># 특정 파일 참조</p>
              <p className="text-green-400">codex &quot;DATA_MODEL.md의 User 타입에 맞게 로그인 API 만들어줘&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {/* 팁 */}
      <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-2xl border border-green-200 dark:border-green-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-400">
          <Lightbulb className="h-5 w-5" />
          💡 Codex CLI 활용 팁
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>✅ 처음에는 <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">--approval-mode suggest</code>로 시작하세요</li>
          <li>✅ 익숙해지면 <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">auto-edit</code>로 생산성을 높이세요</li>
          <li>✅ VibeDocs 문서 파일명을 정확히 말하면 더 정확한 결과를 얻어요</li>
          <li>✅ &quot;테스트 코드도 함께 만들어줘&quot;라고 추가하면 테스트도 생성해줘요</li>
        </ul>
      </div>
    </div>
  );
}

function CursorSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MousePointer className="h-5 w-5 text-primary" />
          Cursor란?
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          Cursor는 <strong className="text-foreground">AI가 처음부터 내장된 코드 에디터</strong>에요.
          VS Code와 거의 똑같이 생겼지만, AI 기능이 기본으로 들어있어서 별도 설정 없이 바로 AI 코딩을 시작할 수 있어요!
        </p>
      </div>

      {/* VS Code vs Cursor */}
      <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-400">
          <Lightbulb className="h-5 w-5" />
          🤔 VS Code vs Cursor, 뭘 써야 할까요?
        </h4>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-white dark:bg-background rounded-lg border">
            <p className="font-semibold mb-2">💻 VS Code + AI 도구</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 이미 VS Code를 쓰고 있다면</li>
              <li>• API 키를 직접 관리하고 싶다면</li>
              <li>• 여러 AI 도구를 비교하고 싶다면</li>
            </ul>
          </div>
          <div className="p-4 bg-white dark:bg-background rounded-lg border">
            <p className="font-semibold mb-2">🖱️ Cursor</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• 처음 시작하는 초보자라면</li>
              <li>• 설정 없이 바로 쓰고 싶다면</li>
              <li>• 올인원 솔루션을 원한다면</li>
            </ul>
          </div>
        </div>
        <p className="text-sm mt-4 text-blue-600 dark:text-blue-400">
          💡 둘 다 좋은 선택이에요! 편한 걸로 시작하세요.
        </p>
      </div>

      {/* 설치 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          📥 Cursor 설치하기
        </h4>

        <div className="border rounded-xl p-5 space-y-4">
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">1</span>
              <div className="space-y-2">
                <p className="font-medium">Cursor 공식 사이트 접속</p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-sm flex items-center justify-between">
                  <span>https://cursor.so</span>
                  <a href="https://cursor.so" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                    바로가기 <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">2</span>
              <div>
                <p className="font-medium">&quot;Download&quot; 버튼 클릭</p>
                <p className="text-sm text-muted-foreground mt-1">운영체제에 맞는 버전이 자동으로 다운로드돼요</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">3</span>
              <div>
                <p className="font-medium">설치 파일 실행</p>
                <p className="text-sm text-muted-foreground mt-1">VS Code와 똑같이 &quot;다음&quot; 버튼만 계속 클릭하면 끝!</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">4</span>
              <div>
                <p className="font-medium">계정 생성 (무료)</p>
                <p className="text-sm text-muted-foreground mt-1">이메일 또는 GitHub 계정으로 로그인하면 바로 사용 가능!</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* 주요 기능 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          ⚡ Cursor 핵심 기능 3가지
        </h4>

        <div className="space-y-4">
          {/* Cmd+K */}
          <div className="border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-lg px-3 py-1">Cmd+K</Badge>
              <span className="font-semibold">코드 생성/수정 (가장 많이 쓰는 기능!)</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              코드를 선택하고 Cmd+K (Windows: Ctrl+K)를 누르면 AI에게 수정을 요청할 수 있어요.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">🎯 사용 예시:</p>
              <ol className="text-sm space-y-1 ml-4 list-decimal list-inside leading-relaxed">
                <li>수정하고 싶은 코드를 마우스로 드래그해서 선택</li>
                <li>Cmd+K (또는 Ctrl+K) 누르기</li>
                <li>&quot;이 함수를 async로 바꿔줘&quot; 입력</li>
                <li>Enter 누르면 AI가 코드를 수정해줘요!</li>
              </ol>
            </div>
          </div>

          {/* Cmd+L */}
          <div className="border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-lg px-3 py-1">Cmd+L</Badge>
              <span className="font-semibold">AI 채팅</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              오른쪽에 채팅창이 열려요. VibeDocs 문서를 붙여넣고 AI와 대화하며 개발하세요!
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">🎯 사용 예시:</p>
              <ol className="text-sm space-y-1 ml-4 list-decimal list-inside leading-relaxed">
                <li>Cmd+L로 채팅창 열기</li>
                <li>IDEA_BRIEF.md 내용 복사해서 붙여넣기</li>
                <li>&quot;이 프로젝트의 폴더 구조를 만들어줘&quot; 입력</li>
                <li>AI가 구조를 제안해줘요!</li>
              </ol>
            </div>
          </div>

          {/* Tab */}
          <div className="border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono text-lg px-3 py-1">Tab</Badge>
              <span className="font-semibold">자동완성</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              코드를 작성하다 보면 AI가 다음에 올 코드를 회색으로 미리 보여줘요. Tab을 누르면 적용!
            </p>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900">
              <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                💡 자동완성이 마음에 안 들면 그냥 계속 타이핑하세요. 무시됩니다!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VibeDocs와 함께 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          📂 VibeDocs 문서와 함께 사용하기
        </h4>

        <div className="border rounded-xl p-5 space-y-4">
          <ol className="space-y-4">
            {[
              { num: 1, icon: '📁', text: '프로젝트 폴더에 VIBEDOCS 폴더 만들기' },
              { num: 2, icon: '💾', text: 'VibeDocs에서 다운로드한 문서들을 VIBEDOCS 폴더에 저장' },
              { num: 3, icon: '💬', text: 'Cursor 채팅(Cmd+L)에서 @를 입력하면 파일을 참조할 수 있어요' },
              { num: 4, icon: '📎', text: '@VIBEDOCS/IDEA_BRIEF.md 이렇게 입력하면 문서를 읽어요' },
            ].map((item) => (
              <li key={item.num} className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white font-bold text-sm">
                  {item.num}
                </div>
                <span className="text-lg">{item.icon}</span>
                <span className="leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm leading-loose">
          <p className="text-gray-400"># Cursor 채팅에서 이렇게 입력하세요:</p>
          <p className="mt-2 text-green-400">@VIBEDOCS/IDEA_BRIEF.md 를 읽고</p>
          <p className="text-green-400">@VIBEDOCS/TODO_MASTER.md 의 Phase 1을 구현해줘</p>
        </div>
      </div>

      {/* 팁 */}
      <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-2xl border border-green-200 dark:border-green-900">
        <h4 className="font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-400">
          <Lightbulb className="h-5 w-5" />
          💡 Cursor 활용 팁
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li>✅ @ 기호로 파일을 참조하면 AI가 그 파일 내용을 알고 답해요</li>
          <li>✅ 여러 파일을 동시에 참조할 수 있어요 (@file1 @file2)</li>
          <li>✅ &quot;전체 프로젝트를 이해하고&quot;라고 하면 모든 파일을 분석해요</li>
          <li>✅ 무료 버전도 하루 일정 횟수까지 사용 가능해요</li>
        </ul>
      </div>
    </div>
  );
}

function TipsSection() {
  return (
    <div className="space-y-8">
      {/* 소개 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          효과적인 프롬프트 작성법
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base">
          AI와의 소통에서 가장 중요한 것은 <strong className="text-foreground">명확한 요청</strong>이에요.
          다음 팁들을 참고해서 더 좋은 결과를 얻어보세요!
        </p>
      </div>

      {/* 팁 1: 컨텍스트 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">1</span>
          📝 컨텍스트 제공하기
        </h4>
        <div className="grid gap-4">
          <div className="p-4 rounded-xl border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
            <Badge variant="destructive" className="mb-3">❌ 나쁜 예</Badge>
            <p className="font-mono text-sm">로그인 기능 만들어줘</p>
          </div>
          <div className="p-4 rounded-xl border-2 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30">
            <Badge className="mb-3 bg-green-600">✅ 좋은 예</Badge>
            <p className="text-sm leading-loose">
              Next.js 14 프로젝트에 이메일/비밀번호 로그인 기능을 추가하려고 합니다.<br />
              NextAuth.js를 사용하고, 로그인 폼은 shadcn/ui 컴포넌트로 만들어주세요.<br />
              DATA_MODEL.md의 User 타입을 참고해주세요.
            </p>
          </div>
        </div>
      </div>

      {/* 팁 2: 단계별 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">2</span>
          📊 단계별 요청하기
        </h4>
        <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
          <p className="text-sm leading-relaxed mb-3">
            큰 기능은 <strong>작은 단위로 나눠서</strong> 요청하세요.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">Phase 1</Badge>
            <ArrowRight className="h-4 w-4" />
            <Badge variant="outline">Phase 2</Badge>
            <ArrowRight className="h-4 w-4" />
            <Badge variant="outline">Phase 3</Badge>
            <ArrowRight className="h-4 w-4" />
            <Badge className="bg-green-500">완성!</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💡 VibeDocs의 TODO가 이미 단계별로 나눠져 있어요!
          </p>
        </div>
      </div>

      {/* 팁 3: 예시 제공 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">3</span>
          💡 예시 제공하기
        </h4>
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm leading-loose">
          <p className="text-green-400">// 구체적인 예시와 함께 요청</p>
          <p className="mt-3">카드 컴포넌트를 만들어주세요.</p>
          <p className="mt-3 text-cyan-400">예시:</p>
          <p className="text-yellow-300">• 이미지, 제목, 설명, 가격 표시</p>
          <p className="text-yellow-300">• 호버 시 그림자 효과</p>
          <p className="text-yellow-300">• 클릭 시 상세 페이지로 이동</p>
        </div>
      </div>

      {/* 팁 4: 출력 형식 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">4</span>
          📋 출력 형식 지정하기
        </h4>
        <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm leading-loose">
          <p className="text-green-400">// 원하는 형식을 명확히</p>
          <p className="mt-3 text-yellow-300">TypeScript 인터페이스로 작성해주세요.</p>
          <p className="text-yellow-300">주석도 추가해주세요.</p>
          <p className="text-yellow-300">파일 경로: src/types/user.ts</p>
        </div>
      </div>

      {/* 팁 5: 피드백 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">5</span>
          🔄 피드백 주기
        </h4>
        <div className="grid gap-3">
          {[
            { icon: '🎯', text: '원하는 결과가 아니면 구체적으로 수정 요청' },
            { icon: '✅', text: '잘 된 부분은 "이 부분은 유지하고..."로 명시' },
            { icon: '🐛', text: '에러가 나면 에러 메시지를 그대로 붙여넣기' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm leading-relaxed pt-0.5">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 원칙 */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20">
        <h4 className="font-semibold flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          ⭐ 핵심 원칙
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '🎯', title: '명확하게', desc: '무엇을 원하는지 구체적으로' },
            { icon: '📖', title: '맥락과 함께', desc: '프로젝트 상황 설명' },
            { icon: '📦', title: '작게 나눠서', desc: '한 번에 하나씩' },
            { icon: '🔄', title: '반복하며', desc: '점진적으로 개선' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-background rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
