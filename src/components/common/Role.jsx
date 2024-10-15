import React from 'react';
import { useTranslation } from 'react-i18next';
import { MAPPED_ROLE_COLORS } from 'src/constants/role';

export const Role = ({ role_id }) => {
  const { t } = useTranslation();
  return (
    <div className={`whitespace-nowrap text-${MAPPED_ROLE_COLORS[role_id]?.color ?? 'gray-500'}`}>
      {t(MAPPED_ROLE_COLORS[role_id]?.name ?? 'N/A')}
    </div>
  );
};
