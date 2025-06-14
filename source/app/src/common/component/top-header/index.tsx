import React, { useState, useEffect } from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'common/constants';
import { logout } from 'request/authing';
import { buildCommitLink, buildDocLink } from 'common/utils';
import { Link } from '@cloudscape-design/components';

const ZH_TEXT = '简体中文';
const EN_TEXT = 'English(US)';
const ZH_LANGUAGE_LIST = ['zh', 'zh-cn', 'zh_CN', 'zh-CN'];
const EN_LANGUAGE_LIST = ['en', 'en-US', 'en_UK'];
const LANGUAGE_ITEMS = [
  { id: 'en', text: EN_TEXT },
  { id: 'zh', text: ZH_TEXT },
];

const LayoutHeader: React.FC = () => {
  const { t,  i18n } = useTranslation();
  const [displayName, setDisplayName] = useState('');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (ZH_LANGUAGE_LIST.includes(i18n.language)) {
      changeLanguage('zh');
    }
    if (EN_LANGUAGE_LIST.includes(i18n.language)) {
      changeLanguage('en');
    }
  }, []);

  useEffect(() => {
    setDisplayName(
      localStorage.getItem("user")||"DEMO"
    );
  }, []);

  return (
    <TopNavigation
      className="top-navigation"
      identity={{
        href: ROUTES.Home,
        title: t('top-header:subtitle') || '',
      }}
      utilities={[
        {
          type: 'menu-dropdown',
          text: ZH_LANGUAGE_LIST.includes(i18n.language) ? ZH_TEXT : EN_TEXT,
          title: 'Language',
          ariaLabel: 'settings',
          onItemClick: (item) => {
            changeLanguage(item.detail.id);
          },
          items:
            i18n.language === 'zh' ? LANGUAGE_ITEMS.reverse() : LANGUAGE_ITEMS,
        },
        {
          type: 'menu-dropdown',
          text: displayName,
          description: displayName,
          iconName: 'user-profile',
          items: [
            {
              id: 'support-group',
              // text: t('header.support') || '',
              items: [
                {
                  id: 'version',
                  text: t('top-header:version') || '',
                  href: buildCommitLink('v0.0.1'),
                },
                {
                  id: 'documentation',
                  text: t('top-header:doc') || '',
                  href: buildDocLink(i18n.language),
                }
              ],
            },
            { id: 'signout', text: t('top-header:signout') || '' },
          ],
          onItemClick: (item) => {
            if (item.detail.id === 'signout') {
              logout()
            }
          },
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: t('menu.search') || '',
        searchDismissIconAriaLabel: t('menu.closeSearch') || '',
        overflowMenuTriggerText: t('menu.more') || '',
        overflowMenuTitleText: t('menu.all') || '',
        overflowMenuBackIconAriaLabel: t('menu.back') || '',
        overflowMenuDismissIconAriaLabel: t('menu.closeMenu') || '',
      }}
    />
  );
};

export default LayoutHeader;
