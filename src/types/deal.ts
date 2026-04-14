export interface Deal {
  opportunity_id: string;
  account: string;
  sales_agent: string;
  manager: string;
  regional_office: string;
  product: string;
  deal_stage: string;
  engage_date: string;
  close_value: string;
  priority_score: number;
  priority_label: string;
  top_positive_reason_1: string;
  top_positive_reason_2: string;
  top_risk_reason_1: string;
  top_risk_reason_2: string;
  recommended_action: string;
}
