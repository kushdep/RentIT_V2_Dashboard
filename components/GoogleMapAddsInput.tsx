import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"

function GoogleMapAddsInput() {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div className="w-full">
        <Label htmlFor="address" className="">
          Address
        </Label>
        <Input id="address" type="text" name="address" className=""/>
      </div>
      <Button>Search</Button>
    </div>
  );
}

export default GoogleMapAddsInput;
