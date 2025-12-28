'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lightbulb,
  FileText,
  Bot,
  Code,
  PlusCircle,
  Rocket,
  Settings,
  ChevronRight,
  Check,
  Lock,
  Play,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { useWorkflowStore, useProjectStore } from '@/stores';
import { USER_SCENARIOS, AI_TOOLS_COMPARISON } from '@/constants/workflow';
import type { WorkflowStepId, WorkflowStep } from '@/types';
import { cn } from '@/lib/utils';

// 아이콘 매핑
const STEP_ICONS: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Bot: <Bot className="h-5 w-5" />,
  Code: <Code className="h-5 w-5" />,
  PlusCircle: <PlusCircle className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
};

const SCENARIO_ICONS: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
};

export default function WorkflowPage() {
  const router = useRouter();
  const {
    currentStep,
    steps,
    selectedScenario,
    startedAt,
    setCurrentStep,
    toggleChecklistItem,
    selectScenario,
    resetWorkflow,
    startWorkflow,
    getStepProgress,
    getOverallProgress,
    canProceedToStep,
    getNextAvailableStep,
  } = useWorkflowStore();

  const { project } = useProjectStore();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('steps');

  const overallProgress = getOverallProgress();
  const currentStepData = steps.find((s) => s.id === currentStep);

  // 프로젝트가 있으면 자동으로 generate 단계 완료 처리
  useEffect(() => {
    if (project && steps.find((s) => s.id === 'generate')?.status !== 'completed') {
      // Generate 단계의 체크리스트 모두 완료 처리
      const generateStep = steps.find((s) => s.id === 'generate');
      if (generateStep) {
        generateStep.checklist.forEach((item) => {
          if (!item.checked) {
            toggleChecklistItem('generate', item.id);
          }
        });
      }
    }
  }, [project]);

  const handleStepClick = (stepId: WorkflowStepId) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleNavigateToPage = (linkedPage?: string) => {
    if (linkedPage) {
      router.push(linkedPage);
    }
  };

  const handleStartWorkflow = () => {
    if (!startedAt) {
      startWorkflow();
    }
  };

  const handleReset = () => {
    resetWorkflow();
    setShowResetDialog(false);
  };

  const getStatusBadge = (step: WorkflowStep) => {
    switch (step.status) {
      case 'completed':
        return <Badge className="bg-green-500">완료</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">진행중</Badge>;
      case 'available':
        return <Badge variant="outline">시작 가능</Badge>;
      case 'locked':
        return <Badge variant="secondary">잠김</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">개발 워크플로우</h1>
            <p className="text-muted-foreground mt-1">
              아이디어부터 배포까지, 단계별로 안내해드립니다
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  초기화
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>워크플로우 초기화</DialogTitle>
                  <DialogDescription>
                    모든 진행 상황이 초기화됩니다. 계속하시겠습니까?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                    취소
                  </Button>
                  <Button variant="destructive" onClick={handleReset}>
                    초기화
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">전체 진행률</span>
              <span className="text-sm text-muted-foreground">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
              <span>
                {steps.filter((s) => s.status === 'completed').length} / {steps.length} 단계 완료
              </span>
              {startedAt && (
                <span>
                  시작일: {new Date(startedAt).toLocaleDateString('ko-KR')}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">단계별 가이드</TabsTrigger>
          <TabsTrigger value="scenarios">시나리오 선택</TabsTrigger>
          <TabsTrigger value="tools">AI 도구 비교</TabsTrigger>
        </TabsList>

        {/* Steps Tab */}
        <TabsContent value="steps" className="space-y-6">
          {!startedAt ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">워크플로우 시작하기</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  버튼을 클릭하여 개발 여정을 시작하세요. 각 단계별로 안내해드립니다.
                </p>
                <Button size="lg" onClick={handleStartWorkflow}>
                  <Play className="h-5 w-5 mr-2" />
                  워크플로우 시작
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Steps List */}
              <div className="lg:col-span-1 space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={step.status === 'locked'}
                    className={cn(
                      'w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all',
                      step.id === currentStep
                        ? 'border-primary bg-primary/5'
                        : step.status === 'locked'
                        ? 'border-muted bg-muted/30 opacity-50 cursor-not-allowed'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-full',
                        step.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : step.status === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : step.status === 'locked'
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      {step.status === 'completed' ? (
                        <Check className="h-5 w-5" />
                      ) : step.status === 'locked' ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        STEP_ICONS[step.icon]
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                        {getStatusBadge(step)}
                      </div>
                      <p className="font-medium truncate">{step.name}</p>
                    </div>
                    {step.status !== 'locked' && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>

              {/* Current Step Detail */}
              <div className="lg:col-span-2">
                {currentStepData && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          {STEP_ICONS[currentStepData.icon]}
                        </div>
                        <div>
                          <CardTitle>{currentStepData.name}</CardTitle>
                          <CardDescription>{currentStepData.description}</CardDescription>
                        </div>
                      </div>
                      {currentStepData.estimatedTime && (
                        <Badge variant="outline" className="w-fit mt-2">
                          예상 시간: {currentStepData.estimatedTime}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">단계 진행률</span>
                          <span className="text-sm text-muted-foreground">
                            {getStepProgress(currentStepData.id)}%
                          </span>
                        </div>
                        <Progress value={getStepProgress(currentStepData.id)} className="h-2" />
                      </div>

                      {/* Checklist */}
                      <div className="space-y-3">
                        <h4 className="font-medium">체크리스트</h4>
                        {currentStepData.checklist.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() =>
                                toggleChecklistItem(currentStepData.id, item.id)
                              }
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={item.id}
                                className={cn(
                                  'font-medium cursor-pointer',
                                  item.checked && 'line-through text-muted-foreground'
                                )}
                              >
                                {item.title}
                              </label>
                              {item.description && (
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t">
                        {currentStepData.linkedPage && (
                          <Button
                            onClick={() => handleNavigateToPage(currentStepData.linkedPage)}
                            className="flex-1"
                          >
                            {currentStepData.name} 페이지로 이동
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        )}
                        {getNextAvailableStep() && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              const next = getNextAvailableStep();
                              if (next) setCurrentStep(next);
                            }}
                          >
                            다음 단계
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {USER_SCENARIOS.map((scenario) => (
              <Card
                key={scenario.id}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-md',
                  selectedScenario === scenario.id && 'border-primary ring-2 ring-primary/20'
                )}
                onClick={() => selectScenario(scenario.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      {SCENARIO_ICONS[scenario.icon]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">추천 경로:</span>
                    {scenario.recommendedPath.map((stepId, index) => {
                      const step = steps.find((s) => s.id === stepId);
                      return (
                        <div key={stepId} className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {step?.name}
                          </Badge>
                          {index < scenario.recommendedPath.length - 1 && (
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedScenario && (
            <Card className="border-primary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      선택된 시나리오: {USER_SCENARIOS.find((s) => s.id === selectedScenario)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      이 시나리오에 맞는 워크플로우를 시작하세요
                    </p>
                  </div>
                  <Button onClick={() => setActiveTab('steps')}>
                    워크플로우 시작
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_TOOLS_COMPARISON.map((tool) => (
              <Card
                key={tool.id}
                className={cn(tool.recommended && 'border-primary ring-2 ring-primary/20')}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    {tool.recommended && (
                      <Badge className="bg-primary">추천</Badge>
                    )}
                  </div>
                  <CardDescription>{tool.bestFor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">장점</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tool.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600 mb-1">단점</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tool.cons.map((con, i) => (
                        <li key={i}>- {con}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="outline">
                      난이도: {tool.difficulty === 'easy' ? '쉬움' : '보통'}
                    </Badge>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        방문하기 &rarr;
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">초보자를 위한 추천</h3>
              <p className="text-muted-foreground">
                처음 시작하신다면 <strong>Claude</strong>를 추천드립니다.
                VibeDocs에서 생성된 문서를 Claude에게 전달하고, 단계별로 코드 구현을 요청하세요.
                가이드 페이지에서 더 자세한 사용법을 확인하실 수 있습니다.
              </p>
              <Button className="mt-4" onClick={() => router.push('/guide')}>
                사용 가이드 보기
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
