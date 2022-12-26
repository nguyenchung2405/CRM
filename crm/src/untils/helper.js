import docCookie from "doc-cookies"

export let getTokenInCookie = ()=>{
    try {
        let tokenCookie = docCookie.getItem("usertoken")
        if(!tokenCookie){
            return null
            // Khi test trên local
            // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzU2LCJleHAiOjI3NTA1NTQ3MzB9.drBO_G7F9JCDi7XmLRmf14QvUqYe8cW4inBIbQsmRYI"
            // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyNzUwNDExMDg3fQ.uWeEJEXHyNysw85k22m0s6dFNi4nJFAO8NS8leY6fyA"
        }
        // console.log(tokenCookie);
        return tokenCookie
    } catch (error) {
        console.log(error)
    }
}