import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { UserCheckIcon } from "lucide-react";

const GuestsAvailData = ({
  gstData,
  mgType,
}: {
  gstData: any;
  mgType: string;
}) => {
    console.log("gstData")
    console.log(gstData)
  return (
    <Card className="max-w-md p-3 shadow-xl">
      <CardTitle>TODAY'S GUEST</CardTitle>
      <CardHeader>
        <CardDescription>
          {Object.keys(gstData.guestsToday).length !== 0 ? (
            <div>
              <div>
                <p className="font-bold">Name : {gstData.guestsToday.username}</p>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <p className="font-bold">Total Guests : {gstData.guestsToday.totalGuests}</p>
                </div>
                <div>
                  <p className="font-bold">Stay Duration : {gstData.guestsToday.stayDuration}</p>
                </div>
              </div>
              {mgType === "guestsToday" && (
                <div className="">
                  <p className="font-black">Check-In Time : </p>
                  <p className="font-medium"></p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="">
                {mgType === "guestsToday"
                  ? "NO GUESTS STAYING TODAY"
                  : "NO GUESTS TODAY"}
              </h1>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <img
          src={gstData.image}
          alt="Banner"
          className="aspect-video h-50 rounded-xl object-cover shadow-xl"
        />
      </CardContent>
      <CardTitle className="text-center">{gstData.title}</CardTitle>
      {mgType === "check-in" &&(
          <Button className="w-full bg-green-600/10 text-green-600 hover:bg-green-600/20 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:hover:bg-green-400/20 dark:focus-visible:ring-green-400/40"
          disabled = {Object.keys(gstData.guestsToday).length === 0}
          >
            <UserCheckIcon />
            Check-In
          </Button>
      )}
    </Card>
  );
};

export default GuestsAvailData;
