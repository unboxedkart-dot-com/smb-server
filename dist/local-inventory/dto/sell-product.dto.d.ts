import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';
export declare class SellProductDto {
    productId: string;
    sellingPrice: number;
    buyerDetails: BuyerModel;
    saleDate: String;
    saleDateInString: String;
    agentDetails: AgentModel;
}
