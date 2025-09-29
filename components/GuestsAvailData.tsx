import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import CheckInButton from "./CheckInButton";

const GuestsAvailData = ({
  gstData,
  mgType,
}: {
  gstData: any;
  mgType: string;
}) => {
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
          <CheckInButton id={gstData.guestsToday?.bookingId} isDisable={Object.keys(gstData.guestsToday).length===0}/>
      )}
    </Card>
  );
};

export default GuestsAvailData;
