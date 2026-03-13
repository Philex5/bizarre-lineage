export interface ContentDataTranslator {
  (key: string, values?: Record<string, string | number | Date>): string;
  raw<T = unknown>(key: string): T;
}
