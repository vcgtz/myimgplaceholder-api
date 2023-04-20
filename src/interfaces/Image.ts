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
