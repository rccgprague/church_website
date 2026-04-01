export type BannerSlide = {
  imageUrl: string;
  hotspot?: { x: number; y: number };
};

export type HomeResponse = {
  liveYoutubeUrl: string;
  themeTitle: string;
  _id: string;
  bannerTitle: string;
  liveStartDateTime: Date;
  themeMessage: string;
  themeImageUrl: string;
  whoWeAreTitle: string;
  publishedDate: Date;
  bannerSubTitle: string;
  bannerImageUrl: string;
  bannerHotspot?: { x: number; y: number };
  bannerSlides?: BannerSlide[];
  themeVerse: string;
  themeLogoUrl: string;
  whoWeAreMessage: string;
  language: string;
  whoWeAreImageUrl: string;
  whoWeAreYoutubeUrl: string;
};
