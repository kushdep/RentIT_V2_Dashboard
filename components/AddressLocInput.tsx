import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { regionalCode } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function AddressLocInput() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Label>Country</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">IN</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled>IN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="col-span-2">
          <Label>State</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">Choose State</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-60 overflow-y-auto">
              {regionalCode?.map((c, i) => (
                <DropdownMenuItem key={i}>{c.state}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="col-span-1">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" type="number" name="postalCode" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="locality">Locality</Label>
          <Input id="locality" type="text" name="locality" />
        </div>
        <div>
          <Label htmlFor="sub-locality">Street No./Sub-locality</Label>
          <Input id="sub-locality" type="text" name="sub-locality" />
        </div>
      </div>

      <div>
        <Label htmlFor="addressOne">Address Line 1</Label>
        <Input id="addressOne" type="text" name="addressOne" />
      </div>
      <div>
        <Label htmlFor="addressTwo">Address Line 2</Label>
        <Input id="addressTwo" type="text" name="addressTwo" />
      </div>

      <div className="flex gap-2">
        <Button variant="default">Validate</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}

export default AddressLocInput;
