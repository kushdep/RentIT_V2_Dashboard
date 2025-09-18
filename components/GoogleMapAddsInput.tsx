import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Button } from "@/components/ui/button";
import { useGoogleAutoComp } from "@/hooks/useGoogleAutoComp";
import { useState } from "react";
import { useAddLoc } from "@/context/addLocContext";
import { LocAddsType } from "@/dataInterfaces";

function GoogleMapAddsInput() {
  const { handleLocAddr } = useAddLoc();
  const { isLoaded, sugg, inpVal, handleInpVal } = useGoogleAutoComp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleSelect = async (address: string) => {
    const result = await getGeocode({ address });
    const { lat, lng } = getLatLng(result[0]);
    const { place_id, plus_code } = result[0];
    const location: LocAddsType = {
      address,
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
      placeId: place_id,
      plusCode: plus_code,
    };
    handleLocAddr(location);
  };

  return (
    <div className="grid grid-cols-4 gap-4 col-span-3">
      <div className="col-span-3">
        <Label htmlFor="address">Address</Label>
        <div className="relative w-full">
          <Input
            value={inpVal.val}
            disabled={!isLoaded}
            onChange={(e) => handleInpVal({ val: e.target.value, index: null })}
            id="address"
            type="text"
            name="address"
            placeholder="Search your location"
            className="w-full dropdown-toggle"
          />
          {sugg?.length > 0 && isDropdownOpen && (
            <ul
              className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto 
                   border border-gray-300 bg-white rounded-lg shadow-lg z-10 dropdown-menu"
            >
              {sugg.map((sug, i) => {
                return (
                  <li
                    key={i}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dropdown-item"
                    onClick={() => {
                      handleInpVal({
                        val: sug?.Fg?.Qh?.[0]?.[2]?.[0],
                        index: i,
                      });
                      setIsDropdownOpen(false);
                    }}
                  >
                    {sug?.Fg?.Qh?.[0]?.[2]?.[0] || "Unknown"}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <Button
        disabled={inpVal.index === null ? true : false}
        onClick={() => {
          if (inpVal.index !== null) {
            handleSelect(inpVal.val);
          }
        }}
        variant="default"
        className="self-end"
      >
        Add
      </Button>
    </div>
  );
}

export default GoogleMapAddsInput;
