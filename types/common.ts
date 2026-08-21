export type IsoDateTime = string;
export type Uuid = string;

export interface Timestamps {
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type FeatureStatus = "live" | "preview";
