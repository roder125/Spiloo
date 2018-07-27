
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
    created: Date;
    modified: Date;
    country: string;
    city: string;
    //Neighbourhood
    vicinity: string;
    org: string;
    badCount: number;
    goodCount: number;
    views: number;
    tags: string;
    language: string;
    commentsCount: number;
    sharesCount: number;
    trashCount: number;
    usersIncluded: number;
    chatDuration: number;
    postOpened: number;
    mood: number;
    mediaArray; //Array
    downloadUrls; // Array
}