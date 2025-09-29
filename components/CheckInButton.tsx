'use client'

import { UserCheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { setCheckInTime } from "@/actions/GuestsActions";
import { redirect } from "next/navigation";

function CheckInButton({ id, isDisable }: { id: string; isDisable: boolean }) {
  
    async function handleCheckIn(){
        console.log(id)
        if(id===undefined || id===null){
            toast.error('Booking id Missing')
            return
        }
        const checkIntime = new Date()
        const res = await setCheckInTime(id,checkIntime)
        if(!res.success){
            toast.error(res.message)
            return
        }
        toast.success("Checked-in Successfully")
        redirect('/dashboard/manage-guests/guests-today')
    }
    return (
    <>
      <Button
        className="w-full bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20 dark:focus-visible:ring-green-400/40"
        disabled={isDisable}
        onClick={handleCheckIn}
      >
        <UserCheckIcon />
        Check-In
      </Button>
    </>
  );
}

export default CheckInButton;
