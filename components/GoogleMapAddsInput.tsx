import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function GoogleMapAddsInput() {
  

  return (
    <div className="grid grid-cols-4 gap-4 col-span-3">
      <div className="col-span-3">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          name="address"
          placeholder="Enter address"
        />
      </div>
      <Button variant="default" className="self-end">
        Search
      </Button>
    </div>
  );
}

export default GoogleMapAddsInput;
