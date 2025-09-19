import { AuthResponse, RentLocIfc } from "@/dataInterfaces";

export const addLocationAction = async (
  payload: RentLocIfc
): Promise<AuthResponse> => {
  return {
    success: true,
    message: "Done",
  };
};
