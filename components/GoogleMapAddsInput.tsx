import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function GoogleMapAddsInput() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Label htmlFor="address" className="">
          Address
        </Label>
        <Input id="address" type="text" name="address" />
      </div>
    </div>
  );
}

export default GoogleMapAddsInput;
