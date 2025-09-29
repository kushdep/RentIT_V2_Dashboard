import { getGuestsData } from "@/actions/GuestsActions";
import GuestsAvailData from "@/components/GuestsAvailData";
import { redirect } from "next/navigation";

async function ManageGuests({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug) {
    redirect("/dashboard/manage-guests/guests-today");
  }
  const data = await getGuestsData();
  if (!data.success) {
    return <>Something went wrong</>;
  }
  
  const { payload } = data;

  if (payload.length > 0) {
    const today = new Date(new Date().toISOString().slice(0, 10)).getTime();
    if (slug[0] === "guests-today") {
      payload.forEach((loc:any) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          return today === bkngDate && loc.bookings.chechIn;
        });
      });
    } else if (slug[0] === "check-in") {
      payload.forEach((loc:any) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          if(today === bkngDate){
            console.log(bkngDate)
            console.log(today)
          }
          return bkngDate === today && !loc.bookings.checkIn;
        });
      });
    }
  }

  console.log(payload)


  return (
    <>
      {
        <div className="grid grid-cols-3 gap-x-4 gap-y-4 p-2 my-4 w-full">
          {slug[0] === "check-in" ? (
            payload.length === 0 ? (
              <>No Data</>
            ) : (
              payload.map((e: any, i: number) => {
                let guestsToday ={}
                console.log(e)
                if(e.bookings.length===1){
                  console.log("e.bookings")
                  console.log(e.bookings)
                  const {bookingDetails} = e.bookings[0]
                  console.log("bookingDetails")
                  console.log(bookingDetails)
                  guestsToday = {
                    bookingId:String(bookingDetails._id),
                    username:bookingDetails.user.username,
                    stayDuration:bookingDetails.stayDuration,
                    totalGuests:bookingDetails.totalGuests
                  }
                }
                const data = {
                  _id: e._id,
                  type: e.locType,
                  title: e.locDtl.title,
                  image: e.locDtl.imgTtlData[0].images[0].url,
                  price: e.bookings.length,
                  address: e.locDtl.location.address,
                  reviews: e.locDtl.reviews.length,
                  guestsToday:guestsToday
                };
                console.log(data)
                return (
                  <GuestsAvailData key={i} gstData={data} mgType={"check-in"}/>
                );
              })
            )
          ) : slug[0] === "guests-today" ? (
            payload.length === 0 ? (
              <>No Data</>
            ) : (
              payload.map((e: any, i: number) => {
                let guestsToday ={}
                if(e.bookings.length===1){
                  const {bookingDetails} = payload.bookings
                  guestsToday = {
                    bookingId:bookingDetails._id,
                    username:bookingDetails.user.username,
                    stayDuration:bookingDetails.staDuration,
                    totalGuests:bookingDetails.totalGuests,
                    checkIn:bookingDetails.checkIn
                  }
                }
                const data = {
                  _id: e._id,
                  type: e.locType,
                  title: e.locDtl.title,
                  image: e.locDtl.imgTtlData[0].images[0].url,
                  price: e.locDtl.price,
                  address: e.locDtl.location.address,
                  reviews: e.locDtl.reviews.length,
                  guestsToday:guestsToday
                };
                return (
                  <GuestsAvailData key={i} gstData={data} mgType={"guests-today"}/>
                );
              })
            )
          ) : (
            <>NO Data to show</>
          )}
        </div>
      }
    </>
  );
}

export default ManageGuests;
