import { useEffect } from 'react';
import useLayoutStore from 'src/stores/layoutStore';

const DashboardPage = () => {
  const themeConfig = useLayoutStore((state) => state);
  const { setPageTitle, handleToggleSidebar } = themeConfig;

  useEffect(() => {
    setPageTitle('POS Dashboard');
    handleToggleSidebar(true);
  }, [handleToggleSidebar, setPageTitle]);
  const features = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    {
      name: 'Material',
      description: 'Solid walnut base with rare earth magnets and powder coated steel card cover',
    },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
    { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    {
      name: 'Considerations',
      description: 'Made from natural materials. Grain and color vary with each item.',
    },
  ];
  return (
    <div className={`${themeConfig.animation} p-6 animate__animated`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="">Hello</div>
      </div>
    </div>
  );
};

export default DashboardPage;
