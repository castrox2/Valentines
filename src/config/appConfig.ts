export const NO_LABEL_STEP = 3;
export const MIN_NO_ATTEMPTS = 3;
export const MAX_NO_ATTEMPTS = 102;
export const DEFAULT_MAX_NO_ATTEMPTS = 48;

const CONFIG_STORAGE_KEY = 'valentines_app_config_v1';
const SHARE_CODE_PREFIX = 'VALENTINES_CONFIG:';

const DEFAULT_NO_LABELS: readonly string[] = [];

export interface ValentineAppConfig {
  maxNoAttempts: number;
  noLabels: string[];
  successTitle: string;
  successMessage: string;
  successPlaceholderText: string;
}

const DEFAULT_SUCCESS_TITLE = '';
const DEFAULT_SUCCESS_MESSAGE = '';
const DEFAULT_SUCCESS_PLACEHOLDER_TEXT = '';

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

export function clampMaxNoAttempts(value: unknown): number {
  const numeric = toFiniteNumber(value);
  if (numeric === null) {
    return DEFAULT_MAX_NO_ATTEMPTS;
  }

  const snapped = Math.floor(numeric / NO_LABEL_STEP) * NO_LABEL_STEP;
  const safeValue = Math.max(MIN_NO_ATTEMPTS, snapped || MIN_NO_ATTEMPTS);
  return Math.min(MAX_NO_ATTEMPTS, safeValue);
}

export function getNoLabelSlotCount(maxNoAttempts: number): number {
  const clamped = clampMaxNoAttempts(maxNoAttempts);
  return Math.floor(clamped / NO_LABEL_STEP) + 1;
}

function getFallbackNoLabel(index: number): string {
  return DEFAULT_NO_LABELS[index] ?? '';
}

export function buildNoLabels(
  maxNoAttempts: number,
  sourceLabels: Array<string | unknown> = []
): string[] {
  const count = getNoLabelSlotCount(maxNoAttempts);
  const labels: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const rawValue = sourceLabels[index];
    if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
      labels.push(rawValue);
    } else {
      labels.push(getFallbackNoLabel(index));
    }
  }

  return labels;
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value.trim().length > 0 ? value : fallback;
}

export const DEFAULT_APP_CONFIG: ValentineAppConfig = {
  maxNoAttempts: DEFAULT_MAX_NO_ATTEMPTS,
  noLabels: buildNoLabels(DEFAULT_MAX_NO_ATTEMPTS, [...DEFAULT_NO_LABELS]),
  successTitle: DEFAULT_SUCCESS_TITLE,
  successMessage: DEFAULT_SUCCESS_MESSAGE,
  successPlaceholderText: DEFAULT_SUCCESS_PLACEHOLDER_TEXT,
};

function cloneConfig(config: ValentineAppConfig): ValentineAppConfig {
  return {
    ...config,
    noLabels: [...config.noLabels],
  };
}

export function normalizeConfig(rawConfig: unknown): ValentineAppConfig {
  if (!rawConfig || typeof rawConfig !== 'object') {
    return cloneConfig(DEFAULT_APP_CONFIG);
  }

  const candidate = rawConfig as Partial<ValentineAppConfig>;
  const maxNoAttempts = clampMaxNoAttempts(candidate.maxNoAttempts);
  const noLabels = buildNoLabels(
    maxNoAttempts,
    Array.isArray(candidate.noLabels) ? candidate.noLabels : []
  );

  return {
    maxNoAttempts,
    noLabels,
    successTitle: normalizeText(candidate.successTitle, DEFAULT_SUCCESS_TITLE),
    successMessage: normalizeText(candidate.successMessage, DEFAULT_SUCCESS_MESSAGE),
    successPlaceholderText: normalizeText(
      candidate.successPlaceholderText,
      DEFAULT_SUCCESS_PLACEHOLDER_TEXT
    ),
  };
}

export function loadSavedConfig(): ValentineAppConfig | null {
  try {
    const rawValue = window.localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    return normalizeConfig(JSON.parse(rawValue));
  } catch {
    return null;
  }
}

export function saveConfig(config: ValentineAppConfig): ValentineAppConfig {
  const normalized = normalizeConfig(config);
  window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function encodeToBase64(input: string): string {
  const utf8 = new TextEncoder().encode(input);
  let binary = '';
  utf8.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

function decodeFromBase64(input: string): string {
  const binary = window.atob(input);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function createShareCode(config: ValentineAppConfig): string {
  const payload = JSON.stringify(normalizeConfig(config));
  return `${SHARE_CODE_PREFIX}${encodeToBase64(payload)}`;
}

export function parseShareCode(shareCode: string): ValentineAppConfig | null {
  if (!shareCode || typeof shareCode !== 'string') {
    return null;
  }

  const trimmed = shareCode.trim();
  const payload = trimmed.startsWith(SHARE_CODE_PREFIX)
    ? trimmed.slice(SHARE_CODE_PREFIX.length)
    : trimmed;

  if (!payload) {
    return null;
  }

  try {
    const decodedJson = decodeFromBase64(payload);
    return normalizeConfig(JSON.parse(decodedJson));
  } catch {
    return null;
  }
}
