import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: 1,
    name: "Alice Smith",
    occupation: "Software Engineer",
    employer: "Alpha Tech",
    email: "alice@example.com",
    location: "United States",
    lastaccess: "12/16/2021",
    salary: "$120,000",
  },
  {
    id: 2,
    name: "Bob Johnson",
    occupation: "Marketing Manager",
    employer: "Beta Corp",
    email: "bob@example.com",
    location: "Canada",
    lastaccess: "11/05/2021",
    salary: "$100,000",
  },
  {
    id: 3,
    name: "Charlie Brown",
    occupation: "Graphic Designer",
    employer: "Gamma Studios",
    email: "charlie@example.com",
    location: "United Kingdom",
    lastaccess: "09/20/2022",
    salary: "$75,000",
  },
  {
    id: 4,
    name: "Dora Emily",
    occupation: "HR Manager",
    employer: "Delta Corp",
    email: "dora@example.com",
    location: "Australia",
    lastaccess: "08/10/2020",
    salary: "$40,000",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    occupation: "Secret Agent",
    employer: "Eagle Eye",
    email: "ethan@example.com",
    location: "India",
    lastaccess: "11/20/2021",
    salary: "$220,000",
  },
  {
    id: 6,
    name: "Fiona Brown",
    occupation: "Financial Analyst",
    employer: "Fox Finance",
    email: "fiona@example.com",
    location: "France",
    lastaccess: "07/05/2021",
    salary: "$150,000",
  },
  {
    id: 7,
    name: "George Wilson",
    occupation: "Project Manager",
    employer: "Gazelle Technologies",
    email: "george@example.com",
    location: "Brazil",
    lastaccess: "05/25/2021",
    salary: "$135,000",
  },
];

const GuestsTable = ({ bkngData }: { bkngData: any }) => {
  console.log(bkngData);
  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-background sticky left-0">Sno</TableHead>
              <TableHead className="bg-background sticky left-7.5">
                Name
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Stay Dates</TableHead>
              <TableHead>Stay Duration</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Total Rent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bkngData.bookings.map((b: any, ind: number) => {
              let checkInTime =
                b.bookingDetails.checkIn !== undefined &&
                b.bookingDetails.checkIn !== null
                  ? String(new Date(b.bookingDetails.checkIn)).slice(0, 24)
                  : "-";
              return (
                <TableRow key={ind} className="hover:bg-transparent">
                  <TableCell className="bg-background sticky left-0 font-medium">
                    {ind + 1}
                  </TableCell>
                  <TableCell className="bg-background sticky left-7.5">
                    {b.bookingDetails.user.username}
                  </TableCell>
                  <TableCell>{b.bookingDetails.user.email}</TableCell>
                  <TableCell>{b.bookingDetails.totalGuests}</TableCell>
                  <TableCell>
                    {new Date(b.start).toDateString()} -{" "}
                    {new Date(b.end).toDateString()}
                  </TableCell>
                  <TableCell>{b.bookingDetails.stayDuration}</TableCell>
                  <TableCell>{checkInTime}</TableCell>
                  <TableCell>{`$ ${
                    b.bookingDetails.payment.amount / 100
                  }`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Location Booking History
      </p>
    </div>
  );
};

export default GuestsTable;
