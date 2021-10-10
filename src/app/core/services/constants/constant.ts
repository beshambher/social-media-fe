import { environment } from "src/environments/environment";

export abstract class API {

    public static api: string = environment.apiUrl;
    public static base: string = environment.baseHref;
    
    public static swaggerui: string = API.base + '/swagger-ui/';

    public static logout: string = API.base + '/logout';
    public static loginGithub: string = API.base + '/oauth2/authorization/github';
    public static loginGoogle: string = API.base + '/oauth2/authorization/google';
    public static session: string = API.api + '/session/user';

    public static posts: string = API.api + '/posts';
    public static postId: string = API.api + '/posts/{id}';
    public static postLike: string = API.api + '/posts/{id}/like';
    public static comments: string = API.api + '/comments';
    public static commentId: string = API.api + '/comments/{id}';
    public static postComments: string = API.api + '/post/{id}/comments';
    
    public static friends: string = API.api + '/user/friends';
    public static suggestions: string = API.api + '/user/suggestions';
    public static follow: string = API.api + '/user/{1}/follow';
    public static unfollow: string = API.api + '/user/{1}/unfollow';

}

export abstract class Constant {

    public static loginOptions: any[] = [
        { title: 'Google', icon: 'fab fa-google', url: API.loginGoogle, color: 'primary' },
        { title: 'GitHub', icon: 'fab fa-github', url: API.loginGithub, color: 'secondary' }
    ];

    public static social: any[] = [
        { title: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/beshambher' },
        { title: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/beshambher-chaukhwan' },
        { title: 'Facebook', icon: 'fab fa-facebook', url: 'https://www.facebook.com/beshambher.chaukhwan' }
    ];

    public static defaultPageResponse = {
        content: [],
        first: true,
        last: true,
        size: 10,
        number: 0,
        totalPages: 1,
        totalElements: 0,
        numberOfElements: 0
    };

    public static defaultTextAreaData = {
        formControls: [
          { name: 'body', id: '', label: 'Body', placeholder: 'Body' }
        ],
        save: { label: 'Update' },
        cancel: { label: 'Cancel' }
    };

}
