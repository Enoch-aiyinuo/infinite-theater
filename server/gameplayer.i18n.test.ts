import { describe, it, expect } from 'vitest';
import enTranslations from '../client/src/locales/en.json';
import zhTranslations from '../client/src/locales/zh.json';

describe('GamePlayer i18n', () => {
  it('should have all required English translations for GamePlayer', () => {
    expect(enTranslations.gamePlayer).toBeDefined();
    expect(enTranslations.gamePlayer.buttons).toBeDefined();
    expect(enTranslations.gamePlayer.buttons.exitGame).toBe('Exit Game');
    expect(enTranslations.gamePlayer.buttons.restart).toBe('Restart');
    expect(enTranslations.gamePlayer.buttons.speak).toBe('Speak');
    expect(enTranslations.gamePlayer.buttons.mute).toBe('Mute');
    expect(enTranslations.gamePlayer.labels).toBeDefined();
    expect(enTranslations.gamePlayer.labels.ending).toBe('Ending');
  });

  it('should have all required Chinese translations for GamePlayer', () => {
    expect(zhTranslations.gamePlayer).toBeDefined();
    expect(zhTranslations.gamePlayer.buttons).toBeDefined();
    expect(zhTranslations.gamePlayer.buttons.exitGame).toBe('退出游戏');
    expect(zhTranslations.gamePlayer.buttons.restart).toBe('重新开始');
    expect(zhTranslations.gamePlayer.buttons.speak).toBe('语音');
    expect(zhTranslations.gamePlayer.buttons.mute).toBe('静音');
    expect(zhTranslations.gamePlayer.labels).toBeDefined();
    expect(zhTranslations.gamePlayer.labels.ending).toBe('结局');
  });

  it('should have matching keys between English and Chinese translations', () => {
    const enKeys = new Set(Object.keys(enTranslations.gamePlayer.buttons));
    const zhKeys = new Set(Object.keys(zhTranslations.gamePlayer.buttons));
    
    for (const key of enKeys) {
      expect(zhKeys.has(key)).toBe(true);
    }
    
    for (const key of zhKeys) {
      expect(enKeys.has(key)).toBe(true);
    }
  });

  it('should have attribute translations for all stat types', () => {
    const statTypes = ['trust', 'clues', 'pressure', 'health', 'sanity', 'energy', 'courage', 'wisdom'];
    
    for (const stat of statTypes) {
      expect(enTranslations.gamePlayer.attributes[stat as keyof typeof enTranslations.gamePlayer.attributes]).toBeDefined();
      expect(zhTranslations.gamePlayer.attributes[stat as keyof typeof zhTranslations.gamePlayer.attributes]).toBeDefined();
    }
  });

  it('should have common button translations', () => {
    expect(enTranslations.buttons.backToHall).toBe('Back to Hall');
    expect(zhTranslations.buttons.backToHall).toBe('返回大厅');
  });

  it('should have all required navigation translations', () => {
    expect(enTranslations.nav.gameHall).toBe('Game Hall');
    expect(enTranslations.nav.archive).toBe('Archive');
    expect(enTranslations.nav.achievements).toBe('Achievements');
    expect(enTranslations.nav.language).toBe('Language');
    
    expect(zhTranslations.nav.gameHall).toBe('游戏大厅');
    expect(zhTranslations.nav.archive).toBe('存档管理');
    expect(zhTranslations.nav.achievements).toBe('成就');
    expect(zhTranslations.nav.language).toBe('语言');
  });
});
