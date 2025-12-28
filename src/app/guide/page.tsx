'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Code2,
  Zap,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
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
      description: 'AI와 함께하는 새로운 개발 방식',
      content: <IntroSection />,
    },
    {
      id: 'documents',
      title: '문서 활용 가이드',
      icon: <FileText className="h-5 w-5" />,
      description: 'VibeDocs 문서 사용법',
      content: <DocumentsSection />,
    },
    {
      id: 'claude',
      title: 'Claude 사용법',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'Claude AI와 코딩하기',
      content: <ClaudeSection />,
    },
    {
      id: 'cursor',
      title: 'Cursor 사용법',
      icon: <Code2 className="h-5 w-5" />,
      description: 'Cursor IDE 활용하기',
      content: <CursorSection />,
    },
    {
      id: 'bolt',
      title: 'Bolt 사용법',
      icon: <Zap className="h-5 w-5" />,
      description: 'Bolt로 빠르게 개발하기',
      content: <BoltSection />,
    },
    {
      id: 'tips',
      title: '효과적인 프롬프트',
      icon: <CheckCircle2 className="h-5 w-5" />,
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
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">사용 가이드</h1>
            <p className="text-muted-foreground">
              VibeDocs와 AI 코딩 도구 사용법을 알아보세요
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1 sticky top-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {section.icon}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{section.title}</p>
                  <p
                    className={`text-xs truncate ${
                      activeSection === section.id
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
                <ChevronRight
                  className={`h-4 w-4 ${
                    activeSection === section.id ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeContent && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {activeContent.icon}
                  <div>
                    <CardTitle>{activeContent.title}</CardTitle>
                    <CardDescription>{activeContent.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{activeContent.content}</CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>바이브 코딩(Vibe Coding)이란?</h3>
      <p>
        바이브 코딩은 AI와 대화하며 코드를 작성하는 새로운 개발 방식입니다.
        복잡한 프로그래밍 지식 없이도 아이디어를 실제 애플리케이션으로 만들 수 있습니다.
      </p>

      <h4>왜 바이브 코딩인가요?</h4>
      <ul>
        <li>
          <strong>낮은 진입 장벽</strong>: 프로그래밍 경험 없이도 시작할 수 있습니다
        </li>
        <li>
          <strong>빠른 프로토타이핑</strong>: 아이디어를 몇 시간 내에 구현할 수 있습니다
        </li>
        <li>
          <strong>학습과 개발 동시에</strong>: AI가 코드를 설명해주며 자연스럽게 배웁니다
        </li>
        <li>
          <strong>반복적 개선</strong>: 대화를 통해 점진적으로 완성도를 높입니다
        </li>
      </ul>

      <h4>VibeDocs의 역할</h4>
      <p>
        VibeDocs는 바이브 코딩을 시작할 때 필요한 모든 문서를 자동으로 생성해줍니다.
        아이디어만 입력하면 다음 문서들이 자동으로 만들어집니다:
      </p>
      <ul>
        <li>아이디어 개요서 (IDEA_BRIEF.md)</li>
        <li>사용자 스토리 (USER_STORIES.md)</li>
        <li>화면 흐름도 (SCREEN_FLOW.md)</li>
        <li>기술 스택 (TECH_STACK.md)</li>
        <li>데이터 모델 (DATA_MODEL.md)</li>
        <li>API 명세서 (API_SPEC.md)</li>
        <li>TODO 마스터 (TODO_MASTER.md)</li>
        <li>그 외 3개 문서</li>
      </ul>

      <div className="bg-muted/50 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">시작하기</h5>
        <ol className="list-decimal list-inside space-y-1">
          <li>VibeDocs에서 새 프로젝트 생성</li>
          <li>생성된 문서를 AI 도구에 전달</li>
          <li>TODO를 하나씩 완료하며 개발</li>
          <li>완성된 앱 배포</li>
        </ol>
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>VibeDocs 문서 활용법</h3>

      <p>VibeDocs가 생성하는 10개의 문서는 각각 다른 목적을 가지고 있습니다.</p>

      <h4>1. IDEA_BRIEF.md</h4>
      <p>
        프로젝트의 핵심 아이디어를 요약한 문서입니다.
        AI에게 프로젝트의 맥락을 전달할 때 가장 먼저 제공하세요.
      </p>

      <h4>2. USER_STORIES.md</h4>
      <p>
        사용자 관점에서 기능을 정의합니다.
        &ldquo;~로서, ~하고 싶다&rdquo; 형식으로 작성되어 있습니다.
      </p>

      <h4>3. SCREEN_FLOW.md</h4>
      <p>
        화면 구성과 페이지 간 흐름을 설명합니다.
        UI 개발 시 이 문서를 참고하세요.
      </p>

      <h4>4. TECH_STACK.md</h4>
      <p>
        사용할 기술 스택과 라이브러리를 정의합니다.
        프로젝트 초기 설정 시 참고하세요.
      </p>

      <h4>5. DATA_MODEL.md</h4>
      <p>
        데이터 구조와 관계를 정의합니다.
        데이터베이스 설계나 타입 정의 시 사용합니다.
      </p>

      <h4>6. API_SPEC.md</h4>
      <p>
        API 엔드포인트와 요청/응답 형식을 정의합니다.
        백엔드 개발 시 필수적으로 참고하세요.
      </p>

      <h4>7. TODO_MASTER.md</h4>
      <p>
        개발 태스크 목록입니다.
        체크리스트/칸반/타임라인 뷰로 관리할 수 있습니다.
      </p>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">팁: 문서 사용 순서</h5>
        <p className="text-sm">
          1. IDEA_BRIEF로 컨텍스트 전달 → 2. TODO_MASTER에서 작업 선택 →
          3. 관련 문서(SCREEN_FLOW, DATA_MODEL 등) 참고 → 4. AI에게 구현 요청
        </p>
      </div>
    </div>
  );
}

function ClaudeSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>Claude AI 사용법</h3>

      <p>
        Claude는 Anthropic에서 개발한 대화형 AI입니다.
        코드 작성, 디버깅, 설명 등 다양한 개발 작업을 도와줍니다.
      </p>

      <h4>시작하기</h4>
      <ol>
        <li>
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
            claude.ai <ExternalLink className="h-3 w-3" />
          </a>
          에 접속
        </li>
        <li>계정 생성 또는 로그인</li>
        <li>새 대화 시작</li>
      </ol>

      <h4>효과적인 사용법</h4>

      <h5>1. 문서 전달하기</h5>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        안녕하세요! 다음 프로젝트를 개발하려고 합니다.<br />
        <br />
        [IDEA_BRIEF.md 내용 붙여넣기]<br />
        <br />
        우선 프로젝트 구조를 잡아주세요.
      </div>

      <h5>2. TODO 요청하기</h5>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        다음 TODO를 구현해주세요:<br />
        <br />
        [TODO 프롬프트 붙여넣기]<br />
        <br />
        TECH_STACK.md의 기술 스택을 사용해주세요.
      </div>

      <h5>3. 디버깅 요청</h5>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        다음 에러가 발생했습니다:<br />
        <br />
        [에러 메시지]<br />
        <br />
        관련 코드:<br />
        [코드 붙여넣기]<br />
        <br />
        원인과 해결 방법을 알려주세요.
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">주의사항</h5>
        <ul className="text-sm space-y-1">
          <li>긴 코드는 필요한 부분만 발췌해서 전달하세요</li>
          <li>한 번에 하나의 작업만 요청하세요</li>
          <li>생성된 코드는 반드시 테스트하세요</li>
        </ul>
      </div>
    </div>
  );
}

function CursorSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>Cursor IDE 사용법</h3>

      <p>
        Cursor는 AI가 내장된 코드 에디터입니다.
        VS Code와 유사한 인터페이스에 AI 기능이 추가되어 있습니다.
      </p>

      <h4>설치</h4>
      <ol>
        <li>
          <a href="https://cursor.so" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
            cursor.so <ExternalLink className="h-3 w-3" />
          </a>
          에서 다운로드
        </li>
        <li>설치 후 실행</li>
        <li>프로젝트 폴더 열기</li>
      </ol>

      <h4>주요 기능</h4>

      <h5>1. Cmd+K (코드 생성/수정)</h5>
      <p>
        코드를 선택하고 Cmd+K를 누르면 AI에게 수정을 요청할 수 있습니다.
      </p>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        // 코드 선택 후 Cmd+K<br />
        이 함수를 async/await로 리팩토링해줘
      </div>

      <h5>2. Cmd+L (채팅)</h5>
      <p>
        사이드바에서 AI와 대화할 수 있습니다.
        VibeDocs 문서를 붙여넣고 개발을 진행하세요.
      </p>

      <h5>3. Tab (자동완성)</h5>
      <p>
        코드를 작성하다 보면 AI가 다음 코드를 제안합니다.
        Tab을 눌러 수락하세요.
      </p>

      <h4>VibeDocs와 함께 사용하기</h4>
      <ol>
        <li>프로젝트 폴더에 VIBEDOCS 폴더 생성</li>
        <li>VibeDocs에서 다운로드한 문서들을 저장</li>
        <li>Cursor 채팅에서 @VIBEDOCS로 문서 참조</li>
        <li>TODO 프롬프트를 복사해서 개발 요청</li>
      </ol>

      <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">팁</h5>
        <p className="text-sm">
          Cursor는 프로젝트 전체 코드를 이해할 수 있어서,
          &ldquo;이 프로젝트에 로그인 기능을 추가해줘&rdquo;와 같은 요청이 가능합니다.
        </p>
      </div>
    </div>
  );
}

function BoltSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>Bolt.new 사용법</h3>

      <p>
        Bolt는 브라우저에서 바로 앱을 개발할 수 있는 AI 도구입니다.
        설치 없이 빠르게 프로토타입을 만들 수 있습니다.
      </p>

      <h4>시작하기</h4>
      <ol>
        <li>
          <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
            bolt.new <ExternalLink className="h-3 w-3" />
          </a>
          에 접속
        </li>
        <li>아이디어 입력 또는 VibeDocs 문서 붙여넣기</li>
        <li>AI가 자동으로 코드 생성</li>
        <li>실시간 미리보기 확인</li>
      </ol>

      <h4>VibeDocs 문서 활용</h4>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        다음 명세에 따라 웹 앱을 만들어주세요:<br />
        <br />
        ## 아이디어<br />
        [IDEA_BRIEF.md 내용]<br />
        <br />
        ## 화면 구성<br />
        [SCREEN_FLOW.md 내용]<br />
        <br />
        ## 기술 스택<br />
        [TECH_STACK.md 내용]
      </div>

      <h4>장점</h4>
      <ul>
        <li>설치 없이 브라우저에서 바로 개발</li>
        <li>실시간 미리보기로 즉각적인 피드백</li>
        <li>완성된 코드 다운로드 가능</li>
        <li>빠른 프로토타이핑에 최적화</li>
      </ul>

      <h4>한계</h4>
      <ul>
        <li>복잡한 백엔드 로직 구현이 어려움</li>
        <li>대규모 프로젝트에는 부적합</li>
        <li>무료 사용량 제한</li>
      </ul>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">추천 사용 시나리오</h5>
        <p className="text-sm">
          아이디어 검증용 프로토타입 → Bolt로 빠르게 제작<br />
          프로토타입 확인 후 본격 개발 → Cursor나 Claude로 전환
        </p>
      </div>
    </div>
  );
}

function TipsSection() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3>효과적인 프롬프트 작성법</h3>

      <p>
        AI와의 소통에서 가장 중요한 것은 명확한 요청입니다.
        다음 팁들을 참고하세요.
      </p>

      <h4>1. 컨텍스트 제공하기</h4>
      <div className="not-prose grid gap-3 mb-4">
        <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
          <Badge variant="destructive" className="mb-2">나쁜 예</Badge>
          <p className="text-sm">로그인 기능 만들어줘</p>
        </div>
        <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
          <Badge className="mb-2 bg-green-600">좋은 예</Badge>
          <p className="text-sm">
            Next.js 14 프로젝트에 이메일/비밀번호 로그인 기능을 추가하려고 합니다.
            NextAuth.js를 사용하고, 로그인 폼은 shadcn/ui 컴포넌트로 만들어주세요.
            DATA_MODEL.md의 User 타입을 참고해주세요.
          </p>
        </div>
      </div>

      <h4>2. 단계별 요청하기</h4>
      <p>
        큰 기능은 작은 단위로 나눠서 요청하세요.
        VibeDocs의 TODO가 이미 단계별로 나눠져 있습니다.
      </p>

      <h4>3. 예시 제공하기</h4>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        카드 컴포넌트를 만들어주세요.<br />
        <br />
        예시:<br />
        - 이미지, 제목, 설명, 가격 표시<br />
        - 호버 시 그림자 효과<br />
        - 클릭 시 상세 페이지로 이동
      </div>

      <h4>4. 출력 형식 지정하기</h4>
      <div className="bg-muted p-3 rounded-lg font-mono text-sm">
        TypeScript 인터페이스로 작성해주세요.<br />
        주석도 추가해주세요.<br />
        파일 경로: src/types/user.ts
      </div>

      <h4>5. 피드백 주기</h4>
      <ul>
        <li>원하는 결과가 아니면 구체적으로 수정 요청</li>
        <li>잘 된 부분은 &ldquo;이 부분은 유지하고...&rdquo;로 명시</li>
        <li>에러가 나면 에러 메시지와 함께 전달</li>
      </ul>

      <div className="bg-primary/10 p-4 rounded-lg mt-4">
        <h5 className="font-semibold mb-2">핵심 원칙</h5>
        <p className="text-sm">
          <strong>명확하게</strong>: 무엇을 원하는지 구체적으로<br />
          <strong>맥락과 함께</strong>: 프로젝트 상황 설명<br />
          <strong>작게 나눠서</strong>: 한 번에 하나씩<br />
          <strong>반복하며</strong>: 점진적으로 개선
        </p>
      </div>
    </div>
  );
}
