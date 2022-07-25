import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';

export class SellProductDto {
  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  buyerDetails: BuyerModel;

  @IsString()
  leadSource: string;

  @IsDate()
  saleDate: Date;
  @IsString()
  SaleDateInString: String;

  agentDetails: AgentModel;
}
