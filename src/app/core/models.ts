export interface IProductData {
  business_date: number;
  live: boolean;
  live_timestamp: number;
  products: IProduct[];
}

export interface IProduct {
  product: string;
  instrument_type: string;
}

export interface ISeriesData {
  business_date: number;
  live: boolean;
  live_timestamp: number;
  list_series: ISeries[];
}

export interface ISeries {
  product_id: string;
  contract_maturity: number;
  expiry_maturity: number;
  call_put_flag: string;
  exercise_price: number;
  version_number: string;
  iid: number;
}

export interface IEstimatorRequest {
  portfolio_components: IEstimatorPortfolio;
}

export interface IEstimatorPortfolio {
  type: string;
  etd_portfolio: IEtdPortfolio[];
}

export interface IEtdPortfolio {
  line_no: number;
  product_id: string;
  iid: number;
  net_ls_balance: number;
}
