import { TrashIcon, TriangleAlertIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { delLocationAction } from "@/actions/LocationAction";
import { AuthResponse } from "@/dataInterfaces";
import toast from "react-hot-toast";

const ConfirmationDialog = ({id}: {id:string}) => {
  async function delLoc(){
    console.log("delete location")
    console.log(id)
    const res:AuthResponse = await delLocationAction(id)
    console.log(res)
    if(!res.success){
      toast.error(res.message)
      return 
    }
    toast.success(res.message)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]"
      >
        <Button variant="outline">
          <TrashIcon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. This will permanently delete Location
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white" onClick={delLoc}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
