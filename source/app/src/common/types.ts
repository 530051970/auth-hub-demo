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

export interface RightModalProps {
  needMask?: boolean;
  children?: React.ReactNode;
  showModal: boolean;
  setShowModal: (modal: boolean) => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showFolderIcon?: boolean;
  clickMaskToClose?: boolean;
}
