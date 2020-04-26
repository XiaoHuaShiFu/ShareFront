const adaptString = (s, len)=>{
    if (s.length > len) {
        return s.substring(0, len) + "...";
    }
    return s;
}



export default adaptString