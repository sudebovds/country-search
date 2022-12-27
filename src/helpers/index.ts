export const getCurrentLocation = async () => {
    try{
        const getLocation = await fetch('http://ip-api.com/json');
        const location = await getLocation.json();

        return location;
    } 
    catch(e){
        return e
    }
}