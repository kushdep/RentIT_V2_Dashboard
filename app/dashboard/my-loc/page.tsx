import { getUpcomingGuests } from "@/actions/GuestsActions";
import { getUserLocs } from "@/actions/LocationAction";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { PropertyCardDataType } from "@/dataInterfaces";
import Link from "next/link";

async function MyLocPage() {
  const { payload } = await getUserLocs();
  console.log(payload);
  let locDetails = payload!==undefined ? JSON.parse(payload) : null


  async function getGuest(){
    await getUpcomingGuests()

  }

  getGuest()

  return ( 
    <>
      {locDetails!==null ? (
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 my-4 mx-4">
          {locDetails!.map((l: PropertyCardDataType, i: number) => {
            console.log(l.image);
            return <PropertyCard key={i} loc={l} />;
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="text-center">
            <img src={"/images/empty-folder.png"} className="" />
             <Link href="/dashboard/add-loc">
              <Button>Add Location</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default MyLocPage;
