import React, { useEffect, useState } from 'react';
import { useTable } from "react-table";
import './UserTable.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const API = 'http://127.0.0.1:8000/account/user/'

const UserTable = () => {

    const [usersData, setUsersData] = useState([]);

    const token = Cookies.get('token')

    // const fetchUsers =  async (url) => {
    //     try {
    //         const res = await axios.get(url, {
    //             headers: {
    //               Authorization: `Bearer ${token}`
    //             }}) 
    //             console.log(res.data);  
    //             const {data} = res;
    //             setUsersData(...usersData, data)
    //             console.log(usersData);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        axios.get(API, {
            headers: {
              Authorization: `Bearer ${token}`
            }}).then(response => {
              setUsersData(response.data)
            })           
    }, [])

    

    
  const data = React.useMemo(() => usersData, [usersData]);
  console.log(data)
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Email",
        accessor: "user.email"
      },
      {
        Header: "First Name",
        accessor: "user.first_name",
      },
      {
        Header: "Last Name",
        accessor: "user.last_name",
      },
      {
        Header: "Admin Permissions",
        accessor: "user.is_admin",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Mode",
        accessor: "user_mode",
      },
      {
        Header: "Allowance Boost",
        accessor: "allowance_boost",
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });


  return (
   
    <div>
    <div className="containerTb">
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
    </div>
  )
}

export default UserTable