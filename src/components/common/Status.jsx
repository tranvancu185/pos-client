import React from 'react';
import { useTranslation } from 'react-i18next';
import { MAPPED_STATUS_TOOLTIP_COLOR } from 'src/constants/status';

const Status = ({ status }) => {
  const { t } = useTranslation();
  console.log(MAPPED_STATUS_TOOLTIP_COLOR[status]);
  return (
    <div
      className={`whitespace-nowrap text-${MAPPED_STATUS_TOOLTIP_COLOR[status]?.color ?? 'gray-500'}`}>
      {t(MAPPED_STATUS_TOOLTIP_COLOR[status]?.name ?? 'N/A')}
    </div>
    // <span className={`badge badge-outline-${MAPPED_STATUS_TOOLTIP_COLOR[status]?.color ?? "default"}`}>
    //     {t(MAPPED_STATUS_TOOLTIP_COLOR[status]?.name ?? "N/A")}
    // </span>
  );
};

export default Status;
