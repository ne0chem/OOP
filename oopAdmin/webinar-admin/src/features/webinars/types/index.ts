export interface WebinarApi {
  id: number | string;
  title: string;
  description: string;
  start_time: string;
  category?: string;
  stream_url?: string;
  photo?: string;
  preview?: string;
  is_published: boolean;
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  stream_url: string;
  photo: string;
  preview: string;
  is_published: boolean;
}

export interface WebinarFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  stream_url: string;
  photo: string;
  preview: string;
  is_published: boolean;
}
