'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Globe,
  Palette,
  Type,
  Download,
  Loader2,
  Check,
  Copy,
  Eye,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import type { DesignSystem, ColorPalette, Typography } from '@/types';

type Step = 'input' | 'extracting' | 'preview';

interface ExtractionOptions {
  colors: boolean;
  typography: boolean;
  spacing: boolean;
  components: boolean;
}

export default function DesignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState<ExtractionOptions>({
    colors: true,
    typography: true,
    spacing: true,
    components: false,
  });
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractedDesign, setExtractedDesign] = useState<DesignSystem | null>(null);

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleExtract = async () => {
    if (!isValidUrl(url)) {
      toast.error('유효한 URL을 입력해주세요');
      return;
    }

    setCurrentStep('extracting');
    setExtractionProgress(0);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setExtractionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Call the real extraction API
      const response = await fetch('/api/extract-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options }),
      });

      clearInterval(progressInterval);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '디자인 추출에 실패했습니다');
      }

      setExtractionProgress(100);
      setExtractedDesign(data.design);
      setCurrentStep('preview');
      toast.success('디자인 추출이 완료되었습니다');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      toast.error('디자인 추출 실패', {
        description: errorMessage,
        duration: 5000,
      });
      setCurrentStep('input');
      setExtractionProgress(0);
    }
  };

  const handleCopyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      toast.success('색상 코드가 복사되었습니다');
    } catch {
      toast.error('복사에 실패했습니다');
    }
  };

  const handleDownloadTokens = () => {
    if (!extractedDesign) return;

    const tokens = {
      colors: extractedDesign.colors,
      typography: extractedDesign.typography,
      spacing: extractedDesign.spacing,
      effects: extractedDesign.effects,
    };

    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('디자인 토큰이 다운로드되었습니다');
  };

  const handleDownloadTailwind = () => {
    if (!extractedDesign) return;

    const tailwindConfig = generateTailwindConfig(extractedDesign);
    const blob = new Blob([tailwindConfig], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind.config.js';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Tailwind 설정 파일이 다운로드되었습니다');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로
        </Button>
        <h1 className="text-3xl font-bold">디자인 추출</h1>
        <p className="text-muted-foreground mt-1">
          웹사이트 URL에서 디자인 시스템을 자동으로 추출합니다
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {currentStep === 'input' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  URL 입력
                </CardTitle>
                <CardDescription>
                  디자인을 추출할 웹사이트 URL을 입력하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">웹사이트 URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>추출 옵션</CardTitle>
                <CardDescription>
                  추출할 디자인 요소를 선택하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id="colors"
                      checked={options.colors}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, colors: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="colors" className="font-medium">색상 팔레트</Label>
                      <p className="text-xs text-muted-foreground">주요 색상 및 테마 색상</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id="typography"
                      checked={options.typography}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, typography: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="typography" className="font-medium">타이포그래피</Label>
                      <p className="text-xs text-muted-foreground">폰트 및 텍스트 스타일</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id="spacing"
                      checked={options.spacing}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, spacing: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="spacing" className="font-medium">간격 시스템</Label>
                      <p className="text-xs text-muted-foreground">패딩, 마진, 갭</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id="components"
                      checked={options.components}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, components: checked as boolean })
                      }
                    />
                    <div>
                      <Label htmlFor="components" className="font-medium">컴포넌트</Label>
                      <p className="text-xs text-muted-foreground">버튼, 카드, 입력 필드 등</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleExtract}
              disabled={!url.trim()}
            >
              <Eye className="h-4 w-4 mr-2" />
              디자인 추출하기
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Puppeteer를 사용하여 실제 웹사이트에서 디자인 요소를 추출합니다.
            </p>
          </div>
        )}

        {currentStep === 'extracting' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                디자인 추출 중
              </CardTitle>
              <CardDescription>
                {url}에서 디자인 요소를 추출하고 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={extractionProgress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {Math.round(extractionProgress)}% 완료
              </p>
            </CardContent>
          </Card>
        )}

        {currentStep === 'preview' && extractedDesign && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  추출 완료
                </CardTitle>
                <CardDescription>
                  {extractedDesign.sourceUrl}에서 디자인 시스템을 성공적으로 추출했습니다
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button variant="outline" onClick={handleDownloadTokens}>
                  <Download className="h-4 w-4 mr-2" />
                  design-tokens.json
                </Button>
                <Button variant="outline" onClick={handleDownloadTailwind}>
                  <Download className="h-4 w-4 mr-2" />
                  tailwind.config.js
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors" className="flex-1">
                  <Palette className="h-4 w-4 mr-2" />
                  색상
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex-1">
                  <Type className="h-4 w-4 mr-2" />
                  타이포그래피
                </TabsTrigger>
                {extractedDesign.components && extractedDesign.components.length > 0 && (
                  <TabsTrigger value="components" className="flex-1">
                    <Layers className="h-4 w-4 mr-2" />
                    컴포넌트
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="colors">
                <Card>
                  <CardHeader>
                    <CardTitle>색상 팔레트</CardTitle>
                    <CardDescription>추출된 색상 시스템</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Primary Colors */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">주요 색상</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Primary', color: extractedDesign.colors.primary },
                            { name: 'Secondary', color: extractedDesign.colors.secondary },
                            { name: 'Accent', color: extractedDesign.colors.accent },
                          ].map((item) => (
                            <ColorSwatch
                              key={item.name}
                              name={item.name}
                              color={item.color}
                              onCopy={handleCopyColor}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Background Colors */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">배경 색상</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Background', color: extractedDesign.colors.background },
                            { name: 'Surface', color: extractedDesign.colors.surface },
                            { name: 'Border', color: extractedDesign.colors.border },
                          ].map((item) => (
                            <ColorSwatch
                              key={item.name}
                              name={item.name}
                              color={item.color}
                              onCopy={handleCopyColor}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Text Colors */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">텍스트 색상</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Text Primary', color: extractedDesign.colors.text.primary },
                            { name: 'Text Secondary', color: extractedDesign.colors.text.secondary },
                            { name: 'Text Muted', color: extractedDesign.colors.text.muted },
                          ].map((item) => (
                            <ColorSwatch
                              key={item.name}
                              name={item.name}
                              color={item.color}
                              onCopy={handleCopyColor}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Semantic Colors */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">시맨틱 색상</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Success', color: extractedDesign.colors.success },
                            { name: 'Warning', color: extractedDesign.colors.warning },
                            { name: 'Error', color: extractedDesign.colors.error },
                          ].map((item) => (
                            <ColorSwatch
                              key={item.name}
                              name={item.name}
                              color={item.color}
                              onCopy={handleCopyColor}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography">
                <Card>
                  <CardHeader>
                    <CardTitle>타이포그래피</CardTitle>
                    <CardDescription>폰트 및 텍스트 스타일</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Font Families */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">폰트 패밀리</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg border">
                          <p className="text-xs text-muted-foreground mb-1">Heading</p>
                          <p className="font-medium" style={{ fontFamily: extractedDesign.typography.fontFamily.heading }}>
                            {extractedDesign.typography.fontFamily.heading}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <p className="text-xs text-muted-foreground mb-1">Body</p>
                          <p className="font-medium" style={{ fontFamily: extractedDesign.typography.fontFamily.body }}>
                            {extractedDesign.typography.fontFamily.body}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <p className="text-xs text-muted-foreground mb-1">Mono</p>
                          <p className="font-medium font-mono">
                            {extractedDesign.typography.fontFamily.mono}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Font Sizes */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">폰트 크기</h4>
                      <div className="space-y-2">
                        {Object.entries(extractedDesign.typography.fontSize).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-2 rounded-lg border">
                            <span className="text-sm font-mono">{key}</span>
                            <span style={{ fontSize: value }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {extractedDesign.components && extractedDesign.components.length > 0 && (
                <TabsContent value="components">
                  <Card>
                    <CardHeader>
                      <CardTitle>컴포넌트</CardTitle>
                      <CardDescription>추출된 UI 컴포넌트 스타일</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {extractedDesign.components.map((component) => (
                        <div key={component.type} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium capitalize">
                              {component.type === 'button' && '버튼'}
                              {component.type === 'card' && '카드'}
                              {component.type === 'input' && '입력 필드'}
                              {component.type === 'badge' && '뱃지/태그'}
                              {component.type === 'link' && '링크'}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {component.count}개 발견
                            </span>
                          </div>

                          {/* Component Preview */}
                          <div className="p-4 rounded-lg border bg-muted/30">
                            {component.type === 'button' && (
                              <button
                                className="px-4 py-2 rounded transition-colors"
                                style={{
                                  backgroundColor: component.styles.backgroundColor || '#3b82f6',
                                  color: component.styles.color || '#ffffff',
                                  borderRadius: component.styles.borderRadius || '6px',
                                  fontSize: component.styles.fontSize || '14px',
                                  fontWeight: component.styles.fontWeight || '500',
                                  border: component.styles.border || 'none',
                                  boxShadow: component.styles.boxShadow || 'none',
                                }}
                              >
                                버튼 예시
                              </button>
                            )}
                            {component.type === 'card' && (
                              <div
                                className="p-4 max-w-xs"
                                style={{
                                  backgroundColor: component.styles.backgroundColor || '#ffffff',
                                  borderRadius: component.styles.borderRadius || '8px',
                                  border: component.styles.border || '1px solid #e5e7eb',
                                  boxShadow: component.styles.boxShadow || 'none',
                                }}
                              >
                                <p className="font-medium">카드 제목</p>
                                <p className="text-sm text-muted-foreground">카드 내용이 여기에 표시됩니다.</p>
                              </div>
                            )}
                            {component.type === 'input' && (
                              <input
                                type="text"
                                placeholder="입력 필드 예시"
                                className="w-full max-w-xs"
                                style={{
                                  backgroundColor: component.styles.backgroundColor || '#ffffff',
                                  color: component.styles.color || '#1a1a1a',
                                  borderRadius: component.styles.borderRadius || '6px',
                                  padding: component.styles.padding || '8px 12px',
                                  fontSize: component.styles.fontSize || '14px',
                                  border: component.styles.border || '1px solid #e5e7eb',
                                }}
                              />
                            )}
                            {component.type === 'badge' && (
                              <span
                                className="inline-block"
                                style={{
                                  backgroundColor: component.styles.backgroundColor || '#e5e7eb',
                                  color: component.styles.color || '#1a1a1a',
                                  borderRadius: component.styles.borderRadius || '9999px',
                                  padding: component.styles.padding || '2px 8px',
                                  fontSize: component.styles.fontSize || '12px',
                                  fontWeight: component.styles.fontWeight || '500',
                                }}
                              >
                                뱃지 예시
                              </span>
                            )}
                            {component.type === 'link' && (
                              <span
                                className="cursor-pointer hover:underline"
                                style={{
                                  color: component.styles.color || '#3b82f6',
                                  fontSize: component.styles.fontSize || '14px',
                                  fontWeight: component.styles.fontWeight || '400',
                                }}
                              >
                                링크 텍스트 예시
                              </span>
                            )}
                          </div>

                          {/* Style Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {component.styles.backgroundColor && (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: component.styles.backgroundColor }}
                                />
                                <span className="font-mono">{component.styles.backgroundColor}</span>
                              </div>
                            )}
                            {component.styles.color && (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: component.styles.color }}
                                />
                                <span className="font-mono">{component.styles.color}</span>
                              </div>
                            )}
                            {component.styles.borderRadius && (
                              <div className="text-muted-foreground">
                                radius: {component.styles.borderRadius}
                              </div>
                            )}
                            {component.styles.fontSize && (
                              <div className="text-muted-foreground">
                                font: {component.styles.fontSize}
                              </div>
                            )}
                          </div>

                          {/* Variants */}
                          {component.variants.length > 0 && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">색상 변형:</p>
                              <div className="flex gap-2">
                                {component.variants.map((variant, idx) => (
                                  <div
                                    key={idx}
                                    className="w-8 h-8 rounded border cursor-pointer"
                                    style={{ backgroundColor: variant }}
                                    title={variant}
                                    onClick={() => handleCopyColor(variant)}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setCurrentStep('input');
                setExtractedDesign(null);
                setUrl('');
              }}
            >
              다른 사이트 추출하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  color,
  onCopy,
}: {
  name: string;
  color: string;
  onCopy: (color: string) => void;
}) {
  return (
    <div
      className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onCopy(color)}
    >
      <div
        className="w-full h-12 rounded-md mb-2 border"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs text-muted-foreground">{name}</p>
      <div className="flex items-center gap-1">
        <p className="font-mono text-sm">{color}</p>
        <Copy className="h-3 w-3 text-muted-foreground" />
      </div>
    </div>
  );
}

function generateTailwindConfig(design: DesignSystem): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${design.colors.primary}',
        secondary: '${design.colors.secondary}',
        accent: '${design.colors.accent}',
        background: '${design.colors.background}',
        surface: '${design.colors.surface}',
        border: '${design.colors.border}',
        error: '${design.colors.error}',
        success: '${design.colors.success}',
        warning: '${design.colors.warning}',
        text: {
          primary: '${design.colors.text.primary}',
          secondary: '${design.colors.text.secondary}',
          muted: '${design.colors.text.muted}',
        },
      },
      fontFamily: {
        heading: ['${design.typography.fontFamily.heading}'],
        body: ['${design.typography.fontFamily.body}'],
        mono: ['${design.typography.fontFamily.mono}'],
      },
      borderRadius: {
        sm: '${design.effects.borderRadius.sm}',
        md: '${design.effects.borderRadius.md}',
        lg: '${design.effects.borderRadius.lg}',
        xl: '${design.effects.borderRadius.xl}',
      },
      boxShadow: {
        sm: '${design.effects.shadow.sm}',
        md: '${design.effects.shadow.md}',
        lg: '${design.effects.shadow.lg}',
      },
    },
  },
};
`;
}
