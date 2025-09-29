"use client";

import Image from "next/image";
import { EditIcon, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { AuthResponse, PropertyCardDataType } from "@/dataInterfaces";
import ConfirmationDialog from "./modals/ConfirmationDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { delLocationAction } from "@/actions/LocationAction";
import toast from "react-hot-toast";

const propertyCard = ({ loc }: { loc: PropertyCardDataType }) => {
  const router = useRouter();
  async function delLoc() {
    console.log("delete location");
    const res: AuthResponse = await delLocationAction(loc._id);
    console.log(res);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
  }
  return (
    <div className="relative max-w-md">
      <div className="relative h-50 w-full">
        <Image
          src={`${loc.image}`}
          alt={`${loc.title}`}
          fill
          className="object-cover rounded-xl shadow-lg"
          priority
        />
      </div>
      <Link href={`http://localhost:5173/rent-locs/${loc._id}`} target="_blank">
        <Button
          size="icon"
          className="bg-primary/50 hover:bg-primary/70 absolute end-4 top-4 rounded-full"
        >
          <Link2 />
        </Button>
      </Link>

      <Card className="relative -mt-6 rounded-xl shadow-xl bg-white">
        <CardHeader className="grid-cols-2 gap-4">
          <div className="">
            <CardTitle>{loc.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="outline">{loc.type}</Badge>
              <Badge variant="outline">{loc.reviews} reviews</Badge>
            </CardDescription>
          </div>
          <div className="text-end">
            <span className="text-xl font-semibold">$ {loc.price}</span>
          </div>
        </CardHeader>
        <CardContent className=" ">
          <p>{loc.address}</p>
        </CardContent>

        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
          <Link href={`/dashboard/edit-loc/${loc._id}`} target="_blank">
            <Button
              className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]"
              onClick={() => router.push(`/dashboard/edit-loc/${loc._id}`)}
            >
              <EditIcon />
              Edit
            </Button>
          </Link>
          <ConfirmationDialog
            action={delLoc}
            btnTtl="Are you absolutely sure you want to delete?"
            btnDesc="This action cannot be undone. This will permanently delete Location"
            btnLbl="Delete"
            btnClss="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-white"
          >
              <EditIcon />
              Edit
          </ConfirmationDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default propertyCard;
