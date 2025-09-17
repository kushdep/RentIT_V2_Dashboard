import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { regionalCode } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button"

function AddressLocInput() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 flex gap-4">
            <div className="col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="btn-danger">
                IN
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled={true}>IN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            </div>
            <div className="col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="btn-danger">
              Choose Your State
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {regionalCode &&
                regionalCode.map((c) => (
                  <DropdownMenuItem>{c.state}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

            </div>
        </div>
        <div className="col-span-2">
          <Label htmlFor="postalCode" className="">
            Postal Code
          </Label>
          <Input id="address" type="number" name="postalCode" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="locality" className="">
            Locality
          </Label>
          <Input id="locality" type="text" name="locality" />
        </div>
        <div>
          <Label htmlFor="sub-locality" className="">
            Street NO./Sub-locality
          </Label>
          <Input id="sub-locality" type="text" name="sub-locality" />
        </div>
      </div>
      <div>
        <Label htmlFor="addressOne" className="">
          Address Line 1
        </Label>
        <Input id="addressOne" type="text" name="addressOne" />
      </div>
      <div>
        <Label htmlFor="addressTwo" className="">
          Address Line 2
        </Label>
        <Input id="addressTwo" type="text" name="addressTwo" />
      </div>
      <div className="flex">
            <Button>Validate</Button>
            <Button>Cancel</Button>
      </div>
    </div>
  );
}

export default AddressLocInput;
