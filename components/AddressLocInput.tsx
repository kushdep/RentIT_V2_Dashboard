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
import { useActionState, useState } from "react";
import { useAddLoc } from "@/context/addLocContext";
import googleValidateAdderss from "@/utils/client-utils/addressValidation";
import toast from "react-hot-toast";
import { AddressValDataType } from "@/dataInterfaces";

type FormState = {
  regionCode: string;
  administrativeArea: string;
  locality: string;
  sublocality: string;
  postalCode: string;
  addressLines: string[];
  errors: FormErrType[];
};

const init: FormState = {
  regionCode: "IN",
  administrativeArea: "",
  locality: "",
  sublocality: "",
  postalCode: "",
  addressLines: [],
  errors: [],
};

type FormErrType = {
  error: string;
  severity: string;
};

function AddressLocInput({
  setAddStt,
}: {
  setAddStt: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleLocAddr } = useAddLoc();
  const [selStt,setSelStt] = useState<string>('Choose state')
  const [formState, formAcn, isPending] = useActionState(action, init);

  async function action(currentState: FormState, formData: FormData) {
    const administrativeArea = selStt;
    const postalCode = formData.get("postalCode") as string;
    const locality = formData.get("locality") as string;
    const subLocality = formData.get("subLocality") as string;
    const address1 = formData.get("addressOne") as string;
    const address2 = formData.get("addressTwo") as string;

    const addressLines: string[] = [];
    addressLines.push(address1, address2 + " " + subLocality);
    const addState: AddressValDataType = {
      address: {
        regionCode: "IN",
        administrativeArea,
        locality,
        postalCode,
        addressLines,
      },
    };

    currentState.errors = [];

    const res = await googleValidateAdderss(addState);
    console.log("address validation response " + JSON.stringify(res));
    if (res !== undefined && res.validation) {
      console.log(res.message);
      toast.success(res.message);
      handleLocAddr(res.data as any);
      toast.success("Address Added Succesfully!!");
    } else {
      toast.error(res?.message ?? "");
      const { suspicious, plausible, missing, invalid } = res?.data as any;
      if (
        (suspicious !== undefined && suspicious !== null) ||
        (plausible !== undefined && plausible !== null)
      ) {
        const suspFeilds = suspicious.length > 0 ? suspicious.join(", ") : "";
        console.log(suspFeilds);
        const plauseFeilds = plausible.join(", ");
        console.log(plauseFeilds);
        currentState.errors.push({
          error: `Not able to validate ${
            suspFeilds.length > 0 ? suspFeilds + "," : suspFeilds
          } ${plauseFeilds}`,
          severity: "error",
        });
        console.log("1 " + JSON.stringify(currentState));
      }

      if (missing !== undefined && missing !== null) {
        const missingFeilds = missing.join(", ");
        currentState.errors.push({
          error: `Please Add ${missingFeilds} feilds`,
          severity: "error",
        });
        console.log("2 " + JSON.stringify(currentState));
      }

      if (invalid !== undefined && invalid !== null) {
        const invalidFeilds = missing.join(", ");
        currentState.errors.push({
          error: ` ${invalidFeilds} are not valid`,
          severity: "error",
        });
        console.log("3 " + JSON.stringify(currentState));
      }
    }

    console.log(currentState);

    console.log(addState);
    return {
      ...currentState,
      ...addState.address,
      sublocality: subLocality,
    };
  }

  return (
    <form action={formAcn}>
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full">
                  IN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled>IN</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="col-span-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selStt}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-60 overflow-y-auto">
                {regionalCode?.map((c, i) => (
                  <DropdownMenuItem key={i}>{c.state}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="col-span-3">
            <Input
              id="postalCode"
              type="number"
              name="postalCode"
              placeholder="Postal Code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="locality">Locality</Label>
            <Input id="locality" type="text" name="locality" />
          </div>
          <div>
            <Label htmlFor="subLocality">Street No./Sub-locality</Label>
            <Input id="subLocality" type="text" name="subLocality" />
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
          <Button variant="outline" onClick={() => setAddStt(true)}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddressLocInput;
