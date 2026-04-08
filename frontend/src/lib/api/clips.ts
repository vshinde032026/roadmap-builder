import { api } from '@/lib/api-client';

export type Clip = {
  id: string;
  url: string;
  title: string | null;
  selected_text: string;
  fragment_url: string;
  screenshot: string | null;
  roadmap_node_id: string | null;
  created_at: string;
};

export function listClips() {
  return api.get<Clip[]>('/clips');
}
