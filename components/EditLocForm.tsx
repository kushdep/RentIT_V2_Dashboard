"use client";

import { getLocDetail } from "@/actions/LocationAction";
import AddLocForm from "@/components/AddLocForm";
import { useAddLoc } from "@/context/addLocContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

function EditLocForm() {
  const { id } = useParams();
  const {populateLocStt} = useAddLoc();

  useEffect(() => {
    async function updEditLocStt() {
      const res = await getLocDetail(id as string);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      populateLocStt(res.payload)
    }
    updEditLocStt()
  }, []);

  return (
    <>
        <AddLocForm />
    </>
  );
}

export default EditLocForm;
