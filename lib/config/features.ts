export const features = {
  home: true,
  account: true,
  education: true,
  membership: false,
  bloodTest: false,
  avatar: false,
  deck: false,
  collection: false,
  flip: false,
  community: false,
  trading: false,
  shop: false,
  checkout: false,
  subscriptions: false,
  aiProvider: false,
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}
