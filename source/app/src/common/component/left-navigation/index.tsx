import {
  SideNavigation,
  SideNavigationProps,
} from '@cloudscape-design/components';
import React from 'react';

import './style.scss';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'common/constants';


interface INavigationProps {
  activeHref: string;
}

const Navigation: React.FC<INavigationProps> = (props: INavigationProps) => {
  const { activeHref } = props;
  const { t } = useTranslation();
  const navHeader = { text: t('left-navi:title'), href: ROUTES.Home };
  const navItems: SideNavigationProps.Item[] = [
    {
      type: 'section',
      text: t('left-navi:summary'),
      items: [
        { type: 'link', text: t('left-navi:dashboard'), href: ROUTES.Home }
      ],
    },

    {
      type: 'section',
      text: t('left-navi:integration'),
      items: [
        {
          type: 'link',
          text: t('left-navi:model'),
          href: ROUTES.Model,
        }
      ],
    },
    {
      type: 'section',
      text: t('left-navi:app'),
      items: [
        {
          type: 'link',
          text: t('left-navi:config-play'),
          href: ROUTES.App,
        }
      ],
    },
    {
      type: 'section',
      text: t('left-navi:analysis'),
      items: [
        {
          type: 'link',
          text: t('left-navi:log'),
          href: ROUTES.Log,
        },
        {
          type: 'link',
          text: t('left-navi:bill'),
          href: ROUTES.Bill,
        },
        {
          type: 'link',
          text: t('left-navi:limit'),
          href: ROUTES.Bill,
        }
      ],
    }
    // {
    //   type: 'link',
    //   text: t('left-navi:version'),
    //   href: RouterEnum.TimeLine.path,
    //   info: <Badge>{configData.version}</Badge>
    // },
  ];
  return (
    <>
      <SideNavigation
        header={navHeader}
        items={navItems}
        activeHref={activeHref}
        className="side-nav"
      />
    </>
  );
};

export default Navigation;
