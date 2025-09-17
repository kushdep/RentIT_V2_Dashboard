"use client";

import AddressLocInput from "@/components/AddressLocInput";
import GoogleMapAddsInput from "@/components/GoogleMapAddsInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { Ammentities, locType } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

function AddLocPage() {
  return (
    <div className="w-full grid border border-red-500 p-10">
      <div className="flex">
        <div className="">
          <Label htmlFor="locName" className="">
            Location Name
          </Label>
          <Input id="locName" type="text" name="locName" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="btn-danger">
            Location Type
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {locType &&
              locType.map((l) => (
                <DropdownMenuItem key={l.id}>{l.title}</DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="">
          <Label htmlFor="guests" className="">
            Guests
          </Label>
          <Input id="guests" type="number" name="guests" />
        </div>
        <div className="">
          <Label htmlFor="bedroom" className="">
            Bedroom
          </Label>
          <Input id="bedroom" type="number" name="bedroom" />
        </div>
        <div className="">
          <Label htmlFor="beds" className="">
            Beds
          </Label>
          <Input id="beds" type="number" name="beds" />
        </div>
        <div className="">
          <Label htmlFor="bathroom" className="">
            Bathroom
          </Label>
          <Input id="bathroom" type="text" name="bathroom" />
        </div>
      </div>
        <div className="grid grid-cols-3 gap-4">
          <GoogleMapAddsInput />
          <div className="flex justify-center">
            <div className="flex items-center my-3 w-1/2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          </div>
          <div>
            <AddressLocInput />
          </div>
      </div>
      <div>
        <Label htmlFor="price" className="">
            Price
          </Label>
          <Input id="price" type="number" name="price" />
      </div>
      <div className="w-full">
        <Button>Add Images</Button>
      </div>
      <div>
         <DropdownMenu>
          <DropdownMenuTrigger className="btn-danger">
            Offered Ammenities
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Ammentities &&
              Ammentities.map((a) => (
                <DropdownMenuItem key={a.id}>{a.title}</DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Label htmlFor="desc" className="">
            Description
          </Label>
          <Textarea />
      </div>
    </div>
  );
}

export default AddLocPage;
