import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Progressive_Bar_List_View from '../components/Projects/progressive_bar_list_view';
import useCheckUser from '../components/Users/checkuser'

const Progressive_Bar_ListPage = () => {
  const { isValidUser, error } = useCheckUser();

  if (isValidUser === null) {
    return <p>Loading...</p>;
  }

  if (!isValidUser) {
    return <p>Redirecting to login...</p>;
  }

  if (isValidUser) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <Progressive_Bar_List_View />
      </div>
    )
  }
  else {
    return alert("Session Out LogIn again");
  }
}

export default Progressive_Bar_ListPage
