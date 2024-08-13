import FoodOrder from "../Entity/FoodOrder";

class CreateOrderController {
    static async createOrder(orderData) {
        try {
            return FoodOrder.createOrder(orderData)
        } catch(error) {
            throw error
        }
    }
    

}

export default CreateOrderController