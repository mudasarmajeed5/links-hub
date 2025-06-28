export interface UserLinks {
  icon: string;
  label: string;
  link: string;
  _id: { $oid: string };
}

export type UserLinkPayload = Omit<UserLinks, "_id">;

export interface SocialPlatform {
  name: string;
  label: string;
  icon: string;
  baseUrl: string;
}

export interface CustomLink {
  name: string;
  label: string;
  icon: string;
  isCustom: true;
}

export type PlatformConfig = SocialPlatform | CustomLink;

export interface Inputs {
  [key: string]: string;
}
