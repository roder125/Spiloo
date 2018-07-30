
/**
 * An Interface for a Post
 */
export interface Post{

    userId: string;
    title: string;
    content: string;
    // type of Media
    type: string;
    fileName: string;
    // link to multimedia
    link: string;
    created: string;
    modified: Date;
    country: string;
    district: string;
    city: string;
    //Neighbourhood
    vicinity: string;
    org: string;
    badCount: number;
    goodCount: number;
    views: number;
    tags; //Array
    language: string;
    commentsCount: number;
    sharesCount: number;
    trashCount: number;
    usersIncluded: number;
    chatDuration: number;
    postOpened: number;
    mood: number;
    downloadUrls; // Array
}