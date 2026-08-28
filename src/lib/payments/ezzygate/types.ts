export interface EzzygateConfig {
  merchantNumber: string;
  hashKey: string;
  securityKey: string;
}

export interface EzzygateHostedPaymentParams {
  merchantID?: string;
  trans_amount: string | number;
  trans_currency: string;
  trans_type?: string;
  trans_installments?: string;
  client_email?: string;
  client_fullName?: string;
  client_phoneNum?: string;
  client_AutoRegistration?: string;
  url_redirect?: string;
  url_notify?: string;
  hashKey?: string;
  securityKey?: string;
}

export interface EzzygateHostedResponse {
  replyCode?: string;
  trans_id?: string;
  signature?: string;
  [key: string]: string | undefined;
}

export interface EzzygateLogEntry {
  id: string;
  timestamp: string;
  type: "request" | "response" | "webhook" | "redirect";
  data: unknown;
}
