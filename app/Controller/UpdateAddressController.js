import User from "../Entity/User";

class UpdateAddressController {
  static async updateAddress(userId, addressData) {
    try {
      return await User.updateAddress(userId, addressData);
    } catch (error) {
      throw error
    }
  }

}

export default UpdateAddressController;