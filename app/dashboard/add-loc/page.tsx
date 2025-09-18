"use client";

import AddLocForm from "@/components/AddLocForm";
import { AddLocProvider } from "@/context/addLocContext";

function AddLocPage() {

  return <>
    <AddLocProvider>
      <AddLocForm/>
    </AddLocProvider>
  </>
}

export default AddLocPage;
