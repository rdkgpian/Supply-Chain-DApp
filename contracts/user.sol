pragma solidity >=0.4.22 <0.9.0;

contract User {

  struct Stock {
    address ownerAddress;
    uint ownerId;
    string ownerName;
    uint nodeId;
    uint itemId;
    string itemName;
    uint cost;
    bool isRetail;
    string location;

  }
  struct ReceivedOrder {
    uint itemId;
    uint buyerId;
    string itemName;
    uint orderId;
    bool isShipped;
  }
  struct RequestedOrder {
    uint itemId;
    uint sellerId;
    string itemName;
    uint orderId; 
  }
 
  event UserAdded(uint _userId);

  mapping(uint => Stock[]) userStock;
  mapping(uint => ReceivedOrder[]) userReceivedOrder;
  mapping(uint => RequestedOrder[]) userRequestedOrder;
  mapping(uint=> mapping(uint => uint)) userIdtoItemIdtoStockInd;
  mapping(uint=> mapping(uint => uint))  userIdtoOrderIdtoRecOrderInd;
  mapping (uint=> mapping(uint => uint)) userIdtoOrderIdtoReqOrderInd;

  struct UserCredentials{
    uint userId;
    string userName;
    address userAddress;
  }

  uint userId=1;
  UserCredentials[] users;
  mapping(uint => address) public userIdtoAddress;
  mapping (address => UserCredentials) userAddresstoCredentials;
  
  function getCredentialsfromAddress(address _userAddress) external view returns (UserCredentials memory) {
    return userAddresstoCredentials[_userAddress];
  }

  function addNewUser(string memory _userName, address _userAddress) external returns(uint) {

   // userCredentials[userId]= userName;
   uint temp_userId= userId;
    users.push(UserCredentials(userId,_userName, _userAddress));
    userIdtoAddress[userId] = _userAddress;
    userAddresstoCredentials[_userAddress] = UserCredentials(userId, _userName, _userAddress);
    userId++;
    emit UserAdded(temp_userId);
    return temp_userId;

   
  }

  // Gets the credentials of all the users
  function getUsers() external view returns (UserCredentials[] memory) {
   
    return users;
  }

  //Gets metadata for a specific user
  function getuserMetadata(uint _userId) external view returns (Stock[] memory, ReceivedOrder[] memory, RequestedOrder[] memory) {
    
    return (userStock[_userId],userReceivedOrder[_userId], userRequestedOrder[_userId]);
  }

  //Gets the stock for a particular user
  function getStock(uint _userId) external view returns(Stock[] memory) {

      return userStock[_userId];
  }


  //Gets the received orders for a particular user
  function getReceivedOrders(uint _userId) external view returns(ReceivedOrder[] memory) {

      return userReceivedOrder[_userId];
  }

  //Gets the requested orders for a particular user
  function getRequestedOrders(uint _userId) external view returns(RequestedOrder[] memory) {

      return userRequestedOrder[_userId];
  }

  function updateStockforBuyer(uint _nodeId, address _userAddress, uint _userId, string memory _userName, uint _itemId,  string memory _itemName, bool _isRetail, uint _cost, string memory _location) internal {

      userStock[_userId].push(Stock(_userAddress, _userId, _userName, _nodeId, _itemId, _itemName,_cost,_isRetail, _location));
      userIdtoItemIdtoStockInd[_userId][_itemId] = userStock[_userId].length -1;
  }

  function updateStockforSeller(uint _sellerId, uint _itemId) internal {

      /*Deleting the required element from stocksInd array and replacing that index in the array 
        with the last element of the array.*/
      uint arrLen=userStock[_sellerId].length;
      if(arrLen == 1) {
        delete userStock[_sellerId][0];
         delete userIdtoItemIdtoStockInd[_sellerId][_itemId];
         return;
      }
      uint arrInd= userIdtoItemIdtoStockInd[_sellerId][_itemId];
      userStock[_sellerId][arrInd]=userStock[_sellerId][arrLen-1];
      userStock[_sellerId].pop();
      delete userIdtoItemIdtoStockInd[_sellerId][_itemId];

      uint temp_itemId= userStock[_sellerId][arrInd].itemId;
      userIdtoItemIdtoStockInd[_sellerId][temp_itemId]= arrInd;
  }

  function deleteRequestedOrders(uint _buyerId, uint _orderId ) internal {

      uint arrLen=userRequestedOrder[_buyerId].length;
      if(arrLen == 1) {
        delete userRequestedOrder[_buyerId][0];
        delete userIdtoOrderIdtoReqOrderInd[_buyerId][_orderId];
        return;
      }
      uint arrInd= userIdtoOrderIdtoReqOrderInd[_buyerId][_orderId];
      userRequestedOrder[_buyerId][arrInd]=userRequestedOrder[_buyerId][arrLen-1];
      userRequestedOrder[_buyerId].pop();
      delete userIdtoOrderIdtoReqOrderInd[_buyerId][_orderId];
      uint temp_orderId = userRequestedOrder[_buyerId][arrInd].orderId;
      userIdtoOrderIdtoReqOrderInd[_buyerId][temp_orderId]= arrInd;

      /*Deleting the required element from recOrdersInd array and replacing that index in the array 
        with the last element of the array.*/
     

  }

  function deleteReceivedOrders(uint _sellerId, uint _orderId) internal  {

     uint arrLen=userReceivedOrder[_sellerId].length;
      if(arrLen == 1) {
        delete userReceivedOrder[_sellerId][0];
        delete userIdtoOrderIdtoRecOrderInd[_sellerId][0];
        return;
      }
      uint arrInd= userIdtoOrderIdtoRecOrderInd[_sellerId][_orderId];
      userReceivedOrder[_sellerId][arrInd]=userReceivedOrder[_sellerId][arrLen-1];
      userReceivedOrder[_sellerId].pop();
      delete userIdtoOrderIdtoRecOrderInd[_sellerId][_orderId];
      uint temp_orderId= userReceivedOrder[_sellerId][arrInd].orderId;
      userIdtoOrderIdtoRecOrderInd[_sellerId][temp_orderId]= arrInd;
  
  }
  
}
