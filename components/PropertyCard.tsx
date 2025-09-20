import Image from "next/image";
import { EditIcon, TrashIcon } from "lucide-react";
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
import { PropertyCardDataType } from "@/dataInterfaces";

const propertyCard = ({ loc }: { loc: PropertyCardDataType }) => {
  console.log(loc);
  console.log("image " + loc.image);
  
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
          <Button className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]">
            <EditIcon />
            Edit
          </Button>
          <Button className="from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]">
            <TrashIcon />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default propertyCard;
