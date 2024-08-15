import User from "../Entity/User";

class DeleteAddressController {
  static async deleteAddress(userId, addressData) {
    try {
      return await User.deleteAddress(userId, addressData);
    } catch (error) {
      throw error
    }
  }

}

export default DeleteAddressController;