// 统一的故事类型定义，供所有游戏共享

export interface StoryChoice {
  label: string;
  text?: string;
  textEn?: string;
  next: number;
  delta?: Record<string, number>;
}

export interface StoryNode {
  id: number;
  scene?: string;
  sceneEn?: string;
  speaker?: string;
  speakerEn?: string;
  text: string;
  textEn?: string;
  choices?: StoryChoice[];
  end?: boolean;
  endType?: string;
  endingId?: string;
}
