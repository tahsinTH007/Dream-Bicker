export interface FacebookPictureData {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  };
}

export interface FacebookPageResponse {
  id: string;
  name: string;
  link?: string;
  picture?: FacebookPictureData;
  followers_count?: number;
  fan_count?: number;
  about?: string;
  /** public contact details from the page\'s About section (absent when not set/public) */
  phone?: string;
  emails?: string[];
  whatsapp_number?: string;
}

export interface FacebookSubattachmentItem {
  media?: {
    image?: {
      src: string;
      width?: number;
      height?: number;
    };
  };
  target?: {
    id: string;
    url: string;
  };
  title?: string;
  type?: string;
  description?: string;
}

export interface FacebookAttachmentItem {
  media?: {
    image?: {
      src: string;
      width?: number;
      height?: number;
    };
    source?: string;
  };
  target?: {
    id: string;
    url: string;
  };
  title?: string;
  type?: string;
  description?: string;
  subattachments?: {
    data: FacebookSubattachmentItem[];
  };
}

export interface FacebookPostItem {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  permalink_url: string;
  attachments?: {
    data: FacebookAttachmentItem[];
  };
  reactions?: {
    summary?: {
      total_count: number;
    };
  };
  comments?: {
    summary?: {
      total_count: number;
    };
  };
  shares?: {
    count: number;
  };
}

export interface FacebookPostListResponse {
  data?: FacebookPostItem[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface FacebookVideoItem {
  id: string;
  title?: string;
  description?: string;
  created_time: string;
  permalink_url: string;
  thumbnails?: {
    data: Array<{
      uri: string;
      is_preferred?: boolean;
    }>;
  };
  picture?: string;
  length?: number; // duration in seconds
  views?: number;
  likes?: {
    summary?: {
      total_count: number;
    };
  };
  comments?: {
    summary?: {
      total_count: number;
    };
  };
}

export interface FacebookVideoListResponse {
  data?: FacebookVideoItem[];
  paging?: {
    next?: string;
  };
}
