import z from "zod";

export const RentLocSchema = z.object({
  locType: z.enum(["A01", "V01", "P01"]),
  imgTtlData: z.array(
    z.union([
      z.string(),
      z.object({
        url: z.string(),
        public_id: z.string(),
      }),
    ])
  ),
  price: z.number(),
  guestsCap: z.number(),
  desc: z.object({
    bedrooms: z.number(),
    bathrooms: z.number(),
    beds: z.number,
    others: z.string(),
  }),
  facilities: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      amenities: z.array(z.object({ id: z.number(), name: z.string() })),
    })
  ),
  location: z.object({
    address: z.string(),
    placeId: z.string(),
    plusCode: z
      .object({
        compound_code: z.string().optional(),
        global_code: z.string().optional(),
      })
      .optional(),
  }),
  author:z.object({email:z.string(),username:z.string()}).optional(),
  reviews:z.array(z.string()).optional()
});
