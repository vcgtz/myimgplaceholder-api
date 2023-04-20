/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface ImageSize {
  size: string;
  url: string;
}

export interface Image {
  width: number;
  height: number;
  color: string;
  description?: string;
  credit?: string;
  sizes: ImageSize[];
};

export interface ImageUnplashResponse {
  [prop: string]: string | number | object;
  urls: {
    [prop: string]: string;
  };
  user: {
    [prop: string]: string;
  };
}
