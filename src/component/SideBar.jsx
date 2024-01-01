import React from "react";

import ExpandIcon from "@mui/icons-material/Expand";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
const SideBar = () => {
  return (
    <div className="bg-white pt-[4rem] pb-[4rem] flex flex-col">
      <Link to="/" className="p-0 ">home</Link>
      <Link to="/admin/dashboard" className="opacity-60 p-[2rem]">
        <p className="flex items-center">
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link className="p-[2rem]">

        <TreeView
          defaultCollapseIcon={<ExpandIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products" className="opacity-60 p-[2rem]">
            <Link to="/admin/products" >
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon/>}/ >
            </Link>
            <Link to="/admin/newProduct">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon/>}/>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders" className="opacity-60 p-[2rem]">
        <p className="flex items-center gap-2">
        <ListAltIcon/>
        Orders
        </p>
        
      </Link>
      <Link to="/admin/users" className="opacity-60 p-[2rem]">
     <p className="flex items-center gap-2">
        <PeopleIcon/> Users
     </p >
      </Link>
      <Link to="/admin/reviews" className="opacity-60 p-[2rem] ">
        <p className="flex items-center gap-2">
            <RateReviewIcon />
            Reviews
        </p>
      </Link>
    </div>
  );
}

export default SideBar;
