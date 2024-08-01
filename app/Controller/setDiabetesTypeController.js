import User from '../Entity/User';

class setDiabetesTypeController{
    static async setDiabetesType(uid, diabetesType){
        try{
            console.log("Data fetched")
            return await User.setDiabetesType(uid, diabetesType);
            
        }catch (error){
            console.error ("Error fetching diabetes type: ", error);
            throw new Error('Failed to fetch diabetes type.');
        }
    }
}

export default setDiabetesTypeController;