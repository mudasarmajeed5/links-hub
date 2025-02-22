export type UserLink = {
  icon: string;
  label: string;
  link: string;
  _id: {
    $oid: string;
  };
};

export type User = {
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
  isPremiumUser: boolean;
  userLinks: UserLink[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  userTheme: number;
  __v: number;
  accentColor?: string;
  cta?: string;
  emailMarketing: {
    emailList: string[];
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
