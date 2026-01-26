export const loggerTags = {
  builder: { icon: '🔧', flag: '[builder]' },
  server: { icon: '🌐', flag: '[server]' },
  debugger: { icon: '🐛', flag: '[debugger]' },
  default: { icon: '🤖', flag: '[logger]' },
} as const;

export type TagKey = keyof typeof loggerTags;
export type Tag = (typeof loggerTags)[TagKey];

export const loggerStatus = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  launch: '🚀',
  debug: '🐛',
  default: '🌐',
} as const;

export type StatusKey = keyof typeof loggerStatus;
export type Status = (typeof loggerStatus)[StatusKey];
