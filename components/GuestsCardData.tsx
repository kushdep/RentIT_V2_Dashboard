import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCardDataType } from "@/dataInterfaces";
import Link from "next/link";

const GuestsCardData = ({
  loc,
  gstType,
}: {
  loc: PropertyCardDataType;
  gstType: string;
}) => {
  return (
    <Link href={`/dashboard/guests/${gstType}/${loc._id}`}>
      <Card className="before:bg-primary/70 relative max-w-md py-0 before:absolute before:size-full before:rounded-xl">
        <CardContent className="px-0">
          <img
            src={`${loc.image}`}
            alt="Banner"
            className="h-70 w-112 rounded-xl"
          />
        </CardContent>
        <div className="absolute">
          <CardHeader className="text-primary-foreground w-full pt-6">
            <CardTitle>{loc.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-primary-foreground/80">
            {loc.address}
          </CardContent>
          <CardHeader className="text-primary-foreground w-full pt-6">
            <CardTitle>Upcoming Guests : </CardTitle>
            {loc.price > 1 ? `${loc.price} Bookings` : `${loc.price} Booking`}
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
};

export default GuestsCardData;
