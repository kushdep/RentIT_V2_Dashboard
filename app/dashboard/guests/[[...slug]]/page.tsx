import { getGuestsData } from "@/actions/GuestsActions";
import { TableDemo } from "@/components/GuestDataTable";
import PropertyCard from "@/components/PropertyCard";
import SelectWithOptionsGroupsDemo from "@/components/SelectSCS";
import { PropertyCardDataType } from "@/dataInterfaces";
import { redirect } from "next/navigation";

async function UpcomingGuestsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length === 0) {
    redirect("/guests/history");
  }

  const data = await getGuestsData();
  if (!data.success) {
    return <>Something went wrong</>;
  }

  const { payload } = data;
  let upBookingList = [];
  let histBookingList = [];

  if(payload.length>0 && slug.length===1){

  }

  if (payload.length > 0) {
    const today = new Date().getTime();
    const nextDayDate = new Date(today + 24 * 60 * 60 * 1000).getTime();
    if (slug[0] === "upcoming") {
      upBookingList = payload.filter((e: any) => {
        const bkngDate = new Date(e.bookings.start).getTime();
        return nextDayDate <= bkngDate;
      });
    } else if (slug[0] === "history") {
      histBookingList = payload.filter((e: any) => {
        const bkngDate = new Date(e.bookings.end).getTime();
        return bkngDate < today;
      });
    }
  }


  return (
    <>
      <div className="flex-row-1 my-4 mx-4 border">
        <SelectWithOptionsGroupsDemo />
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-4 border">
        {
            slug.length===1 ? (slug[0]==='upcoming' ?
                (upBookingList.length===0?
                <>No Data</>
                :
                upBookingList.map((e:any)=>{
                const data:PropertyCardDataType ={
                    _id:e._id,
                    type:e.locType,
                    title:e.locDtl.title,
                    image:e.locDtl.imgTtlData.images[0].url,
                    price:e.locDtl.price,
                    address:e.locDtl.location.address,
                    reviews:e.locDtl.reviews.length
                } 
                return <PropertyCard loc={data}/>}))
                :
                (slug[0]==='history'?
                (histBookingList.length===0?
                <>No Data</>
                :
                histBookingList.map((e:any)=>{
                const data:PropertyCardDataType ={
                    _id:e._id,
                    type:e.locType,
                    title:e.locDtl.title,
                    image:e.locDtl.imgTtlData.images[0].url,
                    price:e.locDtl.price,
                    address:e.locDtl.location.address,
                    reviews:e.locDtl.reviews.length
                } 
                return <PropertyCard loc={data}/>}))
                :
                <>NO Data to show</>))
                :
                <TableDemo/>
        }
      </div>
    </>
  );
}

export default UpcomingGuestsPage;
