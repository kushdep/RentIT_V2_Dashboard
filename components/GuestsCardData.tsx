import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCardDataType } from "@/dataInterfaces";
import Link from "next/link";

const GuestsCardData = ({
  loc,
  gstType,
  redtLink,
}: {
  loc: PropertyCardDataType;
  gstType: string;
  redtLink:string
}) => {
  console.log(loc)
  return (
    <Link href={`${redtLink}/${loc._id}`}>
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
          {gstType === "upcoming" && (
            <CardHeader className="text-primary-foreground w-full pt-6">
              <CardTitle>Upcoming Guests : </CardTitle>
              {loc.bookings! > 1
                ? `${loc.bookings} Bookings`
                : `${loc.bookings} Booking`}
            </CardHeader>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default GuestsCardData;
