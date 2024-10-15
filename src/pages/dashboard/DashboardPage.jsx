import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLayoutStore from 'src/stores/layoutStore';

const DashboardPage = () => {
  const themeConfig = useLayoutStore((state) => state);
  const { setPageTitle, handleToggleSidebar } = themeConfig;

  useEffect(() => {
    setPageTitle('POS Dashboard');
    handleToggleSidebar(true);
  }, [handleToggleSidebar, setPageTitle]);
  const [step, setStep] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const tables = [
    { id: 1, status: 'available', seats: 2, features: ['window', 'power outlet'] },
    { id: 2, status: 'occupied', seats: 4, features: ['corner', 'power outlet'] },
    { id: 3, status: 'available', seats: 2, features: ['bar'] },
    { id: 4, status: 'available', seats: 6, features: ['large group', 'power outlet'] },
    { id: 5, status: 'occupied', seats: 2, features: ['quiet area'] },
    { id: 6, status: 'available', seats: 4, features: ['outdoor', 'smoking allowed'] },
  ];

  const menuItems = [
    { id: 1, name: 'Espresso', price: 3.5, category: 'drinks' },
    { id: 2, name: 'Cappuccino', price: 4.5, category: 'drinks' },
    { id: 3, name: 'Latte', price: 4.0, category: 'drinks' },
    { id: 4, name: 'Croissant', price: 2.5, category: 'pastries' },
    { id: 5, name: 'Chocolate Muffin', price: 3.0, category: 'pastries' },
    { id: 6, name: 'Ham & Cheese Sandwich', price: 5.5, category: 'sandwiches' },
  ];

  const handleTableSelect = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    if (table.status === 'available') {
      setSelectedTable(tableId);
      setStep(2);
    } else {
      alert('This table is already occupied. Please choose another one.');
    }
  };

  const handleAddItem = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        )
      );
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
    setTotal(total + item.price);
  };

  const handleRemoveItem = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem.quantity === 1) {
      setOrder(order.filter((orderItem) => orderItem.id !== item.id));
    } else {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem
        )
      );
    }
    setTotal(total - item.price);
  };

  const handlePayment = (method) => {
    alert(`Payment of $${total.toFixed(2)} processed successfully via ${method}`);
    setStep(1);
    setSelectedTable(null);
    setOrder([]);
    setTotal(0);
  };

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case 'window':
        return;
      case 'power outlet':
        return;
      case 'smoking allowed':
        return;
      default:
        return null;
    }
  };
  return (
    <div className={`${themeConfig.animation} p-6 animate__animated`}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Select a Table</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tables.map((table) => (
                <motion.div
                  key={table.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg ${
                    table.status === 'available' ? 'bg-green-100' : 'bg-red-100'
                  } cursor-pointer`}
                  onClick={() => handleTableSelect(table.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Table {table.id}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        table.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                      } text-white`}
                    >
                      {table.status}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {/* <FaChair className="mr-2" /> */}
                    <span>{table.seats} seats</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {table.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-xs"
                      >
                        {getFeatureIcon(feature)}
                        <span className="ml-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Select Food Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAddItem(item)}
                    >
                      Add
                    </button>
                    <span className="text-gray-700">
                      {(order.find((orderItem) => orderItem.id === item.id) || {}).quantity || 0}
                    </span>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveItem(item)}
                      disabled={!order.find((orderItem) => orderItem.id === item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setStep(3)}
                disabled={order.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Payment</h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              {order.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 mt-2 pt-2 font-semibold">
                Total: ${total.toFixed(2)}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center"
                onClick={() => handlePayment('Credit Card')}
              >
                Credit Card
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center"
                onClick={() => handlePayment('Cash')}
              >
                Cash
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-white p-4 rounded-lg flex items-center justify-center"
                onClick={() => handlePayment('Mobile Payment')}
              >
                Mobile Payment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
