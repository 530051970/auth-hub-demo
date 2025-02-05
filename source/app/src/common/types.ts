export type AlertType = 'error' | 'warning' | 'info' | 'success';
export interface ApiRequest {
  data: any;
  code: number;
  message: string;
  status: string;
}

export interface CommonAlertProps {
  alertTxt: string;
  alertType: AlertType;
}
