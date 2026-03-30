import { BeatLoader } from "react-spinners";
import Table from "../../components/table/index.jsx";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ROUTES } from "../../constants/RoutesConst.js";
import {
  getVendors,
  approveVendor,
  disapproveVendor,
} from "../../service/Vendors.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./vendor.css";
import Breadcrumb from "../../components/breadcrumb/index.jsx";
import { VENDORS_BREADCRUMBS } from "../../constants/AppConst.js";

const VendorsList = () => {
  const [vendors, setVendors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const res = await getVendors();
      const vends = Object.values(res?.data?.vendors || {});
      setVendors(vends);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageData = vendors?.slice(offset, offset + itemsPerPage);
  const pageCount = vendors ? Math.ceil(vendors?.length / itemsPerPage) : 0;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatus = async (row) => {
    try {
      const isApproved = row?.status === "Approved";
      let res;

      if (isApproved) {
        res = await disapproveVendor(row?.user_id);
      } else {
        const formData = new FormData();
        formData.append("user_id", row?.user_id);
        formData.append("status", "approved");
        res = await approveVendor(formData);
      }

      if (res?.data?.response === "success") {
        toast.success(
          isApproved ? "Vendor Disapproved" : "Vendor Approved",
        );
        setVendors((prev) =>
          prev.map((vendor) =>
            vendor.user_id === row.user_id
              ? {
                  ...vendor,
                  status: isApproved ? "Disapproved" : "Approved",
                }
              : vendor,
          ),
        );
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      header: "S. No.",
      render: (row, rowIndex) => currentPage * itemsPerPage + rowIndex + 1,
    },
    {
      header: "First Name",
      render: (row) => row?.name?.split(" ")[0] || "",
    },
    {
      header: "Last Name",
      render: (row) => {
        const parts = row?.name?.split(" ") || [];
        return parts.length > 1 ? parts.slice(1).join(" ") : "";
      },
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Contact No.",
      accessor: "mobile",
    },
    {
      header: "Vendor Status",
      render: (row) => (
        <span
          className={`badge badge-pill ${
            row.status === "Approved" ? "badge-success" : "badge-danger"
          }`}
        >
          {row?.status?.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <button
          className={`fst-italic cursor-pointer ${
            row.status === "Approved" ? "text-danger" : "text-success"
          } button-unset `}
          onClick={() => handleStatus(row)}
        >
          {row.status === "Approved" ? "Disapprove" : "Approve"}
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <BeatLoader />
      </div>
    );
  return (
    <div className="d-flex flex-column pt-1 px-3">
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Vendors List</h5>
        <Breadcrumb items={VENDORS_BREADCRUMBS} />
      </div>
      <Table title={"Vendors"} data={currentPageData} columns={columns} />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default VendorsList;
