export type UserForm = {
    name:string;
    bio:string;
    email:string;
    username:string;
    spotifyUrl:string;
    profilePictureUrl:string;
    theme: 'dark' | 'light';
    accentColor:string;
    cta:string;
    emailMarketing:{
        emailList:string[];
        enableSignupForm:boolean;
        welcomeEmail:string;
    };
    seoRanking:{
        name:string;
        description:string;
        keywords:string[];
        metaTags:string[];
    }
}