import { environment } from "src/environments/environment";

export abstract class Constant {

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
    }

}

export abstract class API {

    public static api: string = environment.apiUrl;
    public static base: string = environment.baseHref;
    
    public static swaggerui: string = API.base + '/swagger-ui/';

    public static logout: string = API.base + '/logout';
    public static loginGithub: string = API.base + '/oauth2/authorization/github';
    public static loginGoogle: string = API.base + '/oauth2/authorization/google';
    public static session: string = API.api + '/session/user';

    public static post: string = API.api + '/posts';
    
    public static friends: string = API.api + '/user/friends';
    public static suggestions: string = API.api + '/user/suggestions';
    public static follow: string = API.api + '/user/{1}/follow';
    public static unfollow: string = API.api + '/user/{1}/unfollow';

}
