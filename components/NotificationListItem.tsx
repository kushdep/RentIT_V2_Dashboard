import { Button } from "./ui/button";

function NotificationListItem({notiTxt,notiTime}:{notiTxt:string,notiTime:Date}) {
    const today = new Date().getTime()
    const timeDiff = (today-notiTime.getTime())/1000
    let time =notiTime.toLocaleDateString() 
    
    if(timeDiff<=12*3600){
      time = `${timeDiff/3600}h ago`
    }

  return (
    <div className="border-b grid grid-cols-3 gap-2 bg-green-600/10">
      <div className="col-span-2 ml-2">{notiTxt}</div>
      <div className="col-span-1">
        <div className="flex gap-2 justify-end mr-2">
          <Button variant={"default"} className="h-7 px-2 py-1 text-xs">
            See Details
          </Button>
          <Button variant={"outline"} className="h-7 px-2 py-1 text-xs">
            Mark as read
          </Button>
        </div>
        <div className="text-xs text-end text-gray-500 mr-2">{time}</div>
      </div>
    </div>
  );
}

export default NotificationListItem;
