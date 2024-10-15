import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MAPPED_STATUS_TOOLTIP_COLOR } from 'src/constants/status';
import { PAGE_SIZES } from 'src/constants/common';
import { SearchForm } from './components/SearchForm';
import { getListTable } from 'src/apis/table/table';

import sortBy from 'lodash/sortBy';
import IconTrashLines from 'src/components/icon/IconTrashLines';
import IconEdit from 'src/components/icon/IconEdit';
import IconEye from 'src/components/icon/IconEye';
import useLayoutStore from 'src/stores/layoutStore';

const TableListPage = () => {
  const themeConfig = useLayoutStore((state) => state);

  const { setPageTitle } = themeConfig;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'firstName',
    direction: 'asc',
  });

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(items, 'table'));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const fetchItems = async (dataFetch = {}) => {
    try {
      const list = await getListTable({ params: {} });
      setItems(list);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    console.log(e);
    // fetchItems({ search });
  };

  const deleteRow = (id = null) => {
    if (window.confirm('Are you sure want to delete selected row ?')) {
      if (id) {
        setRecords(items.filter((item) => item.id !== id));
        setInitialRecords(items.filter((item) => item.id !== id));
        setItems(items.filter((item) => item.id !== id));
        setSearch('');
        setSelectedRecords([]);
      } else {
        let selectedRows = selectedRecords || [];
        const ids = selectedRows.map((d) => {
          return d.id;
        });
        const result = items.filter((d) => !ids.includes(d.id));
        setRecords(result);
        setInitialRecords(result);
        setItems(result);
        setSearch('');
        setSelectedRecords([]);
        setPage(1);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    setPageTitle('Table List');
  }, [setPageTitle]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return items.filter((item) => {
        return (
          item.id.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.code.toLowerCase().includes(search.toLowerCase()) ||
          item.status.includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
    setPage(1);
  }, [sortStatus]);

  const columns = [
    {
      accessor: 'id',
      sortable: true,
      render: ({ id }) => (
        <div className="text-primary underline hover:no-underline font-semibold">{`#${id}`}</div>
      ),
    },
    {
      accessor: 'name',
      sortable: true,
      render: ({ name, id }) => (
        <div className="flex items-center font-semibold">
          <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={`/assets/images/profile-${id}.jpeg`}
              alt=""
            />
          </div>
          <div>{name}</div>
        </div>
      ),
    },
    {
      accessor: 'code',
      sortable: true,
    },
    {
      accessor: 'status',
      sortable: true,
      render: ({ status }) => {
        const statusMapped = MAPPED_STATUS_TOOLTIP_COLOR[status];
        return <div className={`badge badge-${statusMapped.color} `}>{statusMapped.name}</div>;
      },
    },
    {
      accessor: 'action',
      title: 'Actions',
      sortable: false,
      textAlignment: 'center',
      render: ({ id }) => (
        <div className="flex gap-4 items-center w-max mx-auto">
          <NavLink to="/apps/table/edit" className="flex hover:text-info">
            <IconEdit className="w-4.5 h-4.5" />
          </NavLink>
          <NavLink to="/apps/table/preview" className="flex hover:text-primary">
            <IconEye />
          </NavLink>
          {/* <NavLink to="" className="flex"> */}
          <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
            <IconTrashLines />
          </button>
          {/* </NavLink> */}
        </div>
      ),
    },
  ];

  return (
    <div
      className={`px-0 border-white-light dark:border-[#1b2e4b] ${themeConfig.animation} p-6 animate__animated`}
    >
      <div className="panel mx-4 gap-4 my-4">
        <SearchForm handleSearchForm={handleSearchForm} deleteRow={deleteRow} />
      </div>
      <div className="panel table-table">
        <div className="datatables pagination-padding px-2"></div>
      </div>
    </div>
  );
};

export default TableListPage;
