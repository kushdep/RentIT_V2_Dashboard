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

const propertyCard = ({
  loc,
}: {
  loc: {
    type: string;
    title: string;
    image: string;
    price: number;
    address: string;
    reviews: number;
  };
}) => {
  return (
    <div className="relative max-w-md">
      <div className="relative z-10 h-60 w-full">
        <Image
          src={`${loc.image}`}
          alt="Nike Jordan Air Rev"
          fill
          className="object-cover rounded-xl shadow-lg"
          priority
        />
      </div>

      <Card className="relative -mt-6 z-0 rounded-xl shadow-xl border bg-white">
        <CardHeader className="mt-3">
          <CardTitle>Nike Jordan Air Rev</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline">{loc.type}</Badge>
            <Badge variant="outline">{loc.reviews}</Badge>
          </CardDescription>
          <span className="text-xl font-semibold">$ {loc.price}</span>
        </CardHeader>

        <CardContent>
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
