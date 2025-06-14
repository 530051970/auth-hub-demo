import { CN_DOC_LINK, EN_DOC_LINK, GIHUB_REPO_LINK, ZH_LANGUAGE_LIST } from "common/constants";
import { AlertType } from "./types";


export const alertMsg = (alertTxt: string, alertType: AlertType = 'error') => {
  const patchEvent = new CustomEvent('showAlertMsg', {
    detail: {
      alertTxt,
      alertType,
    },
  });
  window.dispatchEvent(patchEvent);
};

export const buildCommitLink = (commit: string) => {
  if (commit.includes('-')) {
    commit = commit.split('-')[1];
  }
  return GIHUB_REPO_LINK + '/commit/' + (commit ?? 'main');
};

export const buildDocLink = (lang: string, url?: string) => {
  if (ZH_LANGUAGE_LIST.includes(lang)) {
    return CN_DOC_LINK + (url ?? '');
  }
  return EN_DOC_LINK + (url ?? '');
};
