import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AgentModel } from 'src/models/local_inventory/agent.model';
import { BuyerModel } from 'src/models/local_inventory/buyer.model';

export class SellProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @IsNotEmpty()
  buyerDetails: BuyerModel;

  // @IsString()
  // leadSource: string;

  @IsString()
  @IsNotEmpty()
  saleDate: String;

  // @IsString()
  // @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  saleDateInString: String;

  @IsNotEmpty()
  agentDetails: AgentModel;
}
