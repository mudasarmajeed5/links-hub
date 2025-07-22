export type UserLink = {
  icon: string;
  label: string;
  link: string;
  _id: {
    $oid: string;
  };
};
type EmailItem = {
  email: string;
  subscriptionDate: string;
  status: "subscribed" | "bounced" | "unsubscribed";
};

export interface User {
  _id: {
    $oid: string;
  };
  password?: string;
  email: string;
  username: string;
  profilePic?: string;
  spotifyUrl?: string;
  bio?: string;
  name: string;
  theme: "light" | "dark";
  userLinks: UserLink[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  userTheme: number;
  __v: number;
  accentColor?: string;
  cta?: {
    text?:string,
    icon?:string,
    url?:string,
  };
  emailMarketing: {
    emailList: EmailItem[];
    enableSignupForm: boolean;
    welcomeEmail?: string;
  };
  viewHistory: [
    {
      date: string;
      views: number;
    }
  ],
  seoRanking: {
    name?: string;
    description?: string;
    keywords?: string[];
    metaTags?: string[];
  };
};
