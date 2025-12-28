'use client';

import { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProjectStore } from '@/stores';
import { useApiKey } from '@/stores/settingsStore';
import type { TodoItem } from '@/types';
import { toast } from 'sonner';

interface MatchedTodo {
  todo: TodoItem;
  confidence: number;
  reason: string;
}

export function ProgressAnalysisModal() {
  const { project, updateTodoStatus } = useProjectStore();
  const { hasApiKey } = useApiKey();
  const [isOpen, setIsOpen] = useState(false);
  const [workDescription, setWorkDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedTodos, setMatchedTodos] = useState<MatchedTodo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Set<string>>(new Set());
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!project || !workDescription.trim()) {
      toast.error('작업 내용을 입력해주세요');
      return;
    }

    setIsAnalyzing(true);
    setMatchedTodos([]);
    setSelectedTodos(new Set());
    setAnalyzed(false);

    // Mock analysis - simulating AI response
    // In production, this would call Claude API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple keyword matching for mock
    const pendingTodos = project.todos.filter((t) => t.status !== 'done');
    const workLower = workDescription.toLowerCase();

    const matches: MatchedTodo[] = [];

    pendingTodos.forEach((todo) => {
      const titleWords = todo.title.toLowerCase().split(/\s+/);
      const descWords = (todo.description || '').toLowerCase().split(/\s+/);
      const allWords = [...titleWords, ...descWords];

      // Calculate simple match score
      let matchCount = 0;
      allWords.forEach((word) => {
        if (word.length > 2 && workLower.includes(word)) {
          matchCount++;
        }
      });

      // Check for specific keywords
      const keywords = [
        '설정', '설치', '구현', '완료', '추가', '생성', '작성',
        'setup', 'install', 'implement', 'complete', 'add', 'create', 'write',
        'api', 'ui', 'component', '컴포넌트', 'page', '페이지', 'test', '테스트'
      ];

      keywords.forEach((keyword) => {
        if (workLower.includes(keyword) && (todo.title.toLowerCase().includes(keyword) ||
            (todo.description || '').toLowerCase().includes(keyword))) {
          matchCount += 2;
        }
      });

      if (matchCount > 0) {
        const confidence = Math.min(95, 40 + matchCount * 15);
        matches.push({
          todo,
          confidence,
          reason: `키워드 매칭 (${matchCount}개 일치)`,
        });
      }
    });

    // Sort by confidence and take top 5
    matches.sort((a, b) => b.confidence - a.confidence);
    const topMatches = matches.slice(0, 5);

    // Auto-select high confidence matches
    const autoSelected = new Set<string>();
    topMatches.forEach((match) => {
      if (match.confidence >= 70) {
        autoSelected.add(match.todo.id);
      }
    });

    setMatchedTodos(topMatches);
    setSelectedTodos(autoSelected);
    setAnalyzed(true);
    setIsAnalyzing(false);
  };

  const toggleTodoSelection = (todoId: string) => {
    setSelectedTodos((prev) => {
      const next = new Set(prev);
      if (next.has(todoId)) {
        next.delete(todoId);
      } else {
        next.add(todoId);
      }
      return next;
    });
  };

  const handleApplySelected = () => {
    if (selectedTodos.size === 0) {
      toast.error('적용할 항목을 선택해주세요');
      return;
    }

    selectedTodos.forEach((todoId) => {
      updateTodoStatus(todoId, 'done', 'ai',
        matchedTodos.find((m) => m.todo.id === todoId)?.confidence);
    });

    toast.success(`${selectedTodos.size}개 항목이 완료로 표시되었습니다`);
    setIsOpen(false);
    resetState();
  };

  const handleApplyAll = () => {
    if (matchedTodos.length === 0) return;

    matchedTodos.forEach((match) => {
      updateTodoStatus(match.todo.id, 'done', 'ai', match.confidence);
    });

    toast.success(`${matchedTodos.length}개 항목이 완료로 표시되었습니다`);
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setWorkDescription('');
    setMatchedTodos([]);
    setSelectedTodos(new Set());
    setAnalyzed(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-blue-600 dark:text-blue-400';
    return 'text-amber-600 dark:text-amber-400';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    if (confidence >= 60) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI 진행도 분석
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 진행도 분석
          </DialogTitle>
          <DialogDescription>
            작업 내용을 설명하면 AI가 완료된 TODO 항목을 자동으로 매칭해드립니다.
            {!hasApiKey && (
              <span className="block mt-1 text-amber-600 dark:text-amber-400">
                (현재 Mock 모드로 실행 중입니다. 실제 AI 분석을 위해서는 API 키를 설정해주세요.)
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">작업 내용</label>
            <Textarea
              placeholder="오늘 완료한 작업을 자세히 설명해주세요...&#10;&#10;예: 프로젝트 초기 설정을 완료했습니다. Next.js 14와 TypeScript를 설치하고 Tailwind CSS 테마를 설정했습니다. shadcn/ui 컴포넌트도 추가했습니다."
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
              className="min-h-[120px]"
              disabled={isAnalyzing}
            />
            <p className="text-xs text-muted-foreground">
              구체적으로 작성할수록 더 정확한 매칭이 가능합니다.
            </p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !workDescription.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                분석하기
              </>
            )}
          </Button>

          {/* Results Section */}
          {analyzed && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">매칭된 TODO 항목</h4>
                {matchedTodos.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {selectedTodos.size}개 선택됨
                  </span>
                )}
              </div>

              {matchedTodos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>매칭된 항목이 없습니다.</p>
                  <p className="text-sm">작업 내용을 더 자세히 작성해보세요.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {matchedTodos.map((match) => (
                      <div
                        key={match.todo.id}
                        className={`border rounded-lg p-3 transition-colors cursor-pointer ${
                          selectedTodos.has(match.todo.id)
                            ? 'bg-primary/5 border-primary'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => toggleTodoSelection(match.todo.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedTodos.has(match.todo.id)}
                            onCheckedChange={() => toggleTodoSelection(match.todo.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{match.todo.title}</span>
                              <Badge className={getConfidenceBadge(match.confidence)}>
                                {match.confidence}% 일치
                              </Badge>
                            </div>
                            {match.todo.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {match.todo.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={match.confidence} className="h-1.5 w-24" />
                              <span className={`text-xs ${getConfidenceColor(match.confidence)}`}>
                                {match.reason}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleApplySelected}
                      disabled={selectedTodos.size === 0}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      선택 적용 ({selectedTodos.size})
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleApplyAll}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      전체 적용 ({matchedTodos.length})
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
