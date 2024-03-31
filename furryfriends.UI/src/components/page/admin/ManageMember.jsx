import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "../../navbaradmin/Navbaradmin";
import ManageMemberCSS from './ManageMember.module.css';
import Cookies from 'js-cookie';



export default function ManageMember() {
  const [users, setUsers] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
const [currentData, setCurrentData] = useState([]);
const itemsPerPage = 7;

useEffect(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = users.slice(startIndex, endIndex);
  setCurrentData(pageData);
}, [users, currentPage]);


const nextPage = () => {
  if (currentPage * itemsPerPage < users.length) {
    setCurrentPage(currentPage + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  useEffect(() => {
    loadUsers();
  }, []);
  

  const jwtToken = Cookies.get('jwtToken');
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${jwtToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );


  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/user/staff");
    setUsers(result.data);
  };


  const deleteUser = async (id) => {

    try {
      await axios.delete(`http://localhost:8080/api/v1/user/staff/${id}`).then((res) => {
        console.log(res.data);
        if (res.data == "deleted") {
          loadUsers();
        }
        else if (res.data == "not exist") {
          loadUsers();
        }

      }, fail => {
        console.error(fail); // Error!
      });
    }
    catch (err) {
      alert(err);
    }

  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  return (
    <div className={ManageMemberCSS["container"]}>
      <Navbar />
      <div className={ManageMemberCSS["py-4"]}>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">MemberID</th>
              <th scope="col">Account</th>
              <th scope="col">email</th>
              <th scope="col">firstName</th>
              <th scope="col">lastName</th>
              <th scope="col">phone</th>
              <th scope="col">Address</th>
              <th scope="col">birth</th>
              <th scope="col">sex</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.user_id}</td>
                <td>{user.account}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.birth}</td>
                <td>{user.sex}</td>
                <td className={ManageMemberCSS['btnbutton']}>

                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmember/${user.user_id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      setSelectedUserId(user.user_id); // Lưu ID của người dùng sẽ bị xóa
                      openDeleteModal(); // Mở modal xác nhận
                    }}                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isDeleteModalOpen && ( // Render the modal if isDeleteModalOpen is true
          <div className={ManageMemberCSS["delete-modal"]}>
            <p>Bạn có chắc chắn muốn xóa?</p>
            <div  className={ManageMemberCSS["cancel-yes"]} >
            <button onClick={() => { deleteUser(selectedUserId); closeDeleteModal(); }}>
              Có
            </button>
            <button onClick={closeDeleteModal}>
              Không
            </button>
            </div>
          </div>
        )}
      </div>
      <div className={ManageMemberCSS['IntersectBox']}>
          <div className={ManageMemberCSS['box2']}>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={nextPage} disabled={currentPage * itemsPerPage >= users.length}>
              Next Page
            </button>
          </div>
        </div>
    </div>
  );
}