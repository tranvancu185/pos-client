import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import IconTrashLines from 'src/components/icon/IconTrashLines';
import IconPlus from 'src/components/icon/IconPlus';
import IconEdit from 'src/components/icon/IconEdit';
import IconEye from 'src/components/icon/IconEye';
import useLayoutStore from 'src/stores/layoutStore';
import { PAGE_SIZES } from 'src/constants/common';
import { DataTable } from 'mantine-datatable';
import Select from 'react-select';

const MenuListPage = () => {
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
  const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const deleteRow = (id = null) => {
    if (window.confirm('Are you sure want to delete selected row ?')) {
      if (id) {
        setRecords(items.filter((user) => user.id !== id));
        setInitialRecords(items.filter((user) => user.id !== id));
        setItems(items.filter((user) => user.id !== id));
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

  const fetchItems = async (dataFetch = {}) => {
    try {
      const response = await window.api.getListTable(dataFetch);
      console.log('Menu List:', response);
      setItems(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    setPageTitle('Menu');
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
          item.invoice.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.date.toLowerCase().includes(search.toLowerCase()) ||
          item.amount.toLowerCase().includes(search.toLowerCase()) ||
          item.status.tooltip.toLowerCase().includes(search.toLowerCase())
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
      accessor: 'invoice',
      sortable: true,
      render: ({ invoice }) => (
        <NavLink to="/apps/invoice/preview">
          <div className="text-primary underline hover:no-underline font-semibold">{`#${invoice}`}</div>
        </NavLink>
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
      accessor: 'email',
      sortable: true,
    },
    {
      accessor: 'date',
      sortable: true,
    },
    {
      accessor: 'amount',
      sortable: true,
      titleClassName: 'text-right',
      render: ({ amount, id }) => <div className="text-right font-semibold">{`$${amount}`}</div>,
    },
    {
      accessor: 'status',
      sortable: true,
      render: ({ status }) => (
        <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>
      ),
    },
    {
      accessor: 'action',
      title: 'Actions',
      sortable: false,
      textAlignment: 'center',
      render: ({ id }) => (
        <div className="flex gap-4 items-center w-max mx-auto">
          <NavLink to="/apps/invoice/edit" className="flex hover:text-info">
            <IconEdit className="w-4.5 h-4.5" />
          </NavLink>
          <NavLink to="/apps/invoice/preview" className="flex hover:text-primary">
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
      className={`border-white-light dark:border-[#1b2e4b] ${themeConfig.animation} p-6 animate__animated`}
    >
      <div className="invoice-table">
        <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
              <IconTrashLines />
              Delete
            </button>
            <Link to="/apps/invoice/add" className="btn btn-primary gap-2">
              <IconPlus />
              Add New
            </Link>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="datatables pagination-padding px-2">
          <DataTable
            className="whitespace-nowrap table-hover invoice-table"
            records={records}
            columns={columns}
            highlightOnHover
            totalRecords={initialRecords.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            paginationText={({ from, to, totalRecords }) =>
              `Showing  ${from} to ${to} of ${totalRecords} entries`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MenuListPage;
