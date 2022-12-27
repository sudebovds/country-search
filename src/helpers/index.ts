export const getCurrentLocation = async (userIP: string) => {
    try{
        const getLocation = await fetch(`http://ip-api.com/json/${userIP}`);
        const location = await getLocation.json();

        return location;
    } 
    catch(e){
        return e
    }
}