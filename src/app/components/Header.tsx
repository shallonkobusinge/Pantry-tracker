import React from "react";

export default function Header() {
  return (
    <div className="flex opacity-[0.9] w-2/4 justify-center gap-3 justify-around items-center mx-auto h-12 mb-2">
      <h1>No</h1>
      <h1 className="w-1/3">Name</h1>
      <h1 className="">Quantity</h1>
      <div className="w-36">
        <h1>Action</h1>
      </div>
    </div>
  );
}
