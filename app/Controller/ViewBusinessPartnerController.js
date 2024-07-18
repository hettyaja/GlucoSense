import BusinessPartner from "../Entity/BusinessPartner";

class ViewBusinessPartnerController {
    static async ViewBusinessPartner() {
        try{ 
            return await BusinessPartner.export()
        } catch(error) {
            throw new Error(error.message)
        }
    }
}
export default ViewBusinessPartnerController