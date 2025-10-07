
export function unauthorized(code){
    if(code===401){
        localStorage.clear();
        window.location.href="/login"
    }
}
