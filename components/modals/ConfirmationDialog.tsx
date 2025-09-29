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

const ConfirmationDialog = ({
  action,
  btnTtl,
  btnDesc,
  btnLbl,
  btnClss,
  isDisable,
  children,
}: {
  btnTtl: string;
  btnDesc?: string;
  action: Function;
  btnLbl: string;
  btnClss: string;
  isDisable?: boolean;
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className={btnClss}
        disabled={isDisable ?? false}
      >
        <Button variant="outline">{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="items-center">
          <div className="bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
            <TriangleAlertIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle>{btnTtl}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {btnDesc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className={btnClss} onClick={() => action()}>
            {btnLbl}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
