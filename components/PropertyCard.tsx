import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'

const PropertyCard = () => {
  return (
    <Card className='max-w-md pt-0 shadow-xl'>
      <CardContent className='px-0'>
        <img
          src='http://res.cloudinary.com/demncxfgx/image/upload/v1755109401/Rent-IT_V2/xinbtbekmnmeyf2ncinn.jpg'
          alt='Banner'
          className='aspect-video h-70 rounded-t-xl object-cover'
        />
      </CardContent>
      <CardHeader>
        <CardTitle>Ethereal</CardTitle>
        <CardDescription>Smooth, flowing gradients blending rich reds and blues in an abstract swirl.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        <Button className='shadow-xl'>Edit</Button>
        <Button variant={'destructive'} className='shadow-xl'>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default PropertyCard
