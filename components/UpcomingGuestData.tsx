import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  }
]

const UpcomingGuestData = ({bkngData}:{bkngData:any}) => {
  return (
    <Card className=''>
      <CardHeader className=''>
        <CardTitle>{bkngData.start} - {bkngData.end}</CardTitle>
      </CardHeader>
      <CardContent className='text-sm grid grid-cols-2'>
        <div>
        <p>UserName : {bkngData.username}</p>
        </div>
        <div>
        <p>Email : {bkngData.email}</p>
        </div>
        <div>
        <p>Total Amount : {bkngData.totalAmt}</p>
        </div>
        <div>
        <p>Stay Duration : {bkngData.stayDuration}</p>
        </div>
        <div>
        <p>Total Guests : {bkngData.totalGuests}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex -space-x-2 hover:space-x-1'>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UpcomingGuestData
