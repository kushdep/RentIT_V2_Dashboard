import { getGuestsData } from "@/actions/GuestsActions";
import UpcomingGuestData from "@/components/UpcomingGuestData";
import GuestsDataTable from "@/components/GuestsDataTable";
import GuestsCardData from "@/components/GuestsCardData";
import { PropertyCardDataType } from "@/dataInterfaces";
import { redirect } from "next/navigation";

async function UpcomingGuestsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  console.log(slug);
  if (!slug) {
    redirect("/dashboard/guests/history");
  }
  console.log(slug);
  const data = await getGuestsData();

  console.log(data);

  if (!data.success) {
    return <>Something went wrong</>;
  }

  const { payload } = data;
  console.log(payload);

  if (payload.length > 0) {
    const today = new Date().getTime();
    const nextDayDate = new Date(today + 24 * 60 * 60 * 1000).getTime();
    if (slug[0] === "upcoming") {
      payload.forEach((loc) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          return nextDayDate <= bkngDate;
        });
        console.log("loc.bookings");
        console.log(loc.bookings);
      });
    } else if (slug[0] === "history") {
      payload.forEach((loc) => {
        console.log(loc.bookings);
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.end).getTime();
          return bkngDate < today;
        });
      });
    }
  }

  let bookingsData: any = [];
  if (slug.length === 2) {
    const id = slug[1];
    console.log(id);
    bookingsData = payload.find((e: any) => {
      console.log(e._id);
      const locID = String(e._id);
      return locID === id;
    });
    console.log(bookingsData);
  }

  console.log(bookingsData);

  return (
    <>
      {slug.length === 1 ? (
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 mx-4 my-4 w-full">
          {slug[0] === "upcoming" ? (
            payload.length === 0 ? (
              <>No Data</>
            ) : (
              payload.map((e: any, i: number) => {
                console.log(e);
                const data: PropertyCardDataType = {
                  _id: e._id,
                  type: e.locType,
                  title: e.locDtl.title,
                  image: e.locDtl.imgTtlData[0].images[0].url,
                  price: e.bookings.length,
                  address: e.locDtl.location.address,
                  reviews: e.locDtl.reviews.length,
                };
                console.log(data);
                return (
                  <GuestsCardData key={i} loc={data} gstType={"upcoming"} />
                );
              })
            )
          ) : slug[0] === "history" ? (
            payload.length === 0 ? (
              <>No Data</>
            ) : (
              payload.map((e: any, i: number) => {
                const data: PropertyCardDataType = {
                  _id: e._id,
                  type: e.locType,
                  title: e.locDtl.title,
                  image: e.locDtl.imgTtlData[0].images[0].url,
                  price: e.locDtl.price,
                  address: e.locDtl.location.address,
                  reviews: e.locDtl.reviews.length,
                };
                return <GuestsCardData loc={data} gstType={"upcoming"} />;
              })
            )
          ) : (
            <>NO Data to show</>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mx-4 my-4">
          {slug.length === 2 &&
            bookingsData.bookings.map((p: any, i: number) => {
                console.log(p.bookingDetails)
                console.log(p.bookingDetails.totalGuests)
                console.log(p.bookingDetails.stayDuration)
                console.log(bookingsData.locDtl.price)
                const totalAmt = p.bookingDetails.payment.amount/100 
              const data = {
                start:new Date(p.start).toDateString(),
                end:new Date(p.end).toDateString(),
                username:p.bookingDetails.user.username,
                email:p.bookingDetails.user.email,
                totalAmt,
                totalGuests:p.bookingDetails.totalGuests,
                stayDuration:p.bookingDetails.stayDuration
              };
              console.log(data)
              if (slug[0] === "upcoming") {
                return <UpcomingGuestData key={i} bkngData={data} />;
              } else if (slug[0] === "upcoming") {
                return <GuestsDataTable key={i} bkngData={data} />;
              }
            })}
        </div>
      )}
    </>
  );
}

export default UpcomingGuestsPage;
