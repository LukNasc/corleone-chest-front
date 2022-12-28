import UniversalCookies from 'universal-cookie';

const cookies = new UniversalCookies();

export const Cookies = {
    getCookie(name) {
        return cookies.get(name);
    }
}
