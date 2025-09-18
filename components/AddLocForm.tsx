import AddressLocInput from "@/components/AddressLocInput";
import GoogleMapAddsInput from "@/components/GoogleMapAddsInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ammentities, locationType } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import AddImgTtlModal from "@/components/modals/AddImgTtlModal";
import { useAddLoc } from "@/context/addLocContext";
import AddAmmModal from "./modals/AddAmmModal";

function AddLocForm() {
  const {
    title,
    handleLocTtlVal,
    locType,
    handleLocTypeVal,
    location,
    handleLocAddr,
  } = useAddLoc();
  const [isGglAdd, setIsGglAdd] = useState<boolean>(true);
  const imgTtlModalRef = useRef<HTMLDialogElement>(null);
  const ammModalRef = useRef<HTMLDialogElement>(null);
  const [selAmm, setSelAmm] = useState<number | null>(null);
  console.log(location);
  return (
    <>
      <div className="w-full max-w-7xl mx-auto grid gap-6 p-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="locName">Location Name</Label>
            <Input
              id="locName"
              type="text"
              name="locName"
              placeholder="Enter location name"
            />
          </div>

          <div>
            <Label>Location Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Select Location Type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {locationType?.map((l) => (
                  <DropdownMenuItem key={l.id}>{l.title}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input id="guests" type="number" name="guests" />
          </div>
          <div>
            <Label htmlFor="bedroom">Bedroom</Label>
            <Input id="bedroom" type="number" name="bedroom" />
          </div>
          <div>
            <Label htmlFor="beds">Beds</Label>
            <Input id="beds" type="number" name="beds" />
          </div>
          <div>
            <Label htmlFor="bathroom">Bathroom</Label>
            <Input id="bathroom" type="number" name="bathroom" />
          </div>
        </div>
        {location?.address !== "" ? (
          <div>
            <Textarea
              id="address"
              name="address"
              disabled={!!location.address}
              value={location.address}
            />
            <Button
              className="my-2"
              onClick={() =>
                handleLocAddr({
                  address: "",
                  placeId: "",
                  plusCode: {},
                  coordinates: { longitude: null, latitude: null },
                })
              }
            >
              Edit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 border rounded-5 p-5">
            <GoogleMapAddsInput />
            <div className="col-span-3">
              <div className="flex items-center my-3 w-1/2 mx-auto">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
            </div>
            <div className="col-span-3">
              {isGglAdd ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsGglAdd(false);
                  }}
                >
                  Add Location
                </Button>
              ) : (
                <AddressLocInput setAddStt={setIsGglAdd} />
              )}
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            placeholder="Enter price per night"
          />
        </div>

        <div className="w-full">
          <AddImgTtlModal reference={imgTtlModalRef} />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              imgTtlModalRef.current?.showModal();
            }}
          >
            Add Images
          </Button>
        </div>
        <div>
          <Label>Offered Amenities</Label>
          <AddAmmModal reference={ammModalRef} selAmmId={selAmm} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Select Amenities
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Ammentities?.map((a) => (
                <DropdownMenuItem
                  key={a.id}
                  onClick={() => {
                    setSelAmm(a.id);
                    ammModalRef.current?.showModal();
                  }}
                >
                  {a.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            name="desc"
            placeholder="Write a short description..."
          />
        </div>

        <Button className="w-full">Submit</Button>
      </div>
    </>
  );
}

export default AddLocForm;
