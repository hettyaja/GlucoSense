import Order from "../Entity/Order";

class CreateOrderController {
    static async createOrder(orderData) {
        try {
            return Order.createOrder(orderData)
        } catch(error) {
            throw error
        }
    }
    
    static async createDietPlanOrder(orderData) {
        try {
            return Order.createDietPlanOrder(orderData)
        } catch (error) {
            throw error
        }
    }
}

export default CreateOrderController