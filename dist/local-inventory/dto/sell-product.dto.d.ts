import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';
export declare class SellProductDto {
    sellingPrice: number;
    buyerDetails: BuyerModel;
    leadSource: string;
    saleDate: Date;
    SaleDateInString: String;
    agentDetails: AgentModel;
}
