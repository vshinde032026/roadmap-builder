export interface Roadmap {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapCreate {
  title: string;
  description?: string;
}
