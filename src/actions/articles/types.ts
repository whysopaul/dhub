export const ARTICLES_GET_POST = 'ARTICLES_GET_POST'
export const ARTICLES_GET_POSTS = 'ARTICLES_GET_POSTS'

export const ARTICLES_CREATE_POST = 'ARTICLES_CREATE_POST'

export const ARTICLES_UPDATE_POST = 'ARTICLES_UPDATE_POST'

export const ARTICLES_UPLOAD_POST_IMAGE = 'ARTICLES_UPLOAD_POST_IMAGE'
export const ARTICLES_UPLOAD_POST_IMAGE_WITH_FILE = 'ARTICLES_UPLOAD_POST_IMAGE_WITH_FILE'

export const ARTICLES_DELETE_POST = 'ARTICLES_DELETE_POST'

export type TArticlesData = {
    id: number,
    title: string,
    content: string,
    category?: string,
    description?: string,
    previewImage?: string,
    image_link?: string,
    image_file?: string
}

interface IArticlesGetPost {
    type: typeof ARTICLES_GET_POST,
    payload: TArticlesData
}

interface IArticlesGetPosts {
    type: typeof ARTICLES_GET_POSTS,
    payload: TArticlesData[]
}

interface IArticlesCreatePost {
    type: typeof ARTICLES_CREATE_POST,
    payload: TArticlesData
}

interface IArticlesUpdatePost {
    type: typeof ARTICLES_UPDATE_POST,
    payload: TArticlesData
}

interface IArticlesUploadPostImage {
    type: typeof ARTICLES_UPLOAD_POST_IMAGE,
    payload: any
}

interface IArticlesUploadPostImageWithFile {
    type: typeof ARTICLES_UPLOAD_POST_IMAGE_WITH_FILE,
    payload: any
}

interface IArticlesDeletePost {
    type: typeof ARTICLES_DELETE_POST,
    payload: string
}

export type articlesDispatchTypes = IArticlesGetPost | IArticlesGetPosts | IArticlesCreatePost | IArticlesUpdatePost | IArticlesUploadPostImage | IArticlesUploadPostImageWithFile | IArticlesDeletePost