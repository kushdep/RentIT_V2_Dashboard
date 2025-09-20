import { getUserLocs } from "@/actions/LocationAction";
import PropertyCard from "@/components/PropertyCard";
import { PropertyCardDataType } from "@/dataInterfaces";

async function MyLocPage() {
  const { payload } = await getUserLocs();
  console.log(payload)
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4 my-4 mx-4">
      {payload!.map((l: PropertyCardDataType,i:number) => {
        console.log(l.image)
        return <PropertyCard key={i} loc={l} />;
      })}
    </div>
  );
}

export default MyLocPage;
