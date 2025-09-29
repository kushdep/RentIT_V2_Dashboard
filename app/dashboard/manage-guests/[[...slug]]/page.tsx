import { getGuestsData } from "@/actions/GuestsActions";
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
    const today = new Date(new Date().toISOString().slice(0,10)).getTime();
    if (slug[0] === "guests-today") {
      payload.forEach((loc) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          return today === bkngDate;
        });
      });
    } else if (slug[0] === "check-in") {
      payload.forEach((loc) => {
        loc.bookings = loc.bookings.filter((e: any) => {
          const bkngDate = new Date(e.start).getTime();
          return bkngDate === today && !loc.bookings.checkIn;
        });
      });
    }
  }

 
  return <>
    {
        slug[0]==='manage-guests'
    }
  </>;
}

export default ManageGuests;
