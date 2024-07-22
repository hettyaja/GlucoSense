class FetchDietPlanOrdersController {
    static async fetchDietPlanOrders() {
      try {
        // Simulate fetching data from an API
        return [
          { id: '1', name: '1 Week Diet Plan A', buyer: 'Jonathan', orderDate: '09/08/2024', status: 'pending' },
          { id: '2', name: '1 Week Diet Plan A', buyer: 'Joni', orderDate: '09/08/2024', status: 'pending' }
        ];
      } catch (error) {
        console.error('Error fetching diet plan orders:', error);
        throw new Error('Failed to fetch diet plan orders.');
      }
    }
  }
  
  export default FetchDietPlanOrdersController;
  