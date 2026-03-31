export type BannerSlide = {
  title: string;
  subTitle: string;
  imageUrl: string;
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
  bannerSlides?: BannerSlide[];
  themeVerse: string;
  themeLogoUrl: string;
  whoWeAreMessage: string;
  language: string;
  whoWeAreImageUrl: string;
  whoWeAreYoutubeUrl: string;
};
