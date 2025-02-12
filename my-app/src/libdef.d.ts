interface Article{
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}
interface ArticleResponce {
    articles: Article[],
    articlesCount: number,
    loading: boolean
}
interface RegisterRequest{

        username: string,
        email: string,
        password: string
    
}
interface RegisterResponce{

        username: string,
        email: string,
        token: string
    
}

interface ArticleProps {
    article: Article;
}

interface RegisterForm{ 
    username:string,
    email: string,
    password: string,
    repeatPassword: string,
    agree: boolean,
    avatar?: string
}
interface LogInRequest{
    email: string,
    password: string
}
interface ServerErrors{
    errors? : {
        "email or password"?: string
    }
}
interface ServerErrorsArticle{
    errors? : {
       body?: string
    }
}
interface AuthState {
    username: string;
    email: string;
    token: string;
    loading: boolean;
    error: string | null;
    bio?: string;
    image?: string
}

interface EditRequest {
    email?: string;
    username?: string;
    bio?: string;
    image?: string;
    password?: string;
}

interface EditResponce{
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

interface ArticleForm{  
    title: string;
    description: string;
    body: string;
    tagList: {value: string}[] ;
    
}

interface ArticleRequest { 
    title: string;
    description: string;
    body: string;
    tagList: {value: string}[] | string[];
}

interface EditArticleForm{
    title: string;
    description: string;
    body: string;
    tagList:string[] | {value: string}[];
}