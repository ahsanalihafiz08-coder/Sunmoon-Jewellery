export interface JewelleryItem {
  id: string;
  name: string;
  category: string;
  collection: string;
  description: string;
  detailedStory?: string;
  metal: string;
  gemstoneOrPearl?: string;
  dimensions?: string;
  image: string;
  price?: string;
  galleryImages?: string[];
  tags: string[];
  isFeatured: boolean;
  isNewArrival?: boolean;
}

export interface CollectionCategory {
  id: string;
  categoryKey: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
  highlightText: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  title?: string;
  comment?: string;
  verified: boolean;
  itemMentioned?: string;
  source?: 'Google Reviews' | 'Verified Boutique Guest';
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  inquiryType: 'custom' | 'boutique-visit' | 'sizing' | 'general';
  message: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
}

export interface BoutiqueAppointment {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  interestCategory: string;
  notes?: string;
}
