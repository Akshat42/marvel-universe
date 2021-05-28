export interface Hero {
  id: number,
  name: string,
  description: string,
  modified: string,
  thumbnail: {
    [key : string]: Thumbnail
  }
}

interface Thumbnail {
  extension: string,
  path: string
}
