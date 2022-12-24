export interface LabelAnnotation {
  mid: string;
  description: string;
  score: number;
  topicality: number;
}

export interface Color2 {
  red: number;
  green: number;
  blue: number;
}

export interface Color {
  color: Color2;
  score: number;
  pixelFraction: number;
}

export interface DominantColors {
  colors: Color[];
}

export interface ImagePropertiesAnnotation {
  dominantColors: DominantColors;
}

export interface Vertex {
  x: number;
  y?: number;
}

export interface BoundingPoly {
  vertices: Vertex[];
}

export interface CropHint {
  boundingPoly: BoundingPoly;
  confidence: number;
  importanceFraction: number;
}

export interface CropHintsAnnotation {
  cropHints: CropHint[];
}

export interface NormalizedVertice {
  x: number;
  y: number;
}

export interface BoundingPoly2 {
  normalizedVertices: NormalizedVertice[];
}

export interface LocalizedObjectAnnotation {
  mid: string;
  name: string;
  score: number;
  boundingPoly: BoundingPoly2;
}

export interface Response {
  labelAnnotations: LabelAnnotation[];
  imagePropertiesAnnotation: ImagePropertiesAnnotation;
  cropHintsAnnotation: CropHintsAnnotation;
  localizedObjectAnnotations: LocalizedObjectAnnotation[];
}

export interface ResponseObject {
  responses: Response[];
}
