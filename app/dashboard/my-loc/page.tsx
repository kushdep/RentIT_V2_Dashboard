import { getUserLocs } from "@/actions/LocationAction";
import PropertyCard from "@/components/PropertyCard";

async function MyLocPage() {
  const { payload } = await getUserLocs();

  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4 my-4 mx-4">
      {payload!.map((l: any) => {
        return <PropertyCard loc={l} />;
      })}
    </div>
  );
}

export default MyLocPage;
