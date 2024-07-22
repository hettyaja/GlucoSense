class FetchFoodOrdersController {
    static async fetchFoodOrders() {
      try {
        // Simulate fetching data from an API
        return [
          { id: '1', name: 'Chicken Rice', buyer: 'Jonathan', orderDate: '09/08/2024', status: 'pending' },
          { id: '2', name: 'Chicken Rice', buyer: 'Joni', orderDate: '09/08/2024', status: 'pending' }
        ];
      } catch (error) {
        console.error('Error fetching food orders:', error);
        throw new Error('Failed to fetch food orders.');
      }
    }
  }
  
  export default FetchFoodOrdersController;
  