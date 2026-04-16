import apiServices from "@/services/api";
import InnerProfile from "./innerProfile";

export default async function Profile() {
  const address = await apiServices.getUserAdreesses()

  return (
    <InnerProfile address={address} />
  )
}
