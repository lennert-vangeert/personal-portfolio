export type KBIndex = {
  chunks: { chunk: string; embedding: number[]; summary?: string }[];
};