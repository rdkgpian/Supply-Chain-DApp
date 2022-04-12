const SupplyChain = artifacts.require("SupplyChain");

const truffleAssert = require('truffle-assertions');
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

 //Adding Startingnode 1
contract("SupplyChain", (accounts) => {
   let instance;
  beforeEach('should setup the contract instance', async () => {
    instance = await SupplyChain.deployed();
  });
  



  it("adding user1", async() =>{
    const result= await instance.addNewUser("rohan",accounts[0],{from:accounts[0]});
   // console.log(result);
   const expected = web3.utils.toBN('1')
    assert.equal(await instance.addNewUser.call("rohan",accounts[0],{from:accounts[0]}).toNumber(), expected);
     
     
     //expect(result.to.equal(expected));
     //truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    //return event._node.toNumber() === 2;

  });
})
/*
  it("adding user2", async() =>{
    const result= await instance.addNewUser("yash",accounts[1],{from:accounts[0]});
  //  console.log(result.toNumber());
  //  assert.equal(result.toNumber(), 2);
     //truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    //return event._node.toNumber() === 2;

  });

   it("adding user3", async() =>{
    const result= await instance.addNewUser("prakhar",accounts[2],{from:accounts[0]});
  //  console.log(result.toNumber());
  //  assert.equal(result.toNumber(), 2);
     //truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    //return event._node.toNumber() === 2;

  });
    it("adding user4", async() =>{
    const result= await instance.addNewUser("jishnu",accounts[3],{from:accounts[0]});
  //  console.log(result.toNumber());
  //  assert.equal(result.toNumber(), 2);
     //truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    //return event._node.toNumber() === 2;

  });

  it("adding starting node1", async() =>{
  const result= await instance.addStartingNode(2,98,"bat",false,2, {from:accounts[1]});
   // console.log(result.logs);
  //	assert.equal(result.toNumber(), 1);
  truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    return event._node.toNumber() === 1;
  
});

  });

//Adding Startingnode 2
 it("adding starting node2", async() =>{
  	const result= await instance.addStartingNode(1,46,"ball",false,3 ,{from:accounts[0]});
  //  console.log(result.toNumber());
  //	assert.equal(result.toNumber(), 2);
     truffleAssert.eventEmitted(result, 'StartingNode', (event) => {
    return event._node.toNumber() === 2;
  
});

  });

it("Getting user metadata", async() =>{
  const out= await instance.getuserMetadata(1,{from: accounts[0]});
 // truffleAssert.eventEmitted(out, 'orderReceived', (event) =>{
   // console.log(event);
    //return event._orderid.toNumber() === 2;
});

it("Order request processing", async() => {
	const result= await instance.orderRequest(3,46,"ball",1, {from: accounts[2]});
  //assert.equal(order_id.toNumber(),1);
    /*truffleAssert.eventEmitted(result, 'orderRequested', (event) => {
    return event._orderid.toNumber() === 1;
});
});


it("order shipping", async() => {
	const result = await instance.orderShipping(1,{from:accounts[0]});
	truffleAssert.eventEmitted(result, 'orderShipped', (event) =>{
    return event._orderid.toNumber() === 1;
});
});


it("Adding cnxn", async() =>{
	const out= await instance.addTransaction(3,1,56,"ball1",false,4,{from: accounts[2] , value:3});
 //console.log("Printing o" + Order[1].prevItemNodeID);
    // prev_node= await instance.nodes(1);
    //order= await instance.orders(1);
    //prev_nodeid=order.prevItemNodeID;
   // prev_node= await instance.nodes(prev_nodeid);
    //console.log("Printing o" + prev_node.cost);

	truffleAssert.eventEmitted(out, 'orderReceived', (event) =>{
    return event._orderid.toNumber() === 1;
});
});


it("Order request processing", async() => {
	const result= await instance.orderRequest(4,98,"bat",2, {from: accounts[3]});
  truffleAssert.eventEmitted(result, 'orderRequested', (event) => {
    return event._orderid.toNumber() === 3;
});
});


it("order shipping", async() => {
	const result = await instance.orderShipping(2,{from:accounts[1]});
	truffleAssert.eventEmitted(result, 'orderShipped', (event) =>{
    return event._orderid.toNumber() === 2;
});
});

 
it("Adding cnxn", async() =>{
	const out= await instance.addTransaction(4,2,77,"bat1",true,5,{from: accounts[3], value: 2});
	truffleAssert.eventEmitted(out, 'orderReceived', (event) =>{
    return event._orderid.toNumber() === 2;
});
});


it("Order request processing", async() => {
  const result= await instance.orderRequest(2,56,"ball1",3, {from: accounts[1]});
  truffleAssert.eventEmitted(result, 'orderRequested', (event) => {
    return event._orderid.toNumber() === 4;
});
});


it("order shipping", async() => {
  const result = await instance.orderShipping(3,{from:accounts[2]});
  truffleAssert.eventEmitted(result, 'orderShipped', (event) =>{
    return event._orderid.toNumber() === 3;
});
});

 
it("Adding cnxn", async() =>{
  const out= await instance.addTransaction(2,3,28,"ball2",true,7,{from: accounts[1], value: 4});
  truffleAssert.eventEmitted(out, 'orderReceived', (event) =>{
 //   console.log(event);
    return event._orderid.toNumber() === 3;
});
});

it("Getting history", async() => {
  const out = await instance.getHistory(28, {from:accounts[0]});
   truffleAssert.eventEmitted(out, 'History', (event) =>{
     var children = [];

    for(var i=0; i< event.children_itemIds; i++)
      children.push(event.children_itemIds[i]);
    return true;
});
  

})
});
*/



