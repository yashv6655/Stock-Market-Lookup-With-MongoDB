import React from "react";
import Item from "./Item";
import { MdDelete } from "react-icons/md";

export default function List({
  expenses,
  handleEdit,
  handleDelete,
  clearItems,
}) {
  return (
    <>
      <ul className="list">
        {expenses.map((item) => {
          return (
            <Item
              key={item.id}
              expense={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn-calc" onClick={clearItems}>
          Clear
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
}
