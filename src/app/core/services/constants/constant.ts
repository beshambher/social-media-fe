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

    public static base: string = '/social';
    
    public static post: string = API.base + '/posts';

    public static logout: string = API.base + '/logout';
    public static session: string = API.base + '/session/user';
    
    public static friends: string = API.base + '/user/friends';
    public static suggestions: string = API.base + '/user/suggestions';

}