import { parseCookies, setCookie, destroyCookie } from 'nookies'
function Logout(){
    const cookies = parseCookies();
    destroyCookie(null,'userData')
    return (<h1>LOGGED OUT!</h1>)
}

export default Logout;