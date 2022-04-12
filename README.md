## Problem Statement
Supply Chain is a complicated network involving multiple processes and stakeholders. The transparency in the supply chain is emerging as a fundamental feature of business continuity and high product quality. To make the process seamless and transparent we have designed this Supply Chain DApp which helps trace the product movement right from its inception to the handover to retail shops.

## Introduction
As a consumer, we are worried about the quality of products available at the retail store, their origin, etc. For example, when we buy fruits, vegetables, eggs, meat, it would be really helpful to know the origin source of the product and how old it is. Also, the intermediaries in the supply chain have to ensure the products that they’re getting from their precedents in the chain are upto the mark. We have used the immutability and traceability of blockchain to stimulate a supply chain model which can help all the players in the supply chain to access the history of the product upto that player right from its inception. Basically, this encapsulates the various stages of transformations that the product had to go through before the final product became available. Eg: Final product: Cotton Shirt. The chain would start right from the farmer growing the cotton for that shirt. The intermediary nodes in the chain would include spinning and knitting, dyeing, printing, logistics, and retail. Like every single transformation involved in the process until the final product (Shirt, in this case) is available at the retail store.

## Approach

We have used the power of decentralization and immutability of blockchain with the traceability of a Directed Acyclic Graph (DAG) to model the supply chain. Each node in the graph corresponds to a particular itemID and ownerID. The node also has other information like owner’s location, item name, etc. From one node there can be two possible transfers of an item: The item is handed over as it is (without any transformation, eg. to a logistic company) to the child node. In this case the item id of the item remains unchanged. The item is transformed and passed on to the child node. In this case, the item id is altered.

These two cases are illustrated in the images below. For simplicity we have just shown the itemID and ownerID in the individual nodes.

![1](https://user-images.githubusercontent.com/32013812/162971110-533e37c8-c105-4467-a497-45865ab574df.png)

Now, one node can receive raw materials from multiple owners (which are its precedent nodes) and convert them to a different item (having a unique itemID). This is shown in the below picture.

![2](https://user-images.githubusercontent.com/32013812/162971156-6459f492-5c92-44c7-991e-4f489e9cdbef.png)

So, the overall graph would look something like this. This is a simplified view after omitting the internal information stored in the individual nodes, just to give an idea of the flow.

![3](https://user-images.githubusercontent.com/32013812/162971210-74fdf4ae-23f6-4c51-85c3-8fa23585cadd.png)

Notice that we travel the graph backwards, i.e., from the latest state of the item right upto the origin. This enables backward traceability.
