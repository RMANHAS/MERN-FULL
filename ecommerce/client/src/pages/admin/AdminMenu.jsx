import React from "react";
import { NavLink } from "react-router-dom";

export default function () {
  return (
    <>
      <div className="list-group">
        <h3 className="text-center"> Admin Panel</h3>
        <NavLink
          to="/dashboard/create-category"
          className="list-group-item list-group-item-action "
          aria-current="true"
        >
          Create Category
        </NavLink>

        <NavLink
          to="/dashboard/update-product/:_id"
          className="list-group-item list-group-item-action"
        >
         Update Product
        </NavLink>

        <NavLink
          to="/dashboard/create-product"
          className="list-group-item list-group-item-action"
        >
          Product
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className="list-group-item list-group-item-action"
        >
         All-Product
        </NavLink>


        <NavLink
          to="/dashboard/users"
          className="list-group-item list-group-item-action"
        >
          users
        </NavLink>
      </div>
    </>
  );
}
