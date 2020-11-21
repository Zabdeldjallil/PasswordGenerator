function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}
let button=document.querySelector(".generate");
button.addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector(".generated").value=makeid(10)
})