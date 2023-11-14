import { ARTICLES_CREATE_POST, ARTICLES_DELETE_POST, ARTICLES_GET_POST, ARTICLES_GET_POSTS, ARTICLES_UPDATE_POST, ARTICLES_UPLOAD_POST_IMAGE, ARTICLES_UPLOAD_POST_IMAGE_WITH_FILE, TArticlesData, articlesDispatchTypes } from "./types";
import MockPreviewImage from '../../static/images/article_preview_mock_image.webp';
import { Dispatch } from "react";
import axios from "axios";
import { SERVER_URL } from "../../components/utils";

export const articlesGetPost = (id: number) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getPost', { params: { id } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: ARTICLES_GET_POST,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesGetPosts = () => (dispatch: Dispatch<articlesDispatchTypes>) => {
    axios.get(SERVER_URL + '/getPosts').then(res => {
        // console.log(res.data)

        dispatch({
            type: ARTICLES_GET_POSTS,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesCreatePost = (post_data: TArticlesData) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    const formData = new FormData

    const postData = JSON.stringify({ post_data: { ...post_data } })

    formData.append('body', postData)

    axios.post(SERVER_URL + '/createPost', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: ARTICLES_CREATE_POST,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesUpdatePost = (post_data: TArticlesData) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    const formData = new FormData

    const postData = JSON.stringify({ post_data: { ...post_data } })

    formData.append('body', postData)

    axios.post(SERVER_URL + '/updatePost', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: ARTICLES_UPDATE_POST,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesUploadPostImage = (source: string, post_id: number) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    axios.post(SERVER_URL + '/uploadPostImage', JSON.stringify({ source, post_id })).then(res => {
        console.log(res.data)

        dispatch({
            type: ARTICLES_UPLOAD_POST_IMAGE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesUploadPostImageWithFile = (file: File, post_id: number) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    const formData = new FormData

    formData.append('file', file)

    const body = JSON.stringify({ post_id })
    formData.append('body', body)

    axios.post(SERVER_URL + '/uploadPostImageWithFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        console.log(res.data)

        dispatch({
            type: ARTICLES_UPLOAD_POST_IMAGE_WITH_FILE,
            payload: res.data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const articlesDeletePost = (id: number) => (dispatch: Dispatch<articlesDispatchTypes>) => {
    axios.delete(SERVER_URL + '/deletePost', { params: { id } }).then(res => {
        // console.log(res.data)

        dispatch({
            type: ARTICLES_DELETE_POST,
            payload: res.data
        })

        window.location.replace('/articles')
    }).catch(error => {
        console.log(error)
    })
}

export const mockArtData: TArticlesData[] = new Array(8).fill('').map((i, idx) => { return { ...i, id: 1 + idx, title: 'Лучшие коворкинги Москвы и Санкт-Петербурга ' + (idx + 1), category: 'Лайфстайл', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis diam nisi, vel mattis mi rhoncus sed...', previewImage: MockPreviewImage } })

// export const mockartdata: TArticlesData[] = [
//     { id: 1, title: 'Лучшие коворкинги Москвы и Санкт-Петербурга', category: 'Лайфстайл', previewImage: 'https://s3-alpha-sig.figma.com/img/958f/7581/d75453de7f15480182a84d538a7d1610?Expires=1684108800&Signature=e8opZCmXRzsN-9qVCJRwRmONgssR7MD5mXGTBJvFmtAuA1i8Izxp5uZqp94Ckao9GYtutoyuKIFU8BcZBV3zlLi3xFqgesVvkNdIekV9BLHCJa8wq7Fbcflw~e6HLP0ZOknSpElrmEpJR5bBS5bylY-8Cb3nuXoNJvTV9SCiAKv-0~~3zoiKkJvUuofa5HL1k1hxvkYjc1hoVXR1Fes5N3VT5~iAIRLc2uwYZxb5hmvBUojH6afgYVUzGrZ5Sjl7Nxi~5axr0wOxO6fHZl4gdD7gT~wxncbZXnfiFw~dQpJ1C-WUjuB6EJ5kmQKALKEIGZRe9JxnBKmITnApQ8Hrow__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
//     { id: 2, title: 'Как обустроить свое рабочее место', category: 'Работа', previewImage: 'https://s3-alpha-sig.figma.com/img/219b/ad6b/d1da0628f6575ae65355b186e18c677a?Expires=1684108800&Signature=CryW8CnbR9AK7pAQN30UJvdwrx523IleamfK6Liq42j26bU3l6b6kU3dQZ6fBqLgl5b-0dCF24~EJoq9a3mKut1FOaCZ21rFiJDMczLdGpW9mtJv38ii6ar4DPyc6oyh7cUxstq3JKW6ivjyfe6ziDkQhpNb7dmiWczNSnh9HHCJ7jFIx1frSKgeDMhxvzhglK0~FhXDnB03fops0U8bY8KKywmp1AS3kTS5KRgWw-Nl2g9XQSR1loFADXaFyE1gVuLqEzhRszF-EiaQLHQqrscUxxhBXnxxij2mO9nlRn3q7lLKGXuYdAr-P7ZBtMf~FesgyCdG3aTUX5DTG6x6-w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
//     { id: 3, title: 'Подборка сервисов на основе OpenAI', category: 'Сервисы', previewImage: 'https://s3-alpha-sig.figma.com/img/cb68/9f7e/0d51b0f378cb41886c8d29fe090de42a?Expires=1684108800&Signature=BVAgOEkzq25zqGB48SE4A-EaCzBlFWPZBKgbKriFsYISjSE8GSOz7co1FWds5eceujzBYnyu0HhZeNycZsp2wUUABltMGtv3KzEqoQ1IqT07tg215ETZ3z3sEU6Qi~dhHZtycXU1IEYmTZ1Z7zilAiRIPdRTPuBqiHlXiTYdpS-J~RRYhc8jM0uppcAl6WqSpyTBcDNuAOfqsplWZpTELej~JDpJaMqrP~2eb7GbkvfOmT6hwLrUGtrYc1tqUyGoZGfq4dWntqN5XNENX0-vDFcCk6H~faoZRh8RT1y6NGLoyApzblOsg7FeFgVdzzY1SYpRMxBKZZai2-qMxgvnTA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' },
// ].map(i => { return { ...i, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc venenatis diam nisi, vel mattis mi rhoncus sed...' } })