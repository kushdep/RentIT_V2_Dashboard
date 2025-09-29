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

  if (!slug) {
    redirect("/dashboard/guests/history");
  }
  const data = await getGuestsData();
  if (!data.success) {
    return <>Something went wrong</>;
  }

  const { payload } = data;

  if (payload.length > 0) {
    let todayDateObj = new Date();
    todayDateObj.setHours(0, 0, 0, 0);
    let today = todayDateObj.getTime();
    const nextDayDate = new Date(today + 24 * 60 * 60 * 1000).getTime();
    if (slug[0] === "upcoming") {
      payload.forEach((loc:any) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          return nextDayDate <= bkngDate;
        });
        console.log("loc.bookings");
        console.log(loc.bookings);
      });
    } else if (slug[0] === "history") {
      console.log("In history");
      console.log(payload);
      payload.forEach((loc:any) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.end).getTime();
          return bkngDate <= today;
        });
      });
    }
  }

  let bookingsData: any = [];
  if (slug.length === 2) {
    const id = slug[1];
    bookingsData = payload.find((e: any) => {
      const locID = String(e._id);
      return locID === id;
    });
  }

  return (
    <>
      {slug.length === 1 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-4 p-2 my-4 w-full">
          {slug[0] === "upcoming" ? (
            payload.length === 0 ? (
              <>No Data</>
            ) : (
              payload.map((e: any, i: number) => {
                const data: PropertyCardDataType = {
                  _id: e._id,
                  type: e.locType,
                  title: e.locDtl.title,
                  image: e.locDtl.imgTtlData[0].images[0].url,
                  price: e.bookings.length,
                  address: e.locDtl.location.address,
                  reviews: e.locDtl.reviews.length,
                  bookings: e.bookings.length,
                };
                return (
                  <GuestsCardData
                    key={i}
                    loc={data}
                    gstType={"upcoming"}
                    redtLink={"/dashboard/guests/upcoming/"}
                  />
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
                  bookings: e.locDtl.bookings,
                };
                return (
                  <GuestsCardData
                    key={i}
                    loc={data}
                    gstType={"history"}
                    redtLink={"/dashboard/guests/history/"}
                  />
                );
              })
            )
          ) : (
            <>NO Data to show</>
          )}
        </div>
      ) : slug.length === 2 &&
        bookingsData &&
        bookingsData.bookings.length !== 0 ? (
        slug[0] === "upcoming" ? (
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mx-4 my-4">
            {bookingsData.bookings.map((p: any, i: number) => {
              const totalAmt = p.bookingDetails.payment.amount / 100;
              const data = {
                start: new Date(p.start).toDateString(),
                end: new Date(p.end).toDateString(),
                username: p.bookingDetails.user.username,
                email: p.bookingDetails.user.email,
                totalAmt,
                totalGuests: p.bookingDetails.totalGuests,
                stayDuration: p.bookingDetails.stayDuration,
              };
              return <UpcomingGuestData key={i} bkngData={data} />;
            })}
          </div>
        ) : (
          <div className="w-full">
            <GuestsDataTable bkngData={bookingsData} />
          </div>
        )
      ) : (
        <h1>No data</h1>
      )}
    </>
  );
}

export default UpcomingGuestsPage;
